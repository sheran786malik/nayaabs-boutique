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
import {
  CardField,
  StripeProvider,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import React, { Component, useState, useEffect } from "react";
import { WooCommerce } from "../../../database/WoocommerceAPI";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../database/Firebase";

export const Payment = ({
  fullName,
  address,
  email,
  cartItems,
  totalPrice,
  phoneNumber,
}) => {
  // const [fullName, setFullName] = useState(fullName)
  // const [address, setAddress] = useState(address)
  // const [email, setEmail] = useState(email)
  const navigation = useNavigation();

  const [cardDetails, setCardDetails] = useState(cardDetails);
  const { confirmPayment, loading } = useConfirmPayment();
  const [userID, setUserID] = useState("");

  const getSignedInUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return user.uid;
      } else {
        return "Guest";
      }
    });
  };

  // const [totalPrice, setTotalPrice] = useState(totalPrice)

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      "http://192.168.0.48:3000/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { totalPrice: totalPrice },
      }
    );
    const { clientSecret, error } = await response.json();

    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    // console.log(cardDetails)
    if (!cardDetails?.complete || !email) {
      alert("Please enter complete card details");
      return;
    }
    const billingDetails = {
      email: email,
    };

    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
          paymentMethodType: "Card",
        });
        if (error) {
          alert(`Payment Confirmation Error: ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment Successful", paymentIntent.id);
          console.log(cartItems, "have been purchased");

          postToWoocommerce();
          sendToDb();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const postToWoocommerce = () => {
    let name = fullName.split(" ");
    let line_items = [];
    for (let index = 0; index < cartItems.length; index++) {
      line_items = [
        {
          product_id: cartItems[index].id,
          quantity: cartItems[index].quantity,
        },
      ];
    }

    const data = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      billing: {
        first_name: name[0],
        last_name: name[1],
        address_1: address,
        // city: "San Francisco",
        // state: "CA",
        // postcode: "94103",
        country: "UK",
        email: email,
        phone: phoneNumber,
      },
      shipping: {
        first_name: name[0],
        last_name: name[1],
        address_1: address,
        // address_2: "",
        // city: "San Francisco",
        // state: "CA",
        // postcode: "94103",
        country: "UK",
      },
      line_items: line_items,
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: "3.95",
        },
      ],
    };

    WooCommerce.post("orders", data).then((response) => {
      if (response) {
        return true;
      }
      return false;
    });
  };

  const sendToDb = async () => {
    const randomNumber = Math.floor(Math.random() * 100);
    console.log("order has gone to wp");

    await db
      .collection("users")
      // .doc(userID)
      .doc(getSignedInUser())
      .collection("orders")
      .doc(randomNumber.toString())
      .set({
        cartItems: cartItems,
      })
      .then((data) => {
        console.log("order has gone to database");
        navigation.navigate(
          "Home",
          { screen: "OrderConfirm" },
          {
            fullName: fullName,
            address: address,
            totalPrice: totalPrice,
            cartItems: cartItems,
            phoneNumber: phoneNumber,
          }
        );
        return true;
      })
      .catch((error) => console.log(error));
  };
  return (
    <View>
      <StripeProvider publishableKey="pk_test_zwFUyFfgNCxmXH5iRevmvVPM">
        <CardField
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{ backgroundColor: "#efefef" }}
          style={{ height: 50 }}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
      </StripeProvider>

      <TouchableOpacity
        onPress={() => handlePayPress()}
        className="bg-black p-5 w-80 self-center rounded-3xl mt-5"
      >
        <Text
          className="text-center"
          style={{ color: "white", fontWeight: "600" }}
        >
          Pay
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
