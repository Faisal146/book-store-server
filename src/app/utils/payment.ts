const SSLCommerzPayment = require('sslcommerz-lts');

import { TOrder } from '../modules/order/order.interface';
import mongoose from 'mongoose';
import config from '../config';

export const payment = (Orderdata: TOrder) => {
  console.log('ordering');
  const tran_id = new mongoose.Types.ObjectId();

  const store_id = config.store_id;
  const store_passwd = config.store_password;
  const is_live = false; //true for live, false for sandbox

  const data = {
    total_amount: Orderdata.totalPrice,
    currency: 'BDT',
    tran_id, // use unique tran_id for each api call
    success_url: 'http://localhost:3030/success',
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  console.log(sslcz);

  sslcz
    .init(data)
    .then((apiResponse: any) => {
      // Redirect the user to the payment gateway
      const GatewayPageURL = apiResponse.GatewayPageURL;
      console.log('Redirecting to: ', GatewayPageURL);
    })
    .catch((error: any) => {
      console.error('Error occurred during payment initiation: ', error);
    });
};
