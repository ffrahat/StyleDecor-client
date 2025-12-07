import React from 'react';
import useAuth from '../Hooks/useAuth';
import ScreenLoading from '../Components/Animation/ScreenLoading/ScreenLoading';
import { useNavigate } from 'react-router';

const PrivateRouter = ({children}) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    if (loading) {
        return <ScreenLoading />
    }

    if (!user) {
        navigate('/login')
    }

    if (user && user.email) {
        return children;
    }
};

export default PrivateRouter;