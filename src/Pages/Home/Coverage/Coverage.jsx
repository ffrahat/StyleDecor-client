import React, { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useAxiosInstance from "../../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import MySection from "../../../Layouts/MySection";
import MyContainer from "../../../Layouts/MyContainer";

const Coverage = () => {
  const position = [23.685, 90.3563]; // Center of Bangladesh
  const axiosInstance = useAxiosInstance();
  const mapRef = useRef(null);

  const { data: serviceCenters = [], isLoading } = useQuery({
    queryKey: ["coverages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coverages");
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    if (!location) return;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coords = [district.latitude, district.longitude];
      mapRef.current.flyTo(coords, 12);
    }
  };

  return (
    <MySection className="pt-16 bg-gray-50">
      <MyContainer>
        {/* Section Title */}
        <h1 className="font-bold text-2xl md:text-4xl text-center text-secondary mb-4 md:mb-8">
          Service Coverage Across Bangladesh
        </h1>
        <p className="text-center text-gray-600 mb-8 md:mb-10 px-4 md:px-0">
          Find our service centers and see how we cover almost every district.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-lg mx-auto mb-8 flex flex-col sm:flex-row items-center shadow-md rounded-xl overflow-hidden"
        >
          <div className="relative flex-1 w-full">
            <input
              type="text"
              name="location"
              placeholder="Search by district..."
              className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-t-xl sm:rounded-l-xl sm:rounded-t-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <CiSearch size={20} />
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 sm:mt-0 sm:ml-0 sm:rounded-r-xl bg-primary text-white px-6 py-3 font-medium hover:bg-primary/90 transition w-full sm:w-auto"
          >
            Search
          </button>
        </form>

        {/* Loading State */}
        {isLoading && (
          <p className="text-center text-gray-500 py-10">Loading service centers...</p>
        )}

        {/* Map Section */}
{!isLoading && serviceCenters.length > 0 && (
  <div className="relative z-0 border rounded-xl overflow-hidden shadow-lg">
    <MapContainer
      center={position}
      zoom={8}
      scrollWheelZoom={false}
      ref={mapRef}
      className="w-full h-[400px] sm:h-[600px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {serviceCenters.map((center) => (
        <Marker key={center._id} position={[center.latitude, center.longitude]}>
          <Popup>
            <h2 className="font-semibold">{center.district}</h2>
            <p className="text-gray-600 text-sm mt-1">
              Service Areas: {center.covered_area.join(", ")}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
)}


        {/* No Results */}
        {!isLoading && serviceCenters.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No service centers available at the moment.
          </p>
        )}
      </MyContainer>
    </MySection>
  );
};

export default Coverage;
