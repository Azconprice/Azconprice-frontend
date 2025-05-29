import React, { useState } from 'react';
import BaseModal, { modalButtonStyles } from './BaseModal';
import { FiMail, FiPhone } from 'react-icons/fi';

const ForgotPasswordMethodModal = ({ isOpen, onClose, onBack, onSelectMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState('email');

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Şifrəni unutmuşam"
    >
      <div className="w-full flex flex-col gap-4 mb-6">
        <div
          className={`flex items-center justify-between px-4 py-2 mt-[30px] rounded-4xl border cursor-pointer ${selectedMethod === 'email' ? 'border-orange-500 border-3 bg-orange-50' : 'border-gray-700 bg-white'}`}
          onClick={() => setSelectedMethod('email')}
        >
          <div className="flex items-center">
            <input
              type="radio"
              value="email"
              checked={selectedMethod === 'email'}
              onChange={() => setSelectedMethod('email')}
              className="mr-3 accent-orange-500 cursor-pointer"
            />
            <div className="text-black">
              <p className="font-bold text-sm">E-poçt ünvanı ilə parolu yeniləyin</p>
              <p className="text-xs">Daxil etdiyiniz E-poçt ünvanına OTP kodu göndəriləcək</p>
            </div>
          </div>
          <FiMail size={24} className={`${selectedMethod === 'email' ? 'text-orange-500' : 'text-gray-400'}`} />
        </div>

        <div
          className={`flex items-center justify-between px-4 py-2 rounded-4xl border cursor-pointer ${selectedMethod === 'phone' ? 'border-orange-500 border-3 bg-orange-50' : 'border-gray-700 bg-white'}`}
          onClick={() => setSelectedMethod('phone')}
        >
           <div className="flex items-center">
            <input
              type="radio"
              value="phone"
              checked={selectedMethod === 'phone'}
              onChange={() => setSelectedMethod('phone')}
              className="mr-3 accent-orange-500 cursor-pointer"
            />
             <div className="text-black">
              <p className="font-bold text-sm">Telefon nömrəniz ilə yeniləyin</p>
              <p className="text-xs">Daxil etdiyiniz telefon nömrənizə OTP kodu göndəriləcək</p>
            </div>
          </div>
          <FiPhone size={24} className={`${selectedMethod === 'phone' ? 'text-orange-500' : 'text-gray-400'}`} />
        </div>
      </div>
      <button
        className={modalButtonStyles}
        onClick={() => onSelectMethod(selectedMethod)}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default ForgotPasswordMethodModal; 