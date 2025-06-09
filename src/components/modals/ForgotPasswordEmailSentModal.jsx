import React, { useState, useRef } from 'react';
import BaseModal, { modalButtonStyles } from './BaseModal';

const ForgotPasswordEmailSentModal = ({ isOpen, onClose, onBack, onSuccess }) => {
  const [error, setError] = useState('');
  const emailRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    const email = emailRef.current.value.trim();

    if (!validateEmail(email)) {
      setError('Düzgün email ünvanı daxil edin');
      return;
    }

    setError('');
    if (onSuccess) onSuccess();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="E-poçt ünvanınızı daxil edin"
      subtitle=""
    >
      <div className="flex flex-col w-full gap-4 pt-[40px] pb-[25px]">
        <input
          type="text"
          ref={emailRef}
          placeholder="Emailinizi daxil edin"
          className="text-white placeholder-white border-2 border-orange-500 py-[8px] px-[15px] rounded-4xl"
        />

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

export default ForgotPasswordEmailSentModal;
