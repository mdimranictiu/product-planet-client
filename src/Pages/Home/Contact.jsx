import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import contactAnimation from "../../assets/contact.json";
import axios from "axios";
import UseAxiosPublic from "../../hook/useAxiosPublic/UseAxiosPublic";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic=UseAxiosPublic()

  const onSubmit = (data) => {
    axiosPublic.post("/submit/contact", data)
      .then(() => {
        Swal.fire("Success!", "Your message has been sent.", "success");
        reset();
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to send message.", "error");
      });
  };

  return (
    <div className="py-10 w-4/5 mx-auto px-10">
      <h2 className="text-center font-bold text-3xl ">Write to Us</h2>
      <div className="flex flex-col md:flex-row items-center gap-10 py-10 w-full">
        
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie animationData={contactAnimation} className="w-4/5" loop />
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mb-4">
              <label className="block text-lg font-medium text-[#FF6154]">Name</label>
              <input 
                {...register("name", { required: "Name is required" })} 
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#FF6154]" 
                placeholder="Your Name" 
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium text-[#FF6154]">Email</label>
              <input 
                {...register("email", { required: "Email is required" })} 
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#FF6154]" 
                placeholder="Your Email" 
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* <div className="mb-4">
              <label className="block text-lg font-medium text-[#FF6154]">Subject</label>
              <input 
                {...register("subject", { required: "Subject is required" })} 
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#FF6154]" 
                placeholder="Subject" 
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
            </div> */}

            <div className="mb-4">
              <label className="block text-lg font-medium text-[#FF6154]">Message</label>
              <textarea 
                {...register("message", { required: "Message is required" })} 
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#FF6154]" 
                rows="4" 
                placeholder="Your Message"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#FF6154] text-white text-lg py-2 rounded-lg hover:bg-white hover:text-[#FF6154] transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
