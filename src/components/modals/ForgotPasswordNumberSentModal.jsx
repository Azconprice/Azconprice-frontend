import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const ForgotPasswordNumberSentModal = ({ isOpen, onClose, onBack, onSubmit }) => {
  const [rawPhone, setRawPhone] = useState('');
  const [error, setError] = useState('');

  const allowedOperators = ['077', '070', '050', '055', '051', '099', '012'];

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    const parts = [];
    if (cleaned.length > 0) parts.push(cleaned.slice(0, 3));
    if (cleaned.length > 3) parts.push(cleaned.slice(3, 6));
    if (cleaned.length > 6) parts.push(cleaned.slice(6, 8));
    if (cleaned.length > 8) parts.push(cleaned.slice(8, 10));
    return parts.join(' ');
  };

  const validatePhone = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length !== 10) return false;
    const operatorCode = cleaned.slice(0, 3);
    return allowedOperators.includes(operatorCode);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (/[A-Za-z]/.test(input)) {
      setError('Zəhmət olmasa yalnız rəqəmlər daxil edin');
      return;
    }
    const cleaned = input.replace(/\D/g, '').slice(0, 10);
    setRawPhone(cleaned);
    setError('');
  };

  const handleSubmit = () => {
    if (!rawPhone) {
      setError('Nömrə daxil edin');
      return;
    }
    if (!validatePhone(rawPhone)) {
      setError('Düzgün telefon nömrəsi daxil edin');
      return;
    }
    setError('');
    if (onSubmit) onSubmit();
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
            placeholder="XXX XXX XX XX"
            value={formatPhoneNumber(rawPhone)}
            onChange={handlePhoneChange}
            className="flex-1 text-gray-500 placeholder-gray-400 bg-transparent focus:outline-none"
            style={{ paddingLeft: 0 }}
          />
        </div>
      </div>
      {error && (
        <div className="text-[16px] font-medium text-center mb-[10px] text-red-500 ">{error}</div>
      )}
      <button className={modalButtonStyles} onClick={handleSubmit}>
        Göndər
      </button>
    </BaseModal>
  );
};

export default ForgotPasswordNumberSentModal;
