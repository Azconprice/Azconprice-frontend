import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const MasterRegistrationStepTwo = ({ isOpen, onClose, onBack, onNext }) => {
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
const [voen, setVoen] = useState('');
  const handleContinue = () => {
    if (!specialty || !experience || !price || !voen) {
      setError('Bütün xanaları doldurun');
      return;
    }

    if (isNaN(experience) || parseInt(experience) < 0) {
      setError('Təcrübə müddəti düzgün daxil edilməyib');
      return;
    }

    if (isNaN(price) || parseInt(price) < 0) {
      setError('Qiymət düzgün daxil edilməyib');
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
      subtitle="Usta"
    >
      <div className="mb-[20px] w-90">
         <div className="relative mb-4">
          <span className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2">
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
          <span className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2">
            <img src="/assets/icons/ixtisas.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <input
            type="text"
            placeholder="İxtisas"
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="flex flex-row  gap-[10px]">
           <div className="relative mb-4">
          <input
            type="number"
              min="0"
            placeholder="Təcrübə (il)"
            value={experience}
            onChange={e => setExperience(e.target.value)}
            className="w-full pl-5 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="relative mb-4">
        
          <input
            type="text"
            placeholder="Qiymət"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-full pl-5 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
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

export default MasterRegistrationStepTwo;