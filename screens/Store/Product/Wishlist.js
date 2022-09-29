import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import {
  AdjustmentsIcon,
  SearchIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from "react-native-heroicons/outline";

import { DATA } from "../../BottomTabs/Explore";

import { AntDesign } from "react-native-vector-icons";
import Header from "../../Components/Header/Header";
import { auth, db } from "../../../external/Firebase";

import { useNavigation } from "@react-navigation/native";

import Card from "../../Components/Explore/Card";
import AddToCartButton from "../../Components/SingleProduct/AddToCartButton";

import { useDispatch } from "react-redux";
import { addToBasket } from "../../../features/cartSlice";
import { SERVER_URL } from "../../../external/API";

const Wishlist = () => {
  const [Data, setData] = useState([]);
  const [userID, setUserID] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchInfo();
    return () => {};
  }, []);

  const fetchInfo = async () => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setUserID(null);
        setData("Please Log In");
      } else {
        setUserID(user.uid);
        db.collection("users")
          .doc(user.uid)
          .collection("products")
          .doc("0")
          .get()
          .then((data) => {
            setData(data.data().productDetails.Products);
          });
      }
    });
  };

  const renderAllProducts = ({ item }) => {
    return (
      <View>
        {item.favourite ? (
          <Card>
            <View className="flex flex-col ">
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, border: 1 }}
                className="self-center"
              />

              <Text className="text-center">{item.name}</Text>
              <Text className="text-center">{item.description}</Text>
              <Text className="text-center font-bold mt-3"> £{item.price}</Text>
              <TouchableOpacity>
                <AddToCartButton
                  onPress={() =>
                    dispatch(
                      addToBasket({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        quantity: 1,
                        favourite: item.favourite,
                      })
                    )
                  }
                />
              </TouchableOpacity>
            </View>
          </Card>
        ) : null}
      </View>
    );
  };
  console.log(Data);
  return (
    <SafeAreaView style={{ backgroundColor: "#FBFBFD", flex: 1 }}>
      <Header
        navigation={navigation}
        title="My Wishlist"
        pageToGoBackTo={"Explore"}
      />
      {userID ? (
        <View>
          <FlatList
            data={Data}
            numColumns={2}
            renderItem={renderAllProducts}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View>
          <View className="justify-center items-center align-middle h-5/6">
            <Text
              className="self-center "
              style={{
                fontSize: 24,
                fontWeight: "500",
              }}
            >
              Join Us
            </Text>
            <Text
              className="self-center p-2"
              style={{
                color: "grey",
                fontSize: 12,
              }}
            >
              To see your wishlist
            </Text>

            <View>
              <TouchableOpacity
                className="bg-black mt-10 p-5 w-52 self-center rounded-3xl"
                onPress={() => navigation.navigate("LoggedOut", {}, "Login")}
              >
                <Text
                  className="text-center"
                  style={{ color: "white", fontWeight: "600" }}
                >
                  Log In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-black p-5 w-52  mt-5 self-center rounded-3xl"
                onPress={() => navigation.navigate("LoggedOut", {}, "Register")}
              >
                <Text
                  className="text-center"
                  style={{ color: "white", fontWeight: "600" }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  close: {
    margin: 5,
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
  },
});
