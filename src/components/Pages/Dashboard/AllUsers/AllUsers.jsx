import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import ConformationModal from '../../Common/ConformationModal';

const AllUsers = () => {
    const {logOut} = useContext(AuthContext);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`);
            const data = await res.json();
            if( data.status === 403 || data.status === 401 ) {
                return logOut;
            }
            return data;
        }
    })

    // Update user role 
    const updateUser = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearar ${localStorage.getItem('appointmentToken')}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success('User set as Admin', { autoClose: 1000 });
                    refetch();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // User Delete 
    // title, message, closeModal, confirmDelete, doctorData, successModal 
    const [deleteUser, setDeleteUser] = useState(null);
    const closeModal = () => {
        setDeleteUser(null);
    }
    const confirmDelete = doctor => {
        fetch(`http://localhost:5000/users/${doctor._id}`, {
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
            <h2>All Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => updateUser(user._id)} className='btn btn-primary'>Make Admin</button>}</td>
                                <td><label onClick={() => setDeleteUser(user)} htmlFor="conform-modal" className='btn btn-active'>Delete</label></td>
                            </tr>)
                        }
                    </tbody>
                    {
                        deleteUser && <ConformationModal
                            title={'Do you want to delete the user?'}
                            message={`If you want to remove ${deleteUser.name}, please confirm Delete`}
                            successModal="Delete"
                            closeModal={closeModal}
                            doctorData={deleteUser}
                            confirmDelete={confirmDelete}
                        ></ConformationModal>
                    }
                </table>
            </div>
        </div>
    );
};

export default AllUsers;