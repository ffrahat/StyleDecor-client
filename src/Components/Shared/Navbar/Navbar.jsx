import React, { useState } from "react";
import MyLink from "../../UI/MyLink/MyLink";
import Logo from "../../UI/Logo/Logo";
import { Edit, LogOut, ShoppingCart, User } from "lucide-react";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { PuffLoader } from "react-spinners";
import PrimaryBtn from "../../UI/PrimaryBtn/primaryBtn";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "motion/react";
import TransparentBtn from "../../UI/TransparentBtn/TransparentBtn";


const Navbar = () => {
  const { user, loading, logOutUser } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <MyLink to="/">Home</MyLink>
      </li>
      <li>
        <MyLink to="/services">Services</MyLink>
      </li>
      <li>
        <MyLink to="/about">About</MyLink>
      </li>
      <li>
        <MyLink to="/decorator-apply">Apply For Decorator</MyLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        toast.warning("Sign Out Succfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white/85 flex w-full py-5 border-b border-gray-300/40 backdrop-blur-[2px] z-50">
      <div className="px-4 md:px-6 mx-auto max-w-7xl flex items-center justify-between w-full">
        {/* Mobile Menu Icon */}
        <CgMenuRightAlt
          onClick={() => setOpen(!open)}
          size={22}
          className="md:hidden"
        />
        <Logo />

        {/* Navlinks Desktop*/}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-10">{links}</ul>
        </nav>
<AnimatePresence>
        {/* Navlinks Mobile */}
        {open && (
          <nav
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 z-50 h-screen w-full bg-black/40 backdrop-blur-xl"
          >
            <motion.div
              initial={{
                x: -200, opacity:0
              }}
              animate={{
                x: 0, opacity:1
              }}
              exit={{
                x: -200, opacity: 0
              }}      // exit animation
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
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
            </motion.div>
          </nav>
          )}

          </AnimatePresence>
          

          {/* Icon */}

        <div className="flex gap-5 items-center">
          <div className="relative">
            <Link to="/dashboard/my-bookings">
              {" "}
              <ShoppingCart className="text-2xl" />
            </Link>
            <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-primary text-white text-xs rounded-full border border-white">
              0
            </span>
          </div>

          {/* USer Profile Img */}
          {loading ? (
            <PuffLoader color="#69C5D3" size={20} />
          ) : user ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="m-1 cursor-pointer">
                <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    className="mx-auto object-cover rounded-full"
                    src={user?.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content border border-primary menu bg-base-100 rounded-box z-1 w-52 p-4 shadow-sm"
              >
                <div className="w-10 h-10 border-2 border-primary rounded-full mx-auto flex items-center justify-center overflow-hidden">
                  <img
                    className="mx-auto object-cover rounded-full"
                    src={user?.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-semibold text-primary text-center">
                  {user.displayName}
                </p>

                <PrimaryBtn
                  onClick={handleSignOut}
                  className="mt-2 flex gap-2 items-center justify-center text-base-100 mb-2"
                >
                  {" "}
                  <LogOut size={18} /> Log Out
                  </PrimaryBtn>
                  
                  <TransparentBtn onClick={()=> navigate('/dashboard/my-profile')} className='flex items-center gap-2 justify-center'>
                    <Edit size={18} /> View Profile
                  </TransparentBtn>
              </ul>
            </div>
          ) : (
            <Link className="flex gap-2 items-end" to="/login">
              <User /> <span className="hidden md:inline-block ">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
