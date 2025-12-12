import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    const {isLoading, data : role='user'} = useQuery({
        queryKey: ['user-role' , user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res.data.role;
        }
    })

    console.log('in the useRoll' , role)
    return {isLoading, role};
};

export default useRole;