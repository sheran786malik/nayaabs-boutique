import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import CheckBox from "react-native-check-box";
import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
  ThumbDownIcon,
  PencilIcon,
} from "react-native-heroicons/outline";
import { PaymentIcon } from "react-native-payment-icons";
import Header from "../Components/Header/Header";
import { auth, db } from "../../external/Firebase";
import {
  CardField,
  StripeProvider,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { WooCommerce } from "../../external/WoocommerceAPI";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwipeButton from "rn-swipe-button";
import { Payment } from "../Components/Payment/Payment";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../features/cartSlice";
import { TextInput } from "react-native-gesture-handler";

const CheckoutLoggedIn = () => {
  const [homeIsChecked, setHomeIsChecked] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(4);

  const [userData, setUserData] = useState([]);
  const totalPrice = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  const [address, setAddress] = useState("");

  const [editing, setEditing] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getInformation();
    return () => {};
  }, []);

  const getInformation = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((data) => {
            console.log(data.data());
            setUserData({
              fullName: data.data().fullName,
              emailAddress: data.data().emailAddress,
              phoneNo: data.data().phoneNo,
              address: data.data().address,
            });
          })
          .catch((error) => {
            // setFullName("an error has occured"),
            //   setAddress("an error has occured"),
            //   setPhoneNumber("an error has occured"),
            //   setEmail("an error has occured"),
            console.log(error, "no data has come");
          });
      } else {
        navigation.navigate("Checkout-login");
      }
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
          <View className="">
            <View className="flex flex-row justify-between w-52">
              <Text style={{ fontSize: 16 }}>Home</Text>
              <TouchableOpacity onPress={() => setEditing(!editing)}>
                <PencilIcon size={"20"} color="black" />
              </TouchableOpacity>
            </View>
            {editing === false ? (
              <Text style={{ fontSize: 12, color: "lightgrey" }}>
                {userData ? userData.address : "An error has occured"}
              </Text>
            ) : (
              <TextInput
                placeholder="Enter address"
                value={address}
                onChangeText={(e) => setAddress(e)}
              />
            )}
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
              £{deliveryFee}
            </Text>
            {/* <Text>{this.props.navigation.getParam('total')}</Text> */}
            <Text style={{ fontSize: 14, color: "lightgrey" }}>
              £{totalPrice}
            </Text>
            <Text style={{ fontSize: 14, color: "lightgrey" }}>
              £{totalPrice + deliveryFee}
            </Text>
            {/* <Text style={{ fontSize: 14, color: "lightgrey" }}>
              {homeIsChecked ? setDeliveryFee(3.95) : setDeliveryFee(0)}
            </Text> */}
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

          {userData ? (
            <Payment
              email={userData.emailAddress}
              fullName={userData.fullName}
              address={userData.address}
              totalPrice={totalPrice + deliveryFee}
              cartItems={cartItems}
              phoneNumber={userData.phoneNo}
              delivery={homeIsChecked ? true : false}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default CheckoutLoggedIn;
