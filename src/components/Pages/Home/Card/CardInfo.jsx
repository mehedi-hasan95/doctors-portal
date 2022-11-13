import React from 'react';

const CardInfo = ({card}) => {
    const {name, icon, description, bgClass} = card;
    return (
        <div className= {` flex items-center ${bgClass} rounded-xl px-5 py-10 gap-5 `}>
            <img className='w-20 h-20' src={icon} alt="" />
            <div>
                <h2 className='font-bold text-xl text-white'>{name}</h2>
                <p className='text-white'>{description}</p>
            </div>
        </div>
    );
};

export default CardInfo;