import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { MailIcon, LockOpenIcon } from "react-native-heroicons/outline"
import { LocationMarkerIcon, PhoneIcon, ChevronLeftIcon, LockClosedIcon, UserIcon, PlusIcon, MinusIcon, ThumbDownIcon, ArrowCircleRight, } from 'react-native-heroicons/outline';
import CheckBox from 'react-native-check-box';
import tw from 'tailwind-react-native-classnames'

import { AntDesign } from 'react-native-vector-icons'

export default class CheckoutRegister extends Component {
    state = {
        username: '',
        password: '',
        address: '',
        phoneNo: '',
        termsAndConditions:false
    }

    login(username, password) {
        if (username == 'sheran_malik@hotmail.co.uk' && password == 'bashir_2') {
            this.props.navigation.navigate('Explore');
            Alert.alert('Login Successful');
            this.props.navigation.navigate('CheckoutLoggedIn')
        } else {
            Alert.alert('An error has occured');
        }
    }
    render() {
        return (

            <SafeAreaView style={{ backgroundColor: '#FBFBFD', flex: 1 }}>
                <View className='flex-row w-100 justify-between'>
                   

                </View>



                <View className=''>
                    <Image className='self-center ' source={require('../../assets/nayaabslogo.png')}
                        style={{
                            resizeMode: 'contain',
                            backgroundColor: 'black',
                            borderRadius: 100,
                            width: 100, height: 100
                        }} />
                    <Text className='self-center p-5' style={{
                        fontSize: 22,
                        fontWeight: '500'
                    }}>Sign Up</Text>

                    <View className='flex-row w-80 self-center p-3'
                        style={{
                            backgroundColor: 'white'
                        }}>


                        <UserIcon size={30} color='black' />
                        <TextInput
                            placeholder='Name'
                            className='pl-2'
                            onChangeText={(e) => this.setState({ username: e.target.value })}
                        />
                    </View>

                    <View className='flex-row w-80 self-center p-3 mt-2'
                        style={{
                            backgroundColor: 'white'
                        }}>

                        <MailIcon size={30} color='black' />
                        <TextInput
                            placeholder='Email'
                            className='pl-2'
                            onChangeText={(e) => this.setState({ username: e.target.value })}
                        />
                    </View>

                    <View className='flex-row w-80 self-center p-3 mt-2'
                        style={{
                            backgroundColor: 'white'
                        }}>

                        <LockClosedIcon size={30} color='black' />
                        <TextInput
                            placeholder='Password'
                            className='pl-2'
                            onChangeText={(e) => this.setState({ password: e.target.value })}
                        />
                    </View>

                    <View className='flex-row w-80 self-center p-3 mt-2'
                        style={{
                            backgroundColor: 'white'
                        }}>

                        <LockClosedIcon size={30} color='black' />
                        <TextInput
                            placeholder='Confirm Password'
                            className='pl-2'
                            onChangeText={(e) => this.setState({ password: e.target.value })}
                        />
                    </View>

                    

                    <View className='flex-row w-80 self-center p-3 mt-2'
                        style={{
                            backgroundColor: 'white'
                        }}>

                        <LocationMarkerIcon size={30} color='black' />
                        <TextInput
                            placeholder='Address'
                            className='pl-2'
                            onChangeText={(e) => this.setState({ address: e.target.value })}
                        />
                    </View>

                    <View className='flex-row w-80 self-center p-3 mt-1'
                        style={{
                            backgroundColor: 'white'
                        }}>

                        <PhoneIcon size={30} color='black' />
                        <TextInput
                            placeholder='Phone Number'
                            className='pl-2'
                            onChangeText={(e) => this.setState({ phoneNo: e.target.value })}
                        />
                    </View>

                </View>
                
                <View className=' flex-row w-80 self-center p-3 mt-1'>
                <CheckBox
                        isChecked={this.state.termsAndConditions}
                        onClick={(value) => this.setState({termsAndConditions:!this.state.termsAndConditions})}
                    
                    />
                    <View className='flex-row self-center '>
                    <Text className='self-center mr-1' style={{color:'grey'}}>I accept all the</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsAndConditions')}>
                    <Text className='self-center font-bold'>Terms & Conditions</Text>
                    </TouchableOpacity>
                    </View>
                   

                </View>
                <TouchableOpacity className='bg-black p-5 w-80 self-center rounded-3xl mt-5'>
                    <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>Register</Text>
                </TouchableOpacity>
                

                <View className='flex-row self-center p-5'>
                    <Text style={{ color: 'grey' }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text className='font-bold'>Log in</Text>
                    </TouchableOpacity>

                </View>




            </SafeAreaView>

        )
    }
}