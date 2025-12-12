import React from "react";
import banner1img from "../../../assets/banner-1.webp";
import banner2img from "../../../assets/banner-2.webp";
import banner3img from "../../../assets/banner-3.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "motion/react"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { CiHome, CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";

const Hero = () => {
  const banners = [banner1img, banner2img, banner3img];
  const navigate = useNavigate();
  return (
    <section className="w-full md:px-6 max-w-7xl mx-auto h-[90vh] md:h-screen overflow-x-hidden flex flex-col">
          <div className="h-full md:h-auto rounded-2xl hidden md:block ">
              <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
              loop={true}
              autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-full md:h-[350px] relative  rounded-2xl"
      >
        {banners.map((banner, i) => (
          <SwiperSlide className="" key={i}>
            <img
              className="h-full mx-auto w-full object-cover rounded-2xl"
              src={banner}
              alt=""
                />
          </SwiperSlide>
        ))}
              
              
          </Swiper>
      </div>
          
          
          

          {/* Text Overlay PC */}
      <div
        className="flex-1 h-[90vh] md:h-auto z-20 flex flex-col-reverse md:flex-row items-center w-full justify-between md:justify-between  bg-white/70 rounded-xl pt-10 md:pt-0 pb-35 md:pb-0 md:p-6 gap-20">
  {/* Left Side Text */}
        <motion.div
          
          className="text-gray-900 p-4 md:p-0 space-y-6 max-w-lg">
    <h1 className="text-5xl font-extrabold leading-snug tracking-tight ">
      Interior Design
      <span className="block text-primary">Solution</span>
    </h1>

    <p className="mt-4 text-lg text-gray-700 font-medium flex items-center gap-2">
      Elevate your home with modern and elegant interior designs. Tailored solutions for every space, combining style, comfort, and functionality.
    </p>

    <div className="flex items-center gap-4 mt-6">
      <button onClick={()=> navigate('/services')} className="btn btn-primary">Book Decoration Service</button>
      <button className="btn btn-outline text-secondary border-secondary flex items-center gap-2">
        <CiSearch size={18} /> Explore
      </button>
    </div>

    {/* Optional small decorative element */}
    <div className="flex gap-3 mt-4">
      <div className="w-10 h-1 bg-primary rounded-full"></div>
      <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
    </div>
  </motion.div>

  {/* Right Side Image */}
        <motion.div
          className="w-full flex justify-center min-h-[350px] md:justify-end overflow-x-hidden md:rounded-xl ">
          
          <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
              loop={true}
              autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-[350px] relative  md:rounded-2xl"
      >
        {banners.map((banner, i) => (
          <SwiperSlide className="" key={i}>
            <img
              className="h-full mx-auto w-full object-cover md:rounded-2xl"
              src={banner}
              alt=""
                />
          </SwiperSlide>
        ))}
              
              
          </Swiper>

    
  </motion.div>
</div>

          

      
    </section>
  );
};

export default Hero;
