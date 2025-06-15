import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from '../BaseModal';

const MasterRegistrationStepOne = ({ isOpen, onClose, onBack, onNext,initialData }) => {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [rawPhone, setRawPhone] = useState(initialData?.phoneNumber || '');
  const [error, setError] = useState('');

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

  const handleContinue = () => {
    if (!fullName || !address || !rawPhone) {
      setError('Bütün xanaları doldurun');
      return;
    }
    if (!validatePhone(rawPhone)) {
      setError('Düzgün telefon nömrəsi daxil edin');
      return;
    }
    setError('');
    onNext({
      fullName,
      address,
      phoneNumber: rawPhone
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Qeydiyyat"
      subtitle="Usta"
    >
      <div className="mb-[20px] w-full">
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src="/assets/icons/person.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <input
            type="text"
            placeholder="Adı Soyadı"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src="/assets/icons/location.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <input
            type="text"
            placeholder="Ünvan"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="flex items-center overflow-hidden rounded-full bg-[#F3F3F3] px-2 py-2">
          <span className="pl-2 pr-2 text-gray-500">+994</span>
          <input
            type="tel"
            placeholder="XX XXX XX XX"
            value={formatPhoneNumber(rawPhone)}
            onChange={handlePhoneChange}
            className="flex-1 bg-transparent text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
      {error && <div className={`${modalErrorStyles} mt-[-10px]`}>{error}</div>}
      <button
        className={modalButtonStyles}
        onClick={handleContinue}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default MasterRegistrationStepOne;