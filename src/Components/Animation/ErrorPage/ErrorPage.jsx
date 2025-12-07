import React from "react";
import errorAnimation from "./Robot-Error.json";
import Lottie from "lottie-react";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Animation */}
      <Lottie className="h-80 w-80" animationData={errorAnimation} />

      {/* Title */}
      <h1 className="text-3xl font-bold text-primary mt-4">
        Oops! Something Went Wrong
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 mt-2 md:text-center max-w-md">
        Looks like this page doesn’t exist or an unexpected error occurred.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6 w-full md:w-auto">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 rounded-lg border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white hover:bg-transparent hover:text-primary border-2 border-primary transition-all duration-300 cursor-pointer"
        >
          <Home size={18} />
          Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
