import { Dimensions, TouchableOpacity, FlatList, Image, Text, View, Switch } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdjustmentsIcon, MailOpenIcon, QuestionMarkCircleIcon, CurrencyPoundIcon, ChevronRightIcon, SearchIcon, BellIcon, ChevronLeftIcon, MailIcon, LockOpenIcon, } from "react-native-heroicons/outline"
import Header from './Components/Header/Header';

export default class Settings extends Component {
    state = {
        enabled: false,
    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', }}>
                <Header title='Settings' pageToGoBackTo={'Explore'} navigation={this.props.navigation} />



                <View className='justify-between p-3 flex-row bg-white '>
                    <LockOpenIcon color={'black'} size='40' />
                    <Text className='self-center text-center'>Privacy Policy</Text>
                    <ChevronRightIcon
                        size={40}
                        color={'black'}
                        className='self-center'
                    />
                </View>

                <View className='flex-1 justify-between p-3 flex-row bg-white'>
                    <MailOpenIcon color={'black'} size={40} />
                    <Text className='self-center text-center'>Allow Notifications</Text>
                    <Switch
                        className='self-center'
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.enabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => this.setState({ enabled: !this.state.enabled })}
                        value={this.state.enabled}
                    />
                </View>
            </SafeAreaView>
        )
    }
}