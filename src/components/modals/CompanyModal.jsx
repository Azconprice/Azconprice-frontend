import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';
const CompanyModal = ({ isOpen, onBack, onSubmit, onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [voen, setVoen] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const handleContinue = () => {
    if (!companyName || !voen || !category) {
      setError('Bütün xanaları doldurun.');
      return;
    }
    setError('');
    onSubmit({ companyName, voen, category });
  };
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
    >
      <input
        type="text"
        placeholder="Şirkətin adı"
        value={companyName}
        onChange={e => setCompanyName(e.target.value)}
        className={modalInputStyles}
        required
      />
      <input
        type="text"
        placeholder="VÖEN"
        value={voen}
        onChange={e => setVoen(e.target.value)}
        className={modalInputStyles}
        required
      />
      <input
        type="text"
        placeholder="Satış kateqoriyası"
        value={category}
        onChange={e => setCategory(e.target.value)}
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

export default CompanyModal; 