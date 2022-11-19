import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ManageDoctors = () => {
    const { data: manageDoctors = [] } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearar ${localStorage.getItem('appointmentToken')}`
                    },
                })
                const data = await res.json()
                return data;
            }
            catch (error) {

            }
        }
    })
    return (
        <div>
            <h2 className='text-3xl'>Manage Doctors</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>AVATAR</th>
                            <th>Name</th>
                            <th>SPECIALITY</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageDoctors.map((doctor, idx) => <tr key={doctor._id}>
                                <th>{idx + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className=" w-16 rounded-full">
                                            <img alt={doctor.name} src={doctor.image} />
                                        </div>
                                    </div>
                                </th>
                                <td>{doctor.name}</td>
                                <td>{doctor.speciality}</td>
                                <td><button className='btn btn-sm'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;