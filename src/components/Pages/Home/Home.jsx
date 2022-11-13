import React from 'react';
import Card from './Card/Card';
import Hero from './Hero';
import MakeAppointment from './MakeAppointment/MakeAppointment';
import Message from './Message/Message';
import Services from './Services/Services';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='px-5'>
            <Hero />
            <Card />
            <Services />
            <MakeAppointment />
            <Testimonial />
            <Message />
        </div>
    );
};

export default Home;