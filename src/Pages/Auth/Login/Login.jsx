import React from 'react';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import AuthContext from '../../../Context/AuthContext';

const Login = () => {

    return (
        <div className='mb-5 pb-5 md:pb-0 md:m-0' >
            <div className='space-y-2 text-center'>
                <h1 className='text-2xl md:text-4xl font-semibold'>Welcome Back</h1>
                <p>Please Login</p>
                <Link to='/sign-up'>
                    Don't have an Account? <span className='text-primary underline font-semibold'>Sign Up</span>
                </Link>
            </div>
            
            <div className='max-w-[400px] mt-10 space-y-5'>
                <label>Email</label>
                <input className='w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm' type="text" name="" id="" placeholder='your@email.com'/>
                <label>Password</label>
                <input className='w-full p-2  border border-gray-400 focus:outline-primary rounded-sm' type="text" name="" id="" placeholder='********' />
                <Link className='text-right text-primary underline inline-block w-full -mt-4 font-semibold'>Forget Password?</Link>
                <button className='w-full transition duration-300 py-2 rounded-sm border-2 border-primary bg-primary hover:bg-transparent hover:text-primary cursor-pointer'>LogIn</button>
            </div>

            <div className='flex gap-3 items-center my-5'>
                <div className='flex-1 border-t border-gray-300'></div>
                <p>Or</p>
                <div className='flex-1 border-t border-gray-300'></div>
            </div>

            <SocialLogin />
        </div>
    );
};

export default Login;