import React, { useState, useEffect } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const ForgotPasswordOtpModal = ({ isOpen, onClose, onBack, onSuccess, method, contact, contactType }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600);
  const [isLoading, setIsLoading] = useState(false);

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

    if (enteredOtp.length !== 6) {
      setError('OTP kodu 6 rəqəm olmalıdır.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/reset-password/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: contact,
          contactType: contactType,
          otp: enteredOtp
        }),
      });

      if (response.ok) {
        onSuccess({ contact, contactType });
      } else {
        const errorData = await response.text();
        setError('Yanlış OTP kodu.');
        console.error('OTP verification failed:', errorData);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Şəbəkə xətası. Yenidən cəhd edin.');
    } finally {
      setIsLoading(false);
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
        Kodu yenidən göndər: {formatTime(timeLeft)}
      </div>

      {error && <div className={modalErrorStyles}>{error}</div>}

      <button
        className={modalButtonStyles}
        onClick={handleVerifyOtp}
        disabled={timeLeft === 0 || isLoading}
      >
        {isLoading ? 'Yoxlanılır...' : 'Davam et'}
      </button>
    </BaseModal>
  );
};

export default ForgotPasswordOtpModal; 