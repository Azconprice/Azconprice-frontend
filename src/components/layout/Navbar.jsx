'use client'

import React, { useState } from 'react'
import HeaderSection from '../Home/HeaderSection'
import { FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <h3 className="hover:text-orange-500 bg-[#101827] px-8 text-[14px] text-white rounded-3xl py-2 cursor-pointer">Ana Səhifə</h3>
            <h3 className="hover:text-orange-500 cursor-pointer text-[14px]">Haqqımızda</h3>
            <h3 className="hover:text-orange-500 cursor-pointer text-[14px]">Məhsullar</h3>
            <h3 className="hover:text-orange-500 cursor-pointer text-[14px]">Əlaqə</h3>
          </div>
        </div>
        <div className='hidden lg:flex flex-row justify-end gap-[10px] xl:gap-[20px] items-center mt-[-40px]'>
          <div>
            <button className="flex items-center gap-2 rounded text-[14px] hover:text-orange-500 cursor-pointer">
              <FiSearch /> Axtar
            </button>
          </div>
          <div>
            <button className="hover:text-orange-500 cursor-pointer text-[14px]">Daxil ol</button>
          </div>
          <div>
            <button className="hover:bg-orange-500 bg-[#F37321] px-5 xl:px-8 py-2 text-[14px] cursor-pointer text-white rounded-3xl">Qeydiyyat</button>
          </div>
          <div>
            <button className="hover:text-orange-500 cursor-pointer text-[14px] flex flex-row items-center gap-[3px]">AZ <span><FaChevronDown /></span></button>
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
            <h3 className="text-xl font-semibold hover:text-orange-500 cursor-pointer">Ana Səhifə</h3>
            <h3 className="text-xl font-semibold hover:text-orange-500 cursor-pointer">Haqqımızda</h3>
            <h3 className="text-xl font-semibold hover:text-orange-500 cursor-pointer">Məhsullar</h3>
            <h3 className="text-xl font-semibold hover:text-orange-500 cursor-pointer">Əlaqə</h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded hover:text-orange-500 cursor-pointer">
              <FiSearch /> Axtar
            </button>
            <button className="bg-orange-500 text-white px-5 py-2 rounded-full shadow cursor-pointer hover:bg-orange-600 transition">Qeydiyyat</button>
            <button className="hover:text-orange-500 cursor-pointer">Daxil ol</button>
            <button className="hover:text-orange-500 cursor-pointer">AZ</button>
          </div>
        </div>
      )}
      <HeaderSection />
    </section>
  )
}

export default Navbar