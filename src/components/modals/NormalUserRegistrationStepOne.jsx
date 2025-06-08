import React from 'react'
  import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from './BaseModal';

const NormalUserRegistrationStepOne = () => {
  return (

      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        onBack={onBack}
        showBackButton={true}
        className="overflow-y-visible"
        title="Qeydiyyat"
      subtitle="Adi İstifadəçi"
      >
        <input
          type="text"
          placeholder="Ünvan"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className={`${modalInputStyles} mt-[25px]`}
          required
        />
        <input
          type="text"
          placeholder="İxtisas"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          className={modalInputStyles}
          required
        />
        <div className="flex flex-row flex-wrap w-full gap-2 mb-6">
          <input
            type="text"
            placeholder="Qiymət"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="flex-1 px-4 py-2 text-black bg-white rounded-xl focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Təcrübə ili"
            value={experience}
            onChange={e => setExperience(e.target.value)}
            className="flex-1 px-4 py-2 text-black bg-white rounded-xl focus:outline-none"
            required
          />
        </div>
        {error && <div className={modalErrorStyles}>{error}</div>}
        <button
          className={modalButtonStyles}
          onClick={handleContinue}
        >
          Davam et
        </button>
      </BaseModal>
     )
}

export default NormalUserRegistrationStepOne