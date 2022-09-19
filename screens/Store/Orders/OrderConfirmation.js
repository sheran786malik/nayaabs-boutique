import {
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import AnimatedLogo from "react-native-logo-animation";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../features/cartSlice";

import LOGO from "../../../assets/nayaabslogo.png";

const OrderConfirmation = ({ route }) => {
  const [cartItems, setCartItems] = useState(useSelector(selectCartItems));
  const [today, setToday] = useState("");
  const [name, setName] = useState("");

  const { fullName, address, phoneNumber } = route.params;

  const navigation = useNavigation();
  useEffect(() => {
    return () => {
      setTodaysDateForDelivery();
    };
  }, []);
  const setTodaysDateForDelivery = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() + 3);
    setToday(date);
  };
  const continueShopping = () => {
    navigation.navigate("Explore");
  };

  return (
    <SafeAreaView>
      <ImageBackground
        className="justify-center self-center"
        style={{
          backgroundColor: "black",
          width: 200,
          height: 200,
          borderRadius: 100,
        }}
      >
        {cartItems.map((data) => {
          <Image
            className="self-center"
            source={{ uri: "../../../assets/logo.png" }}
            style={{ width: 150, height: 150, resizeMode: "contain" }}
          />;
        })}
      </ImageBackground>

      <Text className="self-center font-bold pt-10" style={{ fontSize: 24 }}>
        Thanks For Your Order
      </Text>

      <Text
        className="w-64 self-center text-center pt-5"
        style={{ fontSize: 14, color: "grey" }}
      >
        An order confirmation has been sent to your email address
      </Text>

      <View className="flex-col bg-black p-3 m-5 rounded-2xl ">
        {cartItems.map((data) => {
          <View className="flex-row justify-around ">
            <Text style={{ color: "white" }}>Total Amount</Text>
            <Text style={{ color: "white" }}>{data.price}</Text>
          </View>;
        })}
        <View className="flex-row justify-between pb-3">
          <Text style={{ color: "white" }}>Estimated Delivery</Text>
          <Text style={{ color: "white" }}>{today}</Text>
        </View>

        <Text
          className="font-semibold pb-3"
          style={{ fontSize: 20, color: "white" }}
        >
          Billing Address
        </Text>

        <View className="flex flex-col">
          <View className="flex-row justify-between pb-3">
            <Text style={{ color: "white" }}>Customer Name</Text>
            <Text style={{ color: "white", width: "40%" }}>{fullName}</Text>
          </View>

          <View className="flex-row justify-between pb-3">
            <Text style={{ color: "white" }}>Phone Number</Text>
            <Text style={{ color: "white", width: "40%" }}>{phoneNumber}</Text>
          </View>
          <View className="flex-row justify-between pb-3">
            <Text style={{ color: "white" }}>Address</Text>
            <Text style={{ color: "white", width: "40%" }}>{address}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => continueShopping()}
        className="bg-black p-5 w-80 self-center rounded-3xl mt-5"
      >
        <Text
          className="text-center"
          style={{ color: "white", fontWeight: "600" }}
        >
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderConfirmation;
