import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { useParams } from 'react-router';
import { Calendar, UserRound, Tag, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import ScreenLoading from '../../Components/Animation/ScreenLoading/ScreenLoading';

const ServiceDetails = () => {
    const { id } = useParams();
    const axiosInstance = useAxiosInstance();

    const { data: service = {}, isLoading } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <ScreenLoading />
        );
    }

    return (
        <MySection>
            <MyContainer>

                {/* Back Button */}
                <Link to="/services" className="flex items-center gap-2 text-primary hover:underline mb-5">
                    <ArrowLeft size={18} /> Back to Services
                </Link>

                {/* Banner */}
                <div className='w-full h-[350px] rounded-xl overflow-hidden shadow-lg'>
                    <img 
                        src={service?.images?.[0]?.url} 
                        alt={service?.images?.[0]?.alt}
                        className='w-full h-full object-cover'
                    />
                </div>

                {/* Content */}
                <div className="mt-8 space-y-6">

                    {/* Title + Category */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl md:text-4xl font-bold capitalize">
                            {service.service_name}
                        </h1>

                        <span className="px-3 py-1 text-sm rounded-full bg-secondary/20 text-secondary font-medium capitalize">
                            {service.service_category}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="text-2xl font-semibold text-primary">
                        {service.cost} {service.currency} 
                        <span className="text-gray-500 text-base font-normal"> / {service.unit}</span>
                    </div>

                    {/*  BOOK NOW BUTTON  */}
                    <div>
                        <Link 
                            to={`/book-service/${service._id}`}
                            className="
                                inline-block 
                                bg-primary 
                                text-white 
                                font-semibold 
                                px-6 py-3 
                                rounded-lg 
                                shadow-md 
                                hover:bg-primary/90 
                                active:scale-95 
                                transition 
                                duration-200
                            "
                        >
                            Book Now
                        </Link>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {service.description}
                    </p>

                    {/* Extra Info */}
                    <div className="border rounded-xl p-4 md:p-5 bg-gray-50 space-y-3">

                        <div className="flex items-center gap-3 text-gray-600">
                            <UserRound size={20} />
                            <span className="text-sm">
                                Added by: <span className="font-medium">{service.createdByEmail}</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <Calendar size={20} />
                            <span className="text-sm">
                                Created: {new Date(service.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <Tag size={20} />
                            <span className="text-sm capitalize">Category: {service.service_category}</span>
                        </div>
                        
                    </div>

                </div>
            </MyContainer>
        </MySection>
    );
};

export default ServiceDetails;
