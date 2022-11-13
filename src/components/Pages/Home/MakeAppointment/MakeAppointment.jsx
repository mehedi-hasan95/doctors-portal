import React from 'react';
import doctor from '../../../assets/images/doctor.png';
import appointment from '../../../assets/images/appointment.png';

const MakeAppointment = () => {
    return (
        <div style={{ background: `url(${appointment})` }} >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-5'>
                <img className='-mt-40 hidden md:block' src={doctor} alt="" />
                <div>
                    <h4 className='text-secondery-50 text-xl font-bold'>Appointment</h4>
                    <h3 className="text-3xl text-white font-semibold py-5">Make an appointment Today</h3>
                    <p className='text-white'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <button className=' custom-btn inline-block mt-7'>GET STARTED</button>
                </div>
            </div>
        </div>
    );
};

export default MakeAppointment;