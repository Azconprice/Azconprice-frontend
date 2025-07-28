import React, { useState, useEffect } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const OtpVerifyModal = ({ isOpen, onClose, onBack, onSuccess, initialData }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setError('');
      setTimeLeft(600);
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isOpen]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    if (/^\d*$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === '' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/otp-verify`, {
        method: 'POST',
        body: JSON.stringify({
          phoneNumber: `+994${initialData.phoneNumber}`,
          code: enteredOtp
        }),
        headers: {
          'Content-Type': 'application/json'
        }

      });
      if (res.ok) {
        onSuccess();
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const subtitleText = 'Telefon nömrənizə gələn OTP kodunu daxil edin';

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Qeydiyyatı tamamlayın"
      subtitle={subtitleText}
    >
      <div className="flex justify-center w-full gap-4 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={e => handleOtpChange(index, e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
              }
            }}
            className="w-12 h-12 text-2xl text-center text-black bg-white rounded-xl focus:outline-none"
          />
        ))}
      </div>

      <div className="w-full mb-6 text-sm text-center text-gray-300">
        Kodu yenidən göndər: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>

      {error && <div className={modalErrorStyles}>{error}</div>}

      <button
        className={modalButtonStyles}
        onClick={handleVerifyOtp}
        disabled={timeLeft === 0}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default OtpVerifyModal; 