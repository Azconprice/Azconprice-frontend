import React from 'react'
import { useTranslations } from 'next-intl';
import Map from '@/assets/images/aboutus_map.svg';
import Image from 'next/image';


const Aboutus = () => {
    const t = useTranslations('AboutUs');
    return (
        <section id="about" className="container py-1 mx-auto mb-[50px] about-us">
            <h1 className="text-[32px] sm:text-[36px] md:text-[48px] font-extrabold text-center mb-5 text-[#111827]">{t('About us')}</h1>
            <div className="flex flex-col-reverse lg:flex-row items-center md:items-center gap-[10px] lg:gap-[60px]">

                <div className='flex flex-row gap-[20px] lg:gap-[30px] items-center w-full lg:w-[50%]'>

                    <div className="relative flex items-center justify-center lg:flex-1">
                        <Image
                            src={Map}
                            alt="Xəritə"
                            className="object-contain w-full h-auto max-w-xs md:max-w-md lg:max-w-lg drop-shadow-xl"
                            style={{ filter: 'drop-shadow(0 0 0 #000)' }}
                        />
                    </div>
                </div>

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
