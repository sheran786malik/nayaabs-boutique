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
import { auth, db } from "../../../external/Firebase";
import { useNavigation } from "@react-navigation/native";

import Swipeout from "react-native-swipeout";
import { WooCommerce } from "../../../external/WoocommerceAPI";

import Card from "../../Components/Explore/Card";
import { HeartIcon } from "react-native-heroicons/outline";

const MyOrders = () => {
  const [ordersExist, setOrdersExist] = useState(false);
  const [date, setDate] = useState([]);

  const [Data, setData] = useState([]);
  const [Orders, setOrders] = useState([]);

  // state = {
  //   orders: null,
  //   ordersExist: false,
  // };
  const navigation = useNavigation();

  useEffect(() => {
    getInformation();
    return () => {};
  }, []);

  const getInformation = () => {
    let myOrders = [];
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .collection("orders")
          .get()
          .then((data) => {
            data.docs.map((res) => {
              myOrders.push(res.data().cartItems[0]);
            });
            setData(myOrders);
          });
      } else {
      }
    });
  };

  const renderAllProducts = ({ item }) => {
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
      <Swipeout right={swipeoutBtns} style={{}}>
        <View className="p-5 bg-white mt-5">
          <View className="flex flex-row">
            <View className="flex flex-col">
              <Image
                source={{ uri: item.image }}
                style={{
                  resizeMode: "contain",
                  width: 100,
                  height: 100,
                  border: 1,
                }}
                className="self-center"
              />
            </View>
            <View className="flex flex-col self-center">
              <Text className="w-52">{item.name}</Text>
              <Text className="font-bold mt-3"> £{item.price}</Text>
              <Text className="font-bold mt-3"> {item.date}</Text>
            </View>

            {/* <Text className="">{item.id}</Text> */}

            {/* <Text className=" font-bold mt-3"> {item.size}</Text> */}
          </View>
        </View>
      </Swipeout>
    );
  };

  {
    return (
      <SafeAreaView>
        <Header
          navigation={navigation}
          pageToGoBackTo="Profile"
          title={"My Orders"}
        />

        <FlatList
          data={Data}
          renderItem={renderAllProducts}
          key={(data) => data.id}
        />
      </SafeAreaView>
    );
  }
};

export default MyOrders;
