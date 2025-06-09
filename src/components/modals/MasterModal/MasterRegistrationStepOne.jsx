import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from '../BaseModal';

const MasterRegistrationStepOne = ({ isOpen, onClose, onBack, onNext }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
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
    onNext();
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
      <div className="mb-[20px] w-90">
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
            placeholder="XXX XXX XX XX"
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