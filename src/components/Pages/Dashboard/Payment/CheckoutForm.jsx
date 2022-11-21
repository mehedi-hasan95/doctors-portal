import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ payments }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('')
    const [paymentId, setPaymentId] = useState('');
    const [paymentLoadding, setPaymentLoadding] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { price, patient, email } = payments;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearar ${localStorage.getItem('appointmentToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }

        setPaymentSuccess('');
        setPaymentLoadding(true)
        const {paymentIntent, paymentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: patient,
                  email: email,
                },
              },
            },
        );
        if(paymentError) {
            setCardError(paymentError.message);
            return
        }
        if(paymentIntent.status === "succeeded" ) {
            setPaymentSuccess('You have successfully perchess');
            setPaymentId(`Your Payment id is ${paymentIntent.id}`)
        }
        setPaymentLoadding(false)
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary btn-sm mt-3' type="submit" disabled={!stripe || !clientSecret || paymentLoadding}>
                Pay
            </button>
            {
                cardError && <p className="text-red-500 mt-2">{cardError}</p>
            }
            {
                paymentSuccess && <div className='text-green-500 mt-2 font-semibold'>
                    <p>{paymentSuccess}</p>
                    <p>{paymentId}</p>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;