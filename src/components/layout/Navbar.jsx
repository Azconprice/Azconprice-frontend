'use client'

import React, { useState, useRef, useEffect } from 'react'
import HeaderSection from '../Home/HeaderSection'
import { FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { FaChevronDown } from "react-icons/fa";
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import HeaderBackground from "@/assets/images/Subtract.png";
import Image from 'next/image';
import LoginModal from '../modals/LoginModal';
import RegistrationModal from '../modals/RegistrationModal';
import ForgotPasswordMethodModal from '../modals/ForgotPasswordMethodModal';
import SuccessModal from '../modals/SuccessModal';
import MasterModal from '../modals/MasterModal';
import CompanyModal from '../modals/CompanyModal';
import ForgotPasswordOtpModal from '../modals/ForgotPasswordOtpModal';
import ForgotPasswordEmailSentModal from '../modals/ForgotPasswordEmailSentModal';
import ResetPasswordModal from '../modals/ResetPasswordModal';
import ForgotPasswordNumberSentModal from '../modals/ForgotPasswordNumberSentModal';
import NormalUserRegistrationStepOne from '../modals/NormalUserRegistrationStepOne';
import NormalUserRegistrationStepTwo from '../modals/NormalUserRegistrationStepTwo';
import Link from 'next/link'; 
import MasterRegistrationStepOne from '../modals/MasterRegistrationStepOne';
import MasterRegistrationStepTwo from '../modals/MasterRegistrationStepTwo';
import MasterRegistrationStepThree from '../modals/MasterRegistrationStepThree';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('navbar')
  const [activeModal, setActiveModal] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const languages = [
    { code: 'az', name: 'AZ' },
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' }
  ]

  const handleLanguageChange = (newLocale) => {
    try {
      const { pathname, search } = window.location
      const newPath = `/${newLocale}${pathname.replace(/^\/[a-z]{2}/, '')}${search}`
      sessionStorage.setItem('mobileMenuOpen', mobileMenuOpen)
      router.push(newPath, { scroll: false })
      setLanguageDropdownOpen(false)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  const handleNext = (type) => {
    if (type === 'normaluser') {
      setActiveModal('normaluserStepOne');
    } else if (type === 'master') {
      setActiveModal('master');
    } else if (type === 'company') {
      setActiveModal('company');
    }
  }

  const handleRegistrationSuccess = () => {
    setSuccessMessage('Qeydiyyat uğurla tamamlandı');
    setActiveModal('success');
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false)
      }
    }

    const savedMobileMenuState = sessionStorage.getItem('mobileMenuOpen')
    if (savedMobileMenuState !== null) {
      setMobileMenuOpen(savedMobileMenuState === 'true')
      sessionStorage.removeItem('mobileMenuOpen')
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <section className="relative container w-full mt-[40px] mb-[120px] mx-auto flex flex-col">
        <Image
          src={HeaderBackground}
          alt="Background Shape"
          className="absolute z-0 w-full h-full"
        />
        <div className='relative z-10 p-[20px] justify-between pr-0 w-full flex flex-row gap-[30px]'>
          <div className='flex flex-row items-center w-[70%] gap-[30px]'>
            <div className='cursor-pointer'>
              <Link href="/"> 
              <img src="/assets/images/logo.svg" alt="logo" className='w-[91px] h-[91px]'/>
                </Link>
            </div>
            <div className='hidden lg:flex flex-row justify-center w-full items-center gap-[60px]'>
              <h3 className="hover:text-orange-500 bg-[#101827] px-8 text-[14px] text-white rounded-3xl py-2 cursor-pointer">{t('Home page')}</h3>
              <h3 className="hover:text-orange-500 cursor-pointer text-[14px]">{t('About us')}</h3>
              <h3 className="hover:text-orange-500 cursor-pointer text-[14px]">{t('Məhsullar')}</h3>
              <h3 className="hover:text-orange-500 cursor-pointer text-[14px]">{t('Contact us')}</h3>
            </div>
          </div>
          <div className='hidden lg:flex flex-row justify-end gap-[10px] xl:gap-[20px] items-center mt-[-40px]'>
            <div>
              <button className="flex items-center gap-2 rounded text-[14px] hover:text-orange-500 cursor-pointer">
                <FiSearch /> {t('Search')}
              </button>
            </div>
            <div>
              <button onClick={() => setActiveModal('login')} className="hover:text-orange-500 cursor-pointer text-[14px]">{t('Login')}</button>
            </div>
            <div>
              <button onClick={() => setActiveModal('register')} className="hover:bg-orange-500 bg-[#F37321] px-5 xl:px-8 py-2 text-[14px] cursor-pointer text-white rounded-3xl">{t('Register')}</button>
            </div>
            <div>
              <div className="relative" ref={dropdownRef}>
                <button
                  className="hover:text-orange-500 cursor-pointer text-[14px] flex flex-row items-center gap-[3px]"
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                >
                  {languages.find(lang => lang.code === locale)?.name || 'AZ'}
                  <span><FaChevronDown /></span>
                </button>
                {languageDropdownOpen && (
                  <div className="absolute right-0 z-50 w-20 py-2 mt-2 bg-white rounded-lg shadow-xl">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${locale === lang.code ? 'text-orange-500' : ''
                          }`}
                        onClick={() => handleLanguageChange(lang.code)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex lg:hidden w-[25%] justify-end self-start">
            <button className='cursor-pointer pr-[30px]' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <FiMenu size={32} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="flex lg:hidden w-full flex-col justify-start h-1/2 overflow-y-auto relative z-40 px-[20px] py-[10px]">
            <div className="flex flex-row w-full gap-4 mb-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`text-[16px] cursor-pointer ${locale === lang.code ? 'text-orange-500' : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            <div className="flex flex-row w-full gap-4 mb-8">
              <button className="flex items-center gap-2 rounded text-[16px] hover:text-orange-500 cursor-pointer">
                <FiSearch /> {t('Search')}
              </button>
              <button onClick={() => setActiveModal('login')} className="hover:text-orange-500 cursor-pointer text-[16px]">{t('Login')}</button>
              <button onClick={() => setActiveModal('register')} className="hover:bg-orange-500 bg-[#F37321] px-5 py-2 text-[16px] cursor-pointer text-white rounded-3xl">{t('Register')}</button>
            </div>
            <div className="flex flex-col w-full gap-4">
              <h3 className="text-xl font-semibold cursor-pointer hover:text-orange-500">{t('Home page')}</h3>
              <h3 className="text-xl font-semibold cursor-pointer hover:text-orange-500">{t('About us')}</h3>
              <h3 className="text-xl font-semibold cursor-pointer hover:text-orange-500">{t('Məhsullar')}</h3>
              <h3 className="text-xl font-semibold cursor-pointer hover:text-orange-500">{t('Contact us')}</h3>
            </div>
          </div>
        )}
        <HeaderSection />
      </section>
      <RegistrationModal 
        isOpen={activeModal === 'register'} 
        onClose={() => setActiveModal(null)} 
        onNext={handleNext} 
      />
      <NormalUserRegistrationStepOne 
        isOpen={activeModal === 'normaluserStepOne'} 
        onClose={() => setActiveModal(null)} 
        onBack={() => setActiveModal('register')}
        onNext={() => setActiveModal('normaluserStepTwo')}
      />
      <NormalUserRegistrationStepTwo
        isOpen={activeModal === 'normaluserStepTwo'}
        onClose={() => setActiveModal(null)}
        onBack={() => setActiveModal('normaluserStepOne')}
        onSuccess={handleRegistrationSuccess}
      />
      <MasterRegistrationStepOne
        isOpen={activeModal === 'masterStepOne'}
        onClose={() => setActiveModal(null)}
        onBack={() => setActiveModal('register')}
        onNext={() => setActiveModal('masterStepTwo')}
      />
      <MasterRegistrationStepTwo
        isOpen={activeModal === 'masterStepTwo'}
        onClose={() => setActiveModal(null)}
        onBack={() => setActiveModal('masterStepOne')}
        onNext={() => setActiveModal('masterStepThree')}
      />
      <MasterRegistrationStepThree
        isOpen={activeModal === 'masterStepThree'}
        onClose={() => setActiveModal(null)}
        onBack={() => setActiveModal('masterStepTwo')}
        onSuccess={handleRegistrationSuccess}
      />
      <LoginModal 
        isOpen={activeModal === 'login'} 
        onClose={() => setActiveModal(null)} 
        onForgotPassword={() => setActiveModal('forgotPassword')} 
        onSuccess={() => setActiveModal('success')} 
      />
      <ForgotPasswordMethodModal 
        isOpen={activeModal === 'forgotPassword'} 
        onClose={() => setActiveModal(null)} 
        onBack={() => setActiveModal('login')} 
        onSelectMethod={(method) => setActiveModal(method === 'phone' ? 'resetPasswordPhone' : 'resetPasswordEmail')} 
      />
      <SuccessModal 
        isOpen={activeModal === 'success'} 
        onClose={() => setActiveModal(null)}
        message={successMessage}
      />
      <ForgotPasswordOtpModal 
        isOpen={activeModal === 'resetPasswordPhone'} 
        onClose={() => setActiveModal(null)} 
        onBack={() => setActiveModal('forgotPassword')} 
        onSuccess={() => setActiveModal('resetPassword')} 
      />
      <ForgotPasswordEmailSentModal 
        isOpen={activeModal === 'resetPasswordEmail'} 
        onClose={() => setActiveModal(null)} 
        onBack={() => setActiveModal('forgotPassword')} 
        onSuccess={() => setActiveModal('resetPassword')} 
      />
      <ResetPasswordModal 
        isOpen={activeModal === 'resetPassword'} 
        onClose={() => setActiveModal(null)} 
        onBack={() => setActiveModal('forgotPassword')} 
        onSuccess={() => setActiveModal('success')} 
      />
      <ForgotPasswordNumberSentModal 
        isOpen={activeModal === 'resetPasswordPhone'} 
        onClose={() => setActiveModal(null)} 
        onBack={() => setActiveModal('forgotPassword')} 
        onSubmit={() => setActiveModal('resetPassword')} 
      />
    </>
  )
}

export default Navbar