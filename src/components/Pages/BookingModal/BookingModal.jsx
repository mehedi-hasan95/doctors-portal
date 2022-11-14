import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, setTreatment, selectDate }) => {
    const { name, slots } = treatment;
    const selectedDate = format(selectDate, 'PP');

    const handleModal = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.options.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;


        const booking = {
            service: treatment.name,
            patient: name,
            phone, email,
            time: slot,
            appointmentDate: selectedDate,
        }
        console.log(booking);
        setTreatment(null);
    }

    return (
        <>
            <input type="checkbox" id="open-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="open-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleModal} className='grid grid-cols-1 gap-5 mt-7'>
                        
                            <input type="text" name='date' value={selectedDate} className="disabled input input-bordered w-full" />
                            <select name='options' className="select select-bordered w-full">
                                {
                                    slots.map((slot, idx) => <option key={idx}>{slot}</option>)
                                }
                            </select>
                            <input type="text" name='name' placeholder="Full Name" className="input input-bordered w-full" />
                            <input type="tel" name="phone" placeholder='Your Phone' className="input input-bordered w-full" required />
                            <input type="email" name="email" placeholder='Your Email' className="input input-bordered w-full" required />
                            <input type="submit" className='bg-slate-600 py-3 cursor-pointer rounded-lg text-white font-semibold' value="Submit" />
                        
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;