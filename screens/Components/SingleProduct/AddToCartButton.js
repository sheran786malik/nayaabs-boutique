import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

const AddToCartButton = ({ disabled, title, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-black p-5 self-center mb-4 mt-4"
      onPress={onPress}
      disabled={disabled}
      style={{ width: Dimensions.get("screen").width / 1.5, borderRadius: 30 }}
    >
      <Text className="text-white text-center font-bold ">Add to Cart</Text>
    </TouchableOpacity>
  );
};

export default AddToCartButton;
