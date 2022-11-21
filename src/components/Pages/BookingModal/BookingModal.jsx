import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectDate, refetch }) => {
    const {user} = useContext(AuthContext);
    const { name, slots, price } = treatment;
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
            price,
        }


        fetch('http://localhost:5000/booking', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        })
            .then((response) => response.json())
            .then((data) => {
                
                if(data.acknowledged) {
                    toast.success("You have successfully book your spot", {autoClose: 500});
                    setTreatment(null);
                    refetch();
                }
                else {
                    setTreatment(null);
                    toast.error(data.message, {autoClose: 1000})
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        
    }

    return (
        <>
            <input type="checkbox" id="open-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="open-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleModal} className='grid grid-cols-1 gap-5 mt-7'>

                        <input type="text" name='date' value={selectedDate} disabled className="input input-bordered w-full" />
                        <select name='options' className="select select-bordered w-full">
                            {
                                slots.map((slot, idx) => <option key={idx}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name='name' defaultValue={user?.displayName} disabled placeholder="Full Name" className="input input-bordered w-full" />
                        <input type="tel" name="phone" placeholder='Your Phone' className="input input-bordered w-full" required />
                        <input type="email" name="email" defaultValue={user?.email} disabled placeholder='Your Email' className="input input-bordered w-full" required />
                        <p><span className='font-bold'>Price</span> ${price}</p>
                        <input type="submit" className='bg-slate-600 py-3 cursor-pointer rounded-lg text-white font-semibold' value="Submit" />

                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;