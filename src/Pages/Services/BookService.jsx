import React from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import ScreenLoading from '../../Components/Animation/ScreenLoading/ScreenLoading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BookService = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance();
    const axiosSecure = useAxiosSecure();

    const { data: service = {}, isLoading } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services/${id}`);
            return res.data;
        }
    });

     const { register, handleSubmit } = useForm();

    if (isLoading) {
        return (
            <ScreenLoading />
        );
    }


    const handleBookNow = (data) => {
        const bookingInfo = {
            client_name: user.name,
            client_email: user.email,
            client_number: data.client_number || 'N/A',
            serviceId: service.service_id,
            service_name: service.service_name,
            service_category: data.service_category,
            booking_cost: data.service_cost,
            booking_region: data.booking_region || 'N/A',
            booking_district: data.booking_district || 'N/A',
            client_massage: data.client_message || 'N/A',
            booking_date : data.booking_date,
        }
        axiosSecure.post('/bookings', bookingInfo)
            .then(res => {
                console.log(res);
                navigate('/dashboard/my-bookings')
            })
            .catch(err=> console.log(err))
        
    }


   


    return (
        <MySection>
            <MyContainer>
                <div className='w-full h-ful border'>
                     <h1 className='text-2xl md:text-3xl font-semibold text-center'>Book Now</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 border'>
                        {/* Form Start */}
                        <form onSubmit={handleSubmit(handleBookNow)} className='p-4 space-y-2'>
                            {/* Service Nmae */}
                        <label>Service Name</label>
                        <input
                          {...register("service_name", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={service.service_name}
                            readOnly
                            />
                            {/* Service Nmae */}
                        <label>Service Category</label>
                        <input
                          {...register("service_category", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text capitalize"
                            placeholder="your name"
                            value={service.service_category}
                            readOnly
                            />
                            
                            {/* Name */}
                        <label>Your Name</label>
                        <input
                          {...register("client_name", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={user.displayName}
                            readOnly
                        />
                            {/* Email */}
                        <label>Your Email</label>
                        <input
                          {...register("client_email", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={user.email}
                            readOnly
                            />
                        {/* Cost */}
                        <input
                          {...register("service_cost", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={service.cost} 
                            readOnly
                            />
                            <label>Booking Date</label>
                            {/* Date */}
                            <input {...register('booking_date')} type="date" className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"  />
                            
                            <button type='submit' className='transition duration-300 py-1.5 md:py-2 px-2 md:px-4 text-md md:text-[16px] rounded-sm border-2 border-primary hover:bg-primary bg-transparent hover:text-base-200 cursor-pointer'>Confirm Booking</button>
                       
                        </form>
                        
                        <div>

                        </div>
                    </div>
                </div>
            </MyContainer>
        </MySection>
    );
};

export default BookService;