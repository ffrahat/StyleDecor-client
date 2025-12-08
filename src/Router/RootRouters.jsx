import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login/Login';
import AuthLayout from '../Layouts/AuthLayout';
import SignUp from '../Pages/Auth/SignUp/SignUp';
import Test from '../Test/Test';
import ScreenLoading from '../Components/Animation/ScreenLoading/ScreenLoading';
import Services from '../Pages/Services/Services';
import ServiceDetails from '../Pages/Services/ServiceDetails';
import PrivateRouter from './PrivateRouter';
import BookService from '../Pages/Services/BookService';
import DashboardLayout from '../Layouts/DashboardLayout';
import MyBookings from '../Pages/Dashboard/MyBookings/MyBookings';




const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        hydrateFallbackElement: <ScreenLoading />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'test',
                Component: Test
            },
            {
                path: 'services',
                Component: Services
            },
            {
                path: '/service-details/:id',
                Component: ServiceDetails
            },
            {
                path: '/book-service/:id',
                element: <PrivateRouter><BookService /></PrivateRouter>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'sign-up',
                Component: SignUp
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRouter> <DashboardLayout /> </PrivateRouter>,
        children: [
            {
                path: 'my-bookings',
                element: <MyBookings />
            }
        ]
    }
]);


export default router;