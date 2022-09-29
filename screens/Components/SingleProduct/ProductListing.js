import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import SizeBox from "./SizeBox";
import AddToCartButton from "./AddToCartButton";
import { useDispatch } from "react-redux";
import HTMLView from "react-native-htmlview";

export const ProductListing = ({ name, description, price }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const regex = /(<([^>]+)>)/gi;
  const result = description.replace(regex, "");

  return (
    <View className="flex flex-col p-2">
      <View className="flex flex-col justify-between">
        <Text className="w-42 text-xl  text-center ">{name}</Text>
        <Text className="text-xl font-bold text-right">{price}</Text>
        <Text>{result}</Text>
      </View>
    </View>
  );
};

export default ProductListing;
