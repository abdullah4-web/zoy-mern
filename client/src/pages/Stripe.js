import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY = "YOUR_PUBLIC_TEST";

const stripeTestPromise = loadStripe('pk_test_51NFsC8KTXQ5TRT44AwVQKjEFqFoQCDswXmGQQXclOr9SVgXkCPAp9HRE4IaKMXIgg21aTv2tjdgDG0PqXp0KvOss00pQm6aiPm');

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
