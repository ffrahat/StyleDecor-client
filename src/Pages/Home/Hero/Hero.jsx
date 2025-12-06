import React from "react";
import banner1img from "../../../assets/banner-1.webp";
import banner2img from "../../../assets/banner-2.webp";
import banner3img from "../../../assets/banner-3.webp";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { CiHome, CiSearch } from "react-icons/ci";

const Hero = () => {
  const banners = [banner1img, banner2img, banner3img];
  return (
    <section className="w-full px-2 md:px-6 max-w-7xl mx-auto h-screen overflow-hidden flex flex-col">
          <div className="h-full md:h-auto rounded-2xl ">
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
          
          {/* Text Overlay  mobile*/}
  <div className="absolute md:hidden inset-0 z-20 flex items-center px-6 md:px-12">
    <div className="max-w-xl text-white space-y-5">
      <h1 className="text-4xl font-bold text-base-200 leading-tight">
        Interior Design
        <span className="block text-primary">Solution</span>
      </h1>

      <p className="mt-4 text-lg">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore,
        vero ab id nulla consequuntur atque.
      </p>

      <button className="btn btn-primary mt-6">View More</button>
    </div>
          </div>
          

          {/* Text Overlay PC */}
 <div className="flex-1 z-20 hidden md:flex items-center w-full justify-between  bg-white/70 rounded-xl ">
  {/* Left Side Text */}
  <div className="text-gray-900 space-y-6 max-w-lg">
    <h1 className="text-5xl font-extrabold leading-snug tracking-tight">
      Interior Design
      <span className="block text-primary">Solution</span>
    </h1>

    <p className="mt-4 text-lg text-gray-700 font-medium flex items-center gap-2">
      Elevate your home with modern and elegant interior designs. Tailored solutions for every space, combining style, comfort, and functionality.
    </p>

    <div className="flex items-center gap-4 mt-6">
      <button className="btn btn-primary">View More</button>
      <button className="btn btn-outline text-primary border-primary flex items-center gap-2">
        <CiSearch size={18} /> Explore
      </button>
    </div>

    {/* Optional small decorative element */}
    <div className="flex gap-3 mt-4">
      <div className="w-10 h-1 bg-primary rounded-full"></div>
      <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
    </div>
  </div>

  {/* Right Side Image */}
  <div className="w-full flex justify-end overflow-hidden rounded-xl">
    <img className="w-full max-w-md rounded-xl shadow-xl cursor-pointer border border-primary/40 transform transition duration-300 hover:scale-105" src={banner1img} alt="Interior Banner" />
  </div>
</div>

          

      
    </section>
  );
};

export default Hero;
