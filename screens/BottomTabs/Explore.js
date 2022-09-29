import {
  ActivityIndicator,
  Dimensions,
  Button,
  FlatList,
  Platform,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useRef, useEffect, useState } from "react";
import {
  AdjustmentsIcon,
  ChevronLeftIcon,
  SearchIcon,
  BellIcon,
  DesktopComputerIcon,
} from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import SlidingUpPanel from "rn-sliding-up-panel";
import { AntDesign } from "react-native-vector-icons";
import { auth, db } from "../../external/Firebase";

import Header from "../Components/Header/Header";
import Tabs from "../Components/Explore/Tabs";
import SearchBox from "../Components/Explore/SearchBox";
import CardItem from "../Components/Explore/Card";
import Card from "../Components/Explore/Card";

import WooCommerceAPI from "react-native-woocommerce-api";
import {
  getAllProducts,
  getProducts,
  WooCommerce,
} from "../../external/WoocommerceAPI";
import ListOfClothes from "../Components/Explore/ListOfClothes";
import { SERVER_URL } from "../../external/API";
import { useNavigation } from "@react-navigation/native";

// export const DATA = [{
//     "id": 1,
//     "title": "Long Sleeve Shirts",
//     "quantity": 1,
//     "price": 165,
//     "size": "xs",
//     "image": require(`../../assets/shirt.png`),
//     "category": "Stitched",
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": true,
// }, {
//     "id": 2,
//     "title": "Hilary",
//     "quantity": 1,
//     "size": "xs",
//     "category": "Unstitched",
//     "image": require(`../../assets/shirt.png`),
//     "price": 7.64,
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": true,
// }, {
//     "id": 3,
//     "title": "Brand",
//     "quantity": 1,
//     "size": "xs",
//     "category": "Stitched",
//     "image": require(`../../assets/shirt.png`),
//     "price": 6.40,
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": true,
// }, {
//     "id": 4,
//     "title": "Marj",
//     "quantity": 1,
//     "size": "xs",
//     "category": "Unstitched",
//     "image": require(`../../assets/shirt.png`),
//     "price": 8.54,
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": false,
// }, {
//     "id": 5,
//     "title": "Delmar",
//     "quantity": 1,
//     "size": "xs",
//     "category": "Stitched",
//     "image": require(`../../assets/shirt.png`),
//     "price": 8.26,
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": false,
// }]

const Explore = () => {
  const [selected, setSelected] = useState("");
  const [stitchedList, setStitchedList] = useState([]);
  const [unstitchedList, setUnstitchedList] = useState([]);
  const [seAll, setSeeAll] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchActivated, setSearchActivated] = useState(false);
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState(false);

  const [itemsAvailable, setItemsAvailable] = useState(false);

  const [panelVisible, setPanelVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    // fetchInfo();
    getProducts();
    return () => {};
  }, []);

  // const getProducts = () => {
  //   WooCommerce.get("products", { per_page: 30 })
  //     .then((data) => {
  //       let productList = [];
  //       data.map((data) => {
  //         productList.push({
  //           id: data.id,
  //           name: data.name,
  //           image: data.images[0].src,
  //           price: data.price,
  //           category: data.categories[0].name,
  //           description: data.description,
  //         });
  //         setUserID(null);
  //         setData(productList);
  //         setItemsAvailable(true);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View className="flex-row justify-end w-100 p-4">
          <Header explore={true} navigation={navigation} />
        </View>
        <View className="flex-1">
          <Text className="font-semibold p-5" style={{ fontSize: 30 }}>
            Explore
          </Text>
          <Text className="font-400 p-5" style={{ color: "lightgray" }}>
            Best suits for you
          </Text>

          <View>
            <Tabs>
              <TouchableOpacity
                className="p-6 rounded-2xl w-36 mr-3"
                onPress={() => setSelected("Stitched")}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor: selected === "Stitched" ? "black" : "white",
                }}
              >
                <Text
                  className="text-center"
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: selected === "Stitched" ? "white" : "black",
                  }}
                >
                  Stitched
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="p-6 rounded-2xl w-36"
                onPress={() => setSelected("Unstitched")}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor:
                    selected === "Unstitched" ? "black" : "white",
                }}
              >
                <Text
                  className="text-center"
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: selected === "Unstitched" ? "white" : "black",
                  }}
                >
                  Unstitched
                </Text>
              </TouchableOpacity>
            </Tabs>

            <View className="flex-row justify-between">
              <View className="self-center">
                <Text
                  className="font-semibold self-center p-2"
                  style={{ fontSize: 20 }}
                >
                  New Arrivals
                </Text>
              </View>
              <View className="self-center">
                <TouchableOpacity
                  onPress={() => navigation.navigate("AllProducts")}
                >
                  <Text
                    className="font-light self-center p-2"
                    style={{ fontSize: 15 }}
                  >
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ListOfClothes
              selected={selected}
              //  data={data}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FBFBFD",
    alignItems: "center",
    justifyContent: "center",
    top: 20,
  },
};

export default Explore;
