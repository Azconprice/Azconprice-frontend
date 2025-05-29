import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const RegistrationModal = ({ isOpen, onClose, onNext }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Usta');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!name || !phone || !type) {
      setError('Bütün xanaları doldurun.');
      return;
    }
    setError('');
    onNext({ name, phone, type });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Qeydiyyat"
      subtitle="AzConPrice kabinetinə xoş gəlmisiniz!"
    >
      <input
        type="text"
        placeholder="Ad Soyad"
        value={name}
        onChange={e => setName(e.target.value)}
        className={modalInputStyles}
        required
      />
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className={modalInputStyles}
        required
      >
        <option value="Usta">Usta</option>
        <option value="Şirkət">Şirkət</option>
      </select>
      <input
        type="text"
        placeholder="Mobil nömrə"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className={modalInputStyles}
        required
      />
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

export default RegistrationModal; 