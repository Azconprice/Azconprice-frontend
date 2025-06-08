import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';
  

const MasterRegistrationStepOne = ({ isOpen, onClose, onBack, onNext }) => {
 const [error, setError] = useState('');

  const handleContinue = () => {
    if (!fullName || !address || !rawPhone) {
      setError('Bütün xanaları doldurun');
      return;
    }
    if (!validatePhone(rawPhone)) {
      setError('Düzgün telefon nömrəsi daxil edin');
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
      subtitle="Adi İstifadəçi"
    >
     <h2>sadasd</h2>
      <button
        className={modalButtonStyles}
        onClick={handleContinue}
      >
        Davam et
      </button>
    </BaseModal>  )
}

export default MasterRegistrationStepOne