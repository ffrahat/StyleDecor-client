import React from 'react';

const PrimaryBtn = ({children, className, onClick, ...props}) => {
    return (
        <button
            onClick={onClick} // ✅ handle click
            className={` ${className} transition duration-300 py-2 rounded-sm border-2 border-primary bg-primary hover:bg-transparent hover:text-primary cursor-pointer `}
            {...props} // ✅ allow other button props like type, disabled
        >
            {children}
        </button>
    );
};

export default PrimaryBtn;