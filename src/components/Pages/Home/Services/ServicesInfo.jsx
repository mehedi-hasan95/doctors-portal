import React from 'react';

const ServicesInfo = ({service}) => {
    const {name, icon, description} = service;
    return (
        <div className= {`rounded-xl px-5 py-10 shadow-md shadow-primery-50`}>
            <img className='w-20 h-20 mx-auto mb-10' src={icon} alt="" />
            <div>
                <h2 className='font-bold text-xl text-primery text-center md:text-left'>{name}</h2>
                <p className='text-primery text-center md:text-left'>{description}</p>
            </div>
        </div>
    );
};

export default ServicesInfo;