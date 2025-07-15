import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';
import viewIcon from "@/assets/icons/view.png";
import hideIcon from "@/assets/icons/hide.png";

const ResetPasswordModal = ({ isOpen, onClose, onBack, onSuccess, contact, contactType }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Şifrələr uyğun gəlmir.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Şifrə ən az 8 simvol olmalıdır.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/reset-password/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: contact,
          contactType: contactType,
          newPassword: newPassword
        }),
      });

      if (response.ok) {
        onSuccess('Şifrəniz uğurla dəyişdirildi');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.text();
        setError('Şifrə dəyişdirilə bilmədi. Yenidən cəhd edin.');
        console.error('Reset password failed:', errorData);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Şəbəkə xətası. Yenidən cəhd edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Yeni şifrə təyin et"
    >
      <div className='mt-[30px] mb-[8px]'>
        <div className="relative mb-3">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Yeni şifrə"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className={modalInputStyles}
            required
          />
          <span
            className="absolute right-4  top-[20px]  -translate-y-1/2 cursor-pointer"
            onClick={() => setShowNewPassword((prev) => !prev)}
          >
            <img
              src={showNewPassword ? viewIcon.src : hideIcon.src}
              alt={showNewPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
              className="w-5 h-5"
            />
          </span>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Şifrəni təkrarlayın"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={modalInputStyles}
            required
          />
          <span
            className="absolute right-4  top-[20px] -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            <img
              src={showConfirmPassword ? viewIcon.src : hideIcon.src}
              alt={showConfirmPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
              className="w-5 h-5"
            />
          </span>
        </div>
      </div>
      {error && <div className={modalErrorStyles}>{error}</div>}
      <button
        className={modalButtonStyles}
        onClick={handleResetPassword}
        disabled={isLoading}
      >
        {isLoading ? 'Dəyişdirilir...' : 'Davam et'}
      </button>
    </BaseModal>
  );
};

export default ResetPasswordModal; 