import { Dimensions, ScrollView, TouchableOpacity, FlatList, Image, ImageBackground, Text, View } from 'react-native'
import React, { Component } from 'react'
import { AdjustmentsIcon, SearchIcon, BellIcon, ChevronLeftIcon, ChevronRightIcon, } from "react-native-heroicons/outline"
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign"
import Header from '../Components/Header/Header';
import { auth, db } from '../../database/Firebase';

export default class Profile extends Component {

  state = {
    username: '',
    fullName: '',
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ username: user.email })
        db
          .collection('users').
          get(user.uid)
          .then(data => {
            data.forEach(snapShot => {
              this.setState({ fullName: snapShot.data().fullName })
            })
          })
      } else {

      }
    });
  }
  logOut() {
    auth
      .signOut()
      .then((data) => {
        alert('Looking forward to seeing you again')
        this.props.navigation.navigate('Login')
      })
  }

  render() {

    return (
      <ScrollView>
        <SafeAreaView>





          <Image source={require('../../assets/background.png')} style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height / 3.5 }} />

          <Text className='text-center' style={{ fontSize: 24, fontWeight: '500' }}>{this.state.fullName}</Text>
          <Text className='text-center' style={{ color: 'grey' }}>{this.state.username}</Text>


          <View>

            <View className='flex-row justify-between p-5'>
              <View className='flex-row w-36 justify-around'>
                <AntDesign name='CodeSandbox' size={25} color='black' />
                <Text className='self-center'>My Orders</Text>

              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('orders')}>

                <ChevronRightIcon size={30} color='black' />

              </TouchableOpacity>



            </View>


          </View>
          <View className='self-center ' style={{ color: 'black', borderWidth: 0.5, width: '80%' }} />

          <View>



          </View>
          <View className='self-center ' style={{ color: 'black', borderWidth: 0.5, width: '80%' }} />

          <View>

            <View className='flex-row justify-between p-5'>
              <View className='flex-row w-36 justify-around'>
                <AntDesign name='CodeSandbox' size={25} color='black' />
                <Text className='self-center'>My Details</Text>

              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MyDetails')}>

                <ChevronRightIcon size={30} color='black' />

              </TouchableOpacity>



            </View>


          </View>
          <View className='self-center ' style={{ color: 'black', borderWidth: 0.5, width: '80%' }} />
          <View>

          </View>
          <View className='self-center ' style={{ color: 'black', borderWidth: 0.5, width: '80%' }} />


          <TouchableOpacity onPress={() => this.logOut()} className='bg-black p-5 w-80 self-center rounded-3xl mt-5'>
            <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>Log out</Text>
          </TouchableOpacity>
        </SafeAreaView>

      </ScrollView>

    )
  }
}