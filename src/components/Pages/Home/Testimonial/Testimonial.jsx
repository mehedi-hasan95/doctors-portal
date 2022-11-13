import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import client1 from '../../../assets/images/people1.png';
import client2 from '../../../assets/images/people2.png';
import client3 from '../../../assets/images/people3.png';
import TestimonialDetails from './TestimonialDetails';

const Testimonial = () => {
    const testimonialData = [
        {
            _id : 1,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: client1,
            name: 'John Doe',
            city: 'Jessore'
        },
        {
            _id : 2,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: client2,
            name: 'Ambar Hard',
            city: 'Jessore'
        },
        {
            _id : 3,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: client3,
            name: 'Winson Herry',
            city: 'Jessore'
        },
    ]
    return (
        <div className='mb-16'>
            <div className='flex justify-between items-center py-10'>
                <div className='p-5'>
                    <h2 className='text-secondery-50 font-bold text-xl'>Testimonial</h2>
                    <h3 className='text-3xl pb-7'>What Our Patients Says</h3>
                </div>
                <img className=' w-32' src={quote} alt="" />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    testimonialData.map(testmon => <TestimonialDetails key={testmon._id} testmon={testmon}></TestimonialDetails>)
                }
            </div>
        </div>
    );
};

export default Testimonial;