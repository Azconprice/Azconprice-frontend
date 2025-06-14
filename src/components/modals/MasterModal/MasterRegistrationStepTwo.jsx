import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from '../BaseModal';

const MasterRegistrationStepTwo = ({ isOpen, onClose, onBack, onNext }) => {
  const [specialty, setSpecialty] = useState([]);
  const [experience, setExperience] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
const [voen, setVoen] = useState('');
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(false);

  useEffect(() => {
    const fetchSpecializations = async () => {
      setIsLoadingSpecialties(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Specialization/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch specializations');
        }
        const data = await response.json();
        const options = data.map(specialization => ({
          value: specialization.id,
          label: specialization.name
        }));
        setSpecialtyOptions(options);
      } catch (error) {
        console.error('Error fetching specializations:', error);
        setError('İxtisaslar yüklənərkən xəta baş verdi');
      } finally {
        setIsLoadingSpecialties(false);
      }
    };

    if (isOpen) {
      fetchSpecializations();
    }
  }, [isOpen]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#F3F3F3',
      border: 'none',
      borderRadius: '25px',
      paddingLeft: '35px',
      paddingRight: '8px',
      paddingTop: '4px',
      paddingBottom: '4px',
      minHeight: '40px',
      boxShadow: 'none',
      '&:hover': {
        border: 'none'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0'
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#FED7AA',
      borderRadius: '15px',
      color: '#9A3412'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#9A3412',
      fontSize: '12px'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#9A3412',
      '&:hover': {
        backgroundColor: '#FB923C',
        color: '#7C2D12'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9CA3AF',
      fontSize: '14px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#FB923C' : state.isFocused ? '#FED7AA' : 'white',
      color: state.isSelected ? 'white' : '#374151'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#9CA3AF'
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999
    })
  };
  const handleContinue = () => {
    if (specialty.length === 0 || !experience || !price || !voen) {
      setError('Bütün xanaları doldurun');
      return;
    }

    if (isNaN(experience) || parseInt(experience) < 0) {
      setError('Təcrübə müddəti düzgün daxil edilməyib');
      return;
    }

    if (isNaN(price) || parseInt(price) < 0) {
      setError('Qiymət düzgün daxil edilməyib');
      return;
    }

    setError('');
    onNext({
      specialty: specialty.map(item => item.value),
      experience: parseInt(experience),
      price: parseFloat(price),
      voen
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Qeydiyyat"
      subtitle="Usta"
    >
      <div className="mb-[20px] w-90">
         <div className="relative mb-4">
          <span className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2">
            <img src="/assets/icons/vöen.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <input
            type="text"
            placeholder="Vöeninizi əlavə edin"
            value={voen}
            onChange={e => setVoen(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="relative mb-4">
          <span className="absolute text-gray-400 left-4 top-1/2 -translate-y-1/2 z-20">
            <img src="/assets/icons/ixtisas.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <Select
            isMulti
            value={specialty}
            onChange={setSpecialty}
            options={specialtyOptions}
            placeholder={isLoadingSpecialties ? "İxtisaslar yüklənir..." : "İxtisas seçin"}
            styles={customStyles}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            className="w-full"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            isLoading={isLoadingSpecialties}
            isDisabled={isLoadingSpecialties}
            noOptionsMessage={() => "İxtisas tapılmadı"}
          />
        </div>
        <div className="flex flex-row  gap-[10px]">
           <div className="relative mb-4">
          <input
            type="number"
              min="0"
            placeholder="Təcrübə (il)"
            value={experience}
            onChange={e => setExperience(e.target.value)}
            className="w-full pl-5 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="relative mb-4">
        
          <input
            type="text"
            placeholder="Qiymət"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-full pl-5 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>
        </div>
       
      </div>
      {error && <div className={`${modalErrorStyles} mt-[-10px]`}>{error}</div>}
      <button
        className={modalButtonStyles}
        onClick={handleContinue}
      >
        Davam et
      </button>
    </BaseModal>
  );
};

export default MasterRegistrationStepTwo;