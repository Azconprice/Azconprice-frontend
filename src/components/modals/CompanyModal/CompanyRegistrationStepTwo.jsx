import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BaseModal, { modalButtonStyles, modalErrorStyles } from '../BaseModal';

const CompanyRegistrationStepTwo = ({ isOpen, onClose, onBack, onNext, initialData }) => {
  const [voenFile, setVoenFile] = useState(initialData?.voenFile || null);
  const [salesCategory, setSalesCategory] = useState(initialData?.salesCategory || null);
  const [error, setError] = useState('');
  const [salesCategoryOptions, setSalesCategoryOptions] = useState([]);
  const [isLoadingSalesCategories, setIsLoadingSalesCategories] = useState(false);

  useEffect(() => {
    const fetchSalesCategories = async () => {
      setIsLoadingSalesCategories(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/SalesCategory/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch sales categories');
        }
        const data = await response.json();
        const options = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        setSalesCategoryOptions(options);
      } catch (error) {
        console.error('Error fetching sales categories:', error);
        setError('Satış kateqoriyaları yüklənərkən xəta baş verdi');
      } finally {
        setIsLoadingSalesCategories(false);
      }
    };

    if (isOpen) {
      fetchSalesCategories();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVoenFile(file);
  };

  const handleContinue = () => {
    if (!salesCategory) {
      setError('Satış kateqoriyası seçin');
      return;
    }
    setError('');
    onNext({
      voenFile,
      salesCategory: salesCategory.value
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      showBackButton={true}
      title="Qeydiyyat"
      subtitle="Şirkət"
    >
      <div className="mb-[20px] w-90">
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <img src="/assets/icons/vöen.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            id="voen-file-input"
          />
          <div
            onClick={() => document.getElementById('voen-file-input').click()}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none cursor-pointer flex items-center"
          >
            {voenFile ? voenFile.name : "Vöeninizi əlavə edin"}
          </div>
        </div>
        <div className="relative mb-4">
          <span className="absolute text-gray-400 left-4 top-1/2 -translate-y-1/2 z-20">
            <img src="/assets/icons/salescategory.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <Select
            value={salesCategory}
            onChange={setSalesCategory}
            options={salesCategoryOptions}
            placeholder={isLoadingSalesCategories ? "Satış kateqoriyaları yüklənir..." : "Satış kateqoriyası seçin"}
            styles={customStyles}
            className="w-full"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            isLoading={isLoadingSalesCategories}
            isDisabled={isLoadingSalesCategories}
            noOptionsMessage={() => "Satış kateqoriyası tapılmadı"}
          />
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

export default CompanyRegistrationStepTwo;
