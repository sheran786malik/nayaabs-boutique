import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { MailIcon, LockOpenIcon } from "react-native-heroicons/outline"
import { ChevronLeftIcon, PlusIcon, MinusIcon, ThumbDownIcon, ArrowCircleRight, } from 'react-native-heroicons/outline';

import { AntDesign } from 'react-native-vector-icons'
import { auth } from '../../database/Firebase';

export default class CheckoutLogin extends Component {
    state = {
        username: '',
        password: '',
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('CheckoutLoggedIn')
            } 
       
         });
    }

    login(username, password) {
        auth
        .signInWithEmailAndPassword(this.state.username, this.state.password)
        .then(user => {
            this.props.navigation.navigate('CheckoutLoggedIn')
        })
    }
    render() {
        return (

            <SafeAreaView style={{ backgroundColor: '#FBFBFD', flex: 1 }}>
                <View className='flex-row w-100 justify-between'>
                    <TouchableOpacity
                        className='flex-row self-center'
                        onPress={() => this.props.navigation.navigate('Explore')} >

                        <ChevronLeftIcon size={30} color='black' />
                        <Text className='self-center'>Explore</Text>
                    </TouchableOpacity>

                    <TouchableOpacity    onPress={() => this.props.navigation.navigate('CheckoutNotLoggedIn')}>
                        <Text className='pt-2 pr-5'>Continue as Guest</Text>
                    </TouchableOpacity>


                </View>



                <View className=''>
                    <Image className='self-center ' source={require('../../assets/nayaabslogo.png')}
                        style={{
                            resizeMode: 'contain',
                            backgroundColor: 'black',
                            borderRadius: 100
                        }} />
                    <Text className='self-center p-5' style={{
                        fontSize: 22,
                        fontWeight: '500'
                    }}>Log in</Text>

<View className='flex-row w-80 self-center p-5'
                        style={{
                            backgroundColor: 'white'
                        }}>

                        <MailIcon size={40} color='black' />
                        <TextInput
                            placeholder='Email'
                            className='pl-2'
                            onChangeText={(e) => this.setState({ username: e })}
                        />
                    </View>


                    <View className='flex-row w-80 self-center p-5 mt-8'
                        style={{
                            backgroundColor: 'white'
                        }}>

                        <LockOpenIcon size={40} color='black' />
                        <TextInput
                            placeholder='Password'
                            className='ml-2'
                            secureTextEntry={true}
                            onChangeText={(e) => this.setState({ password: e })}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgottenPassword')}>
                        <Text
                            className='text-right p-4'
                            style={{
                                fontSize: 12,
                            }}>Forgotten Password?</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => this.login(this.state.username, this.state.password)} className='bg-black p-5 w-80 self-center rounded-3xl mt-5'>
                    <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>Log In</Text>
                </TouchableOpacity>
                <View className='p-5 flex-row self-center'>
                    <View className='self-center'>
                        <View style={{ borderWidth: 0.5, color: 'black', width: 100 }} />
                    </View>
                    <Text className='self-center p-5 '> Or</Text>
                    <View className='self-center'>
                        <View style={{ borderWidth: 0.5, color: 'black', width: 100 }} />
                    </View>
                </View>
                <View className='flex-row justify-evenly'>
                    <TouchableOpacity>
                        <AntDesign name='facebook-square' size={30} color='black' />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <AntDesign name='google' size={30} color='black' />
                    </TouchableOpacity>
                </View>

                <View className='flex-row self-center p-5'>
                    <Text style={{ color: 'grey' }}>Dont have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CheckoutRegister')}>
                        <Text className='font-bold'>Sign Up</Text>
                    </TouchableOpacity>

                </View>



            </SafeAreaView>

        )
    }
}