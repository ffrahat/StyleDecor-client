import React from "react";
import { Link, Navigate, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SignUp = () => {
  const { signUpUser, updateUserProfile, loading, setLoading } = useAuth();
  const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSignUp = (data) => {
    const email = data.email;
    const password = data.password;

    // create user
    signUpUser(email, password)
      .then(() => {
        // Get main IMg data from the form
        const profileImg = data.imageUrl[0];
        
        // Store the img
        const formData = new FormData();
        formData.append("image", profileImg);

        // ImgBB Hosting
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMAGE_HOSTING_KEY
            }`,
            formData
          )
          .then((res) => {
   
              
              // Send To My DataBase
            const userInfoDatabase = {
                  name: data.name,
                  email: data.email,
                  photoURL: res.data.data.url
            }
              axiosSecure.post('/users', userInfoDatabase)
                  .then((res) => {
                      if (res.data.insertedId) {
                      toast.success("Successfully Created Account !")
                    }
              })
              



            // Set up for update Profile firebase
            const userInfoFirebase = {
              photoURL: res.data.data.url,
              displayName: data.name,
            };  
              

            // Update profile firebase
            updateUserProfile(userInfoFirebase)
              .then(() => {
                setLoading(false);
                navigate("/login");
              })
              .catch();
          })
            
            
          .catch((err) => toast(err.message));
      })
      .catch((err) => {
        setLoading(false);
        toast(err.message);
      });
  };

  if (user) {
    return <Navigate to='/login'/>
  }

  return (
    <div className="mb-5 pb-5 md:pb-0 md:m-0">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl md:text-4xl font-semibold">Welcome Back</h1>
        <p>Please Register Account</p>
        <Link to="/login">
          Already have an account?{" "}
          <span className="text-primary underline">Login</span>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="max-w-[400px] mt-10 space-y-5"
      >
        <input
          {...register("imageUrl", { required: true })}
          type="file"
          className="file-input w-full"
        />
        <label>Name</label>
        <input
          {...register("name", { required: true })}
          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
          type="text"
          placeholder="your name"
        />
        <label>Email</label>
        <input
          {...register("email", { required: true })}
          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
          type="text"
          placeholder="your@email.com"
        />
        <label>Password</label>
        <input
          {...register("password", { required: true })}
          className="w-full p-2  border border-gray-400 focus:outline-primary rounded-sm"
          type="text"
          placeholder="********"
        />
        <button
          type="submit"
          className="w-full transition duration-300 py-2 rounded-sm border-2 border-primary bg-primary hover:bg-transparent hover:text-primary cursor-pointer"
        >
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            <span>SignUp</span>
          )}
        </button>
      </form>

      <div className="flex gap-3 items-center my-5">
        <div className="flex-1 border-t border-gray-300"></div>
        <p>Or</p>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <SocialLogin />
    </div>
  );
};

export default SignUp;
