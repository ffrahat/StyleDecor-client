import React from 'react';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';

const SignUp = () => {
    const { signUpUser } = useAuth();
    const { register, handleSubmit } = useForm();
    
    const handleSignUp = (data) => {
        const email = data.email;
        const password = data.password;
        console.log(data)
        // create user
        signUpUser(email, password)
            .then(res => {
            console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        
    }

    return (
        <div className='mb-5 pb-5 md:pb-0 md:m-0' >
            <div className='space-y-2 text-center'>
                <h1 className='text-2xl md:text-4xl font-semibold'>Welcome Back</h1>
                <p>Please Register Account</p>
                <Link to='/login'>
                    Already have an account? <span className='text-primary underline'>Login</span>
                </Link>
            </div>
            
            <form onSubmit={handleSubmit(handleSignUp)} className='max-w-[400px] mt-10 space-y-5'>
                <input
                    {...register('imageUrl', {required: true, })}
                    type="file"
                    className="file-input w-full"
                />
                <label >Name</label>
                <input
                     {...register('name', {required: true, })}
                    className='w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm'
                    type="text"
                    placeholder='your name' />
                <label>Email</label>
                <input
                    {...register('email', {required: true, })}
                    className='w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm'
                    type="text"
                    placeholder='your@email.com'
                />
                <label>Password</label>
                <input
                    {...register('password', {required: true, })}
                    className='w-full p-2  border border-gray-400 focus:outline-primary rounded-sm'
                    type="text"
                    placeholder='********' />
                <button type='submit' className='w-full transition duration-300 py-2 rounded-sm border-2 border-primary bg-primary hover:bg-transparent hover:text-primary cursor-pointer'>Login</button>
            </form>

            <div className='flex gap-3 items-center my-5'>
                <div className='flex-1 border-t border-gray-300'></div>
                <p>Or</p>
                <div className='flex-1 border-t border-gray-300'></div>
            </div>

            <SocialLogin />
        </div>
    );
};

export default SignUp;