import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import useRole from "../../../Hooks/useRole";

const statusColors = {
  paid: "bg-green-100 text-green-600",
  pending: "bg-yellow-100 text-yellow-600",
  cancelled: "bg-red-100 text-red-600",
};

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef()
  const [sort, setSort] = useState("");
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?sort=${sort}`);
      return res.data;
    },
  });


  const handleFindDecorators = () => {
    modalRef.current.showModal()
  }
  return (
    <div className="p-4">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 flex items-center md:gap-10 justify-between ">
        Manage Bookings ({bookings.length})
        <div className="border border-gray-300">
          <select onChange={e=> setSort(e.target.value)} defaultValue="" className="select select-ghost w-[150px] ">
            <option disabled={true}>Sort By</option>
            <option value="">All</option>
            <option value="service_status=cancelled">Cancelled</option>
            <option value="payment_status=paid">Paid</option>
          </select>
        </div>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <motion.div
            key={booking._id}
            whileHover={{ scale: 1.02 }}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{booking.service_name}</h2>
              <span
                className={`px-2 py-1 text-green-400 bg-green-100 text-xs rounded-full capitalize ${
                  statusColors[booking.payment_status]
                }`}
              >
                {booking.payment_status}
              </span>
            </div>

            {/* Booking Date */}
            <p className="text-sm text-gray-500 mb-2">
              Booking Date:{" "}
              <span className="font-medium">{booking.booking_date}</span>
            </p>

            {/* Service Status */}
            <p className="text-sm mb-3">
              Service Status:
              <span
                className={`ml-2 px-2 py-1 text-xs rounded-full capitalize ${
                  booking.service_status === "cancelled"
                    ? "bg-red-100 text-red-400"
                    : "text-green-400 bg-green-50"
                }`}
              >
                {booking.service_status}
              </span>
            </p>

            {/* Divider */}
            <div className="border-b my-2"></div>

            {/* Info */}
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Client Email:</span>{" "}
                {booking.client_email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {booking.client_number}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {booking.service_category}
              </p>
              <p>
                <span className="font-medium">Cost:</span> ৳
                {booking.booking_cost}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Created: {booking.created_At.slice(0, 10)}
                    </p>
                    
                    {
                        booking?.service_status === 'cancelled' ?
                            
                            <span className="px-4 py-1.5 cursor-not-allowed rounded-full text-base-content text-sm font-medium bg-orange-200 capitalize">
                      {booking?.service_status}
                    </span>
                            
                            :

                            booking?.payment_status != 'paid' ? 
<span className="px-4 py-1.5 cursor-not-allowed rounded-full text-base-content text-sm font-medium bg-yellow-200 capitalize">
                      Not Paid
                    </span> :
                                
                            <button onClick={()=> handleFindDecorators()} className="px-3 border border-blue-600 py-2 cursor-pointer hover:bg-transparent text-sm bg-blue-600 text-white rounded-lg hover:text-blue-600">
                Find Decorators
              </button>


                    }
              
            </div>
          </motion.div>
        ))}
      </div>


      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
<dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>




    </div>
  );
};

export default ManageBookings;
