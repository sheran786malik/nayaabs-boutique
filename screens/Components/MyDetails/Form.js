import { View, Text } from 'react-native'
import React, {Component} from 'react'


export default class Form extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
    
        <View className='flex-row w-80 self-center p-5 mt-5'
            style={{
                backgroundColor: 'white'
            }}>
                <this.props.Icon size={this.props.size} color='black'
               />
                {this.props.children}
        </View>
    )
  }
}
