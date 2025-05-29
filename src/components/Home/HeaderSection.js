import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const HeaderSection = () => {
  return (
    <section className="flex flex-col items-center justify-between w-full pt-8 pb-0 pl-0 pr-0 overflow-hidden md:flex-row md:pl-12 md:pt-20 rounded-3xl">
      <div className="flex-1 flex flex-col items-center w-full md:w-[50%] md:items-start text-center md:text-left gap-6 md:gap-8 relative z-20">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          <span className="text-orange-500">İnşaatınız</span><br />
          <span className="text-[#101827]">bizimlə daha güclü</span>
        </h1>
        <button className="flex items-center justify-between w-[90%] sm:w-full max-w-[350px] bg-[#101827] hover:bg-orange-500 cursor-pointer rounded-full pr-2 pl-8 border-2 border-[#101827] hover:border-orange-500 transition-colors duration-300">
          <span className="flex-1 text-lg font-semibold text-center text-white ">Məhsulları əlavə et</span>
          <span className="flex items-center justify-center w-12 h-12 -mr-2 bg-white rounded-full hover:border-orange-500">
            <FiArrowRight size={28} className="text-[#101827] group-hover:text-orange-500" />
          </span>
        </button>
      </div>
      <div className="flex-1 flex items-center  w-full md:w-[50%] justify-center md:mb-0 relative min-h-[250px] md:min-h-[350px] lg:min-h-[400px]">
        <img
          src="/assets/images/AzConPrice.gif"
          alt="AzConPrice Animation"
          className="absolute bottom-0 right-0 z-10 "
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