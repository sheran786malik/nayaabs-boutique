import { Dimensions, TouchableOpacity, FlatList, Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdjustmentsIcon, SearchIcon, BellIcon, ChevronLeftIcon } from "react-native-heroicons/outline"
import Header from '../Components/Header/Header';

export default class Notifications extends Component {
    render() {
        const DATA = [{
            "id": 1,
            "title": "Our Latest Summer Collection",
            "image": require(`../../assets/notif1.png`),
            "timeAgo": "17 minute ago"
        },
        {
            "id": 2,
            "title": "Our Latest Summer Collection",
            "image": require(`../../assets/notif1.png`),
            "timeAgo": "17 minute ago"
        }]
        const Item = ({ title, image, price, timeAgo }) => (
            <View>
            <View className='bg-white w-100  flex-row '>

                <View className='p-3'>
                    <Image className='' style={{ resizeMode: 'contain', }} source={image} />
                </View>

                <View className='p-3'>

                    <Text className=' text-center' style={{ fontSize: 20, color: 'black' }}>{title}</Text>
                    <Text className='' style={{ fontSize: 16, color: 'grey' }}>{timeAgo}</Text>
                </View>
                


            </View>
            <View style={{
                    borderWidth:0.4,
                    borderColor:'lightgrey'
                    
                    }}/>
            </View>
        )

        const renderItem = ({ item }) => (
            <View className='w-100'>
                <Item title={item.title} image={item.image} price={item.price} timeAgo={item.timeAgo} />
            </View>
        );
        return (
            <SafeAreaView style={{

                backgroundColor: 'white',

            }} >
                


                <Header
                title={'Notifications'} navigation={this.props.navigation} pageToGoBackTo={'Explore'}
                />
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={false}

                />
            </SafeAreaView>
        )
    }
}