import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const payments = useLoaderData();
    const { patient, service, price, time } = payments;
    return (
        <div>
            <h2 className='text-xl'><span className='font-bold'>Patient Name:</span> {patient}</h2>
            <p className='py-3'>{patient}, you have book {service} on {time}</p>
            <p><span className='font-semibold'>Total Price:</span> {price}</p>
            <div className='w-96 p-5 rounded-lg border mt-7'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm payments={payments} />
                </Elements>

            </div>
        </div>
    );
};

export default Payment;