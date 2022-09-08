import { FlatList, Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Card from './Card'

import { useNavigation } from '@react-navigation/native'
const ListOfClothes = ({ selected, casualList, readyToWearList, numColumns, filteredProducts, }) => {

    const navigation = useNavigation()

    const renderAllProducts = ({ item }) => {

        return (

            <Card>
                {/* {item.favourite ?
                    <TouchableOpacity onPress={() => this.like(item)}
                        style={{ zIndex: 999, position: 'absolute', right: 10, top: 10 }} >
                        <AntDesign name='heart' size={30} color='black' />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.dislike(item)}
                        style={{ zIndex: 999, position: 'absolute', right: 10, top: 10 }} >
                        <AntDesign name='hearto' size={30} color='black' />
                    </TouchableOpacity>

                } */}


                <TouchableOpacity onPress={() => navigation.navigate('Product', {
                    productID: item.id,
                })}>
                    <Image source={{ uri: item.images[0].src }} style={{ width: 200, height: 300, resizeMode: 'cover', borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />


                    <View className='flex-row w-32 justify-between bg-dark'>
                        <Text className='w-36' style={{ color: 'black' }}>{item.name}</Text>
                        <Text className='font-bold'>{item.price}</Text>
                    </View>
                </TouchableOpacity>


            </Card>
        )
    }

    if (numColumns > 0) {
        return (
            <FlatList
                numColumns={2}
                data={filteredProducts}
                renderItem={renderAllProducts}
            />
        )
    }
    return (
        <View className='rounded-sm'>


            {selected === 'Stitched' ?
                <FlatList
                    data={casualList}
                    renderItem={renderAllProducts}
                    keyExtractor={item => item.id}
                    horizontal={true}
                /> : <FlatList
                    data={readyToWearList}
                    renderItem={renderAllProducts}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />}

        </View>
    )
}

export default ListOfClothes