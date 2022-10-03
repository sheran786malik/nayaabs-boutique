import {
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import Form from "../Components/MyDetails/Form";
import DatePicker from "react-native-date-picker";
import {
  AdjustmentsIcon,
  UserIcon,
  SearchIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MailIcon,
  UserCircleIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from "react-native-heroicons/outline";
import { auth, db } from "../../external/Firebase";
import { useNavigation } from "@react-navigation/native";

const MyDetails = () => {
  // state = {
  //   date: new Date(),
  //   open: false,
  //   userDetails: [],

  //   emailAddress: "",
  //   address: "",
  //   phoneNo: "",
  //   fullName: "",
  //   userID: "",
  // };

  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [userID, setUserID] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    fetchInfo();
    return () => {};
  }, []);

  const updateDetails = () => {
    db.collection("users")
      .doc(userID)
      .set({
        emailAddress: emailAddress,
        address: address,
        phoneNo: phoneNo,
        fullName: fullName,
      })
      .then((data) => {
        alert("Changes have been made successfully");
        navigation.navigate("MyDetails");
      })
      .catch((error) => {
        alert("An error has occured");
      });
  };

  const fetchInfo = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((querySnapshot) => {
            let userDetails = [];
            setEmailAddress(querySnapshot.data().emailAddress);
            setAddress(querySnapshot.data().address);
            setFullName(querySnapshot.data().fullName);
            setPhoneNo(querySnapshot.data().phoneNo);
          });
      } else {
        navigation.navigate("Login");
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title={"My Details"}
        navigation={navigation}
        pageToGoBackTo="Profile"
      />

      <View className="flex flex-col mt-10 p-5 w-full h-1/2 justify-between">
        <View className="flex flex-row justify-between text-center">
          <Text className="text-sm text-gray-400 self-center">Name</Text>
          <TextInput
            placeholder="Enter Full Name"
            className="text-base"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#ECECEC",
            }}
            value={fullName}
            onChangeText={(e) => setFullName(e)}
          />
        </View>

        <View className="flex flex-row justify-between text-center">
          <Text className="text-sm text-gray-400 ">Email </Text>
          <TextInput
            className="text-base text-left"
            placeholder="Enter Email Address"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#ECECEC",
            }}
            value={emailAddress}
            onChangeText={(e) => setEmailAddress(e)}
          />
        </View>

        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-400 self-center">Phone</Text>
          <TextInput
            className="text-base"
            placeholder="Enter Phone Number"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#ECECEC",
            }}
            onChangeText={(e) => setPhoneNo(e)}
            value={phoneNo}
          />
        </View>

        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-400 self-center">Address</Text>
          <TextInput
            className="text-base"
            placeholderTextColor={"black"}
            placeholder="Enter Address"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#ECECEC",
            }}
            onChangeText={(e) => setAddress(e)}
            value={address}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => updateDetails()}
        className="self-center p-5 w-80 mt-10 bg-black rounded-3xl"
      >
        <Text className="text-white text-center">Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyDetails;
