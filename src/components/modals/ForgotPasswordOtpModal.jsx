import React, { useState, useEffect } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const ForgotPasswordOtpModal = ({ isOpen, onClose, onBack, onSuccess, method }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setOtp(['', '', '', '']);
      setError('');
      setTimeLeft(60);
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

      if (value !== '' && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === '' && index > 0) {
       document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    const correctOtp = method === 'email' ? '0000' : '1111';

    if (enteredOtp === correctOtp) {
      setError('');
      onSuccess();
    } else {
      setError('Yanlış OTP kodu.');
    }
  };

  const subtitleText = method === 'email' ? 'Elektron poçtunuza gələn OTP kodunu daxil edin' : 'Telefon nömrənizə gələn OTP kodunu daxil edin';

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Parolu unutmuşam"
      subtitle={subtitleText}
    >
      <div className="w-full flex justify-center gap-4 mb-6">
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
            className="w-12 h-12 text-center text-2xl rounded-xl bg-white text-black focus:outline-none"
          />
        ))}
      </div>

      <div className="w-full text-center text-sm text-gray-300 mb-6">
        Kodu yenidən göndər: {timeLeft} sn
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

export default ForgotPasswordOtpModal; 