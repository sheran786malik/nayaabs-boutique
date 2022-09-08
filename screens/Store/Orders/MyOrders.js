import { FlatList, Image, SafeAreaView, TouchableOpacity, Text, View } from 'react-native'
import React, { Component } from 'react'


import { MaterialCommunityIcons } from 'react-native-vector-icons'
import Header from '../../Components/Header/Header'
import NoOrders from '../../Components/Profile/NoOrders'
import { auth, db } from '../../../database/Firebase'

import Swipeout from 'react-native-swipeout';

export default class MyOrders extends Component {
  state = {
    orders: null,
    ordersExist: false,

  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {

        db.collection('products').doc(user.uid).collection('orders').get().then((querySnapshot) => {
          let orders = []
          querySnapshot.forEach(snapshot => {
            orders.push(snapshot.data())
            this.setState({ orders: orders, ordersExist: true })
          })
        })
      } else {
        this.props.navigation.navigate('Login')
      }
    });
  }


  render() {


    const renderItem = ({ item }) => {
      let swipeoutBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { alert('To cancel order, please call our store')}
      }];
      return (
        <Swipeout right={swipeoutBtns} style={{backgroundColor:'white'}}>
          <View>
            <View className='flex-row'>
              <Image source={{ uri: item.image }} style={{ resizeMode: 'contain', width: 100, height: 100 }} />
              <View className='flex-col justify-evenly'>
                <Text className='w-52' style={{ fontWeight: '400', fontSize: 14, color: 'black', opacity: 0.5 }}>{item.name}</Text>
                <View className='flex-row'>
                  <Text className='pr-3 self-center' style={{ fontWeight: '500', fontSize: 13, color: 'grey' }}>Qty{item.quantity}</Text>
                  <Text style={{ fontWeight: '200', fontSize: 13 }}>{item.size}</Text>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>{item.price}</Text>
              </View>
              <View className='self-center'>
                <Text style={{ fontWeight: '400', fontSize: 14, color: 'black', opacity: 0.5 }}>{item.expDelivery}</Text>
              </View>

            </View>

          </View>
        </Swipeout>
      )
    }

    if (this.state.ordersExist == false) {
      return (
        <SafeAreaView className='bg-white'>
          <Header
            title={'Profile'}
            pageToGoBackTo='Profile'
            navigation={this.props.navigation}
          />
          <NoOrders navigation={this.props.navigation} />
        </SafeAreaView>
      )
    } else if (this.state.ordersExist) {
      return (
        <SafeAreaView>

          <View className='bg-white'>
            <Header
              navigation={this.props.navigation}
              pageToGoBackTo='Profile'
              title={'My Orders'}
            />

            <FlatList
              data={this.state.orders}
              renderItem={renderItem}
              key={data => data.id}
            />

          </View>
        </SafeAreaView>
      )
    }

  }
}