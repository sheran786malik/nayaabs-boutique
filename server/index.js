const express = require('express');
const Stripe = require('stripe')

const app = express();
// var bodyParser = require('body-parser')


app.use(express.json());
app.use(express.urlencoded());

const port = 3000;

const PUBLISHABLE_KEY = 'pk_test_zwFUyFfgNCxmXH5iRevmvVPM';
const SECRET_KEY = 'sk_test_k6G7nr6SWO2jwc3rh8NIYJmC';

const stripe = Stripe(SECRET_KEY, {apiVersion:"2020-08-27"});

app.listen(port, () => {
    console.log('App online')
})

app.post("/create-payment-intent", async (req, res) => {
    console.log(req.body)
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount:1000,
            currency:"GBP",
            payment_method_types:["card"],
        })

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret:clientSecret
        });
    } catch(e){
        console.log(e.message)
        res.json({error:e.message})
    }
})

app.get('/', (req, res) => {
    res.send('Hello')
})