import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';



const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})



const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        // Req Interseptors
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
        })

        // Response Interceptors
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },

            (error) => {
                console.log(error)


                return Promise.reject(error);
            }
        )
        

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }
         
    },[user])

    return axiosSecure;
};

export default useAxiosSecure;