import React from 'react';
import BaseModal, { modalButtonStyles } from './BaseModal';

const ForgotPasswordEmailSentModal = ({ isOpen, onClose, onBack }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Şifrəni unutmuşam"
      subtitle="Parolu yeniləmək üçün e-poçt ünvanınıza göndərilən linkə keçid edin."
    >
      <button
        className={modalButtonStyles}
        onClick={onClose}
      >
        Bağla
      </button>
    </BaseModal>
  );
};

export default ForgotPasswordEmailSentModal; 