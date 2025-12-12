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
import PaymentSuccess from '../Pages/Dashboard/Payments/PaymentSuccess';
import MyProfile from '../Pages/Dashboard/MyProfile/MyProfile';
import About from '../Pages/About/About';
import ManageBookings from '../Pages/Dashboard/AdminPages/ManageBookings';
import ManageDecorators from '../Pages/Dashboard/AdminPages/ManageDecorators';
import EarningSummery from '../Pages/Dashboard/DecoratorsPage/EarningSummery';
import MyAssingedProject from '../Pages/Dashboard/DecoratorsPage/MyAssingedProjects';
import ManageUsers from '../Pages/Dashboard/AdminPages/ManageUsers';
import ManageServices from '../Pages/Dashboard/AdminPages/ManageServices';
import AddServiceForm from '../Pages/Dashboard/AdminPages/AddServicesForm';
import DashboardLayout2 from '../Layouts/MyLay';
import EditService from '../Pages/Dashboard/AdminPages/EditService';
import DecoratorApplications from '../Pages/DecoratorApplications/DecoratorApplications';
import AdminRoute from './AdminRoute';




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
                path: 'about',
                Component: About
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
            },
            {
                path: 'decorator-apply',
                element: <PrivateRouter><DecoratorApplications /></PrivateRouter>
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
        element: <PrivateRouter> <DashboardLayout2 /> </PrivateRouter>,
        children: [
            {
                path: 'my-profile', //users
                Component: MyProfile
            },
            {
                path: 'my-bookings', //users
                element: <MyBookings />
            },
            {
                path: 'payment-success', //users
                Component: PaymentSuccess
            },
            {
                path: 'earnings-summery', //decoratros00
                Component: EarningSummery
            },
            {
                path: 'my-assigned-projects', //decoratros00
                Component: MyAssingedProject
            },
            {
                path: 'manage-services', //admin00
                element: <AdminRoute><ManageServices /></AdminRoute>
            },
            {
                path: 'add-new-service', //admin00
                element: <AdminRoute><AddServiceForm /></AdminRoute>
            },
            {
                path: 'edit-service/:id', //admin00
                element: <AdminRoute><EditService /></AdminRoute>
            },
            {
                path: 'manage-users', //admin00
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'manage-bookings', //admin
                element: <AdminRoute><ManageBookings /></AdminRoute>
            },
            {
                path: 'manage-decorators', //admin
                element: <AdminRoute><ManageDecorators /></AdminRoute>
            }
        ]
    }
]);


export default router;