'use client'
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    applicationType: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="flex flex-col md:flex-row w-[90%] max-w-6xl mx-auto mt-[50px] rounded-3xl overflow-hidden shadow-2xl">
      <div className="flex-1 bg-[#101827] text-white p-8 md:p-12 flex  items-center flex-col justify-center">
        <h2 className="text-[24px] md:text-4xl lg:text-[54px] font-bold leading-tight">
          Realize your<br />
          project with<br />
          <span className="text-orange-500">AzConPrice</span>
        </h2>
      </div>
      
      <div className="flex-1  p-8 md:p-12 bg-[#F0EEEE]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-0 py-2 border-0 border-b text-[20px] border-[rgba(16,24,39,1)] bg-transparent focus:border-orange-500 focus:outline-none transition-colors duration-200 placeholder-gray-500"
            />
          </div>
          
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-0 py-2 border-0 text-[20px] border-b border-[rgba(16,24,39,1)] bg-transparent focus:border-orange-500 focus:outline-none transition-colors duration-200 placeholder-gray-500"
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-0 py-2 border-0 text-[20px] border-b border-[rgba(16,24,39,1)] bg-transparent focus:border-orange-500 focus:outline-none transition-colors duration-200 placeholder-gray-500"
            />
          </div>
          
          <div className="relative">
            <select
              name="applicationType"
              value={formData.applicationType}
              onChange={handleInputChange}
              className="w-full px-0 py-2 border-0 border-b text-[20px] border-[rgba(16,24,39,1)] bg-transparent focus:border-orange-500 focus:outline-none transition-colors duration-200 appearance-none cursor-pointer text-gray-500"
            >
              <option value="">Type of Application</option>
              <option value="consultation">Consultation</option>
              <option value="price-inquiry">Price Inquiry</option>
              <option value="technical-support">Technical Support</option>
              <option value="partnership">Partnership</option>
            </select>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div>
            <textarea
              name="notes"
              placeholder="Your Notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-0 py-2 text-[20px] border-0 border-b border-[rgba(16,24,39,1)] bg-transparent focus:border-orange-500 focus:outline-none transition-colors duration-200 placeholder-gray-500 resize-none"
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[20px] py-3  rounded-full cursor-pointer transition-colors duration-300  "
            >
              Send Information
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm; 