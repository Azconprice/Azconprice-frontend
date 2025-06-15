import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from '../BaseModal';

const NormalUserRegistrationStepTwo = ({ isOpen, onClose, onBack, onNext, initialData }) => {
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState(initialData?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(initialData?.confirmPassword || '');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!email || !password || !confirmPassword) {
      setError('Bütün xanaları doldurun');
      return;
    }

    if (password.length < 8) {
      setError('Şifrə ən az 8 simvol olmalıdır');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifrələr uyğun gəlmir');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Zəhmət olmasa düzgün e-poçt ünvanı daxil edin');
      return;
    }

    setError('');  
    onNext({
      email,
      password,
      confirmPassword
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      className="overflow-y-visible"
      title="Qeydiyyat"
      subtitle="Adi İstifadəçi"
    >
              <div className="mb-[10px] w-full">
              <div className="relative mb-4 ">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src="/assets/icons/email.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
      <input
        type="email"
        placeholder="E-poçt ünvanı"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
        required
      />
      </div>
      <div className="relative mb-4 ">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src="/assets/icons/passwordicon.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
      <input
        type="password"
        placeholder="Şifrə"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
        required
      />
      </div>
      <div className="relative mb-4 ">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src="/assets/icons/passwordicon.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
      <input
        type="password"
        placeholder="Şifrəni təkrarlayın"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
        required
      />
      </div>
        </div>
      {error && <div className={modalErrorStyles}>{error}</div>}
      <button
        className={modalButtonStyles}
        onClick={handleContinue}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default NormalUserRegistrationStepTwo;
