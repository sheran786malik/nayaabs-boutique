import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { MailIcon, LockOpenIcon } from "react-native-heroicons/outline";
import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
  ThumbDownIcon,
  ArrowCircleRight,
} from "react-native-heroicons/outline";

import { AntDesign } from "react-native-vector-icons";
import { auth } from "../../database/Firebase";
import { useNavigation, NavigationActions } from "@react-navigation/native";

const CheckoutLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    getSignedInUser();
    return () => {};
  }, []);

  const getSignedInUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Checkout-logged-in");
      }
    });
  };
  const moveToGuestLogin = () => {
    navigation.navigate("Me", { screen: "Checkout-not-logged-in" });
  };

  const login = () => {
    auth.signInWithEmailAndPassword(username, password).then((user) => {
      navigation.navigate("Checkout-logged-in");
    });
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#FBFBFD", flex: 1 }}>
      <View className="flex-row w-100 justify-between">
        <TouchableOpacity
          className="flex-row self-center"
          onPress={() => navigation.navigate("Explore")}
        >
          <ChevronLeftIcon size={30} color="black" />
          <Text className="self-center">Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => moveToGuestLogin()}>
          <Text className="pt-2 pr-5">Continue as Guest</Text>
        </TouchableOpacity>
      </View>

      <View className="">
        <Image
          className="self-center "
          source={require("../../assets/nayaabslogo.png")}
          style={{
            resizeMode: "contain",
            backgroundColor: "black",
            borderRadius: 100,
          }}
        />
        <Text
          className="self-center p-5"
          style={{
            fontSize: 22,
            fontWeight: "500",
          }}
        >
          Log in
        </Text>

        <View
          className="flex-row w-80 self-center p-5"
          style={{
            backgroundColor: "white",
          }}
        >
          <MailIcon size={40} color="black" />
          <TextInput
            placeholder="Email"
            className="pl-2"
            onChangeText={(e) => setUsername(e)}
          />
        </View>

        <View
          className="flex-row w-80 self-center p-5 mt-8"
          style={{
            backgroundColor: "white",
          }}
        >
          <LockOpenIcon size={40} color="black" />
          <TextInput
            placeholder="Password"
            className="ml-2"
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgottenPassword")}
        >
          <Text
            className="text-right p-4"
            style={{
              fontSize: 12,
            }}
          >
            Forgotten Password?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => login(username, password)}
        className="bg-black p-5 w-80 self-center rounded-3xl mt-5"
      >
        <Text
          className="text-center"
          style={{ color: "white", fontWeight: "600" }}
        >
          Log In
        </Text>
      </TouchableOpacity>
      <View className="p-5 flex-row self-center">
        <View className="self-center">
          <View style={{ borderWidth: 0.5, color: "black", width: 100 }} />
        </View>
        <Text className="self-center p-5 "> Or</Text>
        <View className="self-center">
          <View style={{ borderWidth: 0.5, color: "black", width: 100 }} />
        </View>
      </View>
      <View className="flex-row justify-evenly">
        <TouchableOpacity>
          <AntDesign name="facebook-square" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="google" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-row self-center p-5">
        <Text style={{ color: "grey" }}>Dont have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CheckoutRegister")}
        >
          <Text className="font-bold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutLogin;
