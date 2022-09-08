import { TouchableOpacity, View, Text } from 'react-native'
import React, { Component } from 'react'

export default class Tabs extends Component {
    state = {
        selected:'',
    }
    render() {
        return (
            <View className='flex-row p-5 justify-evenly'>
               {this.props.children}
            </View>
        )
    }
}
