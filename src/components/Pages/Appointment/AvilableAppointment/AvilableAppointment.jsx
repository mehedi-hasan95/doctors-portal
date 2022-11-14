import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../../BookingModal/BookingModal';
import AvilableSlot from './AvilableSlot/AvilableSlot';

const AvilableAppointment = ({selectDate}) => {
    const [avilableSlot, setAvilableSlot] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect( () => {
        fetch ('avilableData.json')
        .then (res => res.json())
        .then (data => setAvilableSlot(data));
    },[])
    return (
        <div className='py-24'>
            <p className=' text-secondery-50 text-xl text-center'>Available Appointments on {format(selectDate, 'PP')}.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    avilableSlot.map(slot => <AvilableSlot key={slot._id} slot={slot} setTreatment={setTreatment}></AvilableSlot>)
                }
            </div>
            {
                treatment && <BookingModal treatment={treatment} selectDate={selectDate} setTreatment={setTreatment}></BookingModal>
            }
        </div>
    );
};

export default AvilableAppointment;