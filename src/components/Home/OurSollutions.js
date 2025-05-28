import React from 'react'

const leftTopText = 'Alıcılar arasında qazandığımız rəğbət sayəsində şirkətimiz bazarda qabaqcıl mövqe tutmağa müvəffəq olmuşdur.';
const leftBottomText = '1 addımla işinizi bizim proqrama həvalə edin.';
const rightTopText = 'Real bazar qiymətləri\nTemir-tikinti, layihələndirmə və təchizat sahələrində işlərin, mal-materialların və xidmətlərin cari qiymət məlumatları.';
const rightBottomText = 'Alıcılar arasında qazandığımız rəğbət.🏆';
const bottomBar1 = 'Vaxta və resurslara qənaət⏰';
const bottomBar2 = 'Güvən və etibar';

const OurSollutions = () => {
    return (
        <section className="relative flex flex-col items-center py-12 px-10 max-w-7xl mx-auto w-full container">
            {/* Title */}
                  <h2 className="px-[20px] text-[32px] sm:text-[36px] md:text-[48px] text-center">Bizim <span className="font-bold">Həllərimiz</span></h2>


            {/* Arrows & Sentences - Desktop */}
            <div className=" lg:block w-full relative">
                {/* Left Top Arrow & Text */}
                <div className="hidden lg:block absolute" style={{ left: '10%', top: '10%' }}>
                    <img src="/assets/images/vector-1.svg" className='hidden lg:block' alt="Arrow Right" />
                    <span className="text-orange-500 font-extrabold text-sm text-center block w-58 mt-2 relative" style={{ right: '50%' }}>
                        {leftTopText}
                    </span>
                </div>
                {/* Left Bottom Arrow & Text */}
                <div className="hidden lg:block absolute" style={{ left: '10%', bottom: '20%' }}>
                    <img src="/assets/images/vector-3.svg" className='hidden lg:block' alt="Arrow Right" />
                    <span className="text-orange-500 font-extrabold text-sm text-center block w-58 mt-2 relative" style={{ right: '50%' }}>
                        {leftBottomText}
                    </span>
                </div>
                {/* Right Top Arrow & Text */}
                <div className="hidden lg:block absolute" style={{ right: '10%', top: '15%' }}>
                    <span className="text-orange-500 font-extrabold text-sm text-center block w-58 mb-2 relative pb-[20px]" style={{ left: '50%' }}>
                        {rightTopText}
                    </span>
                    <img src="/assets/images/vector-2.svg" className='hidden lg:block' alt="Arrow Right" />
                </div>
                {/* Right Bottom Arrow & Text */}
                <div className="hidden lg:block absolute" style={{ right: '8%', bottom: '-10%' }}>
                    <img src="/assets/images/vector-4.svg" className='hidden lg:block' alt="Arrow Right" />
                    <span className="text-orange-500 font-extrabold text-sm w-58 text-center block mt-2 pt-[15px] relative" style={{ left: '50%' }}>
                        {rightBottomText}
                    </span>
                </div>
                {/* Phone and Bottom Bars */}
                <div className="relative flex justify-center items-center w-full">
                    {/* Phone Image */}
                    <img
                        src="/assets/images/phone-mockup.svg"
                        alt="Phone Mockup"
                        className="w-[400px] md:w-[520px] lg:w-[720px] drop-shadow-2xl mx-auto"
                    />
                    {/* Bottom Bars */}
                    <div className="absolute left-1/2 bottom-[-25%] md:bottom-[-18%] lg:bottom-[-14%]" style={{ transform: 'translateX(-50%)' }}>
                        <div className="flex flex-col items-center gap-[10px] md:gap-[15px]">
                            <div className="w-[350px] md:w-[450px] lg:w-[520px] bg-[#0B1621] text-white text-lg md:text-xl rounded-full py-3 px-6 flex items-center gap-3 rotate-[-4deg] shadow-lg z-10">
                                <span className="mr-2">✅</span>
                                <span>{bottomBar1}</span>
                            </div>
                            <div className="w-[300px] md:w-[350px] lg:w-[420px] bg-orange-500 text-white text-lg md:text-xl rounded-full py-3 px-6 flex items-center gap-3 rotate-[4deg] shadow-lg z-20">
                                <span className="mr-2">✅</span>
                                <span>{bottomBar2}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:hidden pt-[150px]'>
                {/* 2x2 Grid for main texts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-orange-500 font-bold text-center text-sm">{leftTopText}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-orange-500 font-bold text-center text-sm">{rightTopText}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-orange-500 font-bold text-center text-sm">{leftBottomText}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-orange-500 font-bold text-center text-sm">{rightBottomText}</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default OurSollutions
