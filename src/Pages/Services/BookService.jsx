import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import ScreenLoading from '../../Components/Animation/ScreenLoading/ScreenLoading';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { Calendar, User, Mail, DollarSign, List, MapPin } from 'lucide-react';

const BookService = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const axiosSecure = useAxiosSecure();

  const { data: service = {}, isLoading: serviceLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/services/${id}`);
      return res.data;
    }
  });

  const { data: serviceCenters = [], isLoading: centersLoading } = useQuery({
    queryKey: ['coverages'],
    queryFn: async () => {
      const res = await axiosInstance.get('/coverages');
      return res.data;
    }
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm();

  // Watch selected region for dynamic district select
  const selectedRegion = useWatch({ control, name: 'booking_region' });

  // Get unique regions
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  // Get districts based on selected region
  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter(c => c.region === region)
      .map(c => c.district);
  };

  if (serviceLoading || centersLoading) return <ScreenLoading />;

  const handleBookNow = (data) => {
    const bookingInfo = {
      client_name: user.name || user.displayName,
      client_email: user.email,
      client_number: data.client_number || 'N/A',
      serviceId: service._id,
      service_name: service.service_name,
      service_category: data.service_category,
      booking_cost: service.cost,
      booking_region: data.booking_region || 'N/A',
      booking_district: data.booking_district || 'N/A',
      client_message: data.client_message || 'N/A',
      booking_date: data.booking_date,
    };

    axiosSecure
      .post('/bookings', bookingInfo)
      .then((res) => {
        console.log(res);
        navigate('/dashboard/my-bookings');
      })
      .catch(err => console.log(err));
  };

  return (
    <MySection>
      <MyContainer>
        <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Book Your Service
          </h1>

          <form onSubmit={handleSubmit(handleBookNow)} className="space-y-4">
            {/* Service Name */}
            <div className="flex items-center gap-2">
              <List className="text-primary w-5 h-5" />
              <input
                {...register('service_name')}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                value={service.service_name}
                readOnly
              />
            </div>

            {/* Service Category */}
            <div className="flex items-center gap-2">
              <List className="text-primary w-5 h-5" />
              <input
                {...register('service_category')}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700 capitalize"
                value={service.service_category}
                readOnly
              />
            </div>

            {/* Name */}
            <div className="flex items-center gap-2">
              <User className="text-primary w-5 h-5" />
              <input
                {...register('client_name')}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                value={user.displayName || user.name}
                readOnly
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="text-primary w-5 h-5" />
              <input
                {...register('client_email')}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                value={user.email}
                readOnly
              />
            </div>

            {/* Cost */}
            <div className="flex items-center gap-2">
              <DollarSign className="text-primary w-5 h-5" />
              <input
                {...register('service_cost')}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                value={service.cost}
                readOnly
              />
            </div>

            {/* Booking Date */}
            <div className="flex items-center gap-2">
              <Calendar className="text-primary w-5 h-5" />
              <input
                {...register('booking_date', { required: 'Please select a date.' })}
                type="date"
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md"
              />
            </div>
            {errors.booking_date && (
              <p className="text-red-500 block -mt-2">{errors.booking_date.message}</p>
            )}

            {/* Region Select */}
            <div>
              <label className="block text-sm mb-1 font-semibold">Select Region</label>
              <select
                {...register('booking_region', { required: true })}
                defaultValue=""
                className="select bg-base-200 w-full"
              >
                <option value="" disabled>Select Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* District Select */}
            <div>
              <label className="block text-sm mb-1 font-semibold">Select District</label>
              <select
                {...register('booking_district', { required: true })}
                defaultValue=""
                className="select bg-base-200 w-full"
              >
                <option value="" disabled>Select District</option>
                {selectedRegion &&
                  districtsByRegion(selectedRegion).map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))
                }
              </select>
            </div>

            {/* Optional Message */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-600">Message (Optional)</label>
              <textarea
                {...register('client_message')}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
                placeholder="Any special instructions..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary/80 transition"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </MyContainer>
    </MySection>
  );
};

export default BookService;
