
import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
    return (
        <div>
            <SectionTitle title={"Payment"}></SectionTitle>
           <div>
                <Elements stripe={stripePromise}>
                       <CheckoutForm/>
                </Elements>
           </div>
        </div>
    );
};

export default Payment;