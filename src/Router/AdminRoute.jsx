import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import ScreenLoading from '../Components/Animation/ScreenLoading/ScreenLoading';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const { role, isLoading: roleLoading } = useRole();

    if (loading || roleLoading) {
        return <ScreenLoading />
    }

    if (!user || role !== 'admin') {
        return <Navigate to='/' />
    }

        

    return children;
};

export default AdminRoute;