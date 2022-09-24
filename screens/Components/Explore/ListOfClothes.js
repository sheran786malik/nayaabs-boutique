import {
  FlatList,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  SnapshotViewIOS,
} from "react-native";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { AntDesign } from "react-native-vector-icons";

import { useNavigation } from "@react-navigation/native";
import { db } from "../../../external/Firebase";

import AddToCartButton from "../../Components/SingleProduct/AddToCartButton";

const ListOfClothes = ({
  casualList,
  readyToWearList,
  selected,
  numColumns,
  filteredProducts,
  user,
}) => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(user)
      .collection("products")
      .doc("0")
      .get()
      .then((data) => {
        setInfo(data.data().productDetails.Products);
      })
      .then((response) => {});
    return () => {};
  }, []);

  const navigation = useNavigation();

  const like = (item) => {
    const userID = user;
    let newData = { ...info };
    console.log(newData);

    if (newData.length !== 0) {
      let index = newData.productDetails.Products.findIndex((e) => {
        return e.id === item.id;
      });
      newData.productDetails.Products[index].favourite = true;

      db.collection("users")
        .doc(userID)
        .collection("products")
        .doc("0")
        .set(newData)
        .then((data) => console.log(item))
        .catch((error) => console.log(error));
    } else {
      alert("An error has occured");
    }

    console.log(item);
  };

  const dislike = (item) => {
    const userID = user;
    let newData = { ...info };
    console.log(newData);
    if (newData.length === 0 || newData == null) {
      alert("An error has occured");
    } else {
      let index = newData.productDetails.Products.findIndex((e) => {
        return e.id === item.id;
      });
      newData.productDetails.Products[index].favourite = false;

      db.collection("users")
        .doc(userID)
        .collection("products")
        .doc("0")
        .set(newData)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }

    console.log(item);
  };

  const renderAllProductsForUser = ({ item }) => {
    return (
      <Card>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Product", {
              productID: item.id,
            })
          }
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 200,
              height: 300,
              resizeMode: "contain",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
          />

          <View className="flex-row w-32 justify-between bg-dark">
            <Text className="w-36" style={{ color: "black" }}>
              {item.name}
            </Text>
            <Text className="font-bold">{item.price}</Text>
          </View>
        </TouchableOpacity>
        <Text className="text-black">{item.favourite ? "true" : "false"}</Text>
        {/* {item.favourite ? (
        <TouchableOpacity
          className="bg-white self-center p-5 mt-5 border"
          style={{}}
          onPress={() => dislike(item)}
        >
          <Text className="text-black text-center font-bold ">
            Added to Wishlist
          </Text>
        </TouchableOpacity>
        ) : (
        <TouchableOpacity
          className="bg-white self-center p-5 mt-5 border"
          style={{}}
          onPress={() => like(item)}
        >
          <Text className="text-black text-center font-bold ">
            Add to Wishlist
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          className="bg-black p-5 self-center mb-4 mt-4"
          onPress={() => {
            item.favourite ? dislike(item) : like(item);
          }}
        >
          {item.favourite ? (
            <Text className="text-white">Dislike</Text>
          ) : (
            <Text className="text-white">Dislike</Text>
          )}
        </TouchableOpacity> */}
      </Card>
    );
  };

  const renderAllProducts = ({ item }) => {
    return (
      <Card>
        {/* {item.favourite ?
                    <TouchableOpacity onPress={() => this.like(item)}
                        style={{ zIndex: 999, position: 'absolute', right: 10, top: 10 }} >
                        <AntDesign name='heart' size={30} color='black' />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.dislike(item)}
                        style={{ zIndex: 999, position: 'absolute', right: 10, top: 10 }} >
                        <AntDesign name='hearto' size={30} color='black' />
                    </TouchableOpacity>

                } */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Product", {
              productID: item.id,
            })
          }
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 200,
              height: 300,
              resizeMode: "contain",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
          />

          <View className="flex-row w-32 justify-between bg-dark">
            <Text className="w-36" style={{ color: "black" }}>
              {item.name}
            </Text>
            <Text className="font-bold">{item.price}</Text>
          </View>

          <TouchableOpacity
            className="bg-black p-5 self-center mb-4 mt-4"
            onPress={() => {
              item.favourite ? dislike(item) : like(item);
            }}
          >
            {item.favourite ? <Text>Dislike</Text> : <Text>Dislike</Text>}
          </TouchableOpacity>
        </TouchableOpacity>
      </Card>
    );
  };

  if (user != " ") {
    return (
      <View className="rounded-sm">
        {selected === "Stitched" ? (
          <FlatList
            data={casualList}
            renderItem={renderAllProductsForUser}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        ) : (
          <FlatList
            data={readyToWearList}
            renderItem={renderAllProductsForUser}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        )}
      </View>
    );
  } else {
    return (
      <View className="rounded-sm">
        {selected === "Stitched" ? (
          <FlatList
            data={casualList}
            renderItem={renderAllProducts}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        ) : (
          <FlatList
            data={readyToWearList}
            renderItem={renderAllProducts}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        )}
      </View>
    );
  }
};

export default ListOfClothes;
