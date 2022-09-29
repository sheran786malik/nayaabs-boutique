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
import { auth, db } from "../../external/Firebase";
import { useNavigation } from "@react-navigation/native";
import { ThreeDSecure } from "@stripe/stripe-react-native";

const ForgottenPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    fetchInfo();
    return () => {};
  }, []);

  const fetchInfo = async () => {};

  const forgottenPassword = () => {
    auth.sendPasswordResetEmail(username).then((user) => {
      alert("An email has been sent to the email account associated");
      navigation.navigate("Login");
    });
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#FBFBFD", flex: 1 }}>
      {loggedIn === true ? (
        <View>
          <View className="flex-row w-100 justify-between">
            <TouchableOpacity
              className="flex-row self-center"
              onPress={() => navigation.navigate("Login")}
            >
              <ChevronLeftIcon size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View className="self-center">
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
              Please enter the email that is associated with your account
            </Text>
            <View
              className="flex-row w-80 self-center p-5 mt-8"
              style={{
                backgroundColor: "white",
              }}
            >
              <MailIcon size={40} color="black" className="self-center" />

              <TextInput
                placeholder="Enter Email Address"
                className="pl-2 self-center"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(e) => setUsername(e)}
                style={{
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => forgottenPassword()}
              className="bg-black p-5 w-80 self-center rounded-3xl mt-10"
            >
              <Text
                className="text-center"
                style={{ color: "white", fontWeight: "600" }}
              >
                Send Instructions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Sorry, please log in</Text>
      )}
    </SafeAreaView>
  );
};

export default ForgottenPassword;
