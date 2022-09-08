import { SafeAreaView, Text,TouchableOpacity, TextInput, View } from 'react-native'
import React, { Component } from 'react'
import { ChevronLeftIcon, PlusIcon, MinusIcon, ThumbDownIcon } from 'react-native-heroicons/outline';
import Header from '../Components/Header/Header';



export default class AddCreditCard extends Component {

  

  render() {
    onChange => form => console.log(form);


    return (

      <SafeAreaView>

        <View className='flex-row justify-between w-64 mb-10'>
       <Header
       title={'Add Credit Card'}
       navigation={this.props.navigation}
       pageToGoBackTo='Explore'
       />

        </View>

        

        <Text className='pt-5 pl-5' style={{ fontWeight: '500', fontSize: 16 }}>Card Holder Name</Text>
        <TextInput className='rounded-xl'
          placeholder='Enter Full Name of Cardholder'
          style={{ borderWidth: 0.5, borderColor: 'black', padding: 10, margin: 10 }}
        />

        <TouchableOpacity className='bg-black p-5 w-80 self-center rounded-3xl mt-5'>
          <Text className='text-center' style={{color:'white', fontWeight:'600'}}>Save Card</Text>
        </TouchableOpacity>



      </SafeAreaView>
    )
  }
}