import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvilableAppointment from '../AvilableAppointment/AvilableAppointment';

const Appointment = () => {
    const [selectDate, setSelectDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner selectDate={selectDate} setSelectDate={setSelectDate} />
            <AvilableAppointment selectDate={selectDate} />
        </div>
    );
};

export default Appointment;