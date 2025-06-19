import React from 'react';

const PlanPaymentModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-75 backdrop-blur-lg">
      <div className="w-full max-w-4xl p-8 overflow-hidden bg-white rounded-xl">
        {/* Main flex container with vertical divider */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column: Plan Selection */}
          <div className="flex-1 pb-8 md:pr-8 md:border-r-2 md:border-black md:pb-0">
            <h2 className="text-[26px] font-bold text-gray-900 mb-2">Planınızı seçin</h2>
            <p className="text-[#838080] text-[13px] mb-6">Sizin üçün möhtəşəm planlarımız var</p>

            {/* Plan Cards Container */}
            <div className="flex flex-col gap-4">
              {/* Plan Card 1 */}
              <div className="relative flex items-center justify-between overflow-hidden text-white rounded-2xl md:rounded-lg plan-card-background">
                <div className='p-2 flex flex-col gap-[5px]'>
                  <h3 className="text-[13px] font-semibold">Birdəfəlik plan</h3>
                  <p className="text-gray-400 text-[10px]">Bu plan qeydiyyata ehtiyac olmadan<br />istifade ede bilersiniz</p>
                </div>
                <div className="text-[14px] font-bold border w-[115px] text-center border-orange-500 px-4 py-2 mr-[20px] rounded-[8px]">1000 Azn</div>
              </div>

              {/* Plan Card 2 */}
              <div className="relative flex items-center justify-between overflow-hidden text-white rounded-2xl md:rounded-lg plan-card-background">
                <div className='p-2 flex flex-col gap-[5px]'>
                  <h3 className="text-[13px] font-semibold">Aylıq plan</h3>
                  <p className="text-gray-400 text-[10px]">Bu plan qeydiyyata ehtiyac olmadan<br />istifade ede bilersiniz</p>
                </div>
                <div className="text-[14px] font-bold border w-[115px] text-center border-orange-500 px-4 py-2 mr-[20px] rounded-[8px]">1500 Azn/Ay</div>
              </div>

              {/* Plan Card 3 */}
              <div className="relative flex items-center justify-between overflow-hidden text-white rounded-2xl md:rounded-lg plan-card-background">
                <div className='p-2 flex flex-col gap-[5px]'>
                  <h3 className="text-[13px] font-semibold">İllik plan</h3>
                  <p className="text-gray-400 text-[10px]">Bu plan qeydiyyata ehtiyac olmadan<br />istifade ede bilersiniz</p>
                </div>
                <div className="text-[14px] font-bold border w-[115px] text-center border-orange-500 px-4 py-2 mr-[20px] rounded-[8px]">1500 Azn/Ay</div>
              </div>
            </div>
          </div>

          {/* Right Column: Payment */}
          <div className="flex-1 md:pl-8">
            <h2 className="text-[26px] font-bold text-gray-900 mb-6">Ödəniş</h2>

            {/* Şəxsi məlumatları */}
            <div className="mb-6">
              <h3 className="text-[13px] font-semibold text-[#838080] mb-3">Şəxsi məlumatları</h3>
              <div className="flex flex-row flex-shrink-0 w-full gap-4 md:flex-row">
                <input type="text" placeholder="Ad/Soyad" className="w-full md:w-1/2 text-[14px] px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 focus:ring-orange-500 box-border" />
                <input type="text" placeholder="Əlaqə nömrəsi" className="w-full text-[14px] md:w-1/2 px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 focus:ring-orange-500 box-border" />
              </div>
              <input type="email" placeholder="Elektron poçt" className="w-full text-[14px] mt-4 px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 focus:ring-orange-500 box-border" />
            </div>

            {/* Ödəniş metodu */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Ödəniş metodu</h3>
              <div className="flex items-center flex-shrink-0 w-full gap-4">
                <input type="text" placeholder="Kartın 12 rəqəmli kodu" className="flex-1 text-[14px] min-w-0 px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 focus:ring-orange-500 box-border" />
                {/* Card icons placeholder - assuming these are in /public */}
                <div className="flex gap-1">
                  <img src="/assets/images/Visa.svg" alt="Visa" className="h-[25px]" />
                  <img src="/assets/images/Mastercard.svg" alt="Mastercard" className="h-[25px]" />
                  <img src="/assets/images/Maestro.svg" alt="Apple Pay" className="h-[25px]" />
                </div>
              </div>
              <div className="flex flex-row flex-shrink-0 w-full gap-4 mt-4">
                <input type="text" placeholder="Tarix" className="w-full text-[14px] md:w-1/2 px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 focus:ring-orange-500 box-border" />
                <input type="text" placeholder="CVC" className="w-full text-[14px] md:w-1/2 px-4 py-2 border rounded-full bg-[#EDE6E6] focus:outline-none focus:ring-2 focus:ring-orange-500 box-border" />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center mb-6">
              <input type="checkbox" id="send-receipt" className="mr-2" />
              <label htmlFor="send-receipt" className="text-gray-700">Qəbzi E-poçt adresimə göndər</label>
            </div>

            {/* Payment Button */}
            <button className=" bg-orange-500 text-[13px] cursor-pointer w-[115px] text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition duration-300">
              Ödəniş edin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPaymentModal;