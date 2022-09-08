import { ScrollView, SafeAreaView, Dimensions, Image, FlatList, Text, View, TouchableOpacity } from 'react-native'
import React, { Component, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DATA } from '../../BottomTabs/Explore';
import { BellIcon, TrashIcon, ChevronLeftIcon, HeartIcon, PlusIcon, MinusIcon, ThumbDownIcon, ShoppingCartIcon, EyeIcon } from 'react-native-heroicons/outline';
import Header from '../../Components/Header/Header';


export default class MyCart extends Component {

  state = {
    cartItems: [],
    total: 0,
    product: [],
    itemsExist: false
  }

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    let items = await AsyncStorage.getItem("cartItems");

    this.setState({ cartItems: JSON.parse(items), itemsExist: true })
   

    if (items == null || items.length < 3) {
      this.setState({ cartItems: JSON.parse(items), itemsExist: false })
    } else {
      this.setState({ cartItems: JSON.parse(items), itemsExist: true })
      this.getTotal(items)
    }
    console.log(this.state.cartItems, 'cartitems')



  };

  increaseQuantity(id) {
    //get the current list
    //point to quantity
    //increase the increment whenever this method is called
    //lets try

    let existingList = this.state.cartItems;
    const index = this.state.cartItems.findIndex(data => data.id === id)
    existingList[index].quantity++;
    AsyncStorage.setItem('cartItems', JSON.stringify(existingList))
    this.retrieveData()

  }

  decreaseQuantity = async (id) => {
    //get the current list
    //point to quantity
    //increase the increment whenever this method is called
    //lets try
    let existingList = this.state.cartItems;
    const index = this.state.cartItems.findIndex(data => data.id === id)
    if (existingList[index].quantity > 1) {
      existingList[index].quantity--;
      AsyncStorage.setItem('cartItems', JSON.stringify(existingList))
      this.retrieveData()
    } else if (existingList[index].quantity == 0) {
      existingList[index].quantity--;
      this.removeItem(id)
    }



  }
  removeItem = async id => {

    if (this.state.cartItems) {
      for (let index = 0; index < this.state.cartItems.length; index++) {
        if (this.state.cartItems[index].id == id) {
          this.state.cartItems.splice(index, 1);

        }
        await AsyncStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
        this.retrieveData()


      }
    }
  };

  getTotal = productData => {
    //subtotal is the price * the quantity of all the products involved
    //lets try
    this.setState({ total: this.state.cartItems.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0) })
  }

  render() {

    const Item = ({ id, name, image, price, size, quantity }) => (

      <SafeAreaView>
        <View className='rounded-3xl justify-evenly flex-row' style={{ backgroundColor: '#fff' }}>

          <View>
            <Image source={{ uri: image}} style={{ width: 100, height: 100, resizeMode: 'contain', margin: 8 }} />

          </View>

          <View className='flex-col justify-evenly'>
            <Text className='w-52' style={{ fontSize: 14, color: 'black', opacity: 0.5 }}>{name}</Text>

            <Text style={{}} className='font-bold'>{price}</Text>
            <Text style={{}} className='font-bold'>{size}</Text>
            <View className='flex-end'>
              <TouchableOpacity onPress={() => this.removeItem(id)}>
                <TrashIcon size={30} color='grey' />
              </TouchableOpacity>
            </View>

          </View>

          <View className='flex-row self-center justify-center pr-5'>

            <TouchableOpacity onPress={() => this.increaseQuantity(id)} className='rounded-xl p-2 self-center' style={{ backgroundColor: 'lightgrey' }}>
              <PlusIcon className='self-center' size={10} color={'black'} />
            </TouchableOpacity>
            <Text className='p-2' style={{ fontSize: 14 }}>{quantity}</Text>
            <TouchableOpacity onPress={() => this.decreaseQuantity(id)} className='rounded-xl p-2 self-center' style={{ backgroundColor: 'lightgrey' }}>
              <MinusIcon size={10} color={'black'} />
            </TouchableOpacity>

          </View>






        </View>



      </SafeAreaView>
    )

    const renderItem = ({ item }) => (
      <View className='bg-grey m-2 rounded-md'>
        <Item id={item.id} name={item.title} size={item.size} quantity={item.quantity} image={item.image} price={item.price} />
      </View>
    );


    if (this.state.itemsExist == true) {
      return (

        <SafeAreaView style={{
          backgroundColor: '#FBFBFD',
          flex: 1,
        }}>

          <Header title='My Cart' navigation={this.props.navigation} pageToGoBackTo={'Explore'} />

          <FlatList
            data={this.state.cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={false}
          />

          <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 20

          }}>
            <Text style={{
              fontSize: 14
            }}>Subtotal :</Text>
            <Text style={{
              fontSize: 18,
              fontWeight: '500'
            }}>£{this.state.total.toFixed(2)}</Text>

          </View>
          <TouchableOpacity
            className='bg-black p-5 w-80 self-center rounded-3xl mt-5'
            // disabled={true} 
            onPress={() => this.props.navigation.navigate('CheckoutLoggedIn')}>
            <Text className='text-center' style={{ color: 'white', fontWeight: '600' }}>Checkout</Text>
          </TouchableOpacity>


        </SafeAreaView>

      )
    } else if (this.state.itemsExist == false) {
      return (
        <SafeAreaView className='flex-1'>
          <View style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,

          }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack('Product')}>
              <ChevronLeftIcon
                size={20}
                style={{
                  fontSize: 18,

                  padding: 12,
                  borderRadius: 12
                }}
              />
            </TouchableOpacity>
            <View className='self-center' style={{ justifyContent: 'center' }}>
              <Text className='text-center self-center '>My Cart</Text>
            </View>


          </View>


          <View className='top-1/2 self-center'>

            <Text className='font-bold' style={{ fontSize: 25 }}>Sorry, your cart is empty</Text>

            <TouchableOpacity disabled={this.state.itemsExist} className='bg-black p-5 m-3 rounded-xl' onPress={() => this.props.navigation.navigate('AllProducts')}>
              <Text className='text-center' style={{ color: 'white' }}>Continue Shopping</Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>
      )
    }

  }
}