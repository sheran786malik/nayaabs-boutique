import {
  Alert,
  KeyboardAvoidingView,
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
  LocationMarkerIcon,
  PhoneIcon,
  ChevronLeftIcon,
  LockClosedIcon,
  UserIcon,
  PlusIcon,
  MinusIcon,
  ThumbDownIcon,
  ArrowCircleRight,
} from "react-native-heroicons/outline";
import CheckBox from "react-native-check-box";
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "react-native-vector-icons";
import { auth, db } from "../../external/Firebase";
import { BarPasswordStrengthDisplay } from "react-native-password-strength-meter";

export default class Register extends Component {
  state = {
    username: "",
    fullName: "",
    password: "",
    confPassword: "",
    address: "",
    phoneNo: "",
    termsAndConditions: false,
    disabled: true,
  };

  register() {
    if (this.state.password === this.state.confPassword) {
      auth
        .createUserWithEmailAndPassword(
          this.state.username,
          this.state.password
        )
        .then((user) => {
          db.collection("users")
            .doc(user.user.uid)
            .set({
              fullName: this.state.fullName,
              address: this.state.address,
              phoneNo: this.state.phoneNo,
              emailAddress: this.state.username,
            })
            .then((res) => {
              this.props.navigation.navigate("Profile");
            })
            .catch((error) => console.log(error));
        });
    }
  }
  componentDidMount() {
    this.setState({ disabled: false });
  }

  validation() {}
  render() {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView style={{ backgroundColor: "#FBFBFD", flex: 1 }}>
          <View className="">
            <Image
              className="self-center "
              source={require("../../assets/nayaabslogo.png")}
              style={{
                resizeMode: "contain",
                backgroundColor: "black",
                borderRadius: 100,
                width: 80,
                height: 80,
              }}
            />
            <Text
              className="self-center p-5"
              style={{
                fontSize: 22,
                fontWeight: "500",
              }}
            >
              Sign Up
            </Text>

            <View
              className="flex-row w-80 self-center p-3 border rounded-xl"
              style={{
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Full Name"
                autoCapitalize="none"
                className="pl-2 "
                placeholderTextColor={"black"}
                onChangeText={(e) => this.setState({ fullName: e })}
              />
            </View>

            <View
              className="flex-row w-80 self-center p-3 border rounded-xl mt-5"
              style={{
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Email"
                className="pl-2"
                textContentType="emailAddress"
                autoCapitalize="none"
                placeholderTextColor={"black"}
                keyboardType="email"
                onChangeText={(e) => this.setState({ username: e })}
              />
            </View>

            <View
              className="flex-row w-80 self-center p-3 border rounded-xl mt-5"
              style={{
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Password"
                className="pl-2"
                autoCapitalize="none"
                placeholderTextColor={"black"}
                onChangeText={(e) => this.setState({ password: e })}
                secureTextEntry={true}
              />
            </View>
            <View className="p-5 self-center">
              <Text className="text-left pl-2" style={{ fontSize: 10 }}>
                Password Strength
              </Text>
              <BarPasswordStrengthDisplay password={this.state.password} />
            </View>

            <View
              className="flex-row w-80 self-center p-3 border rounded-xl m-2"
              style={{
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Confirm Password"
                className="pl-2"
                placeholderTextColor={"black"}
                autoCapitalize="none"
                onChangeText={(e) => this.setState({ confPassword: e })}
                secureTextEntry={true}
              />
            </View>
            <View
              className="flex-row w-80 self-center p-3 border rounded-xl mt-5"
              style={{
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={"black"}
                keyboardType="number-pad"
                className="pl-2"
                onChangeText={(e) => this.setState({ phoneNo: e })}
              />
            </View>

            <View
              className="flex-row w-80 self-center p-3 border rounded-xl mt-5"
              style={{
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Address"
                placeholderTextColor={"black"}
                className="pl-2"
                autoCapitalize="none"
                onChangeText={(e) => this.setState({ address: e })}
              />
            </View>
          </View>

          <View className=" flex-row w-80 self-center p-3 mt-1">
            <View className="flex-row self-center w-">
              <Text className="self-center mr-1" style={{ color: "grey" }}>
                By Registering, you agree to the
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("TermsAndConditions")
                  }
                >
                  <Text className="self-center font-bold">
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.register()}
            disabled={this.state.disabled}
            className="bg-black p-5 w-80 self-center rounded-3xl mt-5"
          >
            <Text
              className="text-center"
              style={{ color: "white", fontWeight: "600" }}
            >
              Create Account
            </Text>
          </TouchableOpacity>

          <View className="flex-row self-center p-5">
            <Text style={{ color: "grey" }}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text className="font-bold">Log in</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
