import {
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA } from "../../BottomTabs/Explore";
import {
  BellIcon,
  TrashIcon,
  ChevronLeftIcon,
  HeartIcon,
  PlusIcon,
  MinusIcon,
  ThumbDownIcon,
  ShoppingCartIcon,
  EyeIcon,
} from "react-native-heroicons/outline";
import Header from "../../Components/Header/Header";
import {
  addToBasket,
  increaseQuantityOfItem,
  decreaseQuantityOfItem,
  cartItems,
  removeFromBasket,
  selectCartItems,
  selectCartItemsItemsWithID,
  selectCartTotal,
} from "../../../features/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../external/Firebase";

const MyCart = () => {
  const items = useSelector(selectCartItems);
  const [cartItems, setCartItems] = useState([]);
  const total = useSelector(selectCartTotal);
  const [product, setProduct] = useState("");
  const [itemsExist, setItemsExist] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    // retrieveData();

    setCartItems(items);
    if (items) {
      setItemsExist(true);
      // getTotal(items);
    }
  }, []);
  // const retrieveData = async () => {

  //   setCartItems(items)
  //   setItemsExist(true)

  //   if (items == null || items.length < 3) {
  //     setCartItems(JSON.parse(items))
  //     setItemsExist(false)

  //   } else {
  //     setCartItems(JSON.parse(items))
  //     setItemsExist(true)

  //     getTotal(items)
  //   }
  //   console.log(cartItems, 'cartitems')

  // };

  const increaseQuantity = (data) => {
    //get the current list
    //point to quantity
    //increase the increment whenever this method is called
    //lets try
    dispatch(increaseQuantityOfItem(data));
    // let existingList = cartItems;
    // const index = cartItems.findIndex(data => data.id === id)
    // existingList[index].quantity++;
    // AsyncStorage.setItem('cartItems', JSON.stringify(existingList))
    // retrieveData()
    // getTotal(items);
  };

  const lessenQuantity = (data) => {
    //get the current list
    //point to quantity
    //increase the increment whenever this method is called
    //lets try
    // let existingList = cartItems;
    // const index = cartItems.findIndex(data => data.id === id)
    // if (existingList[index].quantity > 1) {
    //   existingList[index].quantity--;
    //   AsyncStorage.setItem('cartItems', JSON.stringify(existingList))
    //   retrieveData()
    // } else if (existingList[index].quantity == 0) {
    //   existingList[index].quantity--;
    //   removeItem(id)
    // }
    dispatch(decreaseQuantityOfItem(data));
    // getTotal(items);
  };
  const removeItem = (data) => {
    dispatch(removeFromBasket(data));
  };

  // const getTotal = (productData) => {
  //   //subtotal is the price * the quantity of all the products involved
  //   //lets try
  //   setTotal(
  //     productData.reduce(
  //       (accumulator, current) =>
  //         accumulator + current.price * current.quantity,
  //       0
  //     )
  //   );
  // };
  const moveToCheckout = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Checkout-logged-in");
      } else {
        navigation.navigate("Checkout-login");
      }
    });
  };
  const renderItem = ({ item }) => (
    <View className="bg-grey m-2 rounded-md">
      {/* <Item id={item.id} name={item.title} favourite={item.favourite} size={item.size} quantity={item.quantity} image={item.image} price={item.price} /> */}
      <SafeAreaView>
        <View
          className="rounded-3xl justify-evenly flex-row"
          style={{ backgroundColor: "#fff" }}
        >
          <View>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                margin: 8,
              }}
            />
          </View>

          <View className="flex-col justify-evenly">
            <Text
              className="w-52"
              style={{ fontSize: 14, color: "black", opacity: 0.5 }}
            >
              {item.name}
            </Text>

            <Text style={{}} className="font-bold">
              {item.price}
            </Text>
            <Text style={{}} className="font-bold">
              {item.size}
            </Text>
            <View className="flex-end">
              <TouchableOpacity onPress={() => removeItem(item)}>
                <TrashIcon size={30} color="grey" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row self-center justify-center pr-5">
            <TouchableOpacity
              onPress={() => increaseQuantity(item)}
              className="rounded-xl p-2 self-center"
              style={{ backgroundColor: "lightgrey" }}
            >
              <PlusIcon className="self-center" size={10} color={"black"} />
            </TouchableOpacity>
            <Text className="p-2" style={{ fontSize: 14 }}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => lessenQuantity(item)}
              className="rounded-xl p-2 self-center"
              style={{ backgroundColor: "lightgrey" }}
            >
              <MinusIcon size={10} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );

  if (itemsExist == true) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#FBFBFD",
          flex: 1,
        }}
      >
        <Header
          title="My Cart"
          navigation={navigation}
          pageToGoBackTo={"Explore"}
        />

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={false}
        />

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
            }}
          >
            Subtotal :
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            £{parseInt(total).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          disabled={!itemsExist}
          className="bg-black p-5 w-80 self-center rounded-3xl mt-5"
          // disabled={true}
          onPress={() => moveToCheckout()}
        >
          <Text
            className="text-center"
            style={{ color: "white", fontWeight: "600" }}
          >
            Checkout
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (itemsExist == false) {
    return (
      <SafeAreaView className="flex-1">
        <Header pageToGoBackTo={"Product"} title="My Cart" />

        <View className="top-1/2 self-center">
          <Text className="font-bold" style={{ fontSize: 25 }}>
            Sorry, your cart is empty
          </Text>

          <TouchableOpacity
            disabled={itemsExist}
            className="bg-black p-5 m-3 rounded-xl"
            onPress={() => navigation.navigate("AllProducts")}
          >
            <Text className="text-center" style={{ color: "white" }}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default MyCart;
