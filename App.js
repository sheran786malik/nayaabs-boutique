import React, { Component } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { HomeIcon, ShoppingCartIcon, HeartIcon, UserIcon } from "react-native-heroicons/outline"
import SingleProduct from './screens/Store/Product/SingleProduct';
import MyCart from './screens/Store/Product/MyCart';
import CheckoutLoggedIn from './screens/loggedIn/CheckoutLoggedIn';
import AllProducts from './screens/Store/Product/AllProducts';
import Settings from './screens/Settings';
import Favourites from './screens/Store/Product/Favourites';
import AddCreditCard from './screens/Store/AddCreditCard';
import CheckoutNotLoggedIn from './screens/notLoggedIn/CheckoutNotLoggedIn'
import SlidingUpPanel from 'rn-sliding-up-panel';
import SlidingUp from './screens/Components/SlidingUp';
import OrderConfirmation from './screens/Store/Orders/OrderConfirmation';
import CheckEmailForVerification from './screens/notLoggedIn/CheckEmailForVerification';
import NotLoggedIn from './screens/notLoggedIn/NotLoggedIn';
import CheckoutRegister from './screens/notLoggedIn/CheckoutRegister';
import ForgottenPassword from './screens/notLoggedIn/ForgottenPassword';
import Cart from './screens/BottomTabs/Cart';
import Notifications from './screens/BottomTabs/Notifications';
import Profile from './screens/Store/Profile';
import Login from './screens/notLoggedIn/Login';
import Register from './screens/notLoggedIn/Register';
import Explore from './screens/BottomTabs/Explore';
import CheckoutLogin from './screens/notLoggedIn/CheckoutLogin';
import MyOrders from './screens/Store/Orders/MyOrders';
import { auth } from './database/Firebase';
import myDetails from './screens/loggedIn/myDetails';
import MyDetails from './screens/loggedIn/myDetails';




const Tab = createMaterialBottomTabNavigator();


const Stack = createNativeStackNavigator();

const slides = [
  {
    key: 1,
    title: 'Choose Product',
    text: 'A product is the item offered for sale. A product can be a service or an item. It can be physical or in virtual or cyber form',
    image: require('./assets/intropage1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Make Payment',
    text: 'Payment is the transfer of money services in exchange product or Payments typically made terms agreed ',
    image: require('./assets/intropage2.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 3,
    title: 'Get your order',
    text: 'Business or commerce an order is a stated intention either spoken to engage in a commercial transaction specific products ',
    image: require('./assets/intropage3.png'),
    backgroundColor: '#59b2ab',
  },
];

let user = false

export default class App extends React.Component {
  state = {
    showRealApp: false,
    loading: true,
    sender: '',
    loggedIn: false
  }
  componentDidMount() {

    AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ showRealApp: !!value, loading: false });
    });
    //   auth.onAuthStateChanged((user) => {
    //     if (user) {
    //       this.setState({loggedIn:true})
    //       user = true;
    //     } else{
    //       user = false;

    //     }
    //  });
  }

  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
      this.props.navigation.navigate('Home');
    });
  };

  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
      this.props.navigation.navigate('Home');
    });
  };

  _renderItem = ({ item }) => {
    return (
      <View className="flex-1 text-center justify-center">
        <Image source={item.image} className="w-full" style={{ resizeMode: 'contain' }} />
        <Text className="text-center font-500 p-2 font-bold" style={{ fontSize: 22 }}>{item.title}</Text>
        <Text className="text-center p-2 font-light">{item.text}</Text>

      </View>
    );
  }

  render() {



    if (this.state.loading) return <ActivityIndicator size="large" />

    if (this.state.showRealApp) {
      return (
        <NavigationContainer>
          <TailwindProvider>

            <Tab.Navigator initialRouteName="Home"
              activeColor="black"
              barStyle={{ backgroundColor: 'white' }}
            >
              <Tab.Screen name="Home" component={Explore} options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => (
                  <HomeIcon size={26} color='black' />
                ),
              }} />
              <Tab.Screen name="MyCart" component={MyCart} options={{

                tabBarLabel: 'Orders',
                tabBarIcon: () => (
                  <ShoppingCartIcon size={26} color='black' />
                ),
              }} />
              <Tab.Screen name="Favourite" component={Favourites} options={{
                tabBarLabel: 'Favourites',
                tabBarIcon: () => (
                  <HeartIcon size={26} color='black' />
                ),
              }} />
              {user ? <Tab.Screen name="Me" component={LoginStack} options={{
                tabBarLabel: 'Me',
                tabBarIcon: () => (
                  <UserIcon size={26} color='black' />
                ),
                tabBarColor: 'transparent'
              }} /> : <Tab.Screen name="Me" component={NotLoggedIn} options={{
                tabBarLabel: 'Me',
                tabBarIcon: () => (
                  <UserIcon size={26} color='black' />
                ),
                tabBarColor: 'transparent'
              }} />}

            </Tab.Navigator>
          </TailwindProvider>
        </NavigationContainer>
      );
    } else {

      return (

        <TailwindProvider>
          <AppIntroSlider showNextButton={true} renderItem={this._renderItem} bottomButton={this._renderNextButton} data={slides} onDone={this._onDone} showDoneButton={true} showSkipButton={true} />
        </TailwindProvider>
      )
    }
  }
}

// function TabNavigation() {
//   return (

//   );
// }


function LoginStack() {
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='Register' component={Register} />

    <Stack.Screen name='ForgottenPassword' component={ForgottenPassword} />

    <Stack.Screen name='Profile' component={Profile} />
    <Stack.Screen name='orders' component={MyOrders} />
    <Stack.Screen name='MyDetails' component={MyDetails} />

    <Stack.Screen name='Settings' component={Settings} />
    <Stack.Screen name='NotLoggedIn' component={NotLoggedIn} />


    

  </Stack.Navigator>


}
function StackNavigator() {
  <Stack.Navigator screenOptions={{ headerShown: false }}>

    <Stack.Screen name='Explore' component={Explore} />
    <Stack.Screen name='AllProducts' component={AllProducts} />

    <Stack.Screen name='NotLoggedIn' component={NotLoggedIn} />



    {/* <Stack.Screen name='Login' component={Login} />
  <Stack.Screen name='Register' component={Register} />

  <Stack.Screen name='ForgottenPassword' component={ForgottenPassword} /> */}

    <Stack.Screen name='CheckoutLogin' component={CheckoutLogin} />
    <Stack.Screen name='RegisterLogin' component={CheckoutRegister} />

    <Stack.Screen name='Product' component={SingleProduct} />
    <Stack.Screen name='Cart' component={Cart} />
    <Stack.Screen name='MyCart' component={MyCart} />
    <Stack.Screen name='OrderConfirm' component={OrderConfirmation} />

    <Stack.Screen name='CheckoutNotLoggedIn' component={CheckoutNotLoggedIn} />
    <Stack.Screen name='CheckoutLoggedIn' component={CheckoutLoggedIn} />
    <Stack.Screen name='Notifications' component={Notifications} />
    <Stack.Screen name='Settings' component={Settings} />
    <Stack.Screen name='Favourite' component={Favourites} />
    <Stack.Screen name='CheckEmail' component={CheckEmailForVerification} />

    {/* <Stack.Screen name='AllProducts' component={AllProducts} /> */}

    <Stack.Screen name='add-credit-card' component={AddCreditCard} />
    <Stack.Screen name='Checkout-logged-out' component={CheckoutNotLoggedIn} />
    <Stack.Screen name='Checkout-logged-in' component={CheckoutLoggedIn} />

    <Stack.Screen name='SlidingUp' component={SlidingUp} />
{/* 
    <Stack.Screen name='Profile' component={Profile} />
    <Stack.Screen name='orders' component={MyOrders} />
    <Stack.Screen name='MyDetails' component={MyDetails} /> */}

  </Stack.Navigator>
}

// function LoggedInTabNavigation() {
//   return (
//     <Tab.Navigator initialRouteName="Home"
//       activeColor="black"
//       barStyle={{ backgroundColor: 'white' }}
//     >
//       <Tab.Screen name="Home" component={Explore} options={{
//         tabBarLabel: 'Home',
//         tabBarIcon: () => (
//           <HomeIcon size={26} color='black' />
//         ),
//       }} />
//       <Tab.Screen name="MyCart" component={MyCart} options={{

//         tabBarLabel: 'Orders',
//         tabBarIcon: () => (
//           <ShoppingCartIcon size={26} color='black' />
//         ),
//       }} />
//       <Tab.Screen name="Favourite" component={Favourites} options={{
//         tabBarLabel: 'Favourites',
//         tabBarIcon: () => (
//           <HeartIcon size={26} color='black' />
//         ),
//       }} />
//     <Tab.Screen name="Me" component={Profile} options={{
//         tabBarLabel: 'Me',
//         tabBarIcon: () => (
//           <UserIcon size={26} color='black' />
//         ),
//         tabBarColor: 'transparent'
//       }} />
//     </Tab.Navigator>
//   );
// }

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //[...]
});