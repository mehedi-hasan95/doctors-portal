import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import CardInfo from './CardInfo';

const Card = () => {
    const cardData = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: clock,
            bgClass: 'bg-accent'
        },
        {
            id: 2,
            name: 'Our Locations',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: marker,
            bgClass: 'bg-primery'
        },
        {
            id: 3,
            name: 'Contact Us',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: phone,
            bgClass: 'bg-accent'
        },
    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                cardData.map(card => <CardInfo key={card.id} card={card}></CardInfo>)
            }
        </div>
    );
};

export default Card;