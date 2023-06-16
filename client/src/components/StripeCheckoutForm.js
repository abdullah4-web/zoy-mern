import React from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NFsC8KTXQ5TRT44AwVQKjEFqFoQCDswXmGQQXclOr9SVgXkCPAp9HRE4IaKMXIgg21aTv2tjdgDG0PqXp0KvOss00pQm6aiPm');

const StripeCheckoutForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Handle the payment submission
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw new Error(error.message);
      }

      // Call the onSuccess callback with the paymentMethod object
      onSuccess(paymentMethod);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      <button type="submit" disabled={!stripe}>
        Pay ${amount / 100}
      </button>
    </form>
  );
};

export default function StripeCheckoutWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm {...props} />
    </Elements>
  );
}
