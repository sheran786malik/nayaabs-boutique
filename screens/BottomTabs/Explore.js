import {
  ActivityIndicator,
  Dimensions,
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
import React, { Component, useRef } from "react";
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
import { getAllProducts, WooCommerce } from "../../external/WoocommerceAPI";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ListOfClothes from "../Components/Explore/ListOfClothes";
import { List } from "react-native-paper";
import { SERVER_URL } from "../../external/API";

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

export default class Explore extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedButton: "",
    casualList: [],
    readyToWearList: [],
    seeAll: false,

    allProducts: [],
    filteredProducts: [],
    searchActivated: false,
    selected: "",

    data: [],

    user: [],
  };

  componentDidMount() {
    this.fetchInfo();
  }
  fetchInfo = async () => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        let productList = [];
        fetch(SERVER_URL + "getProducts")
          .then((data) => data.json())
          .then((res) => {
            this.setState({
              data: res.Products,
              filteredProducts: res.Products,
            });
            this.filterData(res.Products);
          })
          .then((data) => {});
      } else {
        fetch(SERVER_URL + "getProductsForUser?userID=" + user.uid)
          .then((res) => res.json())
          .then((data) => {
            this.filterData(data.Products);
            this.setState({ user: user.uid });
          })
          .catch((error) => console.log(error));
      }
    });
  };
  // }
  goToProduct(product) {
    this.props.navigation.navigate("Product");
    AsyncStorage.setItem("product", JSON.stringify(product));
    this.props.navigation.navigate("Product");
  }

  filterData = (data) => {
    let readyToWearList = [];
    let casualList = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].category === "Casual") {
        casualList.push(data[index]);
      } else if (data[index].category === "Unstitched") {
        readyToWearList.push(data[index]);
      }
      this.setState({
        readyToWearList: readyToWearList,
        casualList: casualList,
      });
    }
  };

  searchProducts(product) {
    this.setState({ searchActivated: true });
    if (product) {
      const newData = this.state.data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = product.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ filteredProducts: newData });
    } else {
      this.setState({ filteredProducts: this.state.data });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View className="flex-row justify-end w-100 p-4">
            <Header explore={true} navigation={this.props.navigation} />
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
                  onPress={() => this.setState({ selected: "Stitched" })}
                  style={{
                    borderWidth: 1,
                    borderColor: "black",
                    backgroundColor:
                      this.state.selected === "Stitched" ? "black" : "white",
                  }}
                >
                  <Text
                    className="text-center"
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color:
                        this.state.selected === "Stitched" ? "white" : "black",
                    }}
                  >
                    Stitched
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="p-6 rounded-2xl w-36"
                  onPress={() => this.setState({ selected: "Unstitched" })}
                  style={{
                    borderWidth: 1,
                    borderColor: "black",
                    backgroundColor:
                      this.state.selected === "Unstitched" ? "black" : "white",
                  }}
                >
                  <Text
                    className="text-center"
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color:
                        this.state.selected === "Unstitched"
                          ? "white"
                          : "black",
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
                  <TouchableOpacity onPress={() => this._panel.show()}>
                    <Text
                      className="font-light self-center p-2"
                      style={{ fontSize: 15 }}
                    >
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {this.state.user.length > 2 ? (
                <ListOfClothes
                  selected={this.state.selected}
                  casualList={this.state.casualList}
                  readyToWearList={this.state.readyToWearList}
                  user={this.state.user}
                />
              ) : (
                <ListOfClothes
                  selected={this.state.selected}
                  casualList={this.state.casualList}
                  readyToWearList={this.state.readyToWearList}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <SlidingUpPanel ref={(c) => (this._panel = c)}>
          {(dragHandler) => (
            <SafeAreaView style={styles.container}>
              <View style={{ marginTop: 50 }} />

              <SafeAreaView className="self-center">
                <View className="flex-row justify-between w-60 p-4">
                  <TouchableOpacity onPress={() => this._panel.hide()}>
                    <ChevronLeftIcon className="" size={30} color="black" />
                  </TouchableOpacity>
                  <Text
                    className="self-center"
                    style={{ fontWeight: "600", fontSize: 20 }}
                  >
                    All Clothing{" "}
                  </Text>
                </View>
                <SearchBox>
                  <View className="flex-row self-center">
                    <SearchIcon size={25} color="darkgrey" />
                    <TextInput
                      placeholder="Search Items"
                      style={{
                        color: "darkgrey",
                        fontWeight: "500",
                        opacity: 0.5,
                        fontSize: 20,
                      }}
                      onFocus={() => this.setState({ searchActivated: true })}
                      onBlur={() => this.setState({ searchActivated: false })}
                      onChangeText={(item) => this.searchProducts(item)}
                    />
                  </View>

                  {/* <TouchableOpacity className='bg-black p-2 rounded-xl'>
                                        <AdjustmentsIcon style={{ transform: [{ rotate: '90deg' }] }} size={20} color='white' className='self-center' />

                                    </TouchableOpacity> */}
                </SearchBox>

                {/* <FlatList
                                    numColumns={2}
                                    data={this.state.filteredProducts}
                                    renderItem={renderAllProducts}
                                /> */}
                <ListOfClothes
                  filteredProducts={this.state.filteredProducts}
                  numColumns={2}
                />
              </SafeAreaView>
            </SafeAreaView>
          )}
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FBFBFD",
    alignItems: "center",
    justifyContent: "center",
    top: 20,
  },
};
