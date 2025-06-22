'use client'
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const PlanPaymentModal = ({ 
  onClose, 
  selectedPlan, 
  setSelectedPlan, 
  formData, 
  setFormData 
}) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allowedOperators = ['77', '70', '50', '55', '51', '99', '12'];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 9);
    const parts = [];

    if (cleaned.length > 0) parts.push(cleaned.slice(0, 2));
    if (cleaned.length > 2) parts.push(cleaned.slice(2, 5));
    if (cleaned.length > 5) parts.push(cleaned.slice(5, 7));
    if (cleaned.length > 7) parts.push(cleaned.slice(7, 9));

    return parts.join(' ');
  };

  const validatePhone = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length !== 9) return false;
    const operatorCode = cleaned.slice(0, 2);
    return allowedOperators.includes(operatorCode);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (/[A-Za-z]/.test(input)) {
      setErrors(prev => ({
        ...prev,
        phoneNumber: 'Zəhmət olmasa yalnız rəqəmlər daxil edin'
      }));
      return;
    }
    const cleaned = input.replace(/\D/g, '').slice(0, 9);
    setFormData(prev => ({
      ...prev,
      phoneNumber: cleaned
    }));
    if (errors.phoneNumber) {
      setErrors(prev => ({
        ...prev,
        phoneNumber: ''
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      handleInputChange({
        target: {
          name: 'cardNumber',
          value: formatted
        }
      });
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      handleInputChange({
        target: {
          name: 'expiryDate',
          value: formatted
        }
      });
    }
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      handleInputChange({
        target: {
          name: 'cvc',
          value: value
        }
      });
    }
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    if (errors.plan) {
      setErrors(prev => ({
        ...prev,
        plan: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedPlan) {
      newErrors.plan = 'Zəhmət olmasa bir plan seçin';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad/Soyad tələb olunur';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Əlaqə nömrəsi tələb olunur';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Düzgün telefon nömrəsi daxil edin';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Elektron poçt tələb olunur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Düzgün elektron poçt ünvanı daxil edin';
    }

    const cardNumberOnly = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberOnly) {
      newErrors.cardNumber = 'Kart nömrəsi tələb olunur';
    } else if (cardNumberOnly.length < 13 || cardNumberOnly.length > 19) {
      newErrors.cardNumber = 'Düzgün kart nömrəsi daxil edin';
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Son istifadə tarixi tələb olunur';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format: MM/YY';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Kartın müddəti bitib';
      }
    }

    if (!formData.cvc.trim()) {
      newErrors.cvc = 'CVC tələb olunur';
    } else if (formData.cvc.length < 3) {
      newErrors.cvc = 'CVC 3 rəqəm olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Processing payment...', { selectedPlan, ...formData });
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Ödəniş uğurla tamamlandı!');
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      setErrors({ submit: 'Ödəniş zamanı xəta baş verdi. Yenidən cəhd edin.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const plans = [
    { id: 'one-time', title: 'Birdəfəlik plan', description: 'Bu plan qeydiyyata ehtiyac olmadan\nistifade ede bilersiniz', price: '1000 Azn' },
    { id: 'monthly', title: 'Aylıq plan', description: 'Bu plan qeydiyyata ehtiyac olmadan\nistifade ede bilersiniz', price: '1500 Azn/Ay' },
    { id: 'yearly', title: 'İllik plan', description: 'Bu plan qeydiyyata ehtiyac olmadan\nistifade ede bilersiniz', price: '1500 Azn/Ay' }
  ];

  return (
    <div 
      className="fixed z-50 inset-0 backdrop-blur-lg bg-opacity-75 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full overflow-hidden relative">
        <button 
          onClick={onClose} 
          className="absolute text-3xl text-gray-500 cursor-pointer top-4 right-4 hover:text-gray-700"
        >
          <FiX />
        </button>
        
        {/* Main flex container with vertical divider */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column: Plan Selection */}
          <div className="flex-1 md:pr-8 md:border-r-2 md:border-black pb-8 md:pb-0">
            <h2 className="text-[26px] font-bold text-gray-900 mb-2 ">Planınızı seçin</h2>
            <p className="text-[#838080] text-[13px] mb-6">Sizin üçün möhtəşəm planlarımız var</p>
            {errors.plan && <p className="text-red-500 text-sm mb-4">{errors.plan}</p>}

            {/* Plan Cards Container */}
            <div className="flex flex-col gap-4">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`text-white rounded-2xl md:rounded-lg flex items-center justify-between relative overflow-hidden plan-card-background cursor-pointer transition-all ${
                    selectedPlan === plan.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <div className=' flex flex-col gap-[5px] '>
                    <h3 className="text-[16px] font-semibold text-left pl-[15px] pt-[10px]">{plan.title}</h3>
                    <p className="text-gray-400 text-[12px] pl-[15px] pb-[10px] text-left" style={{ whiteSpace: 'pre-line' }}>{plan.description}</p>
                  </div>
                  <div className="text-[14px] font-bold border w-[135px] text-center border-orange-500 px-4 py-2 mr-[20px] rounded-[8px]">{plan.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Payment */}
          <div className="flex-1 md:pl-8">
            <h2 className="text-[26px] font-bold text-gray-900 mb-6">Ödəniş</h2>

            {/* Şəxsi məlumatları */}
            <div className="mb-6">
              <h3 className="text-[13px] font-semibold text-[#838080] mb-3">Şəxsi məlumatları</h3>
              <div className="flex flex-row md:flex-row gap-4 w-full flex-shrink-0">
                <div className="w-full md:w-1/2">
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Ad/Soyad" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full text-[14px] px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 box-border ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div className="w-full md:w-1/2">
                  <div className={`flex items-center overflow-hidden rounded-full bg-[#EDE6E6] px-2 py-2 border ${
                    errors.phoneNumber ? 'border-red-500' : 'border-transparent'
                  }`}>
                    <span className="pl-2 pr-2 text-gray-500 text-[14px]">+994</span>
                    <input
                      type="tel"
                      placeholder="XX XXX XX XX"
                      value={formatPhoneNumber(formData.phoneNumber)}
                      onChange={handlePhoneChange}
                      className={`flex-1 text-gray-500 placeholder-gray-400 bg-transparent focus:outline-none text-[14px] ${
                        errors.phoneNumber ? 'text-red-500' : ''
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>
              <div className="mt-4">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Elektron poçt" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full text-[14px] px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 box-border ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Ödəniş metodu */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Ödəniş metodu</h3>
              <div className="flex items-center gap-4 w-full flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <input 
                    type="text" 
                    placeholder="Kartın 16 rəqəmli kodu" 
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className={`w-full text-[14px] px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 box-border ${
                      errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'
                    }`}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                {/* Card icons placeholder - assuming these are in /public */}
                <div className="flex gap-1">
                  <img src="/assets/images/Visa.svg" alt="Visa" className="h-[25px]"/>
                  <img src="/assets/images/Mastercard.svg" alt="Mastercard" className="h-[25px]"/>
                  <img src="/assets/images/Maestro.svg" alt="Maestro" className="h-[25px]"/>
                </div>
              </div>
              <div className="flex flex-row gap-4 mt-4 w-full flex-shrink-0">
                <div className="w-full md:w-1/2">
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    value={formData.expiryDate}
                    onChange={handleExpiryChange}
                    className={`w-full text-[14px] px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 box-border ${
                      errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'
                    }`}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
                <div className="w-full md:w-1/2">
                  <input 
                    type="text" 
                    placeholder="CVC" 
                    value={formData.cvc}
                    onChange={handleCvcChange}
                    className={`w-full text-[14px] px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 box-border ${
                      errors.cvc ? 'border-red-500 focus:ring-red-500' : 'focus:ring-orange-500'
                    }`}
                  />
                  {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center mb-6">
              <input 
                type="checkbox" 
                id="send-receipt" 
                name="sendReceipt"
                checked={formData.sendReceipt}
                onChange={handleInputChange}
                className="mr-2 accent-orange-500"
              />
              <label htmlFor="send-receipt" className="text-gray-700">Qəbzi E-poçt adresimə göndər</label>
            </div>

            {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}

            {/* Payment Button */}
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-orange-500 text-[16px] w-[155px] text-white font-semibold py-3 rounded-full transition duration-300 ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'cursor-pointer hover:bg-orange-600'
              }`}
            >
              {isSubmitting ? 'Gözləyin...' : 'Ödəniş edin'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPaymentModal;