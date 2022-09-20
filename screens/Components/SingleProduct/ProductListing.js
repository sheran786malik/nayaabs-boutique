import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import SizeBox from "./SizeBox";
import AddToCartButton from "./AddToCartButton";
import { useDispatch } from "react-redux";

export const ProductListing = ({ data }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <SafeAreaView
      style={{
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
      }}
    >
      <View className="flex flex-col p-2">
        <View className="flex flex-col justify-between">
          <Text className="w-42 text-xl  text-center ">{data.name}</Text>
          <Text className="text-xl font-bold text-right">£{data.price}</Text>
        </View>

        <View className="pt-5 text-gray-500">
          <Text className=" text-gray-500 text-center">{data.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductListing;
