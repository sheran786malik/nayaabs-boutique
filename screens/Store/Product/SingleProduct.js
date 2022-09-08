import { ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View, Text, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';

import { ChevronLeftIcon, PlusIcon, MinusIcon, ThumbDownIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { DATA } from '../../BottomTabs/Explore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, getData } from '../../../database/Firebase';
import Header from '../../Components/Header/Header';
import { AntDesign } from 'react-native-vector-icons'
import RenderHtml from 'react-native-render-html';
import { WooCommerce } from '../../../database/WoocommerceAPI';




const SingleProduct = ({ navigation, route }) => {

    const { productID, productName } = route.params;
    const [item, setItem] = useState([]);
    const [size, setSize] = useState('');
    const [data, setData] = useState('')



    useEffect(() => {


        fetchInfo();  
    },[])
            
     const fetchInfo = async() =>{

        WooCommerce.get('products', { per_page: 100 })
        .then(data => {

            for(let index = 0; index < data.length; index++){
                if(data[index].id === productID){
                    let list = []
                    list.push(data[index])
                     setItem(list)
                }
            }
        })
        
        
     }
    
    
    const addToCart = async (data) => {
    
        let itemArray = await AsyncStorage.getItem('cartItems')
        itemArray = JSON.parse(itemArray)
       
        if (itemArray === null || itemArray.length===0) {
            
            
            let cartItems = [];
            cartItems.push({
                id: data.id,
                quantity: 1,
                image: data.images[0].src,
                title: data.name,
                size: size,
                price: data.price,
                favourite:data.favourite,
            })
 
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
                alert(
                    'Item Added Successfully to cart'
                );
                navigation.navigate('MyCart');
            } catch (error) {
                return error;
            }
        } else {
            const place = itemArray.findIndex(res => res.id = data.id)
           
            let cartItems = itemArray
            cartItems[place].quantity += 1;

            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
                alert(
                    'Item Added Successfully to cart'
                );
                navigation.navigate('MyCart');
            } catch (error) {
                return error;
            }
    }
}

    const addToCarts = async (id) => {

        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);


        if (itemArray) {
            let array = itemArray;
            array.push(id);

            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                alert(
                    'Item Added Successfully to cart'
                );
                navigation.navigate('MyCart');
            } catch (error) {
                return error;
            }
        } else {
            let array = [];
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                alert(
                    'Item Added Successfully to cart'
                );
                navigation.navigate('MyCart');
            } catch (error) {
                return error;
            }
        }



    }

    return (

        <ScrollView>
            <SafeAreaView>
                <Header
                    pageToGoBackTo={'Explore'}
                    navigation={navigation}
                    title="Product Details"
                />
                {item.length  ? item.map(data =>
                    <View>
                        {data.favourite ? <AntDesign style={{ zIndex: 999, position: 'absolute', right: 10, top: 10, }} name='heart' size={30} color='black' />
                            : <AntDesign style={{ zIndex: 999, position: 'absolute', right: 10, top: 10, }} name='hearto' size={30} color='black' />

                        }
                        <Image
                            source={{ uri: data.images[0].src  }}
                            style={{
                                height: '65%', resizeMode: 'contain'
                            }}
                        />

                        <View style={{ backgroundColor: 'white', borderTopRightRadius: 45, borderTopLeftRadius: 45 }}>
                            <View className='flex-row justify-between p-4 w-80'>
                                <Text className='w-52' style={{ fontWeight: '500', fontSize: 20 }}>{data.name}</Text>
                                <Text style={{ fontSize: 18, fontWeight: '500' }}>{data.price}</Text>
                            </View>
                            <View>
                             
                            </View>
                            <Text className='pl-5 pb-1' style={{ color: 'grey' }}>Size</Text>
                            <View className='pl-5 flex-row w-42 mr-5' style={{ backgroundColor: 'white' }}>

                                <TouchableOpacity onPress={() => setSize('XS')}>
                                    <View className='p-2 mr-2' style={{ borderWidth: 1, borderColor: 'black', backgroundColor: size == 'XS' ? 'black' : 'white' }}>
                                        <Text className='text-center' style={{ color: size == 'XS' ? 'white' : 'black' }}>XS</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSize('S')}>
                                    <View className='p-2 mr-2' style={{
                                        borderWidth: 1, borderColor: 'black',
                                        backgroundColor: size == 'S' ? 'black' : 'white'
                                    }}>
                                        <Text className='text-center' style={{ color: size == 'S' ? 'white' : 'black' }}>S</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSize('M')}>
                                    <View className='p-2 mr-2' style={{
                                        borderWidth: 1, borderColor: 'black',
                                        backgroundColor: size == 'M' ? 'black' : 'white'
                                    }}>
                                        <Text className='text-center' style={{ color: size == 'M' ? 'white' : 'black' }}>M</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSize('L')}>
                                    <View className='p-2 mr-2' style={{
                                        borderWidth: 1, borderColor: 'black',
                                        backgroundColor: size == 'L' ? 'black' : 'white'
                                    }}>
                                        <Text className='text-center' style={{ color: size == 'L' ? 'white' : 'black' }}>L</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSize('XL')}>
                                    <View className='p-2 mr-2' style={{
                                        borderWidth: 1, borderColor: 'black',
                                        backgroundColor: size == 'XL' ? 'black' : 'white'
                                    }}>
                                        <Text className='text-center' style={{ color: size == 'XL' ? 'white' : 'black' }}>XL</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => addToCart(data)} className='bg-black p-5 m-10 w-60 self-center rounded-2xl' style={{
                                backgroundColor: 'black',
                            }}>

                                <Text className='text-center' style={{ color: 'white' }}>Add to Cart</Text>
                            </TouchableOpacity>




                        </View>
                    </View>
                ) : <View>
                    <ActivityIndicator size='large' />
                    </View>}

            </SafeAreaView>
        </ScrollView>

    )
}

export default SingleProduct