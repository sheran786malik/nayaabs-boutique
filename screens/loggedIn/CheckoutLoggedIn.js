import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native'
import React, { Component } from 'react'
import CheckBox from 'react-native-check-box'
import { ChevronLeftIcon, PlusIcon, MinusIcon, ThumbDownIcon } from 'react-native-heroicons/outline';
import { PaymentIcon } from 'react-native-payment-icons'
import Header from '../Components/Header/Header';
import { auth, db } from '../../database/Firebase';
import { CardField, StripeProvider, useStripe, useConfirmPayment } from '@stripe/stripe-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { WooCommerce } from '../../database/WoocommerceAPI';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeButton from 'rn-swipe-button';
import { Payment } from '../Components/Payment/Payment';

export default class Checkout extends Component {


    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerShown: false
    }
    state = {
        homeIsChecked: false,
        officeIsChecked: false,

        cartItems: [],
        userID: '',
        deliveryFee: 3.95,
        price: 0,

        fullName: '',
        address: '',
        email: '',
        phoneNumber: '',

    }
    async componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ userID: user.uid })


                db
                    .collection('users')
                    .doc(this.state.userID)

                    .get()
                    .then(data => {
                        this.setState({
                            address: data.data().address,
                            phoneNo: data.data().phoneNo,
                            email: data.data().emailAddress,
                            fullName: data.data().fullName,
                        })
                    }).catch(data => {
                        this.setState({
                            address: 'An error has occured',
                            phoneNo: 'An error has occured',
                            email: 'An error has occured',
                            fullName: 'An error has occured'
                        })
                    })

            } else if (user == null) {
                this.props.navigation.navigate('CheckoutLogin')
            }
        });

        let items = await AsyncStorage.getItem("cartItems");

        this.setState({ cartItems: JSON.parse(items) })
    }
    async pay(fullName, address, phoneNo, cartItems, price) {
        let items = await AsyncStorage.getItem("cartItems");



        // db
        // .collection('users')
        // .doc(this.state.userID)
        // .collection('orders')
        // .doc(Math.random() *  100)
        // .set({
        //     order:items ? items:items.length === 0,
        // }).then((data) => 
        this.props.navigation.navigate('OrderConfirm', { cartItems: this.state.cartItems })
        // ).catch(error => console.log(error))
        // console.log('Hi')
    }

    render() {


        let price = this.state.cartItems.map(a => a.price);
        let deliveryFee = 3.95;


        return (
            <KeyboardAwareScrollView>
                <SafeAreaView>
                    <View className='bg-white'>
                        <Header
                            title='Checkout'
                            navigation={this.props.navigation}
                            pageToGoBackTo={'MyCart'}
                        />
                    </View>

                    <Text className='font-bold p-5' style={{ fontSize: 20, fontWeight: '500' }}>Delivery address</Text>


                    <View className='flex-row bg-white p-4 w-80 self-center rounded-xl'>

                        {/* <RoundedCheckbox
                        style={{ padding: 10, boxShadow: 5 }}
                        isChecked={this.state.homeIsChecked}
                        onPress={(checked) => this.setState({
                            homeIsChecked: !this.state.homeIsChecked
                        })} /> */}
                        <CheckBox
                            style={{ padding: 10, borderRadius: 20 }}
                            onClick={() => {
                                this.setState({
                                    homeIsChecked: !this.state.homeIsChecked
                                })
                            }}
                            isChecked={this.state.homeIsChecked}


                        />
                        <View className='self-center'>
                            <Text style={{ fontSize: 16 }}>Home</Text>
                            <Text style={{ fontSize: 12, color: 'lightgrey' }}>{this.state.address}</Text>

                        </View>




                    </View>




                    {/* <CheckBox
                        style={{ flex: 1, padding: 10, }}
                        onClick={() => {
                            this.setState({
                                officeIsChecked: !this.state. officeIsChecked
                            })
                        }}
                        isChecked={this.state. officeIsChecked}

                        className='self-start'
                    /> */}

                    <Text className='font-bold p-5' style={{ fontSize: 20, fontWeight: '500' }}>Billing Information</Text>

                    <View className='flex-row bg-white m-3 rounded-xl justify-around'>
                        <View className='flex-col p-4 '>
                            <Text style={{ color:'black'}} className=''>Delivery Fee</Text>
                            <Text style={{  color:'black'}}>Subtotal</Text>
                            <Text style={{ color:'black' }}>Total</Text>
                        </View>
                        <View className='flex-col p-4'>

                            <Text style={{fontSize: 14, color: 'lightgrey'}}>{this.state.homeIsChecked ? this.state.deliveryFee : 'FREE'}</Text>
                            {/* <Text>{this.props.navigation.getParam('total')}</Text> */}
                            <Text style={{ fontSize: 14, color: 'lightgrey'  }}>{price}</Text>
                            <Text style={{fontSize: 14, color: 'lightgrey'}}>{this.state.homeIsChecked ? parseInt(price) + parseInt(this.state.deliveryFee) : parseInt(price)}</Text>


                        </View>
                    </View>
                    <View>
                        <Text className='font p-5' style={{ fontSize: 20, fontWeight: '500' }}>Payment Method</Text>
                        <View className='p-4 flex-row'>
                            <PaymentIcon type='visa' width={100} className='bg-white mr-2' />
                            <PaymentIcon type='master' width={100} />

                        </View>

                       
                        <Payment
                            email={this.state.email}
                            fullName={this.state.fullName}
                            address={this.state.address}
                            totalPrice={this.state.price + this.state.deliveryFee}
                            cartItems={this.state.cartItems}
                            phoneNumber={this.state.phoneNo}
                        />

                    </View>

                </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }
}