import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BadgeCheck,
  BadgeX,
  Hammer,
} from "lucide-react";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const { data: decorators = [], isLoading, refetch } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  const handleApproveDecorator = (email) => {
    const updateRole = "decorator";
    axiosSecure
      .patch(
        `/decorators/role?email=${email}&role=${updateRole}&application_status=approved`
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire("Updated!", "Approved Decorator Successfully.", "success");
        }
      });
  };

  const handleRejectDecorator = (email) => {
    axiosSecure
      .patch(`/decorators/role?email=${email}&application_status=rejected`)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire("Updated!", "Rejected Decorator Successfully.", "success");
        }
      });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading decorators...
      </div>
    );

  if (decorators.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        No decorator applications found.
      </div>
    );

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-12">
        Decorator Management
        <span className="ml-2 text-primary">({decorators.length})</span>
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {decorators.map((decorator) => (
          <div
            key={decorator._id}
            className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition"
          >
            {/* Status Ribbon */}
            <div
              className={`absolute top-5 right-5 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                decorator.application_status === "approved"
                  ? "bg-green-100 text-green-700"
                  : decorator.application_status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {decorator.application_status === "approved" && (
                <BadgeCheck size={14} />
              )}
              {decorator.application_status === "rejected" && (
                <BadgeX size={14} />
              )}
              {decorator.application_status}
            </div>

            {/* Header */}
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {decorator.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Mail size={14} />
                {decorator.email}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-400" />
                <span>{decorator.phone || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gray-400" />
                <span>
                  {decorator.district || "N/A"},{" "}
                  {decorator.region || "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays size={16} className="text-gray-400" />
                <span>
                  {decorator.application_At
                    ? new Date(
                        decorator.application_At
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Hammer size={16} className="text-gray-400" />
                <span
                  className={`font-semibold ${
                    decorator.work_status === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {decorator.work_status || "N/A"}
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="p-5 border-t bg-gray-50 rounded-b-3xl">
              {decorator.application_status === "approved" ? (
                <button
                  onClick={() => handleRejectDecorator(decorator.email)}
                  className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                >
                  Reject Decorator
                </button>
              ) : (
                <button
                  onClick={() => handleApproveDecorator(decorator.email)}
                  className="w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition"
                >
                  Approve Decorator
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDecorators;
