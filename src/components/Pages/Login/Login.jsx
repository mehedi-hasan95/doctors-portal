import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // JWT Handle
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)
    

    if(token) {
        navigate(from, { replace: true });
    }

    const { logIn, googleLogin } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        logIn(data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setLoginUserEmail(data.email)
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        console.log(data);
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
                <h2 className='text-center text-xl mb-7'>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Name is required" })} type="email" className="input input-bordered w-full" />
                    </div>
                    {errors.email &&
                        <div className="flex items-center rounded shadow-md overflow-hidden max-w-xl relative dark:bg-gray-900 dark:text-gray-100">
                            <div className="self-stretch flex items-center px-3 flex-shrink-0 dark:bg-gray-700 dark:text-violet-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div className="p-4 flex-1">
                                <h3 className="text-xl font-bold">Error</h3>
                                <p className="text-sm dark:text-gray-400">{errors.email?.message}</p>
                            </div>
                            <button className="absolute top-2 right-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 p-2 rounded cursor-pointer">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    }
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 carecter" }
                        })} type="password" className="input input-bordered w-full" />
                        <Link>Forgot Password ?</Link>
                    </div>
                    {errors.password &&
                        <div className="flex items-center rounded shadow-md overflow-hidden max-w-xl relative dark:bg-gray-900 dark:text-gray-100">
                            <div className="self-stretch flex items-center px-3 flex-shrink-0 dark:bg-gray-700 dark:text-violet-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div className="p-4 flex-1">
                                <p className="text-sm dark:text-gray-400">{errors.password?.message}</p>
                            </div>
                            <button className="absolute top-2 right-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 p-2 rounded cursor-pointer">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    }
                    <input className=' bg-primery text-white cursor-pointer py-3 block w-full rounded-lg mt-7' type="submit" value='LOGIN' />
                </form>
                <p className='text-center mt-4'>New to Doctors Portal? <Link className=' text-secondery-50' to='/register'>Create new account</Link></p>
                <p className='text-center my-4'>OR</p>
                <button onClick={loginWithGoogle} className='border border-gray-700 rounded-lg py-3 w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;