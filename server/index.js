const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
// const { initializeApp, cert } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const bodyParser = require("body-parser");

// const firebaseConfig = {
//   // apiKey: "AIzaSyCxRZUrTnNTnBU43J38-gDkKied8ZsxQ2M",
//   // authDomain: "nayaabs-boutique.firebaseapp.com",
//   // projectId: "nayaabs-boutique",
//   // storageBucket: "nayaabs-boutique.appspot.com",
//   // messagingSenderId: "1877362286",
//   // appId: "1:1877362286:web:a2e5ea4769e6830ae6887f",
//   // measurementId: "G-0P4LKD0K3R",
//   credential: cert(
//     require("./nayaabs-boutique-firebase-adminsdk-n1e5a-b6e918793b.json")
//   ),
// };
// initializeApp(firebaseConfig);

// const db = getFirestore();

// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// const api = new WooCommerceRestApi({
//   url: "https://www.nayaabsboutique.co.uk", // Your store URL
//   consumerKey: "ck_c764e4eb4c728056d92f6c0e5df5fa5538eda89f", // Your consumer secret
//   consumerSecret: "cs_3ad4bef3f1c68ef0a3b7f725bd9a8c5ae56dc215", // Your consumer secret
// });

const port = 3000;

const PUBLISHABLE_KEY = "pk_test_zwFUyFfgNCxmXH5iRevmvVPM";
const SECRET_KEY = "sk_test_k6G7nr6SWO2jwc3rh8NIYJmC";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// const productDetails = {};
// const numberOfProducts = 20;

app.listen(port, () => {
  console.log("App online");
});

app.post("/create-payment-intent", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.totalPrice * 100,
      currency: "GBP",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

// app.get("/getProductsForUser", async (req, res) => {
//   const productDetails = {};
//   const numberOfProducts = 25;
//   api
//     .get("products", {
//       per_page: numberOfProducts, // 20 products per page
//     })
//     .then((response) => {
//       // Successful request
//       db.collection("users")
//         .doc(req.query.userID)
//         .collection("products")
//         .doc("0")
//         .get()
//         .then((data) => {
//           const info = data.data();
//           if (data.exists()) {
//             // let favourite = [];
//             // for (let i = 0; i < info.Products.length; i++) {
//             //   if (info.Products[i].favourite) {
//             //     favourite.push(info.Products[i].favourite);
//             //   } else {
//             //     favourite.push(false);
//             //   }
//             // }

//             var key = "Products";
//             productDetails[key] = [];
//             var data;

//             for (let index = 0; index < numberOfProducts; index++) {
//               productDetails[key].push({
//                 id: response.data[index].id,
//                 name: response.data[index].name,
//                 image: response.data[index].images[0].src,
//                 // favourite: favourite[index],
//                 price: response.data[index].price,
//                 category: response.data[index].categories[0].name,
//                 description: response.data[index].description,
//               });
//             }
//             res.send(productDetails);
//           }
//         })
//         .catch((error) => {
//           // Invalid request, for 4xx and 5xx statuses
//           console.log("Response Status:", error);
//         })
//         .finally(() => {
//           // Always executed.
//         });
//     });
// });

// app.get("/getProducts", async (req, res) => {
//   const productDetails = {};
//   const numberOfProducts = 30;
//   api
//     .get("products", {
//       per_page: numberOfProducts, // 20 products per page
//     })
//     .then((response) => {
//       // Successful request
//       var key = "Products";
//       productDetails[key] = [];
//       var data;

//       for (let index = 0; index < numberOfProducts; index++) {
//         productDetails[key].push({
//           id: response.data[index].id,
//           name: response.data[index].name,
//           image: response.data[index].images[0].src,
//           price: response.data[index].price,
//           category: response.data[index].categories[0].name,
//           description: response.data[index].description,
//         });
//       }
//       res.send(productDetails);
//     })

//     .catch((error) => {
//       // Invalid request, for 4xx and 5xx statuses
//       console.log("Response Status:", error);
//     })
//     .finally(() => {
//       // Always executed.
//     });
// });
