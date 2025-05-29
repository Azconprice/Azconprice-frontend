import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const HeaderSection = () => {
  return (
    <section className="w-full flex flex-col pr-0 pb-0 md:flex-row items-center justify-between pl-0 md:pl-12 pt-8 md:pt-20 rounded-3xl overflow-hidden">
      <div className="flex-1 flex flex-col items-center w-full md:w-[50%] md:items-start text-center md:text-left gap-6 md:gap-8 relative z-20">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-orange-500">İnşaatınız</span><br />
          <span className="text-[#101827]">bizimlə daha güclü</span>
        </h1>
        <button className="flex items-center justify-between w-full max-w-[350px] bg-[#101827] hover:bg-orange-500 cursor-pointer rounded-full pr-2 pl-8 border-2 border-[#101827] hover:border-orange-500 transition-colors duration-300">
          <span className="flex-1 text-center font-semibold text-white text-lg">Məhsulları əlavə et</span>
          <span className="flex items-center justify-center w-12 h-12 bg-white hover:border-orange-500 rounded-full -mr-2">
            <FiArrowRight size={28} className="text-[#101827] group-hover:text-orange-500" />
          </span>
        </button>
      </div>
      <div className="flex-1 flex items-center  w-full md:w-[50%] justify-center md:mb-0 relative min-h-[250px] md:min-h-[350px] lg:min-h-[400px]">
        <img
          src="/assets/images/AzConPrice.gif"
          alt="AzConPrice Animation"
          className="absolute bottom-0 right-0  z-10 "
        />
        <img
          src="/assets/images/phone-header.svg"
          alt="Phone Mockup"
          className="relative z-20 drop-shadow-xl pb-[30px] pt-[30px] md:pt-0"
        />
      </div>
    </section>
  );
};

export default HeaderSection; 