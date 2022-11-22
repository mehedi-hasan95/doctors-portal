import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import ConformationModal from '../../Common/ConformationModal';

const ManageDoctors = () => {
    const {logOut} = useContext(AuthContext);

    // Modal oper or hide 
    const [deleteDoctor, setDeleteDoctor] = useState(null);
    const closeModal = () => {
        setDeleteDoctor(null);
    }

    const { data: manageDoctors = [], refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-rose-six.vercel.app/doctors', {
                    headers: {
                        authorization: `bearar ${localStorage.getItem('appointmentToken')}`
                    },
                })
                const data = await res.json()
                if( data.status === 403 || data.status === 401 ) {
                    return logOut();
                }
                return data;
            }
            catch (error) {

            }
        }
    })

    // Delete a user
    const confirmDelete = doctor => {
        fetch(`https://doctors-portal-server-rose-six.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE', // or 'PUT'
            headers: {
                authorization: `bearar ${localStorage.getItem('appointmentToken')}`
            }
        })
        
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged) {
                    toast.success(`You have sucessfully delete ${doctor.name}`, {autoClose: 1000});
                    refetch();
                }
            })
    }
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
                                <td>
                                    <label onClick={() => setDeleteDoctor(doctor)} htmlFor="conform-modal" className="btn btn-sm">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                    {
                        deleteDoctor && <ConformationModal
                            title={'Are you sure to delete the Doctor?'}
                            message={`You are delete ${deleteDoctor.name}. Please confirm that`}
                            closeModal={closeModal}
                            doctorData={deleteDoctor}
                            successModal="Delete"
                            confirmDelete={confirmDelete}
                        ></ConformationModal>
                    }
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;