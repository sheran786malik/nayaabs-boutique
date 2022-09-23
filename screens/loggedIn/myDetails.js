import {
  Button,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Component } from "react";
import Header from "../Components/Header/Header";
import Form from "../Components/MyDetails/Form";
import DatePicker from "react-native-date-picker";
import {
  AdjustmentsIcon,
  UserIcon,
  SearchIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MailIcon,
  UserCircleIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from "react-native-heroicons/outline";
import { auth, db } from "../../external/Firebase";

export default class MyDetails extends Component {
  state = {
    date: new Date(),
    open: false,
    userDetails: [],

    emailAddress: "",
    address: "",
    phoneNo: "",
    fullName: "",
    userID: "",
  };

  updateDetails() {
    db.collection("users")
      .doc(this.state.userID)
      .set({
        emailAddress: this.state.emailAddress,
        address: this.state.address,
        phoneNo: this.state.phoneNo,
        fullName: this.state.fullName,
      })
      .then((data) => {
        alert("Changes have been made successfully");
        this.props.navigation.navigate("MyDetails");
      })
      .catch((error) => {
        alert("An error has occured");
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((querySnapshot) => {
            let userDetails = [];
            this.setState({
              emailAddress: querySnapshot.data().emailAddress,
              address: querySnapshot.data().address,
              phoneNo: querySnapshot.data().phoneNo,
              fullName: querySnapshot.data().fullName,
            });
          });
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }
  render() {
    return (
      <SafeAreaView>
        <View className="bg-white">
          <Header
            title={"My Details"}
            navigation={this.props.navigation}
            pageToGoBackTo="Profile"
          />
        </View>

        <Form Icon={UserIcon} size="30">
          <TextInput
            placeholder="Please enter name"
            value={this.state.fullName}
            onChangeText={(e) => this.setState({ fullName: e })}
          />
        </Form>

        <Form Icon={MailIcon} size="30">
          <TextInput
            placeholder="Please enter email"
            value={this.state.emailAddress}
            onChangeText={(e) => this.setState({ emailAddress: e })}
          />
        </Form>

        <Form Icon={LocationMarkerIcon} size="30">
          <TextInput
            style={{ height: 45, fontFamily: "Ubunutu", width: "80%" }}
            placeholder="Enter Address"
            multiline={true}
            editable={true}
            numberOfLines={5}
            value={this.state.address}
            onChangeText={(e) => this.setState({ address: e })}
          />
        </Form>
        <Form Icon={PhoneIcon} size="30">
          <TextInput
            placeholder="Please enter mobile number"
            value={this.state.phoneNo}
            onChangeText={(e) => this.setState({ phoneNo: e })}
          />
        </Form>

        <TouchableOpacity
          onPress={() => this.updateDetails()}
          className="bg-black p-5 w-80 self-center rounded-3xl mt-5"
        >
          <Text
            className="text-center"
            style={{ color: "white", fontWeight: "600" }}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
