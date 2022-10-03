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
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() + 3);
  const [name, setName] = useState("");

  const { fullName, address, phoneNumber, totalPrice } = route.params;

  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Explore");
    }, 10000);
    return () => {};
  }, []);
  // const setTodaysDateForDelivery = () => {
  //   let today = new Date();
  //   let date =
  //     today.getFullYear() +
  //     "-" +
  //     (today.getMonth() + 1) +
  //     "-" +
  //     (today.getDate() + 3);
  //   setToday(date);
  // };
  const continueShopping = () => {
    navigation.navigate("Explore");
  };

  return (
    <SafeAreaView>
      <ImageBackground
        className="bg-black p-5 self-center"
        style={{ borderRadius: 80 }}
      >
        <Image
          className="self-center"
          source={require("../../../assets/OrderConfirmLogo.png")}
          style={{
            resizeMode: "cover",
          }}
        />
      </ImageBackground>

      <View className="m-3 w-63 ">
        <Text
          className="self-center font-bold last:text-center"
          style={{ fontSize: 24 }}
        >
          Hey, {fullName}
        </Text>
        <Text
          className="self-center font-bold text-center"
          style={{ fontSize: 24 }}
        >
          Thanks For Your Purchase
        </Text>
      </View>

      {/* <Text
        className="w-64 self-center text-center"
        style={{ fontSize: 14, color: "grey" }}
      >
        An order confirmation has been sent to your email address
      </Text> */}

      {cartItems.map((data) => (
        <View className="flex-col p-2">
          <View
            style={{
              alignSelf: "flex-end",
              width: "100%",
              marginBottom: 20,
              borderWidth: 0.5,
              opacity: 0.5,
            }}
          />
          <View className="flex-row justify-between">
            <Text>Total Amount</Text>
            <Text className="font-bold">{totalPrice}</Text>
          </View>

          <View className="flex-row justify-between pt-5">
            <Text>Estimated Delivery</Text>
            <Text className="font-bold">{date}</Text>
          </View>

          <View
            style={{
              alignSelf: "flex-end",
              width: "100%",
              marginTop: 20,
              marginBottom: 20,
              borderWidth: 0.5,
              opacity: 0.5,
            }}
          />
          <Text className="text-2xl font-bold">Billing Address</Text>
          <View className="flex-row justify-between pt-5">
            <Text>Customers Name</Text>
            <Text className="font-bold">{fullName}</Text>
          </View>

          <View className="flex-row justify-between pt-5">
            <Text>Phone Number</Text>
            <Text className="font-bold">{phoneNumber}</Text>
          </View>

          <View className="flex-row justify-between pt-5">
            <Text>Address</Text>
            <Text className="font-bold">{address}</Text>
          </View>
        </View>
      ))}
      <View className="p-10">
        <TouchableOpacity
          onPress={() => continueShopping()}
          className="bg-black p-5 w-80 self-center rounded-3xl "
        >
          <Text
            className="text-center"
            style={{ color: "white", fontWeight: "600" }}
          >
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmation;
