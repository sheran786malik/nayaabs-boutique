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
  const [size, setSize] = useState("");
  const [favourite, setFavourite] = useState(false);

  const [userID, setUserID] = useState(false);
  const [item, setItem] = useState([]);

  const [itemsAvailable, setItemsAvailable] = useState(false);

  const dispatch = useDispatch();

  const {
    productName,
    productImage,
    productDescription,
    productID,
    productPrice,
    productCategory,
  } = route.params;

  useEffect(() => {
    fetchInfo();

    return () => {};
  }, []);

  // const fetchInfo = () => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUserID(user.uid);
  //     } else {
  //       fetch(SERVER_URL + "getProducts")
  //         .then((data) => data.json())
  //         .then((res) => {
  //           setItemsAvailable(true);
  //           for (let index = 0; index < res.Products.length; index++) {
  //             if (res.Products[index].id === productID) {
  //               // setItem(res.Products[index]);
  //               setItem(res.Products[index]);

  //               // setItem(res.Products[index]);
  //             }
  //           }
  //         })
  //         .catch((error) => console.log(error));
  //     }
  //   });
  // };

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
        id: productID,
        name: productName,
        image: productImage,
        size: size,
        quantity: 1,
        price: productPrice,
      })
    );

    navigation.navigate("MyCart");
  };

  const fetchInfo = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(true);
      } else {
        setUserID(false);
      }
    });
    let product = [];

    setItemsAvailable(true);
  };

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
      <ScrollView>
        <Header
          pageToGoBackTo={"Explore"}
          navigation={navigation}
          title={productName}
        />
        {itemsAvailable ? (
          <View>
            <TouchableOpacity>
              <Image
                source={{
                  uri: productImage,
                }}
                style={{
                  width: Dimensions.get("screen").width,
                  resizeMode: "repeat",
                  height: Dimensions.get("screen").height / 3,
                }}
              />
            </TouchableOpacity>

            <ProductListing
              name={productName}
              price={productPrice}
              description={productDescription}
            />

            {productCategory === "Ready to Wear" ? (
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
            ) : null}

            <AddToCartButton
              disabled={size.length === 0 ? true : false}
              onPress={() => addToCart(item)}
            />
          </View>
        ) : (
          <View className="justify-center">
            <ActivityIndicator size={"large"} color="black" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleProduct;
