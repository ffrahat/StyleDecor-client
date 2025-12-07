import React from 'react';

const MySection = ({children}) => {
    return (
        <section className='my-5 py-5 '>
            {children}
        </section>
    );
};

export default MySection;