import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ScreenLoading from "../../../Components/Animation/ScreenLoading/ScreenLoading";
import Swal from "sweetalert2";
import { User, Shield, Trash2, Search, Edit2 } from "lucide-react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");

  // Fetch users
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users", searchText, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchText=${searchText}&sort=${sort}`
      );
      return res.data;
    },
    keepPreviousData: false,
  });

  // Update user role
  const updateUserRole = (userId, newRole) => {
    axiosSecure
      .patch(`/users/role?id=${userId}&role=${newRole}`)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Success",
            text: `User role updated to "${newRole}"`,
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
        });
      });
  };

  if (isLoading) return <ScreenLoading />;

  return (
    <div className="p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        User Management <span className="text-primary">({users.length})</span>
      </h1>
      <span className="block h-1 mx-auto w-10 bg-secondary mb-8"></span>

      {/* Search & Sort */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl shadow-sm focus:outline-primary"
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
        <div className="mt-4 w-[200px]">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select w-full"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="decorator">Decorator</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="text-xl font-semibold text-gray-700">
            No users found
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Adjust search or filter to see users.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-4 border border-primary/50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.name}
                  className="w-14 h-14 rounded-full border object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <User size={16} />
                  Joined:{" "}
                  <span className="font-medium">
                    {new Date(user.created_At).toLocaleDateString()}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Shield size={16} /> Role:{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "decorator"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </p>
              </div>

              <button
                onClick={() =>
                  user.role === "admin"
                    ? updateUserRole(user._id, "user")
                    : updateUserRole(user._id, "admin")
                }
                className={`mt-auto py-2 rounded-lg text-white font-medium shadow ${
                  user.role === "admin"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {user.role === "admin" ? "Remove Admin" : "Make Admin"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
