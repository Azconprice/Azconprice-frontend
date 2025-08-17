import React, { useState } from "react";
import BaseModal, { modalButtonStyles, modalErrorStyles } from "./BaseModal";

const RegistrationModal = ({ isOpen, onClose, onNext }) => {
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const getButtonClass = (btnType) => {
    const base =
      "py-2 font-normal text-black bg-white cursor-pointer w-full rounded-2xl text-start transition";
    const isSelected =
      type === btnType
        ? " border-3 border-[#F37321]"
        : " border-3 border-transparent";
    return `${base} ${isSelected}`;
  };

  const handleTypeSelect = (selectedType) => {
    setType(selectedType);
    setError("");
  };

  const handleContinue = () => {
    if (!type) {
      setError("Zəhmət olmasa bir istifadəçi tipi seçin");
      return;
    }
    setError("");
    onNext(type);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Qeydiyyat" subtitle="">
      <div className=" flex flex-col gap-[10px]  mb-[25px] mt-[40px] justify-center items-center w-full">
        <button
          className={getButtonClass("normaluser")}
          onClick={() => handleTypeSelect("normaluser")}
        >
          <img
            src="/assets/icons/normaluser.svg"
            alt="NormalUser Icon"
            className="inline-block w-[15px] h-[15px] ml-[20px] mr-[7px]"
          />
          Adi İstifadəçi
        </button>
        <button
          className={getButtonClass("master")}
          onClick={() => handleTypeSelect("master")}
        >
          <img
            src="/assets/icons/master.svg"
            alt="Usta Icon"
            className="inline-block w-[18px] h-[18px] ml-[20px] mr-[7px]"
          />
          Usta
        </button>
        <button
          className={getButtonClass("company")}
          onClick={() => handleTypeSelect("company")}
        >
          <img
            src="/assets/icons/company.svg"
            alt="Company Icon"
            className="inline-block w-[18px] h-[18px] ml-[20px] mr-[7px]"
          />
          Şirkət
        </button>
      </div>

      {error && <div className={`${modalErrorStyles} mt-3`}>{error}</div>}

      <button
        className={`${modalButtonStyles} cursor-pointer`}
        onClick={handleContinue}
        disabled={!type}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default RegistrationModal;
