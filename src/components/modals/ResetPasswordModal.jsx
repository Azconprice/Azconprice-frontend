import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const ResetPasswordModal = ({ isOpen, onClose, onBack, onSuccess }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setError('Şifrələr uyğun gəlmir.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Şifrə ən az 8 simvol olmalıdır.');
      return;
    }
    setError('');
    onSuccess('Şifrəniz uğurla dəyişdirildi');
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Yeni şifrə təyin et"
    >
      <input
        type="password"
        placeholder="Yeni şifrə"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        className={modalInputStyles}
        required
      />
      <input
        type="password"
        placeholder="Şifrəni təkrarlayın"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className={modalInputStyles}
        required
      />
      {error && <div className={modalErrorStyles}>{error}</div>}
      <button
        className={modalButtonStyles}
        onClick={handleResetPassword}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default ResetPasswordModal; 