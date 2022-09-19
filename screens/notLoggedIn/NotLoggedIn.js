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

import tw from "tailwind-react-native-classnames";

import { AntDesign } from "react-native-vector-icons";
import { auth } from "../../database/Firebase";
import { useNavigation } from "@react-navigation/native";

const NotLoggedIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      getSignedInUser();
    };
  }, []);

  const getSignedInUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Profile");
      }
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FBFBFD", flex: 1 }}>
      <View className="flex-row justify-between w-100">
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Explore")}
        ></TouchableOpacity>

        <Text
          className="self-center"
          style={{ fontWeight: "500", fontSize: 20 }}
        >
          My Account
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Settings")}
        >
          <AntDesign name="setting" size={30} color="black" className="pr-2" />
        </TouchableOpacity>
      </View>

      <View className="justify-center items-center align-middle h-4/6">
        <Text
          className="self-center "
          style={{
            fontSize: 24,
            fontWeight: "500",
          }}
        >
          Join Us
        </Text>
        <Text
          className="self-center p-2"
          style={{
            color: "grey",
            fontSize: 12,
          }}
        >
          View Order and Gain Access to Exclusive Offers & Promotions
        </Text>

        <View>
          <TouchableOpacity
            className="bg-black mt-10 p-5 w-52 self-center rounded-3xl"
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text
              className="text-center"
              style={{ color: "white", fontWeight: "600" }}
            >
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-black p-5 w-52  mt-5 self-center rounded-3xl"
            onPress={() => navigation.navigate("Register")}
          >
            <Text
              className="text-center"
              style={{ color: "white", fontWeight: "600" }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotLoggedIn;
