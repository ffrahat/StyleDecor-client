import Lottie from 'lottie-react';
import React from 'react';
import loadingAnimation from './ScreenLoading.json';

const ScreenLoading = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            {/* Animation Lottie */}
            <Lottie animationData={loadingAnimation}>

            </Lottie>
        </div>
    );
};

export default ScreenLoading;