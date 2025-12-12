import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch decorators
  const { data: decorators = [], isLoading, refetch } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });
    
    
    
    
    // approve
    const handleApproveDecorator = email => {
        const updateRole = 'decorator';
        axiosSecure
              .patch(`/decorators/role?email=${email}&role=${updateRole}&application_status=approved`)
              .then((res) => {
                
                if (res.data.modifiedCount) {
                  refetch();
                  Swal.fire({
                    title: "Updated!",
                    text: "Approved Decorator Successfully.",
                    icon: "success",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
    }



    // reject
    const handleRejectDecorator = email => {
        axiosSecure
              .patch(`/decorators/role?email=${email}&application_status=rejected`)
              .then((res) => {
                
                if (res.data.modifiedCount) {
                  refetch();
                  Swal.fire({
                    title: "Updated!",
                    text: "Approved Decorator Successfully.",
                    icon: "success",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
    }
    
    
    
    
    

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Loading decorators...
      </div>
    );

  if (decorators.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        No decorator applications found.
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Manage Decorators <span className="text-primary">({decorators.length})</span>
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decorators.map((decorator) => (
          <div
            key={decorator._id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-3 border border-gray-200 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{decorator.name}</h2>
            <p className="text-sm text-gray-500">{decorator.email}</p>
            <p className="text-sm text-gray-500">Phone: {decorator.phone}</p>
            <p className="text-sm text-gray-500">Region: {decorator.region}</p>
            <p className="text-sm text-gray-500">District: {decorator.district}</p>

            <p className="text-sm text-gray-600">
              Work Status:{" "}
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  decorator.work_status === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {decorator.work_status || "N/A"}
              </span>
            </p>

            <p className="text-sm text-gray-600">
              Application Status:{" "}
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  decorator.application_status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : decorator.application_status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {decorator.application_status || "N/A"}
              </span>
            </p>

            <p className="text-sm text-gray-600">
              Applied On:{" "}
              {decorator.application_At
                ? new Date(decorator.application_At).toLocaleDateString()
                : "N/A"}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-3">
                    <button
                        
                className="flex-1 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow"
                onClick={() => handleApproveDecorator(decorator.email) }
              >
                Approve
              </button>
              <button
                className="flex-1 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow"
                onClick={() => console.log("Assign clicked for", decorator._id)}
              >
                Assign Project
              </button>
              <button
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow"
                onClick={() => handleRejectDecorator(decorator.email)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDecorators;
