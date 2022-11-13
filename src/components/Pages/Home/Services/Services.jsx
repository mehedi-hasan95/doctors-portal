import React from 'react';
import cavity from '../../../assets/images/cavity.png';
import fluoride from '../../../assets/images/fluoride.png';
import whitening from '../../../assets/images/whitening.png';
import treatment from '../../../assets/images/treatment.png'
import ServicesInfo from './ServicesInfo';

const Services = () => {

    const serviceData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: cavity,
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: fluoride,
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: 'Open 9.00 am to 5.00pm everyday',
            icon: whitening,
        },
    ]
    return (
        <div className='my-15 md:my-20 lg:my-28'>
            <div className='text-center mb-10'>
                <h4 className='text-secondery-50 text-xl font-bold'>OUR SERVICES</h4>
                <h3 className='text-primery text-3xl'>Services We Provide</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    serviceData.map(service => <ServicesInfo key={service.id} service={service}></ServicesInfo>)
                }
            </div>
            <section className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center my-14 md:my-24 lg:my-32'>
                <div>
                    <img className='rounded-lg' src={treatment} alt="" />
                </div>
                <div>
                    <h2 className="text-primery font-bold text-5xl max-w-xl mb-4">Exceptional Dental Care, on Your Terms</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <button className='custom-btn inline-block mt-8'>GET STARTED</button>
                </div>
            </section>
        </div>
    );
};

export default Services;