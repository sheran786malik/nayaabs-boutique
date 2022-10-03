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
import {
  MailIcon,
  LockOpenIcon,
  PencilIcon,
} from "react-native-heroicons/outline";
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
import { db } from "../../external/Firebase";
import { WooCommerce } from "../../external/WoocommerceAPI";
import { Payment } from "../Components/Payment/Payment";
import { add } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../features/cartSlice";
import { PaymentIcon } from "react-native-payment-icons";

export default function CheckoutNotLoggedIn({ navigation }) {
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [deliveryFee, setDeliveryFee] = useState(4);

  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const cartItems = useSelector(selectCartItems);

  const totalPrice = useSelector(selectCartTotal);

  const [editing, setEditing] = useState("false");
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

    if (error) {
      alert("an error has occured");
    }

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
  return (
    <SafeAreaView style={{ backgroundColor: "#FBFBFD" }}>
      <KeyboardAwareScrollView>
        <Header
          pageToGoBackTo={"MyCart"}
          title="Checkout"
          navigation={navigation}
        />

        <View className="bg-white m-5 p-5">
          <View className="flex-row justify-between">
            <Text className="font-bold">Shipping Info</Text>
            <TouchableOpacity onPress={() => setEditing(!editing)}>
              <PencilIcon size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between mt-5">
            <Text className="text-gray-500">Name</Text>
            {editing ? (
              <Text>{fullName}</Text>
            ) : (
              <TextInput
                placeholder="Enter Full Name"
                onChangeText={(e) => setFullName(e)}
                value={fullName}
              />
            )}
          </View>

          <View className="flex-row justify-between mt-5">
            <Text className="text-gray-500">Email</Text>
            {editing ? (
              <Text>{email}</Text>
            ) : (
              <TextInput
                placeholder="Enter Email"
                onChangeText={(e) => setEmail(e)}
                value={email}
              />
            )}
          </View>
          <View className="flex-row justify-between mt-5">
            <Text className="text-gray-500">Phone</Text>
            {editing ? (
              <Text>{phoneNumber}</Text>
            ) : (
              <TextInput
                placeholder="Enter Phone"
                onChangeText={(e) => setPhoneNumber(e)}
                value={phoneNumber}
              />
            )}
          </View>
          <View className="flex-row justify-between mt-5">
            <Text className="text-gray-500">Address</Text>
            {editing ? (
              <Text>{address}</Text>
            ) : (
              <TextInput
                placeholder="Enter Address"
                onChangeText={(e) => setAddress(e)}
                value={address}
              />
            )}
          </View>
        </View>

        <View className="p-5">
          <View className="flex-row justify-between ">
            <Text className="text-gray-500">Delivery Fee</Text>
            <Text>£4</Text>
          </View>

          <View className="flex-row justify-between mt-5">
            <Text className="text-gray-500">Total</Text>
            <Text className="font-bold text-xl">
              {totalPrice + deliveryFee}
            </Text>
          </View>
        </View>
        <View>
          <Payment
            email={email}
            fullName={fullName}
            cardDetails={cardDetails}
            address={address}
            totalPrice={totalPrice + deliveryFee}
            cartItems={cartItems}
            phoneNumber={phoneNumber}
          />
        </View>
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
