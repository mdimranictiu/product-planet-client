import React, { useContext } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../AuthContext/AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
    const {signInUser,signInWithGoogle}=useContext(AuthContext);
    const location=useLocation();
    const from=location.state?.from?.pathname || '/';
    console.log(from)
    const navigate=useNavigate()
        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },reset
          } = useForm()
        
          const onSubmit = (data) => {
            const email= data.email;
            const password=data.password;
            signInUser(email,password)
            .then((res)=>{
                reset();
                navigate(from);
            })
            .catch((error)=>{
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong!",
                    text: error.message,
                  });
                  reset();
            })

          }
           const handleGoogleSignIn=()=>{
                  signInWithGoogle()
                  .then(()=>{
                    navigate(from)
                  })
                  .catch((error)=>{
                    Swal.fire({
                      icon: "error",
                      title: "Something went wrong!",
                      text: error.message,
                    });
                  })
                }
  return (
    <div className="flex justify-center py-10 min-h-screen ">
      <div className="w-full max-w-xl   shadow-[32px] rounded-lg p-8">
        <div className="text-center mb">
            <h2 className="text-3xl font-bold py-3">Welcome Back</h2>
            <p className=" mb-2">Please enter your details to login</p>
        </div>
    
        <form  className=" p-5 py-10" onSubmit={handleSubmit(onSubmit)}>

    <div className="mb-4">
      <label  className="block text-gray-600 font-semibold mb-2">Email</label>
      <input 
        type="email" {...register("email")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EACABE] focus:outline-none"
        placeholder="Enter your email" 
        required 
      />
    </div>

    <div className="mb-10">
      <label  className="block text-gray-600 font-semibold mb-2">Password</label>
      <input 
        type="password"  {...register("password", {
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: "Password must include uppercase, lowercase, and a number",
            },
          })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EACABE] focus:outline-none"
        placeholder="Enter your password" 
        required 
      />
       {errors.password && (
  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
    </div>

    

    <button 
      type="submit" 
      className="w-full py-2 text-white rounded-sm bg-[#FF6154] hover:bg-white text-xl duration-500 hover:text-[#FF6154] font-semibold"
    >
      Login
    </button>

        </form>
        <div className="text-center my-6">
  {/* Divider */}
  <div className="flex items-center justify-center">
    <div className="border-t border-gray-300 flex-grow"></div>
    <span className="px-4 text-gray-500 font-semibold">OR</span>
    <div className="border-t border-gray-300 flex-grow"></div>
  </div>

{/* Social Login */}
  <div className="mt-6">
  <div className="mt-4 flex justify-center gap-10 text-3xl cursor-pointer">

    <FaFacebook
      title="Register with Facebook"
      className="hover:scale-110 text-blue-600 transition-transform duration-300"
    />

    <FcGoogle
            title="Register with Google" onClick={handleGoogleSignIn}
      className="hover:scale-110 transition-transform duration-300"
    />
    

    <FaXTwitter
      title="Register with Twitter"
      className="hover:scale-110 text-blue-400 transition-transform duration-300"
    />
  </div>
</div>

</div>
<h3 className="mt-3 text-center ">Are You New ? <Link className="font-bold" to='/register'>Register</Link></h3>
      </div>
    </div>
  );
};

export default Login;
