import React from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DecoratorApplications = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    axiosSecure.post('/decorators', data)
      .then(res => {
      console.log(res)
      })
    .catch(err=> console.log(err)) // NOt ok
  };

  

  return (
    <div className="max-w-3xl mx-auto px-2 md:px-6 py-5 md:py-12">
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">
        Decorator <span className="text-primary">Application</span>

      </h1>
    <span className='block h-1 mx-auto w-10 bg-secondary -mt-4 mb-5'></span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        {/* Name */}
        <div className="flex items-center gap-3 border-b border-gray-200 py-2">
          <User className="text-primary w-5 h-5" />
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full outline-none px-2 py-2 text-gray-700"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 border-b border-gray-200 py-2">
          <Mail className="text-primary w-5 h-5" />
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full outline-none px-2 py-2 text-gray-700"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 border-b border-gray-200 py-2">
          <Phone className="text-primary w-5 h-5" />
          <input
            type="tel"
            placeholder="Phone"
            {...register("phone")}
            className="w-full outline-none px-2 py-2 text-gray-700"
          />
        </div>

        {/* Age */}
        <div className="flex items-center gap-3 border-b border-gray-200 py-2">
          <User className="text-primary w-5 h-5" />
          <input
            type="number"
            placeholder="Age"
            {...register("age")}
            className="w-full outline-none px-2 py-2 text-gray-700"
          />
        </div>

        {/* Region */}
        <div className="flex items-center gap-3 border-b border-gray-200 py-2">
          <MapPin className="text-primary w-5 h-5" />
          <input
            type="text"
            placeholder="Region"
            {...register("region")}
            className="w-full outline-none px-2 py-2 text-gray-700"
          />
        </div>

        {/* District */}
        <div className="flex items-center gap-3 border-b border-gray-200 py-2">
          <MapPin className="text-primary w-5 h-5" />
          <input
            type="text"
            placeholder="District"
            {...register("district")}
            className="w-full outline-none px-2 py-2 text-gray-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default DecoratorApplications;
