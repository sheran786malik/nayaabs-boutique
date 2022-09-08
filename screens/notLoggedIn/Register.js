import { Alert, KeyboardAvoidingView, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { MailIcon, LockOpenIcon } from "react-native-heroicons/outline"
import { LocationMarkerIcon, PhoneIcon, ChevronLeftIcon, LockClosedIcon, UserIcon, PlusIcon, MinusIcon, ThumbDownIcon, ArrowCircleRight, } from 'react-native-heroicons/outline';
import CheckBox from 'react-native-check-box';
import tw from 'tailwind-react-native-classnames'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AntDesign } from 'react-native-vector-icons'
import { auth, db } from '../../database/Firebase';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';

export default class Register extends Component {
    state = {
        username: '',
        fullName: '',
        password: '',
        confPassword: '',
        address: '',
        phoneNo: '',
        termsAndConditions: false,
        disabled: true
    }

    register() {
        if (this.state.password === this.state.confPassword) {
            auth.createUserWithEmailAndPassword(this.state.username, this.state.password)
                .then((user) => {
                    db
                        .collection('users')
                        .doc(user.user.uid)
                        .set({
                            fullName: this.state.fullName,
                            address: this.state.address,
                            phoneNo: this.state.phoneNo,
                        }).then((res) => { 
                            this.props.navigation.navigate('Profile') 
                        }).catch(error=>console.log(error))

                })
        }
    }
    componentDidMount() {
       this.setState({disabled:false})
    }

    validation() {
       
    }
    render() {
        return (

            <SafeAreaView style={{ backgroundColor: '#FBFBFD', flex: 1 }}>
                {/* <View className='flex-row w-100 justify-between'>
                   

                </View> */}


                <KeyboardAwareScrollView>
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
                                autoCapitalize='none'
                                className='pl-2'
                                onChangeText={(e) => this.setState({ fullName: e })}
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
                                autoCapitalize='none'
                                keyboardType='email'
                                onChangeText={(e) => this.setState({ username: e })}
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
                                autoCapitalize='none'
                                onChangeText={(e) => this.setState({ password: e })}
                                secureTextEntry={true}
                            />

                        </View>
                        <View className='p-5 self-center'>
                            <Text className='text-left pl-2' style={{ fontSize: 10 }}>Password Strength</Text>
                            <BarPasswordStrengthDisplay
                                password={this.state.password}

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
                                autoCapitalize='none'
                                onChangeText={(e) => this.setState({ confPassword: e })}
                                secureTextEntry={true}
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
                                autoCapitalize='none'
                                onChangeText={(e) => this.setState({ address: e })}
                            />
                        </View>

                        <View className='flex-row w-80 self-center p-3 mt-1'
                            style={{
                                backgroundColor: 'white'
                            }}>

                            <PhoneIcon size={30} color='black' />
                            <TextInput
                                placeholder='Phone Number'
                                keyboardType='number-pad'
                                className='pl-2'
                                onChangeText={(e) => this.setState({ phoneNo: e })}

                            />
                        </View>

                    </View>

                    <View className=' flex-row w-80 self-center p-3 mt-1'>
                        <CheckBox
                            isChecked={this.state.termsAndConditions}
                            onClick={(value) => this.setState({ termsAndConditions: !this.state.termsAndConditions })}

                        />
                        <View className='flex-row self-center '>
                            <Text className='self-center mr-1' style={{ color: 'grey' }}>I accept all the</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsAndConditions')}>
                                <Text className='self-center font-bold'>Terms & Conditions</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                    <TouchableOpacity onPress={() => this.register()} disabled={this.state.disabled} className='bg-black p-5 w-80 self-center rounded-3xl mt-5'>
                        <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>Register</Text>
                    </TouchableOpacity>


                    <View className='flex-row self-center p-5'>
                        <Text style={{ color: 'grey' }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text className='font-bold'>Log in</Text>
                        </TouchableOpacity>

                    </View>



                </KeyboardAwareScrollView>
            </SafeAreaView>

        )
    }
}