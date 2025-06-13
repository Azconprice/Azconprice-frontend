'use client'

import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import VideoModal from './VideoModal'

const Guide = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="relative flex flex-col justify-center py-16">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:translate-y-1 w-[300px] h-[300px] md:w-[600px] md:h-[500px] rounded-[150px] guide-background-gradient"></div>

      <div className="container mx-auto px-4 text-center relative z-40 flex flex-col gap-[30px]">
        <h2 className="text-[28px] md:text-5xl font-bold text-[#101827] leading-tight mb-4">
          Material ehtiyaclarını asanlıqla <br /><span className="text-[#F37321]">hesabla</span>
        </h2>
        <p className="md:text-[20px] text-[18px] text-[#101827] mt-8 font-bold">
          Funksianallıqdan necə istifadə edə bilərsən?
        </p>
        <div 
          className="flex items-center justify-center w-24 h-24 mx-auto transition-transform duration-300 rounded-full cursor-pointer hover:scale-105"
          onClick={openModal}
        >
          <img src="/assets/icons/PlayButton.svg" alt="subtract" className="w-12 h-12" />
        </div>
        <VideoModal 
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        <div className='flex items-center justify-center'>
          <button className="flex items-center justify-between w-full sm:w-full max-w-[400px] bg-[#101827] hover:bg-orange-500 cursor-pointer rounded-full pr-2 pl-8 border-2 border-[#101827] hover:border-orange-500 transition-colors duration-300">
            <span className="flex-1 text-lg font-semibold text-center text-white ">Məhsulları əlavə et</span>
            <span className="flex items-center justify-center w-12 h-12 -mr-2 bg-white rounded-full hover:border-orange-500">
              <FiArrowRight size={28} className="text-[#101827] group-hover:text-orange-500" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Guide
