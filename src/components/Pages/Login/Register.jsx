import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';

const Register = () => {
    const { createUser, updateUser, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Implement JWT
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    if(token) {
        navigate('/');
    }

    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = data => {
        setError('')
        createUser(data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        sendUser(data.name, data.email)
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });
                toast.success("Sucessfully create user", { autoClose: 500 });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    // Send datA to the DB
    const sendUser = (name, email) => {
        const user = {name, email};
        fetch('http://localhost:5000/users', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            setCreatedUserEmail(email);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }



    // Login with google 

    const provider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        googleLogin(provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                const errorMessage = error.message;
            });
    }


    return (
        <div className='lg:h-[800px] items-center flex mx-auto max-w-md px-5'>
            <div className='w-full'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", { required: "Name is Required", })} type="text" name='name' className="input input-bordered w-full" />
                    </div>
                    {errors.name && <p className='text-red-500' role="alert">{errors.name?.message}</p>}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email is Required" })} aria-invalid={errors.email ? "true" : "false"} type="email" name='email' className="input input-bordered w-full" />
                    </div>
                    {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", {
                            required: "Password is Required", minLength: { value: 6, message: "Password should more than 6 characters" },
                            pattern: { value: /^(?=.*\d)/, message: "Password Should have a number" },

                        })} type="password" name='password' className="input input-bordered w-full" />
                    </div>
                    {errors.password && <span className='text-red-500' role="alert">{errors.password.message}</span>}
                    {error && <p className='text-red-500'>{error}</p>}
                    <input className=' bg-primery text-white cursor-pointer py-3 block w-full rounded-lg mt-7' type="submit" value='Register' />
                </form>
                <p className='text-center mt-4'>New to Doctors Portal? <Link className=' text-secondery-50' to='/login'>Login</Link></p>
                <p className='text-center my-4'>OR</p>
                <button onClick={loginWithGoogle} className='border border-gray-700 rounded-lg py-3 w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Register;