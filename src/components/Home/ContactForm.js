'use client'
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

const ContactForm = () => {
  const t = useTranslations('ContactForm');

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
  const [openSelect, setOpenSelect] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (val) => {
    setFormData(prev => ({ ...prev, applicationType: val }));
    setOpenSelect(false);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = t('errors.fullName');
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = t('errors.phoneNumber');
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      errors.phoneNumber = t('errors.phoneNumberInvalid');
    }

    if (!formData.email.trim()) {
      errors.email = t('errors.email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('errors.emailInvalid');
    }

    if (!formData.applicationType) {
      errors.applicationType = t('errors.applicationType');
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
        });
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
      <div className="flex-1 bg-[#101827] text-white p-8 md:p-12 flex items-center flex-col justify-center">
        <h2 className="text-[24px] md:text-4xl lg:text-[54px] font-bold leading-tight">
          {t('title.line1')}<br />
          {t('title.line2')}<br />
          <span className="text-orange-500">{t('title.highlight')}</span>
        </h2>
      </div>

      <div className="flex-1 p-8 md:p-12 bg-[#F0EEEE]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder={t('placeholders.fullName')}
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-0 py-2 border-0 border-b text-[18px] bg-transparent focus:outline-none transition-colors duration-200 placeholder-gray-500 ${validationErrors.fullName
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[rgba(16,24,39,1)] focus:border-orange-500'
                }`}
            />
            {validationErrors.fullName && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder={t('placeholders.phoneNumber')}
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-0 py-2 border-0 text-[18px] border-b bg-transparent focus:outline-none transition-colors duration-200 placeholder-gray-500 ${validationErrors.phoneNumber
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
              placeholder={t('placeholders.email')}
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-0 py-2 border-0 text-[18px] border-b bg-transparent focus:outline-none transition-colors duration-200 placeholder-gray-500 ${validationErrors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[rgba(16,24,39,1)] focus:border-orange-500'
                }`}
            />
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenSelect(!openSelect)}
              className={`w-full flex justify-between items-center cursor-pointer px-0 py-2 border-0 border-b text-[18px] bg-transparent transition-colors duration-200 ${validationErrors.applicationType
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[rgba(16,24,39,1)] focus:border-orange-500'
                }`}
            >
              <span className={formData.applicationType ? "text-black" : "text-gray-500"}>
                {formData.applicationType
                  ? {
                    PlanInqury: t('options.planInquiry'),
                    Support: t('options.support'),
                    Registration: t('options.registration'),
                    ComplaintAndSuggestion: t('options.complaint')
                  }[formData.applicationType]
                  : t('placeholders.applicationType')}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>

            {openSelect && (
              <div className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-56">
                <div
                  onClick={() => handleSelectChange("PlanInqury")}
                  className="px-4 py-2 cursor-pointer hover:bg-orange-200"
                >
                  {t('options.planInquiry')}
                </div>
                <div
                  onClick={() => handleSelectChange("Support")}
                  className="px-4 py-2 cursor-pointer hover:bg-orange-200"
                >
                  {t('options.support')}
                </div>
                <div
                  onClick={() => handleSelectChange("Registration")}
                  className="px-4 py-2 cursor-pointer hover:bg-orange-200"
                >
                  {t('options.registration')}
                </div>
                <div
                  onClick={() => handleSelectChange("ComplaintAndSuggestion")}
                  className="px-4 py-2 cursor-pointer hover:bg-orange-200"
                >
                  {t('options.complaint')}
                </div>
              </div>
            )}

            {validationErrors.applicationType && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.applicationType}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <textarea
              name="notes"
              placeholder={t('placeholders.notes')}
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-0 py-2 text-[18px] border-0 border-b border-[rgba(16,24,39,1)] bg-transparent focus:border-orange-500 focus:outline-none transition-colors duration-200 placeholder-gray-500 resize-none"
            />
          </div>

          {/* Messages */}
          {submitStatus === 'success' && (
            <div className="text-[20px] text-green-700">
              {t('messages.success')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="text-red-700">
              {t('messages.error')}
            </div>
          )}


          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold text-[18px] py-3 rounded-full transition-colors duration-300 ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                }`}
            >
              {isSubmitting ? t('buttons.sending') : t('buttons.send')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
