import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const LoginModal = ({ isOpen, onClose, onForgotPassword, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Elektron poçt və şifrə tələb olunur.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        console.log(email);
        console.log(password);
        
        
        
        onSuccess('Uğurla hesaba daxil olduz');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Elektron poçt və ya şifrə yanlışdır.');
      }
    } catch (error) {
      setError('Bağlantı xətası. Yenidən cəhd edin.');
    } finally {
      setIsLoading(false);
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
      <div className="flex items-center justify-between w-full mb-6 text-sm text-white ">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className="mr-2 cursor-pointer accent-orange-500"
          />
          Yadda saxla
        </label>
        <button onClick={onForgotPassword}  className="text-orange-500 cursor-pointer hover:underline">
          Şifrəni unutmusan?
        </button>
      </div>
      {error && <div className={modalErrorStyles}>{error}</div>}
      <button
        className={`${modalButtonStyles} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Gözləyin...' : 'Davam et'}
      </button>
    </BaseModal>
  );
};

export default LoginModal; 