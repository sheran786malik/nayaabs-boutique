import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
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

export default class ForgottenPassword extends Component {
  state = {
    username: "",
    password: "",

    loggedIn: false,
  };

  login(username, password) {}
  forgottenPassword() {
    auth.sendPasswordResetEmail(this.state.username).then((user) => {
      alert("An email has been sent to the email account associated");
    });
  }
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#FBFBFD", flex: 1 }}>
        <View className="flex-row w-100 justify-between">
          <TouchableOpacity
            className="flex-row self-center"
            onPress={() => this.props.navigation.navigate("Login")}
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
              style={{
                padding: 10,
                borderRadius: 10,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.forgottenPassword()}
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
      </SafeAreaView>
    );
  }
}
