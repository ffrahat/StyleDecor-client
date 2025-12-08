import React from "react";
import TransparentBtn from "../../../Components/UI/TransparentBtn/TransparentBtn";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Calendar, XCircle, CheckCircle, HandCoins } from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import ScreenLoading from "../../../Components/Animation/ScreenLoading/ScreenLoading";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myBookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <ScreenLoading />;
  }

  return (
    <div className="p-4 md:p-8">
      <div className='w-full mb-9'>
                    <p className='text-center uppercase font-semibold text-gray-500 leading-snug'>My All</p>
        <h1 className='text-center text-4xl font-semibold'>Bookings ({myBookings.length})</h1>
                    <span className='block h-1 mx-auto mt-3 w-10 bg-secondary'></span>
                </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-secondary/20">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Service
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Date & Cost
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Payment
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {myBookings.map((booking, i) => (
              <tr key={booking._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{i + 1}</td>

                {/* Service Name + Category */}
                <td className="px-4 py-2 space-y-2">
                  <p className="text-primary font-semibold">
                    {booking.service_name}
                  </p>
                  <p className="text-gray-500 capitalize text-sm">
                    {booking.service_category}
                  </p>
                </td>

              

                {/* Booking Date and Cost */}
                <td className="px-2 py-3 text-gray-600 whitespace-nowrap space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />{" "}
                    {new Date(booking.created_At).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 text-secondary mt-1 font-semibold">
                    <FaBangladeshiTakaSign size={15} /> {booking.booking_cost} BDT
                  </div>
                </td>

                  {/* Payment */}
                <td className="px-4 py-3">
                  {booking.payment_status === "Paid" ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <CheckCircle size={16} /> Paid
                    </span>
                  ) : (
                    <button className="flex gap-1 transition duration-300 py-1.5 md:py-2 px-2 md:px-4 rounded-sm border-2 border-primary text-sm hover:bg-primary bg-transparent hover:text-base-200 cursor-pointer ">
                      {" "}
                      <HandCoins size={18} /> Pay Now{" "}
                    </button>
                  )}
                </td>



                {/* Service Status */}
                <td className="px-4 py-3">
                  {booking.service_status ? (
                    <span className="px-2 py-1 rounded-full text-white text-sm font-medium bg-green-500">
                      {booking.service_status}
                    </span>
                  ) : (
                    <span className="px-4 py-2 rounded-full text-white text-sm font-medium bg-gray-400">
                      Pending
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <button className="flex items-center gap-1 btn btn-sm btn-error text-base-200">
                    <XCircle size={16} /> Cancel
                  </button>
                </td>
              </tr>
            ))}

            {myBookings.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  You have no bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
