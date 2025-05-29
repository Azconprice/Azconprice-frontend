'use client'

import React, { useState, useRef, useEffect } from 'react'
import HeaderSection from '../Home/HeaderSection'
import { FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { FaChevronDown } from "react-icons/fa";
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('navbar')

  const languages = [
    { code: 'az', name: 'AZ' },
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' }
  ]

  const handleLanguageChange = (newLocale) => {
    try {
      const { pathname, search } = window.location
      const newPath = `/${newLocale}${pathname.replace(/^\/[a-z]{2}/, '')}${search}`
      router.push(newPath, { scroll: false })
      setLanguageDropdownOpen(false)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section className="relative container w-full mt-[40px] mb-[120px] mx-auto flex flex-col">
      <img
        src="/assets/images/subtract.png"
        alt="Background Shape"
        className="absolute z-0 w-full h-full"
      />
      <div className='relative z-10 p-[20px] justify-between pr-0 w-full flex flex-row gap-[30px]'>
        <div className='flex flex-row items-center w-[70%] gap-[30px]'>
          <div className='cursor-pointer'>
            <img src="/assets/images/logo.svg" alt="logo" />
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
            <button className="hover:text-orange-500 cursor-pointer text-[14px]">{t('Login')}</button>
          </div>
          <div>
            <button className="hover:bg-orange-500 bg-[#F37321] px-5 xl:px-8 py-2 text-[14px] cursor-pointer text-white rounded-3xl">{t('Register')}</button>
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
                <div className="absolute right-0 mt-2 py-2 w-20 bg-white rounded-lg shadow-xl z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        locale === lang.code ? 'text-orange-500' : ''
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
          <button className='cursor-pointer pr-[30px]' onClick={() => setMobileMenuOpen(true)}>
            <FiMenu size={32} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-start pt-10 transition-all animate-slide-down">
          <button className="absolute top-6 right-6 cursor-pointer"  onClick={() => setMobileMenuOpen(false)}>
            <FiX size={36} />
          </button>
          <div className="flex flex-col gap-8 mt-10 w-full items-center">
            <h3 className="text-xl font-semibold hover:text-orange-500 cursor-pointer">{t('Home page')}</h3>
            <h3 className="text-xl font-semibold hover:text-orange-500 cursor-pointer">{t('About us')}</h3>
            <h3 className="text-xl font-semibold hover:text-orange-500 cursor-pointer">{t('Məhsullar')}</h3>
            <h3 className="text-xl font-semibold hover:text-orange-500 cursor-pointer">{t('Contact us')}</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded hover:text-orange-500 cursor-pointer">
              <FiSearch /> {t('Search')}
            </button>
            <button className="bg-orange-500 text-white px-5 py-2 rounded-full shadow cursor-pointer hover:bg-orange-600 transition">{t('Register')}</button>
            <button className="hover:text-orange-500 cursor-pointer">{t('Login')}</button>
            <div className="relative">
              <button 
                className="hover:text-orange-500 cursor-pointer"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              >
                {languages.find(lang => lang.code === locale)?.name || 'AZ'}
              </button>
              {languageDropdownOpen && (
                <div className="absolute left-0 mt-2 py-2 w-20 bg-white rounded-lg shadow-xl z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        locale === lang.code ? 'text-orange-500' : ''
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
      )}
      <HeaderSection />
    </section>
  )
}

export default Navbar