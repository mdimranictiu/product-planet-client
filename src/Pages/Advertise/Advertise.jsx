import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../hook/useAxiosPublic/UseAxiosPublic";

const Advertise = () => {
  document.title = "Advertise";
  const axiosPublic = UseAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    inquiryType: "General Inquiry", // Default value for inquiry type
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.company.trim()) errors.company = "Company name is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axiosPublic
      .post("/submit/advertise", formData) // Assume this is your advertisement API endpoint
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Thank You",
          text: "Your advertisement inquiry has been submitted. We will contact you soon.",
        });

        setFormData({ name: "", email: "", company: "", message: "", inquiryType: "General Inquiry" });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit your request. Please try again later.",
        });
      });
  };

  return (
    <div className="py-10 max-w-3xl min-h-screen mx-auto px-5 md:px-10">
      <h2 className="text-center font-bold text-3xl  mb-6">
        Advertise With Us
      </h2>
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-lg shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl"
      >
        <div className="mb-6">
          <label className="block text-lg font-medium text-[#FF6154]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6154] focus:outline-none"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-[#FF6154]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6154] focus:outline-none"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-[#FF6154]">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6154] focus:outline-none"
            placeholder="Enter your company name"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-2">{errors.company}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-[#FF6154]">Inquiry Type</label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6154] focus:outline-none"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Urgent Advertisement">Urgent Advertisement</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-[#FF6154]">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6154] focus:outline-none"
            placeholder="Tell us about your advertisement needs"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-2">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF6154] text-white text-lg py-3 rounded-lg hover:bg-white hover:text-[#FF6154] border-2 border-[#FF6154] transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Advertise;
