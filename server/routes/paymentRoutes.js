import express from 'express';
import stripe from 'stripe';

const router = express.Router();

const stripeSecretKey = process.env.STRIPE_SECRET_TEST;
const stripeClient = stripe('sk_test_51NFsC8KTXQ5TRT44t84DGO6Mr1MQV83913ERz3iq6wecMsi6sa8ppzb0x07DuZvTHbdzMSz4vpoUBJKhkZca4Ut700ExqaziLu');

router.post('/charge', async (req, res) => {
  console.log('stripe-routes.js 9 | route reached', req.body);
  let { amount, paymentMethodId, shipping_address, customer, line_items } = req.body;
  console.log('stripe-routes.js 10 | amount and paymentMethodId', amount, paymentMethodId);
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount,
      currency: 'USD',
      description: 'Zoy Shop',
      payment_method: paymentMethodId,
      confirm: true,
      shipping: {
        name: customer.name,
        address: {
          line1: shipping_address.address,
          city: shipping_address.city,
          postal_code: shipping_address.postalCode,
          country: shipping_address.country,
        },
      },
      metadata: {
        customer_name: customer.name,
        customer_email: customer.email,
        line_items: JSON.stringify(line_items),
      },
    });
    console.log('stripe-routes.js 19 | paymentIntent', paymentIntent);
    res.json({
      message: 'Payment Successful',
      success: true,
    });
  } catch (error) {
    console.log('stripe-routes.js 17 | error', error);
    res.json({
      message: 'Payment Failed',
      success: false,
    });
  }
});

export default router;
