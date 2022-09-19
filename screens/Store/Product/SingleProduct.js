import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import CheckBox from "@react-native-community/checkbox";

import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
  ThumbDownIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { DATA } from "../../BottomTabs/Explore";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db, getData } from "../../../database/Firebase";
import Header from "../../Components/Header/Header";
import { AntDesign } from "react-native-vector-icons";

import { WooCommerce } from "../../../database/WoocommerceAPI";

import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  cartItems,
  selectCartItems,
} from "../../../features/cartSlice";

const SingleProduct = ({ navigation, route }) => {
  const { productID, productName } = route.params;
  const [item, setItem] = useState([]);
  const [size, setSize] = useState("");
  const [favourite, setFavourite] = useState(false);

  const [userID, setUserID] = useState("");

  const items = useSelector(selectCartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchInfo();
    getSignedInUser();
  }, []);

  const fetchInfo = () => {
    WooCommerce.get("products", { per_page: 25 }).then((data) => {
      for (let index = 0; index < data.length; index++) {
        if (data[index].id === productID) {
          setItem(data[index]);
        }
      }
    });
  };

  const getSignedInUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      }
    });
  };

  const addToCart = (data) => {
    // let images = data.images[0].src

    dispatch(
      addToBasket({
        id: data.id,
        name: data.name,
        image: data.images[0].src,
        favourite: favourite,
        size: size,
        quantity: 1,
        price: data.price,
      })
    );
    navigation.navigate("MyCart");
  };

  // const addToCart = async (data) => {

  //     let itemArray = await AsyncStorage.getItem('cartItems')
  //     itemArray = JSON.parse(itemArray)

  //     if (itemArray === null || itemArray.length === 0) {

  //         let cartItems = [];
  //         cartItems.push({
  //             id: data.id,
  //             quantity: 1,
  //             image: data.images[0].src,
  //             title: data.name,
  //             size: size,
  //             price: data.price,
  //             favourite: data.favourite,
  //         })

  //         try {
  //             await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  //             alert(
  //                 'Item Added Successfully to cart'
  //             );
  //             navigation.navigate('MyCart');
  //         } catch (error) {
  //             return error;
  //         }
  //     } else {
  //         const place = itemArray.findIndex(res => res.id = data.id)

  //         let cartItems = itemArray
  //         cartItems[place].quantity += 1;

  //         try {
  //             await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  //             alert(
  //                 'Item Added Successfully to cart'
  //             );
  //             navigation.navigate('MyCart');
  //         } catch (error) {
  //             return error;
  //         }
  //     }
  // }

  const addToFavourites = (item) => {
    const randomNumber = Math.floor(Math.random()).toString();
    db.collection("users")
      .doc(userID)
      .collection("wishlist")
      .doc(item.name)
      .set({
        name: item.name,
        image: item.image,
        price: item.price,
      })
      .then(console.log("added"));
  };

  const deleteFromFavourites = (item) => {
    db.collection("users")
      .doc(userID)
      .collection("wishlist")
      .doc(item.name)
      .delete()
      .then(console.log("deleted"));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        pageToGoBackTo={"Explore"}
        navigation={navigation}
        title="Product Details"
      />
      {favourite === true ? (
        <TouchableOpacity onPress={() => addToFavourites(item)}>
          <AntDesign
            style={{
              zIndex: 999,
              position: "absolute",
              right: 10,
              top: 10,
            }}
            name="heart"
            size={40}
            color="white"
          />
        </TouchableOpacity>
      ) : null}
      {favourite === false ? (
        <TouchableOpacity onPress={() => deleteFromFavourites(item)}>
          <AntDesign
            style={{
              zIndex: 999,
              position: "absolute",
              right: 10,
              top: 10,
            }}
            name="heart"
            size={40}
            color="white"
          />
        </TouchableOpacity>
      ) : null}

      <View
        style={{
          backgroundColor: "white",
          borderTopRightRadius: 45,
          borderTopLeftRadius: 45,
        }}
      >
        <View className="flex-row justify-between p-2 w-80">
          <Text className="w-52" style={{ fontWeight: "500", fontSize: 20 }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{item.price}</Text>
        </View>
        <Text className="pl-5 pb-1" style={{ color: "grey" }}>
          Size
        </Text>
        <View
          className="pl-5 flex-row w-42 mr-5"
          style={{ backgroundColor: "white" }}
        >
          <TouchableOpacity onPress={() => setSize("XS")}>
            <View
              className="p-2 mr-2"
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: size == "XS" ? "black" : "white",
              }}
            >
              <Text
                className="text-center"
                style={{ color: size == "XS" ? "white" : "black" }}
              >
                XS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSize("S")}>
            <View
              className="p-2 mr-2"
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: size == "S" ? "black" : "white",
              }}
            >
              <Text
                className="text-center"
                style={{ color: size == "S" ? "white" : "black" }}
              >
                S
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSize("M")}>
            <View
              className="p-2 mr-2"
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: size == "M" ? "black" : "white",
              }}
            >
              <Text
                className="text-center"
                style={{ color: size == "M" ? "white" : "black" }}
              >
                M
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSize("L")}>
            <View
              className="p-2 mr-2"
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: size == "L" ? "black" : "white",
              }}
            >
              <Text
                className="text-center"
                style={{ color: size == "L" ? "white" : "black" }}
              >
                L
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSize("XL")}>
            <View
              className="p-2 mr-2"
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: size == "XL" ? "black" : "white",
              }}
            >
              <Text
                className="text-center"
                style={{ color: size == "XL" ? "white" : "black" }}
              >
                XL
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => addToCart(item)}
          className="bg-black p-5 m-10 w-60 self-center rounded-2xl"
          style={{
            backgroundColor: "black",
          }}
        >
          <Text className="text-center" style={{ color: "white" }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SingleProduct;
