import React from 'react';
import Hero from './Hero/Hero';
import BuildBase from './BuildBase/BuildBase';
import TopDecorators from './TopDecorators/TopDecorators';
import Coverage from './Coverage/Coverage';

const Home = () => {
    return (
        <>
            <Hero />
            <BuildBase />
            <Coverage /> 
            <TopDecorators />
        </>
    );
};

export default Home;