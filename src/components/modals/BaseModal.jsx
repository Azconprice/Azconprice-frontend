import React from 'react';
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
  width = 'w-[350px] sm:w-[400px]',
  bgColor = 'bg-[#101827]',
  textColor = 'text-white',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-70 overflow-y-auto">
      <div className={`${bgColor} ${width} rounded-2xl shadow-lg p-8 flex flex-col items-center relative ${maxHeight} overflow-y-auto ${className}`}>
        {showBackButton && (
          <button onClick={onBack} className="absolute top-4 left-4 text-white text-2xl cursor-pointer">
            <FiArrowLeft />
          </button>
        )}
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl cursor-pointer">
          <FiX />
        </button>

        {title && (
          <h2 className={`${textColor} text-[24px] font-bold mb-1`}>{title}</h2>
        )}
        {subtitle && (
          <p className={`text-[12px] text-[#F0EEEE] mb-6`}>{subtitle}</p>
        )}

        {children}
      </div>
    </div>
  );
};

export const modalInputStyles = "w-full mb-3 px-4 py-2 rounded-xl bg-white text-black focus:outline-none";
export const modalButtonStyles = "w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-2xl transition";
export const modalErrorStyles = "text-red-400 text-sm mb-2";

export default BaseModal; 