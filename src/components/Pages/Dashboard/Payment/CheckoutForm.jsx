import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, {  useState } from 'react';

const CheckoutForm = ({payments}) => {
    const [cardError, setCardError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const {price} = payments;

    

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
            {
                cardError && <p className="text-red-500 mt-2">{cardError}</p>
            }
            <button className='btn btn-primary btn-sm mt-3' type="submit" disabled={!stripe }>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;