import React from 'react'
import { useTranslations } from 'next-intl';

const Aboutus = () => {
    const t = useTranslations('AboutUs');
    return (
        <section id="about" className="container py-1 mx-auto mb-[50px] about-us">
            <h1 className="text-[32px] sm:text-[36px] md:text-[48px] font-extrabold text-center mb-5 text-[#111827]">{t('About us')}</h1>
            <div className="flex flex-col-reverse lg:flex-row items-center md:items-center gap-[10px] lg:gap-[60px]">
                {/* Left Stats */}
                <div className='flex flex-row gap-[20px] lg:gap-[30px] items-center w-full lg:w-[50%]'>
                    <div className="flex flex-col flex-1 gap-2 md:gap-0">
                        <div className="md:w-[130px] md:h-[130px] w-[100px] h-[100px] flex flex-col items-center justify-center xl:ml-[40px] rounded-full border-8 border-orange-500 bg-[#0A1621] text-white shadow-lg">
                            <span className="md:text-[20px] text-[16px] font-extrabold">34<span className="md-text-[20px] text-[16px]">K</span></span>
                            <span className="md-text-[20px] text-[16px] mt-2">{t('Master')} </span>
                        </div>
                        <div className="md:w-[130px] md:h-[130px] w-[100px] h-[100px] flex flex-col items-center self-end justify-center xl:mr-[40px] rounded-full border-8 border-orange-500 bg-[#0A1621] text-white shadow-lg">
                            <span className="text-[20px] font-extrabold">800<span className="md-text-[20px] text-[16px]">+</span></span>
                            <span className="md-text-[20px] text-[16px]mt-2">{t('Company')}</span>
                        </div>
                    </div>
                    {/* Center Map with Marker */}
                    <div className="relative flex items-center justify-center lg:flex-1">
                        <img
                            src="./assets/images/map.svg"
                            alt="Xəritə"
                            className="object-contain w-full h-auto max-w-xs md:max-w-md lg:max-w-lg drop-shadow-xl"
                            style={{ filter: 'drop-shadow(0 0 0 #000)' }}
                        />
                    </div>
                </div>
                {/* Right Info */}
                <div className="flex flex-col justify-center flex-1 text-center lg:text-left">
                    <h2 className="text-[32px] md:text-3xl font-bold text-orange-500 mb-4">{t('CompanyName')}</h2>
                    <p className="text-[#111827] text-[16px] font-medium mb-2 w-full ">
                        {t('companydescription1')}
                        </p>
                      <p className="text-[#111827] text-[16px] font-medium mb-2">
                        {t('companydescription2')}
                        </p>
                </div>
            </div>
        </section>
    )
}

export default Aboutus
