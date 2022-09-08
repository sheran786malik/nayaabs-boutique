import { ActivityIndicator, Dimensions, Image, TouchableOpacity, SafeAreaView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { LocationMarkerIcon, PhoneIcon, ChevronLeftIcon, LockClosedIcon, UserIcon, PlusIcon, MinusIcon, ThumbDownIcon, ArrowCircleRight, } from 'react-native-heroicons/outline';



export default class CheckEmailForVerification extends Component {
    render() {
        return (
            <SafeAreaView >
                <View className='flex-row w-100'>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <ChevronLeftIcon size={30} color='black' />
                    </TouchableOpacity>
                 

                </View>
                <View >
                    <Image className='self-center ' source={require('../../assets/nayaabslogo.png')}
                        style={{
                            resizeMode: 'contain',
                            backgroundColor: 'black',
                            borderRadius: 100,
                            width: 100, height: 100
                        }} />



                </View>
                <View>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: '500',

                    }} className='self-center p-5 text-center'>Click the link sent to your email to verify</Text>
                    <ActivityIndicator size={'large'} className='p-5' color='black' />
                    <TouchableOpacity className='bg-black p-5 w-80 self-center rounded-3xl '>
                        <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>Resend Email</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>

        )
    }
}