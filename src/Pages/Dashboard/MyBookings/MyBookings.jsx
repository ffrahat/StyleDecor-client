import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  Calendar,
  XCircle,
  CheckCircle,
  HandCoins,
  Trash2,
  SquarePen,
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import ScreenLoading from "../../../Components/Animation/ScreenLoading/ScreenLoading";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user.email}`);
      return res.data;
    },
  });

  const handlePayment = (id, booking_id) => {
    axiosSecure
      .post("/create-checkout-session", {
        serviceId: id,
        email: user.email,
        booking_id,
      })
      .then((res) => window.location.assign(res.data.url));
  };

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Cancel booking?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/cancel-booking?cancel_id=${id}`).then(() => {
          refetch();
          Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        });
      }
    });
  };

  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Delete booking?",
      text: "This will permanently remove the booking",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-bookings/${id}/delete`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Booking removed successfully.", "success");
          }
        });
      }
    });
  };

  if (isLoading) return <ScreenLoading />;

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="uppercase tracking-wider text-gray-500 font-medium">
          My Dashboard
        </p>
        <h1 className="text-4xl font-bold mt-1">
          Booking History
          <span className="text-primary ml-2">({myBookings.length})</span>
        </h1>
        <div className="h-1 w-14 bg-secondary mx-auto mt-4 rounded"></div>
      </div>

      {/* Cards */}
      {myBookings.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          You have no bookings yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {myBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    {booking.service_name}
                  </h2>
                  <p className="text-sm text-gray-500 capitalize">
                    {booking.service_category}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    booking.service_status === "cancelled"
                      ? "bg-orange-100 text-orange-700"
                      : booking.service_status
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {booking.service_status || "pending"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(booking.created_At).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2 font-semibold text-secondary">
                  <FaBangladeshiTakaSign size={14} />
                  {booking.booking_cost} BDT
                </div>

                {/* Payment */}
                <div>
                  {booking.service_status === "cancelled" ? (
                    <span className="text-orange-600 font-medium">
                      Payment Disabled
                    </span>
                  ) : booking.payment_status === "paid" ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <CheckCircle size={16} /> Paid
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        handlePayment(booking.serviceId, booking._id)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition"
                    >
                      <HandCoins size={18} />
                      Pay Now
                    </button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                {booking?.service_status === "cancelled" ? (
                  <span className="text-sm text-gray-400 cursor-not-allowed">
                    Cancelled
                  </span>
                ) : (booking?.service_status ?? 'planning_phase') === 'planning_phase' || booking.service_status === 'wait_for_assign' ?
                  
                  
                  
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium"
                  >
                    <XCircle size={16} /> Cancel
                  </button> :
                    
                    <span className="text-sm text-gray-400 cursor-not-allowed">
                    Unavaiable Cancel
                  </span>

                }

                <div className="flex gap-3">
                  {(booking?.service_status ?? 'planning_phase') === 'planning_phase' || booking.service_status === 'wait_for_assign' &&
                    
                    <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                   }

                  

                  <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                    <SquarePen size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
