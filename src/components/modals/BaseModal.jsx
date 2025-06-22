import React, { useEffect } from 'react';
import { FiX, FiArrowLeft } from 'react-icons/fi';

const BaseModal = ({
  isOpen,
  onClose,
  onBack,
  title,
  subtitle,
  children,
  showBackButton = false,
  className = '',
  maxHeight = 'max-h-[95vh]',
  width = 'w-[450px] sm:w-[440px]',
  bgColor = 'bg-[#101827]',
  textColor = 'text-white',
  iconColor = 'text-white',

}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed pl-[10px] pr-[10px]  inset-0 z-50 flex items-center justify-center overflow-y-auto backdrop-blur-lg bg-opacity-70"
      onClick={handleBackdropClick}
    >
      <div className={`${bgColor} ${width} rounded-2xl  shadow-lg p-8 flex flex-col items-center relative ${maxHeight} overflow-y-auto ${className}`}>
        {showBackButton && (
          <button onClick={onBack} className="absolute text-2xl text-white cursor-pointer top-4 left-4">
            <FiArrowLeft />
          </button>
        )}

        <button onClick={onClose} className={`absolute text-3xl ${iconColor} cursor-pointer top-4 right-4`}>
          <FiX />
        </button>
        {title && (
          <h2 className={`${textColor} text-[24px] font-bold  mt-[15px] text-center`}>{title}</h2>
        )}

        {subtitle && (
          <p className={`text-[13px] text-[rgba(240,238,238,0.54)] mb-[20px] mt-[10px]`}>{subtitle}</p>
        )}

        {children}
      </div>
    </div>
  );
};

export const modalInputStyles = "w-full mb-3 px-4 py-2 rounded-xl bg-white text-black focus:outline-none";
export const modalButtonStyles = "w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-2xl cursor-pointer transition";
export const modalErrorStyles = "text-red-500 text-[16px]  text-center mb-[10px]";

export default BaseModal; 