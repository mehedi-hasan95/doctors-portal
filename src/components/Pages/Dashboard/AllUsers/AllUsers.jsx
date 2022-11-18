import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`);
            const data = await res.json();
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
                if(data.modifiedCount > 0) {
                    toast.success('User set as Admin', {autoClose: 1000});
                    refetch();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                                <td>{ user?.role !== 'admin' && <button onClick={() => updateUser(user._id)} className='btn btn-primary'>Make Admin</button>}</td>
                                <td><button className='btn btn-active'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;