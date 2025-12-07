import React from 'react';
import { useParams } from 'react-router';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { useForm } from 'react-hook-form';

const BookService = () => {
    const { id } = useParams();
    const axiosInstance = useAxiosInstance();

    const { data: service = {}, isLoading } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services/${id}`);
            return res.data;
        }
    });

     const { register } = useForm();

    if (isLoading) {
        return (
            <ScreenLoading />
        );
    }


   


    return (
        <MySection>
            <MyContainer>
                <div className='w-full h-ful border'>
                     <h1 className='text-2xl md:text-3xl font-semibold text-center'>Book Now</h1>
                    <form>
                        <label>Service Name</label>
                        <input
                          {...register("service_name", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={service.service_name}
                            readOnly
                        />
                       

                    </form>
                </div>
            </MyContainer>
        </MySection>
    );
};

export default BookService;