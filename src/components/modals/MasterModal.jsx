import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const MasterModal = ({ isOpen, onBack, onSubmit, onClose }) => {
  const [address, setAddress] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [price, setPrice] = useState('');
  const [experience, setExperience] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!address || !specialty || !price || !experience) {
      setError('Bütün xanaları doldurun.');
      return;
    }
    setError('');
    onSubmit({ address, specialty, price, experience });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      className="overflow-y-visible"
    >
      <input
        type="text"
        placeholder="Ünvan"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className={`${modalInputStyles} mt-[25px]`}
        required
      />
      <input
        type="text"
        placeholder="İxtisas"
        value={specialty}
        onChange={e => setSpecialty(e.target.value)}
        className={modalInputStyles}
        required
      />
      <div className="w-full flex flex-row gap-2 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Qiymət"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl bg-white text-black focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Təcrübə ili"
          value={experience}
          onChange={e => setExperience(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl bg-white text-black focus:outline-none"
          required
        />
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

export default MasterModal; 