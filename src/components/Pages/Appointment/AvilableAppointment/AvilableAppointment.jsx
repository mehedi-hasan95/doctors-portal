import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, {  useState } from 'react';
import BookingModal from '../../BookingModal/BookingModal';
import AvilableSlot from './AvilableSlot/AvilableSlot';

const AvilableAppointment = ({selectDate}) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectDate, 'PP');

    const {data: avilableSlot, isLoading, refetch} = useQuery({
        queryKey: ['apointmentOptions', date],
        queryFn: () => 
        fetch (`https://doctors-portal-server-rose-six.vercel.app/apointmentOptions?date=${date}`)
        .then (res => res.json())
    })
    if (isLoading) return 'Loading...'
    return (
        <div className='py-24'>
            <p className=' text-secondery-50 text-xl text-center'>Available Appointments on {format(selectDate, 'PP')}.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    avilableSlot.map(slot => <AvilableSlot key={slot._id} slot={slot} setTreatment={setTreatment}></AvilableSlot>)
                }
            </div>
            {
                treatment && <BookingModal treatment={treatment} refetch={refetch} selectDate={selectDate} setTreatment={setTreatment}></BookingModal>
            }
        </div>
    );
};

export default AvilableAppointment;