import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const MyAppointments = () => {
    const {user, logOut} = useContext(AuthContext);
    const url = `http://localhost:5000/booking?email=${user?.email}`;

    const {data: booking = []} = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: () => {
            fetch(url, {
                headers: {
                    authorization: `bearar ${localStorage.getItem('appointmentToken')}`
                }
            })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            } )
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