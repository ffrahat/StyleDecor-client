import React from 'react';
import styleDecorLogo from '../../../assets/style-deco-logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/' className='h-6 md:h-8 flex'>
            <img className='h-full' src={styleDecorLogo} alt="" /><span className='text-xl md:text-2xl inline-block -ml-3 font-semibold'>tyle<span className='text-primary'>Decor</span></span>
        </Link>
    );
};

export default Logo;