import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const AddDoctor = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const uploadImage = process.env.REACT_APP_image_host;


    const onSubmit = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${uploadImage}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const doctors = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        image: imgData.data.url

                    }
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('appointmentToken')}`
                        },
                        body: JSON.stringify(doctors),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if(data.acknowledged) {
                                toast.success('Doctor create sucessfully', {autoClose: 1000});
                                navigate('/dashboard/mangagedoctors');
                            }
                        })
                }
            })
    }

    // Load doctors service from api
    const { data: appointmentnames = [] } = useQuery({
        queryKey: ['appointmentname'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentname`);
            const data = await res.json()
            if( data.status === 403 || data.status === 401 ) {
                return logOut();
            }
            return data;
        }
    })
    return (
        <div className='p-5'>
            <div className='w-96'>
                <h2 className='text-3xl mb-10'>Add Doctor</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", { required: "Doctor Name is Required", })} placeholder='Enter Your Name' type="text" name='name' className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-500' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className='label'>
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Doctor Email is Required", })} type="email" name="email" placeholder='Your Email' className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-96">
                        <label className="label">
                            <span className="label-text">Specility</span>
                        </label>
                        <select className="select select-bordered" {...register("speciality", { required: "Please choose a service", })}>
                            {
                                appointmentnames.map(appointmentname => <option
                                    key={appointmentname._id}
                                    value={appointmentname.name}
                                >{appointmentname.name}</option>)
                            }
                        </select>
                    </div>
                    <fieldset className="w-96 space-y-1 dark:text-gray-100">
                        <label className="block text-sm font-medium">Attachments</label>
                        <div className="flex">
                            <input {...register("image", { required: "Upload your Photo", })} type="file" className="px-8 w-96 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" />
                        </div>
                    </fieldset>
                    <input type="submit" className='py-3 bg-primery-50 cursor-pointer block w-full mt-5 rounded-lg text-white font-semibold' value="Add Doctor" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;