import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const RegistrationModal = ({ isOpen, onClose, onNext }) => {
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const getButtonClass = (btnType) => {
    const base = 'py-2 font-normal text-black bg-white cursor-pointer w-90 rounded-2xl text-start transition';
    const isSelected = type === btnType ? ' border-3 border-[#F37321]' : ' border border-transparent';
    return `${base} ${isSelected}`;
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Qeydiyyat"
      subtitle=""
    >
      <div className="w-full flex flex-col gap-[10px] mb-[25px] mt-[40px] justify-center items-center">
        <button className={getButtonClass('normaluser')} onClick={() => setType('normaluser')}>
          <img src="/assets/icons/normaluser.svg" alt="NormalUser Icon" className='inline-block w-[15px] h-[15px] ml-[20px] mr-[7px]' />
          Adi İstifadəçi
        </button>
        <button className={getButtonClass('master')} onClick={() => setType('master')}>
          <img src="/assets/icons/master.svg" alt="Usta Icon" className='inline-block w-[18px] h-[18px] ml-[20px] mr-[7px]' />
          Usta
        </button>
        <button className={getButtonClass('company')} onClick={() => setType('company')}>
          <img src="/assets/icons/company.svg" alt="Company Icon" className='inline-block w-[18px] h-[18px] ml-[20px] mr-[7px]' />
          Şirkət
        </button>
      </div>

      <button className={modalButtonStyles} onClick={() => onNext(type)}>
        Davam et
      </button>
    </BaseModal>
  );
};

export default RegistrationModal;
