import { View, Text } from "react-native";
import React from "react";

const SizeBox = ({ size, selected }) => {
  return (
    <View>
      {selected ? (
        <View className="bg-black border-2 p-3 w-15 mr-3 mt-1">
          <Text className="text-white">{size}</Text>
        </View>
      ) : (
        <View className="bg-white border-2 p-3 w-15 mr-3 mt-1">
          <Text className="text-black">{size}</Text>
        </View>
      )}
    </View>
  );
};

export default SizeBox;
