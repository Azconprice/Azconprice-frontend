import React, { useState } from 'react';
import BaseModal, { modalButtonStyles, modalErrorStyles } from './BaseModal';

const ForgotPasswordNumberSentModal = ({ isOpen, onClose, onBack }) => {
  const [rawNumber, setRawNumber] = useState('');
  const [error, setError] = useState('');

  const allowedOperators = ['077', '070', '050', '055', '051', '099', '012'];

  const formatNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10); // Yalnız rəqəmləri saxla, 10 rəqəmdən çox olmamalıdır
    const parts = [];

    if (cleaned.length > 0) parts.push(cleaned.slice(0, 3)); // İlk 3 rəqəm
    if (cleaned.length > 3) parts.push(cleaned.slice(3, 6)); // Sonrakı 3 rəqəm
    if (cleaned.length > 6) parts.push(cleaned.slice(6, 8)); // 2 rəqəm
    if (cleaned.length > 8) parts.push(cleaned.slice(8, 10)); // Son 2 rəqəm

    return parts.join(' ');
  };

  const handleChange = (e) => {
    const input = e.target.value;

    // Əgər daxil edilən simvollar arasında hərf varsa, error göstər
    if (/[A-Za-z]/.test(input)) {
      setError('Zəhmət olmasa yalnız rəqəmlər daxil edin');
      return;
    }

    const cleaned = input.replace(/\D/g, '').slice(0, 10); // Nömrə 10 rəqəmdən ibarət olmalıdır
    setRawNumber(cleaned);
    setError('');
  };

  const handleSubmit = () => {
    if (rawNumber.length !== 10) {
      setError('Nömrə 10 rəqəmdən ibarət olmalıdır');
      return;
    }

    const operatorCode = rawNumber.slice(0, 3);
    if (!allowedOperators.includes(operatorCode)) {
      setError('Düzgün mobil operator daxil edin');
      return;
    }

    setError('');
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Mobil nömrənizi daxil edin"
      subtitle=""
    >
      <div className="flex flex-col w-full gap-4 pt-[40px] pb-[25px]">
        <div className="flex items-center overflow-hidden border-2 border-orange-500 rounded-4xl">
          <span className="pl-[15px] pr-[5px] text-white bg-transparent">+994</span>
          <input
            type="tel"
            value={formatNumber(rawNumber)}
            onChange={handleChange}
            placeholder="XXX XXX XX XX"
            className="flex-1 bg-transparent text-white placeholder-white py-[8px] outline-none"
          />
        </div>
        {error && (
          <div className="text-[16px] font-medium text-center mt-[10px] text-red-500">
            {error}
          </div>
        )}
      </div>

      <button className={modalButtonStyles} onClick={handleSubmit}>
        Göndər
      </button>
    </BaseModal>
  );
};

export default ForgotPasswordNumberSentModal;
