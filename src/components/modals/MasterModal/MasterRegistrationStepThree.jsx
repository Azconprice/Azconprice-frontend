import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import BaseModal, { modalButtonStyles, modalErrorStyles } from '../BaseModal';

const MasterRegistrationStepThree = ({ isOpen, onClose, onBack, onNext, initialData, specializations }) => {
  const [professionQuery, setProfessionQuery] = useState(initialData?.professionName || '');
  const [professionOptions, setProfessionOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [professionId, setProfessionId] = useState(initialData?.professionId || '');
  const [specialty, setSpecialty] = useState([]);
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [specializationQuery, setSpecializationQuery] = useState('');
  const [specialtyInitialized, setSpecialtyInitialized] = useState(false);
  const [measurementUnitId, setMeasurementUnitId] = useState(initialData?.measurementUnitId || '');
  const [measurementUnits, setMeasurementUnits] = useState([]);
  const [measurementUnitOptions, setMeasurementUnitOptions] = useState([]);
  const [price, setPrice] = useState(initialData?.price || '');
  const [error, setError] = useState('');
  const professionContainerRef = useRef(null);

  useEffect(() => {
    if (!professionQuery) {
      setProfessionOptions([]);
      setShowDropdown(false);
      return;
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Profession/search?query=${encodeURIComponent(professionQuery)}`, {
          method: 'GET',
          signal: controller.signal
        });
        if (res.ok) {
          const data = await res.json();
          const normalized = Array.isArray(data) ? data : [];
          setProfessionOptions(normalized);
          setShowDropdown(true);
        } else {
          setProfessionOptions([]);
          setShowDropdown(true);
        }
      } catch (e) {
        setProfessionOptions([]);
        setShowDropdown(true);
      }
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [professionQuery]);

  const defaultSpecialty = useMemo(() => {
    if (!Array.isArray(initialData?.specialty)) return [];
    return (specializationOptions || [])
      .filter(opt => initialData.specialty.includes(opt.value))
      .map(opt => ({ value: opt.value, label: opt.label }));
  }, [initialData?.specialty, specializationOptions]);

  useEffect(() => {
    setSpecializationOptions([])
    setSpecialty([])
    setSpecializationQuery('')
    setSpecialtyInitialized(false)
    if (!professionId) return
  }, [professionId])

  useEffect(() => {
    if (!professionId) return
    if (!specializationQuery) return
    const controller = new AbortController()
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Specialization/search-by-profession?professionId=${encodeURIComponent(professionId)}&query=${encodeURIComponent(specializationQuery || '')}`, { signal: controller.signal })
        if (!res.ok) {
          setSpecializationOptions([])
          return
        }
        const data = await res.json()
        const mapped = Array.isArray(data)
          ? data.map(item => ({ value: item.id, label: item.name }))
          : []
        setSpecializationOptions(mapped)
        if (!specialtyInitialized && Array.isArray(initialData?.specialty) && initialData.specialty.length > 0) {
          const preselected = mapped.filter(opt => initialData.specialty.includes(opt.value))
          setSpecialty(preselected)
          setSpecialtyInitialized(true)
        }
      } catch (e) {
        setSpecializationOptions([])
      }
    }, 300)
    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [professionId, specializationQuery, specialtyInitialized, initialData?.specialty])

  useEffect(() => {
    if (Array.isArray(initialData?.specialtyObjects) && initialData.specialtyObjects.length > 0) {
      setSpecialty(initialData.specialtyObjects)
    }
  }, [initialData?.specialtyObjects])

  useEffect(() => {
    const fetchMeasurementUnits = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/MeasurementUnit/all`)
        if (res.ok) {
          const data = await res.json()
          const units = Array.isArray(data) ? data : []
          setMeasurementUnits(units)
          setMeasurementUnitOptions(units.map(unit => ({ value: unit.id, label: unit.unit })))
        }
      } catch (e) {
        console.error('Failed to fetch measurement units:', e)
        setMeasurementUnits([])
        setMeasurementUnitOptions([])
      }
    }
    fetchMeasurementUnits()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (professionContainerRef.current && !professionContainerRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
    if (!professionId || (specialty?.length || 0) === 0 || !measurementUnitId || !price) {
      setError('Bütün xanaları doldurun');
      return;
    }
    setError('');
    onNext({
      professionId,
      professionName: professionQuery,
      specialty: (specialty || []).map(item => item.value),
      specialtyObjects: specialty || [],
      measurementUnitId,
      price
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
      <div className="mb-[20px] w-full">
        <div className="relative mb-4" ref={professionContainerRef}>
          <input
            type="text"
            placeholder="Peşənizi seçin"
            value={professionQuery}
            onChange={e => {
              setProfessionQuery(e.target.value);
              setShowDropdown(true);
            }}
            className="w-full pl-5 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
            onFocus={() => { if ((professionOptions || []).length > 0) setShowDropdown(true); }}
            onKeyDown={(e) => { if (e.key === 'Escape') setShowDropdown(false); }}
          />
          {showDropdown && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-auto z-50">
              {professionOptions?.length > 0 ? (
                professionOptions.map(item => (
                  <div
                    key={item.id}
                    className={`px-4 py-2 cursor-pointer hover:bg-orange-50 ${professionId === item.id ? 'bg-orange-100' : ''}`}
                    onClick={() => {
                      setProfessionId(item.id);
                      setProfessionQuery(item.name);
                      setProfessionOptions([]);
                      setShowDropdown(false);
                    }}
                  >
                    {item.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-400">Məlumat tapılmadı</div>
              )}
            </div>
          )}
        </div>

        <div className="relative mb-4">
          <span className="absolute text-gray-400 left-4 top-1/2 -translate-y-1/2 z-20">
            <img src="/assets/icons/ixtisas.svg" alt="icon" className="w-[16px] h-[16px]" />
          </span>
          <Select
            isMulti
            value={specialty}
            onChange={(selected) => setSpecialty(selected || [])}
            options={specializationOptions}
            placeholder="İxtisas seçin"
            styles={customStyles}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            className="w-full"
            menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
            menuPosition="fixed"
            noOptionsMessage={() => (specializationQuery ? "İxtisas tapılmadı" : null)}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            isDisabled={!professionId}
            isSearchable
            onInputChange={(value, meta) => {
              if (meta.action === 'input-change') setSpecializationQuery(value)
            }}
          />
        </div>

        <div className="flex flex-row gap-[10px]">
          <div className="relative mb-4 w-1/2">
            <Select
              value={measurementUnitOptions.find(option => option.value === measurementUnitId) || null}
              onChange={(selected) => setMeasurementUnitId(selected ? selected.value : '')}
              options={measurementUnitOptions}
              placeholder="Vahid"
              styles={customStyles}
              className="w-full"
              menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
              menuPosition="fixed"
              noOptionsMessage={() => "Vahid tapılmadı"}
              getOptionValue={(option) => option.value}
              getOptionLabel={(option) => option.label}
              isSearchable={false}
            />
          </div>
          <div className="relative mb-4 w-1/2">
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

export default MasterRegistrationStepThree;