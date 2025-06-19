import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const LoginModal = ({ isOpen, onClose, onForgotPassword, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearErrors = () => {
    setError('');
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = async () => {
    clearErrors();

    if (!email.trim()) {
      setEmailError('Elektron poçt tələb olunur.');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Şifrə tələb olunur.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Düzgün elektron poçt ünvanı daxil edin.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        console.log(email);
        console.log(password);



        onSuccess('Uğurla hesaba daxil olduz');
      } else {
        const errorData = await response.json().catch(() => ({}));

        switch (response.status) {
          case 400:
            if (errorData.errors) {
              if (errorData.errors.email) {
                setEmailError(errorData.errors.email[0] || 'Elektron poçt xətası.');
              }
              if (errorData.errors.password) {
                setPasswordError(errorData.errors.password[0] || 'Şifrə xətası.');
              }
              if (!errorData.errors.email && !errorData.errors.password) {
                setError(errorData.message || 'Məlumatlar düzgün deyil.');
              }
            } else {
              setError(errorData.message || 'Məlumatlar düzgün deyil.');
            }
            break;
          case 401:
            setError('Elektron poçt və ya şifrə yanlışdır.');


        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('İnternet bağlantınızı yoxlayın və yenidən cəhd edin.');
      } else {
        setError('Bağlantı xətası. Yenidən cəhd edin.');
      }
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
      <div className="w-full">
        <input
          type="email"
          placeholder="Elektron poçt"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
          }}
          className={`${modalInputStyles} ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
          required
        />
        {emailError && <div className="text-red-500 text-sm mt-1 mb-2">{emailError}</div>}
      </div>
      <div className="w-full">
        <input
          type="password"
          placeholder="Şifrə"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError('');
          }}
          className={`${modalInputStyles} ${passwordError ? 'border-red-500 focus:border-red-500' : ''}`}
          required
        />
        {passwordError && <div className="text-red-500 text-sm mt-1 mb-2">{passwordError}</div>}
      </div>
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
        <button onClick={onForgotPassword} className="text-orange-500 cursor-pointer hover:underline">
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