import WooCommerceAPI from 'react-native-woocommerce-api';

export const WooCommerce = new WooCommerceAPI({
    url: 'https://www.nayaabsboutique.co.uk', // Your store URL
    ssl: true,
    consumerKey: 'ck_c764e4eb4c728056d92f6c0e5df5fa5538eda89f', // Your consumer secret
    consumerSecret: 'cs_3ad4bef3f1c68ef0a3b7f725bd9a8c5ae56dc215', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
  });
