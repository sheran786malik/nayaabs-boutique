import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Card from "./Card";
import { AntDesign } from "react-native-vector-icons";

import { useNavigation } from "@react-navigation/native";
import { db } from "../../../external/Firebase";
const ListOfClothes = ({
  selected,
  casualList,
  readyToWearList,
  numColumns,
  filteredProducts,
  user,
}) => {
  const navigation = useNavigation();

  const like = (item) => {
    // db.collection("users").doc(user).collection("wishlist").doc(random).set({
    //   id:item.id,
    //   name:item.name,
    // })

    db.collection("users")
      .doc(user)
      .collection("products")
      .doc("0")
      .get()
      .then((data) => {
        const info = data.data();
      });
  };

  const dislike = (item) => {
    console.log("disiked");
  };

  const renderAllProductsForUser = ({ item }) => {
    return (
      <Card>
        {item.favourite == -false ? (
          <TouchableOpacity
            onPress={() => like(item)}
            style={{ zIndex: 999, position: "absolute", right: -20, top: 30 }}
          >
            <AntDesign name="heart" size={40} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => dislike(item)}
            style={{ zIndex: 999, position: "absolute", right: -20, top: 30 }}
          >
            <AntDesign name="hearto" size={40} color="black" />
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
