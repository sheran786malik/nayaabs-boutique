import { SafeAreaView, Text, View } from 'react-native'
import React, { Component } from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Header from '../Components/Header/Header';

const Tab = createMaterialTopTabNavigator();



export default class Cart extends Component {
  static navigationOptions = {
    headerShown:true,
  }
  render() {
    return (
      <View className='pt-10 bg-white'>
        <Header
        title={'My Cart '}
        pageToGoBackTo='Profile'
        navigation={this.props.navigation}
        />
        
      </View>
 
  
       



    );
  }
}