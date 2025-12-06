import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({children, to, className}) => {
    return (
        <NavLink to={to} className={({isActive})=> `font-semibold underline-offset-4 ${className} ${isActive ? 'text-primary underline' : ''} `}>{children}</NavLink>
    );
};

export default MyLink;