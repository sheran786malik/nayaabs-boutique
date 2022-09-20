import { View, Text } from "react-native";
import React from "react";

const SizeContainer = (props) => {
  return (
    <View className="pt-3 pl-5">
      <Text className="text-gray-400 ">Size</Text>

      <View className="flex flex-row">{props.children}</View>
    </View>
  );
};

export default SizeContainer;
