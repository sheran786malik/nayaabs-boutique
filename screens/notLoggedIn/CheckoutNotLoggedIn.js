import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  TextArea,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
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
import SwipeButton from "rn-swipe-button";
import Header from "../Components/Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CardField,
  StripeProvider,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../../database/Firebase";
import { WooCommerce } from "../../database/WoocommerceAPI";
import { Payment } from "../Components/Payment/Payment";
import { add } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../features/cartSlice";

export default function CheckoutNotLoggedIn({ navigation }) {
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const [cartItems, setCartItems] = useState(useSelector(selectCartItems));

  const [totalPrice, setTotalPrice] = useState(useSelector(selectCartTotal));

  useEffect(() => {}, []);

  // pay = () => {

  //   navigation.navigate('OrderConfirm')
  // }

  // const fetchPaymentIntentClientSecret = async () => {

  //   const { clientSecret, error } = response.json();

  //   return { clientSecret, error }

  // }

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      "http://192.168.0.48:3000/create-payment-intent",
      {
        method: "POST",
        body: totalPrice,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { clientSecret, error } = await response.json();

    return { clientSecret, error };
  };

  // const addToDBonOrderComplete = async () => {
  //   db.collection("orders")
  //     .doc(`${Math.random(10, 10000)}`)
  //     .set({
  //       fullName: fullName,
  //       email: email,
  //       address: address,
  //       orderDetails: cartItems,
  //     })
  //     .then((data) => {
  //       navigation.navigate("", {
  //         cartItems: cartItems,
  //         address: address,
  //         fullName: fullName,
  //         email: email,
  //         phoneNumber: phoneNumber,
  //       });
  //     });
  // };

  // const handlePayPress = () => {
  //   console.log('Working')
  // }
  console.log(totalPrice);

  return (
    <SafeAreaView style={{ backgroundColor: "#FBFBFD" }}>
      <KeyboardAwareScrollView>
        <Header
          pageToGoBackTo={"MyCart"}
          title="Checkout"
          navigation={navigation}
        />

        <View className="justify-around">
          <Text className="p-5" style={{ fontWeight: "500", fontSize: 16 }}>
            Full Name
          </Text>

          <View
            className="w-80 self-center p-3"
            style={{
              backgroundColor: "white",
            }}
          >
            <TextInput
              placeholder="Name"
              className="p-2"
              onChangeText={(e) => setFullName(e)}
            />
          </View>

          <Text className="p-5" style={{ fontWe: "500", fontSize: 16 }}>
            Email Address
          </Text>
          <View
            className="w-80 self-center p-3 mt-2"
            style={{
              backgroundColor: "white",
            }}
          >
            <TextInput
              placeholder="Email"
              autoCapitalize={"none"}
              className="p-2"
              onChangeText={(e) => setEmail(e)}
            />
          </View>

          <Text className="p-5" style={{ fontWe: "500", fontSize: 16 }}>
            Address
          </Text>

          <View
            className="w-80 self-center p-3 mt-2"
            style={{
              backgroundColor: "white",
            }}
          >
            <TextInput
              placeholder="Address"
              className="p-2"
              multiLine={true}
              onChangeText={(e) => setAddress(e)}
            />
          </View>

          <Text className="p-5" style={{ fontWe: "500", fontSize: 16 }}>
            Phone Number
          </Text>

          <View
            className="w-80 self-center p-3 mt-2"
            style={{
              backgroundColor: "white",
            }}
          >
            <TextInput
              placeholder="Enter phone number"
              className="p-2"
              multiLine={true}
              onChangeText={(e) => setPhoneNumber(e)}
            />
          </View>

          <View className="p-10">
            <Text
              className="self-center"
              style={{ fontSize: 15, fontWeight: "500" }}
            >
              Total:{parseInt(totalPrice).toFixed(2)}
            </Text>
          </View>
        </View>

        <Payment
          email={email}
          fullName={fullName}
          cardDetails={cardDetails}
          address={address}
          totalPrice={totalPrice}
          cartItems={cartItems}
          phoneNumber={phoneNumber}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    fontSize: 20,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
  },
});
