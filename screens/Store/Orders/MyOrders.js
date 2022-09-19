import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { Component, useState, useEffect } from "react";

import { MaterialCommunityIcons } from "react-native-vector-icons";
import Header from "../../Components/Header/Header";
import NoOrders from "../../Components/Profile/NoOrders";
import { auth, db } from "../../../database/Firebase";
import { useNavigation } from "@react-navigation/native";

import Swipeout from "react-native-swipeout";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [ordersExist, setOrdersExist] = useState(false);

  // state = {
  //   orders: null,
  //   ordersExist: false,
  // };
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .collection("orders")
          .get()
          .then((snapshot) => {
            let orders = [];
            snapshot.forEach((data) => {
              orders.push(data.data());
            });
            setOrders(orders[0].cartItems);
          });
        setOrdersExist(true);
      }
    });
  };

  const renderItem = ({ item }) => {
    let swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          alert("To cancel order, please call our store");
        },
      },
    ];
    return (
      <Swipeout right={swipeoutBtns} style={{ backgroundColor: "white" }}>
        <View>
          <View className="flex-row">
            <Image
              source={{ uri: item.image }}
              style={{
                resizeMode: "contain",
                width: 150,
                height: 150,
                marginBottom: 10,
              }}
            />
            <View className="flex-col justify-evenly mb-5">
              <Text
                className="w-52"
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  color: "black",
                  opacity: 0.5,
                }}
              >
                {item.name}
              </Text>
              <View className="flex-row">
                <Text
                  className="pr-3 self-center"
                  style={{ fontWeight: "500", fontSize: 13, color: "grey" }}
                >
                  Qty{item.quantity}
                </Text>
                <Text style={{ fontWeight: "200", fontSize: 13 }}>
                  {item.size}
                </Text>
              </View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                {item.price}
              </Text>
            </View>
            <View className="self-center">
              {/* <Text
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  color: "black",
                  opacity: 0.5,
                }}
              >
                {item.expDelivery}
              </Text> */}
            </View>
          </View>
        </View>
      </Swipeout>
    );
  };

  if (!ordersExist) {
    return (
      <SafeAreaView className="bg-white">
        <Header
          title={"Profile"}
          pageToGoBackTo="Profile"
          navigation={navigation}
        />
        <NoOrders navigation={navigation} />
      </SafeAreaView>
    );
  } else if (ordersExist) {
    return (
      <SafeAreaView>
        <View className="bg-white">
          <Header
            navigation={navigation}
            pageToGoBackTo="Profile"
            title={"My Orders"}
          />

          <FlatList
            data={orders}
            renderItem={renderItem}
            key={(data) => data.id}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default MyOrders;
