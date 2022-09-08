import { ActivityIndicator, Dimensions, FlatList, Platform, Image, ImageBackground, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useRef } from 'react'
import { AdjustmentsIcon, ChevronLeftIcon, SearchIcon, BellIcon, DesktopComputerIcon } from "react-native-heroicons/outline"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import SlidingUpPanel from 'rn-sliding-up-panel';
import { AntDesign } from 'react-native-vector-icons'
import { auth, db } from '../../database/Firebase';

import Header from '../Components/Header/Header';
import Tabs from '../Components/Explore/Tabs';
import SearchBox from '../Components/Explore/SearchBox';
import CardItem from '../Components/Explore/Card';
import Card from '../Components/Explore/Card';


import WooCommerceAPI from 'react-native-woocommerce-api';
import { getAllProducts, WooCommerce } from '../../database/WoocommerceAPI';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ListOfClothes from '../Components/Explore/ListOfClothes';
import { List } from 'react-native-paper';

// export const DATA = [{
//     "id": 1,
//     "title": "Long Sleeve Shirts",
//     "quantity": 1,
//     "price": 165,
//     "size": "xs",
//     "image": require(`../../assets/shirt.png`),
//     "category": "Stitched",
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": true,
// }, {
//     "id": 2,
//     "title": "Hilary",
//     "quantity": 1,
//     "size": "xs",
//     "category": "Unstitched",
//     "image": require(`../../assets/shirt.png`),
//     "price": 7.64,
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": true,
// }, {
//     "id": 3,
//     "title": "Brand",
//     "quantity": 1,
//     "size": "xs",
//     "category": "Stitched",
//     "image": require(`../../assets/shirt.png`),
//     "price": 6.40,
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": true,
// }, {
//     "id": 4,
//     "title": "Marj",
//     "quantity": 1,
//     "size": "xs",
//     "category": "Unstitched",
//     "image": require(`../../assets/shirt.png`),
//     "price": 8.54,
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": false,
// }, {
//     "id": 5,
//     "title": "Delmar",
//     "quantity": 1,
//     "size": "xs",
//     "category": "Stitched",
//     "image": require(`../../assets/shirt.png`),
//     "price": 8.26,
//     "description": "A Henley shirt is a collarless pullover shirt, by a round neckline and a placket about 3 to 5 inches (8 to 13 cm) long and usually having 2–5 buttons.",
//     "favourite": false,
// }]


export default class Explore extends Component {
    constructor(props) {
        super(props);


    }

    state = {
        selectedButton: '',
        casualList: [],
        readyToWearList: [],
        seeAll: false,

        allProducts: [],
        filteredProducts: [],
        searchActivated: false,
        selected: '',

        data: [],

        user: []

    }

    componentDidMount() {
        this.fetchInfo();
    }
    fetchInfo = async () => {
        let productList = []

        WooCommerce.get('products', { per_page: 100 })
            .then(data => {

                this.setState({ data: data, filteredProducts: data })

            })
            .then((data) => {
                let readyToWearList = []
                let casualList = []
                for (let index = 0; index < this.state.data.length; index++) {
                    if (this.state.data[index].categories[0].name == "Ready to Wear") {

                        casualList.push(this.state.data[index])
                    } else if (this.state.data[index].categories[0].name == "Unstitched") {

                        readyToWearList.push(this.state.data[index])
                    }
                    this.setState({ readyToWearList: readyToWearList, casualList: casualList })
                }
            })
    }
    // }
    goToProduct(product) {
        this.props.navigation.navigate('Product')
        AsyncStorage.setItem('product', JSON.stringify(product));
        this.props.navigation.navigate('Product')
        console.log(product);
    }

    searchProducts(product) {
        this.setState({ searchActivated: true })
        if (product) {
            const newData = this.state.data.filter(item => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = product.toUpperCase();
                return itemData.indexOf(textData) > -1;

            })
            this.setState({ filteredProducts: newData })

        } else {
            this.setState({ filteredProducts: this.state.data })

        }
    }


    like = (item) => {
        console.log('like')
    }

    dislike = (item) => {
        console.log('dislike')
    }
    render() {


        const renderItem = ({ item }) => (
            <View className='bg-grey m-2 rounded-md'>
                <Item id={item.id} title={item.title} quantity={item.quantity} favourite={item.favourite} size={item.size} category={item.category} image={item.image} price={item.price} description={item.description} />
            </View>
        );


        const Item = ({ id, name, image, price, description, quantity, size, favourite }) => (


            <Card>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Product', {
                    productID: id,
                })}>

                    {favourite ?
                        <AntDesign style={{ zIndex: 999, position: 'absolute', right: 10, top: 10, }} name='heart' size={30} color='black' />
                        :
                        <AntDesign style={{ zIndex: 999, position: 'absolute', right: 10, top: 10, }} name='hearto' size={30} color='black' />
                    }


                    <Image className='w-full p-10' style={{ resizeMode: 'contain', height: Dimensions.get('screen').height / 4, }} source={{ uri: image }} />


                    <View className='flex-row justify-between p-3 space-x-4'>
                        <Text className='self-end w-32' style={{ fontSize: 18, textAlign: 'left' }}>{name}</Text>
                        <Text className='font-bold' style={{ fontSize: 20 }}>{price}</Text>

                    </View>
                </TouchableOpacity>

            </Card>
        )





        return (


            <View style={styles.container}>

                <ScrollView>
                    <View className='flex-row justify-end w-100 p-4'>
                        <Header
                            explore={true}
                            navigation={this.props.navigation}
                        />
                    </View>
                    <View className='flex-1'>

                        <Text className='font-semibold p-5' style={{ fontSize: 30 }}>Explore</Text>
                        <Text className='font-400 p-5' style={{ color: 'lightgray' }}>Best suits for you</Text>



                        <View>
                            <Tabs>

                                <TouchableOpacity className='p-6 rounded-2xl w-36 mr-3' onPress={() => this.setState({ selected: 'Stitched' })} style={{ borderWidth: 1, borderColor: 'black', backgroundColor: this.state.selected === 'Stitched' ? "black" : "white" }}>
                                    <Text className='text-center' style={{ fontSize: 14, fontWeight: 'bold', color: this.state.selected === 'Stitched' ? "white" : "black" }}>Stitched</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className='p-6 rounded-2xl w-36' onPress={() => this.setState({ selected: 'Unstitched' })} style={{ borderWidth: 1, borderColor: 'black', backgroundColor: this.state.selected === 'Unstitched' ? "black" : "white" }}>
                                    <Text className='text-center' style={{ fontSize: 14, fontWeight: 'bold', color: this.state.selected === 'Unstitched' ? "white" : "black" }}>Unstitched</Text>
                                </TouchableOpacity>
                            </Tabs>

                            <View className='flex-row justify-between'>
                                <View className='self-center'>
                                    <Text className='font-semibold self-center' style={{ fontSize: 20 }}>New Arrivals</Text>
                                </View>
                                <View className='self-center'>
                                    <TouchableOpacity onPress={() => this._panel.show()}>
                                        <Text className='font-light self-center' style={{ fontSize: 15 }}>See All</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            
                            {this.state.casualList && this.state.readyToWearList && this.state.data? <ListOfClothes
                                selected={this.state.selected}
                                casualList={this.state.casualList}
                                readyToWearList={this.state.readyToWearList} />
                                :
                                <View>
                                    <ActivityIndicator size={'large'} color='black' />
                                </View>}




                        </View>

                    </View>

                </ScrollView>
                <SlidingUpPanel ref={c => (this._panel = c)}>
                    {dragHandler => (
                        <SafeAreaView style={styles.container}>
                            <View style={{ marginTop: 50 }} />

                            <SafeAreaView className='self-center'>
                                <View className='flex-row justify-between w-60 p-4'>
                                    <TouchableOpacity onPress={() => this._panel.hide()}>

                                        <ChevronLeftIcon className='' size={30} color='black' />

                                    </TouchableOpacity>
                                    <Text className='self-center' style={{ fontWeight: '600', fontSize: 20 }}>All Clothing </Text>


                                </View>
                                <SearchBox>

                                    <View className='flex-row self-center' >
                                        <SearchIcon

                                            size={25}
                                            color='darkgrey' />
                                        <TextInput placeholder='Search Items'
                                            style={{
                                                color: 'darkgrey',
                                                fontWeight: '500',
                                                opacity: 0.5,
                                                fontSize: 20
                                            }}
                                            onFocus={() => this.setState({ searchActivated: true })}
                                            onBlur={() => this.setState({ searchActivated: false })}
                                            onChangeText={(item) => this.searchProducts(item)} />
                                    </View>

                                    {/* <TouchableOpacity className='bg-black p-2 rounded-xl'>
                                        <AdjustmentsIcon style={{ transform: [{ rotate: '90deg' }] }} size={20} color='white' className='self-center' />

                                    </TouchableOpacity> */}


                                </SearchBox>

                                {/* <FlatList
                                    numColumns={2}
                                    data={this.state.filteredProducts}
                                    renderItem={renderAllProducts}
                                /> */}
                                <ListOfClothes
                                    filteredProducts={this.state.filteredProducts}
                                    numColumns={2} />

                            </SafeAreaView>


                        </SafeAreaView>

                    )}
                </SlidingUpPanel>





            </View>

        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#FBFBFD',
        alignItems: 'center',
        justifyContent: 'center',
        top: 20
    }
}