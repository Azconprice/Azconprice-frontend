import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import BaseModal, { modalButtonStyles } from '../BaseModal';

const CompanyOtpModal = ({ isOpen, onClose, message  }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      bgColor="bg-white"
      textColor="text-black"
      iconColor="text-black"
    >
        
      <FaCheckCircle className="text-green-500" size={80} />
      <h2 className="mt-6 mb-2 text-2xl font-bold text-black">Təsdiq linki uğurla göndərildi!</h2>
      <p className="mb-6 text-gray-500">{message}</p>
     
    </BaseModal>
  );
};

export default CompanyOtpModal; 