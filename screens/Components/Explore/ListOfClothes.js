import {
  Dimensions,
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { AntDesign } from "react-native-vector-icons";

import { useNavigation } from "@react-navigation/native";
import { db } from "../../../external/Firebase";
import AddToCartButton from "../SingleProduct/AddToCartButton";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../../features/cartSlice";
import { WooCommerce } from "../../../external/WoocommerceAPI";
import { addToStock, showStock } from "../../../features/stockSlice";

const ListOfClothes = ({ selected }) => {
  const navigation = useNavigation();

  const [info, setInfo] = useState("");
  // const info = useSelector(showStock);

  const [unstitchedList, setUnstitchedList] = useState([]);
  const [stitchedList, setStitchedList] = useState([]);
  const [itemsAvailable, setItemsAvailable] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getInfo();

    return () => {};
  }, []);

  const getInfo = () => {
    WooCommerce.get("products", { per_page: 30 })
      .then((data) => {
        let productList = [];
        data.map((data) => {
          productList.push({
            id: data.id,
            name: data.name,
            image: data.images[0].src,
            price: data.price,
            category: data.categories[0].name,
            description: data.description,
          });
          // setUserID(null);
        });
        // dispatch(addToStock(productList));
        setInfo(productList);
        filterData(productList);
        setItemsAvailable(true);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const filterData = (information) => {
    let stitchedList = [];
    let unstitchedList = [];
    if (information !== null || information.length !== 0) {
      information.map((data) => {
        if (data.category === "Ready to Wear") {
          stitchedList.push(data);
        } else if (data.category === "Unstitched") {
          unstitchedList.push(data);
        }
      });
    }
    setStitchedList(stitchedList);
    setUnstitchedList(unstitchedList);
  };

  const renderAllProducts = ({ item }) => {
    return (
      <Card>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Product", {
              productID: item.id,
              productName: item.name,
              productImage: item.image,
              productDescription: item.description,
              productCategory: item.category,
              productPrice: item.price,
            })
          }
        >
          <Image
            className="self-center"
            source={{ uri: item.image }}
            style={{
              width: 150,
              height: 200,
              resizeMode: "cover",
            }}
          />

          <View className="flex-col bg-dark p-3">
            <Text className="font-bold pt-3">£{item.price}</Text>
            <Text className="pt-3" style={{ color: "grey", fontSize: 11 }}>
              {item.name}
            </Text>
          </View>
          {item.category === "Unstitched" ? (
            <TouchableOpacity
              className="bg-black p-3 self-center rounded-xl"
              onPress={() =>
                dispatch(
                  addToBasket({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    quantity: 1,
                    price: item.price,
                  })
                )
              }
              style={{
                width: 150,
              }}
            >
              <Text className="text-white text-center font-bold  ">
                Add to Cart
              </Text>
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>

        {/* {user !== null ? (
          <TouchableOpacity
            className="bg-white p-2 border"
            onPress={() => {
              item.favourite ? dislikeMethod(item) : likeMethod(item);
            }}
          >
            <Text className="text-black text-center ">
              {item.favourite === false
                ? "Add to wishlist"
                : "Delete from wishlist"}
            </Text>
          </TouchableOpacity>
        ) : null} */}
      </Card>
    );
  };

  return (
    <View>
      {itemsAvailable ? (
        <FlatList
          data={selected === "Stitched" ? stitchedList : unstitchedList}
          renderItem={renderAllProducts}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      ) : (
        <ActivityIndicator size={"large"} color="black" />
      )}
    </View>
  );
};

export default ListOfClothes;
