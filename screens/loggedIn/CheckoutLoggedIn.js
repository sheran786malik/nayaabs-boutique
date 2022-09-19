import { SafeAreaView, TouchableOpacity, Text, View } from "react-native";
import React, { Component, useState, useEffect } from "react";
import CheckBox from "react-native-check-box";
import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
  ThumbDownIcon,
} from "react-native-heroicons/outline";
import { PaymentIcon } from "react-native-payment-icons";
import Header from "../Components/Header/Header";
import { auth, db } from "../../database/Firebase";
import {
  CardField,
  StripeProvider,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { WooCommerce } from "../../database/WoocommerceAPI";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwipeButton from "rn-swipe-button";
import { Payment } from "../Components/Payment/Payment";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../features/cartSlice";

const CheckoutLoggedIn = () => {
  const [homeIsChecked, setHomeIsChecked] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(parseInt(3.95));
  const [userID, setUserID] = useState("");
  const [price, setPrice] = useState(useSelector(selectCartTotal));

  const [userData, setUserData] = useState([]);
  const [fullName, setFullName] = useState("an error has occured");
  const [address, setAddress] = useState("an error has occured");
  const [email, setEmail] = useState("an error has occured");
  const [phoneNumber, setPhoneNumber] = useState("an error has occured");
  const [cartItems, setCartItems] = useState(useSelector(selectCartItems));

  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      getData();
      getInformation();
    };
  }, []);

  const getData = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      }
      navigation.navigate("Checkout-login");
    });
  };

  const getInformation = () => {
    db.collection("users")
      .doc(userID)
      .get()
      .then((data) => {
        setUserData(data.data());
      })
      .catch((error) => {
        // setFullName("an error has occured"),
        //   setAddress("an error has occured"),
        //   setPhoneNumber("an error has occured"),
        //   setEmail("an error has occured"),
        console.log(error, "no data has come");
      });
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <View className="bg-white">
          <Header
            title="Checkout"
            navigation={navigation}
            pageToGoBackTo={"MyCart"}
          />
        </View>

        <Text
          className="font-bold p-5"
          style={{ fontSize: 20, fontWeight: "500" }}
        >
          Delivery address
        </Text>

        <View className="flex-row bg-white p-4 w-80 self-center rounded-xl">
          {/* <RoundedCheckbox
                        style={{ padding: 10, boxShadow: 5 }}
                        isChecked={this.state.homeIsChecked}
                        onPress={(checked) => this.setState({
                            homeIsChecked: !this.state.homeIsChecked
                        })} /> */}
          <CheckBox
            style={{ padding: 10, borderRadius: 20 }}
            onClick={() => {
              setHomeIsChecked(!homeIsChecked);
            }}
            isChecked={homeIsChecked}
          />
          <View className="self-center">
            <Text style={{ fontSize: 16 }}>Home</Text>
            <Text style={{ fontSize: 12, color: "lightgrey" }}>
              {userData.address}
            </Text>
          </View>
        </View>

        {/* <CheckBox
                        style={{ flex: 1, padding: 10, }}
                        onClick={() => {
                            this.setState({
                                officeIsChecked: !this.state. officeIsChecked
                            })
                        }}
                        isChecked={this.state. officeIsChecked}

                        className='self-start'
                    /> */}

        <Text
          className="font-bold p-5"
          style={{ fontSize: 20, fontWeight: "500" }}
        >
          Billing Information
        </Text>

        <View className="flex-row bg-white m-3 rounded-xl justify-around">
          <View className="flex-col p-4 ">
            <Text style={{ color: "black" }} className="">
              Delivery Fee
            </Text>
            <Text style={{ color: "black" }}>Subtotal</Text>
            <Text style={{ color: "black" }}>Total</Text>
          </View>
          <View className="flex-col p-4">
            <Text style={{ fontSize: 14, color: "lightgrey" }}>
              {homeIsChecked ? deliveryFee : "FREE"}
            </Text>
            {/* <Text>{this.props.navigation.getParam('total')}</Text> */}
            <Text style={{ fontSize: 14, color: "lightgrey" }}>
              {useSelector(selectCartTotal)}
            </Text>
            <Text style={{ fontSize: 14, color: "lightgrey" }}>
              {homeIsChecked ? parseInt(price) + deliveryFee : parseInt(price)}
            </Text>
          </View>
        </View>
        <View>
          <Text
            className="font p-5"
            style={{ fontSize: 20, fontWeight: "500" }}
          >
            Payment Method
          </Text>
          <View className="p-4 flex-row">
            <PaymentIcon type="visa" width={100} className="bg-white mr-2" />
            <PaymentIcon type="master" width={100} />
          </View>

          <Payment
            email={userData.emailAddress}
            fullName={userData.fullName}
            address={userData.address}
            totalPrice={useSelector(selectCartTotal)}
            cartItems={cartItems}
            phoneNumber={userData.phoneNo}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CheckoutLoggedIn;
