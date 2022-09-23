import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import CheckBox from "@react-native-community/checkbox";

import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
  ThumbDownIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { DATA } from "../../BottomTabs/Explore";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db, getData } from "../../../external/Firebase";
import Header from "../../Components/Header/Header";
import { AntDesign } from "react-native-vector-icons";

import { WooCommerce } from "../../../external/WoocommerceAPI";

import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  cartItems,
  selectCartItems,
} from "../../../features/cartSlice";
import ProductListing from "../../Components/SingleProduct/ProductListing";

import AddToCartButton from "../../Components/SingleProduct/AddToCartButton";
import DoubleClick from "react-native-double-tap";
import SizeContainer from "../../Components/SingleProduct/SizeContainer";
import SizeBox from "../../Components/SingleProduct/SizeBox";
import { SERVER_URL } from "../../../external/API";

const SingleProduct = ({ navigation, route }) => {
  const { productID, productName } = route.params;
  const [size, setSize] = useState("");
  const [favourite, setFavourite] = useState(false);

  const [userID, setUserID] = useState("");
  const [item, setItem] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchInfo();

    return () => {};
  }, []);

  const fetchInfo = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        fetch(SERVER_URL + "getProducts")
          .then((data) => data.json())
          .then((res) => {
            for (let index = 0; index < res.Products.length; index++) {
              if (res.Products[index].id === productID) {
                // setItem(res.Products[index]);
                setItem(res.Products[index]);
                // setItem(res.Products[index]);
              }
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const addToCart = (data) => {
    // dispatch(
    //   addToBasket({
    //     id: data.id,
    //     name: data.name,
    //     image: images,
    //     favourite: favourite,
    //     size: size,
    //     quantity: 1,
    //     price: data.price,
    //   })

    dispatch(
      addToBasket({
        id: data.id,
        name: data.name,
        image: data.image,
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
      <View className="bg-gray-300">
        <View>
          <DoubleClick
            singleTap={() => {
              console.log("single tap");
            }}
            doubleTap={() => {}}
            delay={200}
          >
            <TouchableOpacity>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{
                  width: Dimensions.get("screen").width,
                  resizeMode: "contain",
                  height: Dimensions.get("screen").height / 2.1,
                }}
              />
            </TouchableOpacity>
          </DoubleClick>
        </View>
        <ProductListing data={item} />
        <SizeContainer>
          <TouchableOpacity onPress={() => setSize("XS")}>
            {size === "XS" ? (
              <SizeBox size="XS" selected={true} />
            ) : (
              <SizeBox size="XS" selected={false} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSize("S")}>
            {size === "S" ? (
              <SizeBox size="S" selected={true} />
            ) : (
              <SizeBox size="S" selected={false} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSize("M")}>
            {size === "M" ? (
              <SizeBox size="M" selected={true} />
            ) : (
              <SizeBox size="M" selected={false} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSize("L")}>
            {size === "L" ? (
              <SizeBox size="L" selected={true} />
            ) : (
              <SizeBox size="L" selected={false} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSize("XL")}>
            {size === "XL" ? (
              <SizeBox size="XL" selected={true} />
            ) : (
              <SizeBox size="XL" selected={false} />
            )}
          </TouchableOpacity>
        </SizeContainer>
        <View>
          <AddToCartButton onPress={() => addToCart(item)} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingleProduct;
