import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const categories = ["outdoor", "home", "meeting", "seminar", "office", "wedding"];
const units = ["per meter", "per sqrt-ft", "per floor", "per-unit"];

const AddServiceForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");

  const submitHandler = (formData) => {
    const finalData = {
      ...formData,
      images: [{ url: formData.imageUrl, alt: formData.imageAlt }],
      createdAt: new Date(),
      createdByEmail: user?.email,
    };

    axiosSecure
      .post("/services", finalData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
        title: "Drag me!",
        icon: "success",
        draggable: true
          });
          
          reset();
          setPreview("");
          navigate('/dashboard/manage-services')
        }
        
      })
      .catch((err) => console.error("Error adding service:", err));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-5 flex items-center gap-2">
        <PlusCircle className="w-6 h-6 text-secondary" />
        Add New Service
      </h1>

      {/* Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

          {/* Service Name */}
          <div>
            <label className="block font-medium mb-1">Service Name</label>
            <input
              {...register("service_name", { required: true })}
              type="text"
              placeholder="Service Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Cost + Currency + Unit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Cost</label>
              <input
                {...register("cost", { required: true })}
                type="number"
                placeholder="Cost"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Currency</label>
              <input
                {...register("currency", { required: true })}
                type="text"
                defaultValue="BDT"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Unit</label>
              <select
                {...register("unit", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled>Select Unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Service Category</label>
            <select
              {...register("service_category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Service Description"
              rows={4}
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              {...register("imageUrl", { required: true })}
              type="text"
              placeholder="Image URL"
              className="input input-bordered w-full"
              onChange={(e) => setPreview(e.target.value)}
            />
          </div>

          {/* Image Alt */}
          <div>
            <label className="block font-medium mb-1">Image Alt Text</label>
            <input
              {...register("imageAlt", { required: true })}
              type="text"
              placeholder="Alt Text"
              className="input input-bordered w-full"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="pt-3">
              <p className="font-medium mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-lg border h-56 object-cover"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition font-medium"
          > 
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm; 
