import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class SearchBox extends Component {
  render() {
    return (
        <View className='flex-row w-80 self-center justify-between p-4 rounded-3xl bg-white'>
            {this.props.children}
        </View>
    )
  }
}