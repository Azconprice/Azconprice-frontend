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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.applicationType) {
      errors.applicationType = 'Please select an application type';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const requestBody = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        type: formData.applicationType,
        note: formData.notes
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setValidationErrors({});
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          applicationType: '',
          notes: ''
        }
      );
      } 
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="flex flex-col md:flex-row w-[90%] max-w-6xl mx-auto mt-[50px] rounded-3xl overflow-hidden shadow-2xl">
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
              className={`w-full px-0 py-2 border-0 border-b text-[18px] bg-transparent focus:outline-none transition-colors duration-200 placeholder-gray-500 ${
                validationErrors.fullName 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-[rgba(16,24,39,1)] focus:border-orange-500'
              }`}
            />
            {validationErrors.fullName && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.fullName}</p>
            )}
          </div>
          
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-0 py-2 border-0 text-[18px] border-b bg-transparent focus:outline-none transition-colors duration-200 placeholder-gray-500 ${
                validationErrors.phoneNumber 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-[rgba(16,24,39,1)] focus:border-orange-500'
              }`}
            />
            {validationErrors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.phoneNumber}</p>
            )}
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-0 py-2 border-0 text-[18px] border-b bg-transparent focus:outline-none transition-colors duration-200 placeholder-gray-500 ${
                validationErrors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-[rgba(16,24,39,1)] focus:border-orange-500'
              }`}
            />
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
            )}
          </div>
          
          <div className="relative">
            <select
              name="applicationType"
              value={formData.applicationType}
              onChange={handleInputChange}
              className={`w-full px-0 py-2 border-0 border-b text-[18px] bg-transparent focus:outline-none transition-colors duration-200 appearance-none cursor-pointer text-gray-500 ${
                validationErrors.applicationType 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-[rgba(16,24,39,1)] focus:border-orange-500'
              }`}
            >
              <option value="" disabled>Type of Application</option>
              <option value="PlanInqury">Plan Inqury</option>
              <option value="Support">Support</option>
              <option value="Registration">Registration</option>
              <option value="ComplaintAndSuggestion">Complaint And Suggestion</option>
            </select>
            <div className="absolute right-0 transform -translate-y-1/2 pointer-events-none top-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {validationErrors.applicationType && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.applicationType}</p>
            )}
          </div>
          
          <div>
            <textarea
              name="notes"
              placeholder="Your Notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-0 py-2 text-[18px] border-0 border-b border-[rgba(16,24,39,1)] bg-transparent focus:border-orange-500 focus:outline-none transition-colors duration-200 placeholder-gray-500 resize-none"
            />
          </div>
          
          {submitStatus === 'success' && (
            <div className=" text-[20px] text-green-700 ">
              Sorğunuz uğurla təqdim edildi!
            </div>
          )}
          
         {submitStatus === 'error' && (
            <div className="text-red-700 ">
Sorğunuzu təqdim edərkən xəta baş verdi. Yenidən cəhd edin.         
   </div>
          )} 
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold text-[18px] py-3 rounded-full transition-colors duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Information'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm; 