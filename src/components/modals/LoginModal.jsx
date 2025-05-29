import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const LoginModal = ({ isOpen, onClose, onForgotPassword, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password123') {
      setError('');
      onSuccess('Uğurla hesaba daxil olduz');
    } else {
      setError('Elektron poçt və ya şifrə yanlışdır.');
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Daxil ol"
      subtitle="AzConPrice kabinetinə xoş gəlmisiniz!"
    >
      <input
        type="email"
        placeholder="Elektron poçt"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={modalInputStyles}
        required
      />
      <input
        type="password"
        placeholder="Şifrə"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={modalInputStyles}
        required
      />
      <div className="w-full flex justify-between items-center mb-6 text-white text-sm">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className="mr-2 accent-orange-500"
          />
          Yadda saxla
        </label>
        <button onClick={onForgotPassword} className="text-orange-500 hover:underline">
          Şifrəni unutmusan?
        </button>
      </div>
      {error && <div className={modalErrorStyles}>{error}</div>}
      <button
        className={modalButtonStyles}
        onClick={handleLogin}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default LoginModal; 