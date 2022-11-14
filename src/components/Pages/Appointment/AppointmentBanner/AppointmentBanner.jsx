import React from 'react';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({ selectDate, setSelectDate }) => {
    return (
        <div style={{ background: `url(${bg})` }}>
            <div className='block md:flex max-w-4xl mx-auto py-20'>
                <div className='w-full md:w-1/2'>
                    <DayPicker
                        mode="single"
                        selected={selectDate}
                        onSelect={setSelectDate}
                    />
                </div>
                <img className='w-full md:w-1/2' src={chair} alt="" />
            </div>
        </div>
    );
};

export default AppointmentBanner;