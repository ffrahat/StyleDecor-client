import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ScreenLoading from '../../../Components/Animation/ScreenLoading/ScreenLoading';
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import Swal from 'sweetalert2';

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services');
      return res.data;
    }
  });
    
    
    const handleDeleteService = id => {


        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
    if (result.isConfirmed) {
      
        // crud operation 
        axiosSecure.delete(`/services/${id}/delete`)
            .then(res => {
                refetch();
                if (res.data.deletedCount) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                    });
                }
            })
        .catch(err=> console.log(err))

    
  }
});



        
    }
    
    
    

  if (isLoading) return <ScreenLoading />;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">
          All Services ({services.length})
        </h1>

        <Link
          to="/dashboard/add-new-service"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Service
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map((service) => (
          <div
            key={service._id}
            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all bg-white"
          >
            {/* Image */}
            <img
              src={service.imageUrl}
              alt={service.imageAlt}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            {/* Content */}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{service.service_name}</h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {service.description}
              </p>

              {/* Price */}
              <p className="font-medium">
                Cost: <span className="text-primary">৳{service.cost}</span>{" "}
                <span className="text-sm text-gray-500">({service.unit})</span>
              </p>

              {/* Category */}
              <p className="text-xs text-secondary uppercase tracking-wide">
                Category: {service.service_category}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3">
                <Link
                  to={`/dashboard/edit-service/${service._id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Link>

                <button onClick={()=> handleDeleteService(service._id)}
                  className="flex cursor-pointer items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
