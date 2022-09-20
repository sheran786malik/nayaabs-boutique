import { Text, View } from "react-native";
import React, { Component } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxRZUrTnNTnBU43J38-gDkKied8ZsxQ2M",
  authDomain: "nayaabs-boutique.firebaseapp.com",
  projectId: "nayaabs-boutique",
  storageBucket: "nayaabs-boutique.appspot.com",
  messagingSenderId: "1877362286",
  appId: "1:1877362286:web:a2e5ea4769e6830ae6887f",
  measurementId: "G-0P4LKD0K3R",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

// export const getData = () =>{
//     // const data = []
//     // db.collection('products')
//     // .get().then((querySnapshot) => {
//     //     querySnapshot.forEach(snapshot => {
//     //         data.push(snapshot.data())
//     // })})
//     // return data;

// }

export { db, auth };
