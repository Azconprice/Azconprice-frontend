import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import BaseModal, { modalButtonStyles } from './BaseModal';

const SuccessModal = ({ isOpen, onClose, message }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      bgColor="bg-white"
      textColor="text-black"
    >
      <FaCheckCircle className="text-green-500" size={80} />
      <h2 className="text-black text-2xl font-bold mt-6 mb-2">Uğurlu</h2>
      <p className="text-gray-500 mb-6">{message}</p>
      <button
        className={modalButtonStyles}
        onClick={onClose}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default SuccessModal; 