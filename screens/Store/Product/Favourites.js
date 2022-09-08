import { Dimensions, FlatList, Image, SafeAreaView, TouchableOpacity, Text, View } from 'react-native'
import React, { Component } from 'react'
import { AdjustmentsIcon, SearchIcon, BellIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon, } from "react-native-heroicons/outline"

import { DATA } from '../../BottomTabs/Explore'

import { AntDesign } from 'react-native-vector-icons'
import Header from '../../Components/Header/Header'
import { auth, db } from '../../../database/Firebase'

export default class Favourites extends Component {

    state = {
        data: [],

        isUserLoggedIn: false,
    }

    componentDidMount() {

        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ isUserLoggedIn: true })
                db.collection('users')
                    .doc(user.uid)
                    .collection('products')
                    .onSnapshot(docs => {
                        docs.forEach(res => {
                            this.setState({ data: res.data() })
                        })

                        // let products = []
                        // products.push(docs.data())
                        // this.setState({ data: products, allProducts: products, filteredProducts: products })

                    })
            } else {
                this.setState({ isUserLoggedIn: false })
            }
        });
    }
    render() {
        const Item = ({ id, name, image, orderStatus, price, favourite }) => (
            <View className='bg-white rounded-3xl m-3 flex-col self-center' style={{ width: Dimensions.get('screen').width / 2.5, resizeMode: 'contain' }}>

                {favourite ?
                    <View>
                        <AntDesign style={{ zIndex: 999, position: 'absolute', right: 10, top: 10, }} name='heart' size={30} color='black' />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Product', {
                            productID: id,
                        })}>
                            <Image className='self-center' style={{ width: 100, height: 100, resizeMode: 'contain' }} source={{ uri: image }} />



                            <Text className='self-center' style={{ fontSize: 20, textAlign: 'left' }}>{name}</Text>
                            <Text className='font-bold self-center' style={{ fontSize: 20 }}>{price}</Text>


                        </TouchableOpacity>

                    </View>
                    : null}


            </View>



        )

        const renderItem = ({ item }) => (
            <View className='bg-grey m-2 rounded-md' >
                <Item id={item.id} favourite={item.favourite} name={item.name} image={item.image} price={item.price} />
            </View>
        );
        return (

            <SafeAreaView style={{ backgroundColor: 'white',flex:1}}>
                <Header
                    navigation={this.props.navigation}
                    title='My Wishlist'
                    pageToGoBackTo={'Explore'}
                />
                {this.state.isUserLoggedIn ?
                    <View>
                        <FlatList
                            data={this.state.data}
                            renderItem={renderItem}
                            key={data => data.id}
                        />
                    </View> :
                    <View>

       
       
                       <View className='justify-center items-center align-middle h-5/6'>
                           <Text className='self-center '
                               style={{
                                   fontSize: 24,
                                   fontWeight: '500'
                               }}>Join Us</Text>
                           <Text className='self-center p-2'
                               style={{
                                   color: 'grey',
                                   fontSize: 12
                               }}>To see your wishlist</Text>
       
                           <View>
       
                               <TouchableOpacity
                                className='bg-black mt-10 p-5 w-52 self-center rounded-3xl'
                                onPress={() => this.props.navigation.navigate('Login')}>
                                   <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>Log In</Text>
                               </TouchableOpacity>
       
       
                               <TouchableOpacity 
                               className='bg-black p-5 w-52  mt-5 self-center rounded-3xl'
                               onPress={() => this.props.navigation.navigate('Register')}>
                                   <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>Register</Text>
                               </TouchableOpacity>
                           </View>
       
       
       
       
                       </View>
       
                    </View>
       
       
    
                        }


            </SafeAreaView>
        )
    }
}