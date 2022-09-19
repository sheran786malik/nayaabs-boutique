import { TouchableOpacity, Text, View } from "react-native";
import React, { Component } from "react";
import {
  AdjustmentsIcon,
  ChevronLeftIcon,
  ShoppingBagIcon,
  SearchIcon,
  BellIcon,
} from "react-native-heroicons/outline";
import { BadgeForCart } from "../Explore/BadgeForCart";

const Header = ({
  pageToGoBackTo,
  title,
  navigation,
  explore,
  onPress,
  profile,
}) => {
  if (explore == true) {
    return (
      <View style={{ backgroundColor: "white" }}>
        <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
          <ShoppingBagIcon className="" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        width: "100%",
      }}
      className=""
    >
      {profile == true ? null : (
        <TouchableOpacity onPress={() => navigation.navigate(pageToGoBackTo)}>
          <ChevronLeftIcon
            size={20}
            color="black"
            style={{
              fontSize: 18,
              padding: 12,
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
      )}
      <View className="flex-row w-full justify-center">
        <Text
          className="self-center text-center"
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};
export default Header;
