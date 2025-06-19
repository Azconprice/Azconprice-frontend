import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import BaseModal, { modalButtonStyles } from '../BaseModal';

const NormalUserOtpModal = ({ isOpen, onClose, message }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      bgColor="bg-white"
      textColor="text-black"
      iconColor="text-black"
    >

      <FaCheckCircle className="text-green-500" size={80} />
      <h2 className="mt-6 mb-2 text-2xl font-bold text-[#F37321] text-center">Təsdiq linki uğurla göndərildi!</h2>
      <p className="mb-6  mt-[10px] text-black-500 text-black text-center text-[16px]">Mailinizə daxil olub hesabınızı təsdiqləməyi unutmayın</p>

    </BaseModal>
  );
};

export default NormalUserOtpModal; 