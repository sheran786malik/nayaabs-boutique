const express = require("express");
const Stripe = require("stripe");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const firebaseConfig = {
  // apiKey: "AIzaSyCxRZUrTnNTnBU43J38-gDkKied8ZsxQ2M",
  // authDomain: "nayaabs-boutique.firebaseapp.com",
  // projectId: "nayaabs-boutique",
  // storageBucket: "nayaabs-boutique.appspot.com",
  // messagingSenderId: "1877362286",
  // appId: "1:1877362286:web:a2e5ea4769e6830ae6887f",
  // measurementId: "G-0P4LKD0K3R",
  credential: cert(
    require("./nayaabs-boutique-firebase-adminsdk-n1e5a-b6e918793b.json")
  ),
};
initializeApp(firebaseConfig);

const db = getFirestore();

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "https://www.nayaabsboutique.co.uk", // Your store URL
  consumerKey: "ck_c764e4eb4c728056d92f6c0e5df5fa5538eda89f", // Your consumer secret
  consumerSecret: "cs_3ad4bef3f1c68ef0a3b7f725bd9a8c5ae56dc215", // Your consumer secret
});
const app = express();
// var bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded());

const port = 3000;

const PUBLISHABLE_KEY = "pk_test_zwFUyFfgNCxmXH5iRevmvVPM";
const SECRET_KEY = "sk_test_k6G7nr6SWO2jwc3rh8NIYJmC";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

const productDetails = {};
const numberOfProducts = 20;

const getProducts = () => {
  return productDetails;
};

async function addProductsForUser(userID) {
  return productDetails;
}

app.listen(port, () => {
  console.log("App online");
});

app.get("/products", async (req, res) => {
  // List products
});

app.post("/addToWishlist", async (req, res) => {
  const id = req.query.id;

  //   for (var index = 0; index < productDetails.length; index++) {
  //     if (productDetails[index].id === id) {
  //       res.send("Found item");
  //     } else {
  //       res.send("Not Found item");
  //     }
  //   }

  //   res.send(id);

  res.send(productDetails);
});

app.post("/create-payment-intent", async (req, res) => {
  console.log(req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
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

app.get("/getProductsForUser", async (req, res) => {
  const productDetails = {};
  const numberOfProducts = 25;
  api
    .get("products", {
      per_page: numberOfProducts, // 20 products per page
    })
    .then((response) => {
      // Successful request

      var key = "Products";
      productDetails[key] = [];
      var data;

      for (let index = 0; index < numberOfProducts; index++) {
        productDetails[key].push({
          id: response.data[index].id,
          name: response.data[index].name,
          image: response.data[index].images[0].src,
          price: response.data[index].price,
          favourite: false,
          category: response.data[index].categories[0].name,
        });
      }
      db.collection("users")
        .doc(req.query.userID)
        .collection("products")
        .doc("0")
        .set({ productDetails });

      res.send(productDetails);
    })

    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log("Response Status:", error);
    })
    .finally(() => {
      // Always executed.
    });
});

app.post("/add-to-wishlist", (req, res) => {
  const todaysDate = new Date();
  const today = todaysDate.getDate();
  db.collection("users")
    .doc(req.query.userID)
    .collection("wishlist")
    .doc("0")
    .set(req.query.data);
});

app.get("/getWishlist", async (req, res) => {
  const userID = req.query.userID;
  const products = {};

  db.collection("users")
    .doc(userID)
    .collection("wishlist")
    .get()
    .then((snapshot) => res.json(snapshot.docs.map((doc) => doc.data())));
});

app.get("/getProducts", async (req, res) => {
  const productDetails = {};
  const numberOfProducts = 40;
  api
    .get("products", {
      per_page: numberOfProducts, // 20 products per page
    })
    .then((response) => {
      // Successful request

      var key = "Products";
      productDetails[key] = [];
      var data;

      for (let index = 0; index < numberOfProducts; index++) {
        productDetails[key].push({
          id: response.data[index].id,
          name: response.data[index].name,
          image: response.data[index].images[0].src,
          price: response.data[index].price,
          category: response.data[index].categories[0].name,
        });
      }
      res.send(productDetails);
    })

    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log("Response Status:", error);
    })
    .finally(() => {
      // Always executed.
    });
});
