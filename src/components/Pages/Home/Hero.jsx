import React from 'react';
import doctor from '../../assets/images/chair.png'

const Hero = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-14 md:my-24 lg:my-32'>
            <div>
                <h2 className="text-primery font-bold text-5xl max-w-xl">Your New Smile Starts Here</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                <button className='custom-btn inline-block mt-8'>GET STARTED</button>
            </div>
            <div>
                <img src={doctor} alt="" />
            </div>
        </section>
    );
};

export default Hero;