import { TouchableOpacity, Text, View } from 'react-native'
import React, { Component } from 'react'
import { AdjustmentsIcon, ChevronLeftIcon, SearchIcon, BellIcon } from "react-native-heroicons/outline"

const Header = ({ pageToGoBackTo, title, navigation, explore, onPress }) => {


    if (explore == true) {
        return (
            <View style={{ backgroundColor: 'white'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>

                    <BellIcon className='' size={30} color='black' />

                </TouchableOpacity>
            </View>

        )
    }
    return (
        <View style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: 'white',
            flexDirection: 'row'
        }}
            className='justify-between w-60'>

            <TouchableOpacity onPress={() => navigation.navigate(pageToGoBackTo)}>

                <ChevronLeftIcon
                    size={20}
                    style={{
                        fontSize: 18,
                        padding: 12,
                        borderRadius: 12
                    }}
                />

            </TouchableOpacity>
            <Text className='text-center self-center' style={{
                fontSize: 20,
                fontWeight: '500'
            }}>{title}</Text>
        </View>
    )
}
export default Header;