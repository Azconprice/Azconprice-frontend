import React, { useState } from 'react';
import BaseModal, { modalButtonStyles, modalErrorStyles } from './BaseModal';

const CompanyRegistrationStepTwo = ({ isOpen, onClose, onBack, onNext }) => {
  const [voen, setVoen] = useState('');
  const [salesCategory, setSalesCategory] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!voen || !salesCategory) {
      setError('Bütün xanaları doldurun');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Qeydiyyat"
      subtitle="Şirkət"
    >
      <div className="mb-[20px] w-90">
        <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src="/assets/icons/vöen.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
           <input
            type="text"
            placeholder="Vöeninizi əlavə edin"
            value={voen}
            onChange={e => setVoen(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src="/assets/icons/salescategory.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <input
            type="text"
            placeholder="Satış kateqoriyası"
            value={salesCategory}
            onChange={e => setSalesCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
      {error && <div className={`${modalErrorStyles} mt-[-10px]`}>{error}</div>}
      <button
        className={modalButtonStyles}
        onClick={handleContinue}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default CompanyRegistrationStepTwo;
