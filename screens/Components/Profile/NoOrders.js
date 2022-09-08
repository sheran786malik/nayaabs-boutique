import {SafeAreaView, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from 'react-native-vector-icons'

const NoOrders = ({navigation}) => {
    return (
        <View className='self-center justify-center w-full h-full'>
            <MaterialCommunityIcons name='hanger' className='self-center p-2' size={80} />
            <Text className='text-center'>You currently have no orders</Text>
            <TouchableOpacity
                className='bg-black p-5 w-80 self-center rounded-3xl mt-5'
                onPress={() => navigation.navigate('AllProducts')}>
                <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>See All Products</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoOrders