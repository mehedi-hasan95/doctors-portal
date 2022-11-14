import React from 'react';

const AvilableSlot = ({slot, setTreatment}) => {
    const {name, slots} = slot;
    return (
        <div className='text-center shadow-lg rounded-lg py-10'>
            <h4 className=' text-secondery-50 text-xl font-semibold'>{name}</h4>
            <p className='py-3'>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
            <p>{slots.length} {slots.length > 1 ? 'slots' : 'slot'} avilable</p>
            <label onClick={() => setTreatment(slot)} htmlFor="open-modal" className="custom-btn inline-block cursor-pointer mt-5">Book Appointment</label>
        </div>
    );
};

export default AvilableSlot;