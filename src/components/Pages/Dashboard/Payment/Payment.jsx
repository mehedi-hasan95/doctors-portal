import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const payments = useLoaderData();
    const {patient, service, price, time} = payments;
    return (
        <div>
            <h2 className='text-xl'><span className='font-bold'>Patient Name:</span> {patient}</h2>
            <p className='py-3'>{patient}, you have book {service} on {time}</p>
            <p><span className='font-semibold'>Total Price:</span> {price}</p>
        </div>
    );
};

export default Payment;