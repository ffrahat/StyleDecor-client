import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://style-decor-server.vercel.app'
})

const useAxiosInstance = () => {
    return axiosInstance;
};

export default useAxiosInstance;