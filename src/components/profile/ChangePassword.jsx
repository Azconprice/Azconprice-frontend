'use client';

import { Check, Info, Star, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { updatePassword } from '@/services/profileApi';

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const scrollContainerRef = useRef(null);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Şifrə ən azı 8 simvoldan ibarət olmalıdır';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Şifrədə ən azı bir kiçik hərf olmalıdır';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Şifrədə ən azı bir böyük hərf olmalıdır';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Şifrədə ən azı bir rəqəm olmalıdır';
    }
    return '';
  };

  const handleInputChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccessMessage('');

      if (!passwordData.currentPassword) {
        setError('Cari şifrəni daxil edin');
        return;
      }

      if (!passwordData.newPassword) {
        setError('Yeni şifrəni daxil edin');
        return;
      }

      if (!passwordData.confirmPassword) {
        setError('Şifrə təkrarını daxil edin');
        return;
      }

      const passwordValidation = validatePassword(passwordData.newPassword);
      if (passwordValidation) {
        setError(passwordValidation);
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('Yeni şifrə və təkrarı uyğun gəlmir');
        return;
      }

      if (passwordData.currentPassword === passwordData.newPassword) {
        setError('Yeni şifrə cari şifrədən fərqli olmalıdır');
        return;
      }

      await updatePassword({
        password: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword
      });

      setSuccessMessage('Şifrə uğurla yeniləndi!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      console.error('Failed to update password:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setError('');
    setSuccessMessage('');
  };
  return (
    <>
      <div ref={scrollContainerRef} className="p-[32px] mt-[80px] overflow-y-auto h-[calc(100vh-80px)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-[700] text-[#1E293B]">
            Təhlükəsizlik ayarları
          </h3>
          <div className="flex items-center gap-[8px]">
            <button className="shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer border-1 border-[#CBD5E1] relative group">
              <Info size={16} color="#475569" />

              <div className="absolute top-[-15px] right-[150%] w-[300px] p-[12px] bg-[#101827] rounded-[16px] pointer-events-none transition group-hover:opacity-100 opacity-0">
                <h4 className="font-bold text-[14px] text-white mb-[8px]">
                  Şifrə Təhlükəsizliyi
                </h4>
                <p className="text-[12px] text-white">
                  Hesabınızın təhlükəsizliyi üçün güclü şifrə seçin və mütəmadi olaraq yeniləyin.
                </p>

                <div className="absolute top-[50%] translate-y-[-50%] right-[-4px] w-[16px] h-[16px] bg-[#101827] rotate-45"></div>
              </div>
            </button>

            <div className="flex items-center gap-[8px] bg-[#F37321] rounded-full px-[16px] py-[10px] text-white font-[700] text-[14px]">
              Pro
              <Star size={20} color="#FFFFFF" />
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{successMessage}</p>
          </div>
        )}

        <div className="max-w-[800px]">
          <div className="w-full flex justify-between mb-[24px] items-center">
            <label
              htmlFor="password"
              className="font-[700] text-[16px] text-[#1E293B]"
            >
              Cari şifrə
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={passwordData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
            />
          </div>

          <div className="w-full flex justify-between mb-[24px] items-center">
            <label
              htmlFor="newpassword"
              className="font-[700] text-[16px] text-[#1E293B]"
            >
              Yeni şifrə
            </label>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              value={passwordData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
            />
          </div>

          <div className="w-full flex justify-between mb-[24px] items-center">
            <label
              htmlFor="newpasswordagain"
              className="font-[700] text-[16px] text-[#1E293B]"
            >
              Yeni şifrə təkrarı
            </label>
            <input
              type="password"
              name="newpasswordagain"
              id="newpasswordagain"
              value={passwordData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
            />
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="flex justify-end gap-[8px]">
          <button 
            onClick={handleCancel}
            disabled={saving}
            className="px-[16px] py-[10px] border-1 border-[#CBD5E1] rounded-full flex justify-center items-center gap-[8px] text-[#475569] text-[14px] font-bold cursor-pointer disabled:opacity-50"
          >
            İmtina
            <X size={20} color="#475569" />
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-[16px] py-[10px] bg-[#F37321] border-1 border-[#F37321] transition hover:bg-transparent hover:text-[#F37321] rounded-full flex justify-center items-center gap-[8px] text-white text-[14px] font-bold cursor-pointer group disabled:opacity-50"
          >
            {saving ? 'Saxlanır...' : 'Saxla'}
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin group-hover:border-[#F37321] group-hover:border-t-transparent transition"></div>
            ) : (
              <Check
                size={20}
                color="#ffffff"
                className="group-hover:stroke-[#F37321] transition"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
