import React from 'react';
import { Link } from 'react-router';
import Logo from '../../UI/Logo/Logo';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className='px-0 border-t border-gray-100 bg-[#F8FAFF] text-gray-500 '>
            <div className='px-2 md:px-6 max-w-7xl mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-10'>
                {/* Grid 1 */}
                <div >
                    <Logo />
                    <div className='flex mt-5 flex-col gap-2.5'>
                        <p>Lorem ipsum  Vitae assumenda quae, ea dolorum atque impedit animi earum temporibus veniam. Nemo!</p>
                    <div className='flex items-center gap-4 text-primary '>
                        <a className='p-2 rounded-full bg-blue-50 hover:bg-blue-100' href="#"><SiFacebook /></a>
                        <a className='p-2 rounded-full bg-blue-50 hover:bg-blue-100' href="#"><SiX /></a>
                        <a className='p-2 rounded-full bg-blue-50 hover:bg-blue-100' href="#"><SiInstagram /></a>
                        <a className='p-2 rounded-full bg-blue-50 hover:bg-blue-100' href="#"><SiLinkedin /></a>
                    </div>
                    </div>
                </div>
                {/* Grid 2 */}
                <div>
                    <h1 className='mb-5 font-semibold text-xl text-base-content'>Quick Links</h1>
                    <div className="flex flex-col gap-2.5">
                        <Link className="transition-colors duration-300 hover:text-primary">Home</Link>
                        <Link className="transition-colors duration-300 hover:text-primary">Featured Products</Link>
                        <Link className="transition-colors duration-300 hover:text-primary">My Cart</Link>
                        <Link className="transition-colors duration-300 hover:text-primary">Profile</Link>
                    </div>

              
                </div>
                {/* Grid 3 */}
                <div>
                    <h1 className='mb-5 font-semibold text-xl text-base-content'>Support</h1>
                    <div className="flex flex-col gap-3">
                        <Link className="transition-colors duration-300 hover:text-primary">FAQ</Link>
                        <Link className="transition-colors duration-300 hover:text-primary">Contact Us</Link>
                        <Link className="transition-colors duration-300 hover:text-primary">Privacy Policy</Link>
                        <Link className="transition-colors duration-300 hover:text-primary">Terms & Conditions</Link>
                    </div>
                </div>
                {/* Grid 4 */}
                <div>
                    <h1 className='font-semibold text-xl mb-5  text-base-content'>Get in Touch</h1>
                    <div className='flex flex-col gap-4 '>
                        <span className='flex items-end gap-4'>
                        <IoLocationOutline className='text-primary text-xl' />Jamalpur, Bangladesh
                    </span>
                    <a href="tel:+8801979922268" className='flex items-end gap-4'>
                        <IoCallOutline className='text-primary text-xl' />+880 1979-922268
                    </a>
                    <a href="mailto:mahialam408@gmail.com" className='flex items-end gap-4'>
                        <MdOutlineEmail className='text-primary text-xl' /> support@smart-decor.com
                    </a>
                    </div>
                </div>

            </div>
            <div className='w-full p-5 md:px-20 bg-black md:flex justify-between space-y-2 text-center text-white'>
                <p>© 2025 <span className='text-primary'>Drexly Store</span>. All Rights Reserved.</p>
                <p>Developed with ❤️ by <span className="text-primary">Mahialam Rahat</span>.</p>
            </div>
        </footer>
    );
};

export default Footer;