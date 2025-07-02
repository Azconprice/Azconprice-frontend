import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const ForgotPasswordNumberSentModal = ({ isOpen, onClose, onBack, onSubmit }) => {
  const [rawPhone, setRawPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const allowedOperators = ['77', '70', '50', '55', '51', '99', '12'];

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
      setError('Zəhmət olmasa yalnız rəqəmlər daxil edin');
      return;
    }
    const cleaned = input.replace(/\D/g, '').slice(0, 9);
    setRawPhone(cleaned);
    setError('');
  };

  const handleSubmit = async () => {
    if (!rawPhone) {
      setError('Nömrə daxil edin');
      return;
    }
    if (!validatePhone(rawPhone)) {
      setError('Düzgün telefon nömrəsi daxil edin');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const phoneNumber = `+994${rawPhone}`;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/reset-password/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: phoneNumber,
          contactType: 'phone'
        }),
      });

      if (response.ok) {
        if (onSubmit) onSubmit({ contact: phoneNumber, contactType: 'phone' });
      } else {
        const errorData = await response.text();
        setError('Xəta baş verdi. Yenidən cəhd edin.');
        console.error('Request OTP failed:', errorData);
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setError('Şəbəkə xətası. Yenidən cəhd edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Telefon nömrənizi daxil edin"
      subtitle=""
    >
      <div className="flex flex-col w-full gap-4 pt-[40px] pb-[25px]">
        <div className="flex items-center overflow-hidden rounded-full bg-[#F3F3F3] px-2 py-2 mb-4 relative">
          <span className="pl-2 pr-2 text-gray-500">+994</span>
          <input
            type="tel"
            placeholder="XX XXX XX XX"
            value={formatPhoneNumber(rawPhone)}
            onChange={handlePhoneChange}
            className="flex-1 text-gray-500 placeholder-gray-400 bg-transparent focus:outline-none"
            style={{ paddingLeft: 0 }}
          />
        </div>
      </div>
      {error && (
        <div className={modalErrorStyles}>{error}</div>
      )}
      <button 
        className={modalButtonStyles} 
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Göndərilir...' : 'Göndər'}
      </button>
    </BaseModal>
  );
};

export default ForgotPasswordNumberSentModal;
