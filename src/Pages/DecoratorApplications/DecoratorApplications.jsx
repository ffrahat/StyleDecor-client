import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const DecoratorApplications = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiosInstance();

  const onSubmit = (data) => {
    axiosSecure
      .post("/decorators", data)
      .then((res) => {
        if (res.data.insertedId) {
          reset()
           Swal.fire({
                      title: "Success",
                      text: `Your Application has been succfully."`,
                      icon: "success",
                    });
        } else {
          Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
        }
      })
      .catch((err) => console.log(err));
  };

  const { data: serviceCenters = [], isLoading } = useQuery({
    queryKey: ["coverages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coverages");
      return res.data;
    },
  });

  // Watch selected region
  const selectedRegion = useWatch({ control, name: "region" });

  // Unique regions
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  // Get districts based on selected region
  const districtsByRegion = (region) => {
    return serviceCenters
      .filter((c) => c.region === region)
      .map((c) => c.district);
  };

  if (isLoading)
    return (
      <p className="text-center py-20 text-gray-500 font-medium">
        Loading regions...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6 text-center">
        Decorator <span className="text-primary">Application</span>
      </h1>
      <span className="block h-1 mx-auto w-12 bg-secondary -mt-2 mb-6"></span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-5"
      >
        {/* Name */}
        <div className="flex items-center gap-3 border-b border-gray-200 py-2">
          <User className="text-primary w-5 h-5" />
          <input
            value={user.displayName}
            readOnly
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full outline-none px-2 py-2 text-gray-700"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 border-b border-gray-200 py-2">
          <Mail className="text-primary w-5 h-5" />
          <input
            value={user.email}
            readOnly
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full outline-none px-2 py-2 text-gray-700"
            required
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
            required
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
            required
          />
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm mb-1 font-semibold">Select Region</label>
          <select
            defaultValue=""
            className="select bg-base-200 w-full"
            {...register("region")}
            required
          >
            <option value="" disabled>
              Select Region
            </option>
            {regions.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm mb-1 font-semibold">Select District</label>
          <select
            defaultValue=""
            className="select bg-base-200 w-full"
            {...register("district")}
            required
          >
            <option value="" disabled>
              Select District
            </option>
            {selectedRegion &&
              districtsByRegion(selectedRegion).map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
          </select>
        </div>

        {/* Submit */}
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
