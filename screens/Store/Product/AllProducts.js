import {
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "react-native-vector-icons";
import {
  AdjustmentsIcon,
  ChevronLeftIcon,
  SearchIcon,
  PlusIcon,
  MinusIcon,
  ThumbDownIcon,
  ArrowCircleRight,
} from "react-native-heroicons/outline";
import Card from "../../Components/Explore/Card";
import { auth, db } from "../../../external/Firebase";
import { WooCommerce } from "../../../external/WoocommerceAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../../../features/wishlistSlice";
import { SERVER_URL } from "../../../external/API";

const AllProducts = ({ route, props }) => {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchActivated, setSearchActivated] = useState(false);
  const [userID, setUserID] = useState("");
  const [itemsAvailable, setItemsAvailable] = useState(false);

  const [favourite, setFavourite] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getProducts = () => {
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
          setData(productList);
          // setFilteredProducts(productList);
          setItemsAvailable(true);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSignedInUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return user.uid;
      }
      return null;
    });
  };

  const addToFavourites = (item) => {
    db.collection("users")
      .doc(getSignedInUser())
      .collection("wishlist")
      .doc(item.name)
      .set({
        name: item.name,
        image: item.image,
        price: item.price,
      })
      .then(() => setFavourite(true), console.log("added to favourites!"));
  };

  const deleteFromFavourites = (item) => {
    db.collection("users")
      .doc(getSignedInUser())
      .collection("wishlist")
      .doc(item.name)
      .delete()
      .then(() => setFavourite(false), console.log("deleted from favourites!"));
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
      </Card>
    );
  };

  const searchProducts = (product) => {
    setSearchActivated(true);
    if (product) {
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = product.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(data);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ marginTop: 20 }} />

      <SafeAreaView className="self-center">
        <View className="flex-row justify-between w-60 p-4">
          <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
            <ChevronLeftIcon className="" size={30} color="black" />
          </TouchableOpacity>
          <Text
            className="self-center"
            style={{ fontWeight: "600", fontSize: 20 }}
          >
            All Clothing
          </Text>
        </View>
        <View className="flex-row w-80 self-center justify-between p-4 rounded-3xl bg-white">
          <View className="flex-row self-center">
            <SearchIcon size={25} color="black" />
            <TextInput
              placeholder="Search Items"
              style={{
                color: "#000",
                fontWeight: "500",
                opacity: 0.5,
                fontSize: 20,
              }}
              onFocus={() => setSearchActivated(true)}
              onBlur={() => setSearchActivated(false)}
              onChangeText={(item) => searchProducts(item)}
            />
          </View>
        </View>
        {itemsAvailable ? (
          <FlatList
            data={data}
            numColumns={2}
            renderItem={renderAllProducts}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View className="self-center justify-center">
            <ActivityIndicator size={"large"} color="black" />
          </View>
        )}

        {/* {Object.values(data).map((item) => {
            return (
              <Card>
                <View className='p-5 bg-white m-2 rounded-3xl' key={item.id} style={{ width: Dimensions.get('screen').width / 2.5 }}>
  
                  <TouchableOpacity onPress={() => navigation.navigate('Product', {
                    productID: item.id,
                  })}>
                    <Image source={{ uri: item.images[0].src }} style={{ width: 100, height: 100, resizeMode: 'contain', margin: 8 }} />
  
  
  
                    <View className='flex-row w-32 justify-between'>
                      <Text className='w-20'>{item.name}</Text>
                      <Text className='font-bold'>{item.price}</Text>
                    </View>
                  </TouchableOpacity>
  
                </View>
              </Card>
  
            )
          })
  
          } */}

        {/* 
          <FlatList
            numColumns={2}
            data={filteredProducts}
            renderItem={renderAllProducts}
          />  */}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default AllProducts;
