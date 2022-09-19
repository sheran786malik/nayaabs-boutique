import {
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
  View,
  Text,
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
import { auth, db } from "../../../database/Firebase";
import { WooCommerce } from "../../../database/WoocommerceAPI";

const AllProducts = ({ route, props }) => {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchActivated, setSearchActivated] = useState(false);
  const [userID, setUserID] = useState("");

  const [favourite, setFavourite] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    try {
      getSignedInUser();
      fetchInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchInfo = async () => {
    WooCommerce.get("products", { per_page: 100 }).then((data) => {
      setData(data);
      setFilteredProducts(data);
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
        image: item.images[0].src,
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
        {favourite === false ? (
          <TouchableOpacity
            onPress={() => addToFavourites(item)}
            style={{ zIndex: 999, position: "absolute", right: 10, top: 10 }}
          >
            <AntDesign name="hearto" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => deleteFromFavourites(item)}
            style={{ zIndex: 999, position: "absolute", right: 10, top: 10 }}
          >
            <AntDesign name="heart" size={30} color="black" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Product", {
              productID: item.id,
            })
          }
        >
          <Image
            source={{ uri: item.images[0].src }}
            style={{
              width: 100,
              height: 100,
              resizeMode: "cover",
              margin: 8,
            }}
          />

          <View className="flex-row w-32 justify-between bg-dark">
            <Text claßssName="w-20" style={{ color: "black" }}>
              {item.name}
            </Text>
            <Text className="font-bold">{item.price}</Text>
          </View>
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

  const renderItem = ({ item }) => {
    return (
      <View
        className="p-5 bg-white m-2 rounded-3xl"
        key={item.id}
        style={{ width: Dimensions.get("screen").width / 2.5 }}
      >
        {/* {item.favourite ? <AntDesign style={{ zIndex: 999, position: 'absolute', right: 10, top: 10, }} name='heart' size={30} color='black' />
          : <AntDesign style={{ zIndex: 999, position: 'absolute', right: 10, top: 10, }} name='hearto' size={30} color='black' />

        } */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Product", {
              productID: item.id,
            })
          }
        >
          <Image
            source={item.image}
            style={{ width: 100, height: 100, margin: 8 }}
          />

          <View className="flex-row w-32 justify-between">
            <Text className="w-20">{item.title}</Text>
            <Text className="font-bold">{item.price}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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
            All Clothing{" "}
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

          <TouchableOpacity className="bg-black p-2 rounded-xl">
            <AdjustmentsIcon
              style={{ transform: [{ rotate: "90deg" }] }}
              size={20}
              color="white"
              className="self-center"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={renderAllProducts}
          keyExtractor={(item) => item.id}
        />
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
