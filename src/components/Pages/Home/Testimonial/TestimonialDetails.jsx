import React from 'react';

const TestimonialDetails = ({testmon}) => {
    const {description, img, name, city} = testmon;
    return (
        <div className=' shadow-md px-7 py-10 rounded-xl'>
            <p>{description}</p>
            <div className='flex gap-5 mt-7'>
                <img className='ring-4 rounded-full w-12' src={img} alt="" />
                <div>
                    <h4 className='text-xl font-semibold'>{name}</h4>
                    <p>{city}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialDetails;