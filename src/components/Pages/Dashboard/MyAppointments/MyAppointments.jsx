import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const MyAppointments = () => {
    const {user, logOut} = useContext(AuthContext);
    const url = `http://localhost:5000/booking?email=${user?.email}`;

    const {data: booking = []} = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearar ${localStorage.getItem('appointmentToken')}`
                }
            });
            const data = await res.json();
            // if(data.status === 401 || data.status === 401) {
            //     return logOut();
            // }
            return data
        }
    })

    return (
        <div>
            <h2>My appointments</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.map((book, idx) => <tr key={idx}>
                                <th>{idx+1}</th>
                                <td>{book.patient}</td>
                                <td>{book.appointmentDate}</td>
                                <td>{book.time}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;