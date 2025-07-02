import React, { useState, useRef } from 'react';
import BaseModal, { modalButtonStyles, modalErrorStyles } from './BaseModal';

const ForgotPasswordEmailSentModal = ({ isOpen, onClose, onBack, onSuccess }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    const email = emailRef.current.value.trim();

    if (!validateEmail(email)) {
      setError('Düzgün email ünvanı daxil edin');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/reset-password/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: email,
          contactType: 'email'
        }),
      });

      if (response.ok) {
        if (onSuccess) onSuccess({ contact: email, contactType: 'email' });
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

export default ForgotPasswordEmailSentModal;
