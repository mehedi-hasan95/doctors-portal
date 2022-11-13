import React from 'react';
import messageBg from '../../../assets/images/appointment.png';

const Message = () => {
    return (
        <div style={{ background: `url(${messageBg})` }} className='py-10 md:py-15 lg:py-20'>
            <h2 className='text-secondery-50 font-bold text-center text-xl'>Contact Us</h2>
            <h3 className='text-white text-center text-3xl font-semibold pb-7'>Stay connected with us</h3>
            <form className=''>
                <div className='w-full md:w-96 mx-auto flex flex-col gap-5'>
                    <input className='px-3 py-2 rounded-lg' type="email" name="email" id=""  placeholder='Your Email'/>
                    <input className='px-3 py-2 rounded-lg' type="text" name="text" id=""  placeholder='Subject'/>
                    <textarea className='rounded-lg px-3 py-2' name="message" placeholder='Your Message'></textarea>
                </div>
                <button className='custom-btn mx-auto block mt-7'>Submit</button>
            </form>
        </div>
    );
};

export default Message;