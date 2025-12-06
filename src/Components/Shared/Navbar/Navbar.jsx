import React, { useState } from 'react';
import MyLink from '../../UI/MyLink/MyLink';
import Logo from '../../UI/Logo/Logo';
import { ShoppingCart, User } from 'lucide-react';
import { CgMenuRightAlt } from 'react-icons/cg';
import { RxCross2 } from 'react-icons/rx';

const Navbar = () => {
    const links =
        <>
            <li>
                <MyLink to='/'>Home</MyLink>
            </li>
            <li>
                <MyLink to='/all-services'>All Services</MyLink>
            </li>
        </>
    
    const [open, setOpen] = useState(false);

    return (
        <header className='sticky top-0 bg-white/85 flex w-full py-5 border-b border-gray-300/40 backdrop-blur-[2px] z-50'>
            <div className='px-4 md:px-6 mx-auto max-w-7xl flex items-center justify-between w-full'>
                {/* Mobile Menu Icon */}
                <CgMenuRightAlt onClick={()=>setOpen(!open)} size={22} className='md:hidden' />
                <Logo />

                {/* Navlinks Desktop*/}
                <nav className='hidden md:flex items-center'>
                    <ul className='flex items-center gap-10'>{links}</ul>
                </nav>


                {/* Navlinks Mobile */}
                    {open && (
                      <nav
                        onClick={() => setOpen(false)}
                        className="md:hidden fixed inset-0 z-50 h-screen w-full bg-black/40 backdrop-blur-xl"
                      >
                        <div
                          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
                          className="bg-white h-full w-[80%] p-4"
                        >
                          <p
                            onClick={() => setOpen(false)}
                            className="text-right flex items-center justify-end cursor-pointer"
                          >
                            <RxCross2 /> Close
                          </p>
                          <ul className="flex flex-col gap-5 w-full h-full">{links}</ul>
                        </div>
                      </nav>
                    )}


                <div className='flex gap-5 items-end'>
                    <div className="relative">
  <ShoppingCart className="text-2xl" />
  <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-primary text-white text-xs rounded-full border border-white">
    0
  </span>
</div>

                    <User /> <span className='hidden md:inline-block '>Sign In</span>
               </div>
                
            </div>

        </header>
    );
};

export default Navbar;