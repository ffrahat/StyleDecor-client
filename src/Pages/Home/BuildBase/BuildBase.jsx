import React from 'react';
import MySection from '../../../Layouts/MySection';
import MyContainer from '../../../Layouts/MyContainer';
import build1img from '../../../assets/box1.webp';
import build2img from '../../../assets/box2.webp';
import build3img from '../../../assets/box-3.webp';
import { ArrowRight } from 'lucide-react';
import { BsArrowRight } from 'react-icons/bs';

const BuildBase = () => {
    const builds = [
        {
            image: build1img,
            title: 'Places to get lost',
            details: 'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at'
        },
        {
            image: build2img,
            title: 'Perfect Design',
            details: 'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at'
        },
        {
            image: build3img,
            title: 'Happy Clients',
            details: 'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at'
        },
    ]
    return (
        <MySection>
            <MyContainer>
                <div className='w-full space-y-2 mb-9'>
                    <p className='text-center uppercase font-semibold text-gray-500 leading-snug'>How TO</p>
                    <h1 className='text-center text-4xl font-semibold'>Build Your Base</h1>
                    <span className='block h-1 mx-auto w-10 bg-secondary'></span>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {builds.map((build, i) => 
                    
                        <div className=' space-y-3' key={i}> 
                            <div className='h-[300px]'>
                                <img className='h-full w-full object-cover rounded-sm' src={build.image} alt="" />
                            </div>
                            <h1 className='font-semibold text-xl md:text-2xl'><span className='text-2xl md:text-3xl text-secondary'>0{i + 1}</span> {build.title}</h1>
                            <p className='text-gray-500'>{build?.details}</p>
                            <span className="text-primary font-semibold flex gap-2 items-center cursor-pointer group">
                                See More
                                <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </span>

                        </div>
                    )}
                </div>
            </MyContainer>
        </MySection>
    );
};

export default BuildBase;