import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { Link } from 'react-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
const HeaderSection = () => {

  const t = useTranslations('HeaderSection');

  return (
    <section className="flex gap-[30px] flex-col items-center justify-between w-full overflow-hidden md:flex-row py-[60px] px-[20px] rounded-3xl max-w-[1300px] mx-auto">
      <div className="md:flex-[1] flex flex-col items-center w-full md:w-[50%] md:items-start text-center md:text-left gap-6 md:gap-8 relative z-20">
        <h1 className="text-4xl font-bold leading-tight md:text-[48px] lg:text-[72px]">
          <span className="text-orange-500">{t('Your construction')}</span><br />
          <span className="text-[#101827]">{t('Strong with us')}</span>
        </h1>
        <Link to="calculate-products" smooth={true} duration={500} offset={-120} className="flex items-center justify-between w-[90%] sm:w-full max-w-[350px] bg-[#101827] hover:bg-orange-500 cursor-pointer rounded-full md:mb-[30px] pr-2 pl-8 border-2 border-[#101827] hover:border-orange-500 transition-colors duration-300">

          <span className="flex-1 text-lg font-semibold text-center text-white ">{t('Add products')}</span>
          <span className="flex items-center justify-center w-12 h-12 -mr-2 bg-white rounded-full hover:border-orange-500">
            <FiArrowRight size={28} className="text-[#101827] group-hover:text-orange-500" />
          </span>

        </Link>
      </div>
      <div className="md:flex-[1.5] flex items-center w-full md:w-[50%] justify-center md:mb-0 relative h-[400px]">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          <SwiperSlide>
            <div className="flex items-center justify-center h-full bg-[#1A1E26] rounded-3xl p-8">
              <div className="text-center">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-6">
                  <Image
                    src="/assets/images/phone-mockup.svg"
                    alt="Phone Mockup"
                    width={320}
                    height={320}
                    className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Mobil Tətbiq
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  İstifadəçi dostu interfeys
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center justify-center h-full bg-[#1A1E26] rounded-3xl p-8">
              <div className="text-center">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Image
                    src="/assets/images/logo.svg"
                    alt="Logo"
                    width={320}
                    height={320}
                    className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  AzConPrice
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Tikinti materialları platforması
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center justify-center h-full bg-[#1A1E26] rounded-3xl p-8">
              <div className="text-center">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6">
                  <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                    <svg className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Qiymət Hesablaması
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Dəqiq qiymət hesablaması
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default HeaderSection; 