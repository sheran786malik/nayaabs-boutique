import { Dimensions, Text, View } from "react-native";
import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <View className=" bg-white m-3 p-3 rounded-3xl w-44">
        {this.props.children}
      </View>
    );
  }
}
