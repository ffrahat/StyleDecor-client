import React from 'react';

const MyContainer = ({children}) => {
    return (
        <div className='px-2 md:px-6 max-w-7xl mx-auto'>
            {children}
        </div>
    );
};

export default MyContainer;