import React from 'react'
import { useTranslations } from 'next-intl';

const Footer = () => {

  const t = useTranslations('footer')


  
  return (
    <footer className="pt-[50px] pb-[30px]">
      <div className="container mx-auto px-2 md:px-9 bg-gray-100 text-gray-700 rounded-[48px]">
        <div className='p-2 pt-[20px] pb-[24px]'>
          <div className="flex flex-col items-center justify-between gap-8 mb-10 md:items-start">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <img src="/assets/images/footerlogo.svg" alt="AzConPrice Logo" className="w-[125px] h-[125px]" />
            </div>

            <div className="grid items-center justify-between w-full grid-cols-1 gap-6 md:grid-cols-3">
              <div className="bg-white text-center md:text-left p-4 rounded-3xl rounded-tl-[0px] shadow-sm min-h-[90px] flex flex-col justify-center">
                <h4 className="font-semibold pl-[10px] lg:pl-[30px]"> {t('Phone')}</h4>
                <p className='lg:pl-[30px] pl-[10px] font-extrabold'>+994 70 570 30 30</p>
              </div>
              <div className="bg-white p-4 text-center md:text-left rounded-3xl rounded-tl-[0px] shadow-sm min-h-[90px] flex flex-col justify-center">
                <h4 className="font-semibold lg:pl-[30px] pl-[10px]">{t('Phone type')}</h4>
                <p className='lg:pl-[30px] pl-[10px] font-extrabold'>+994 70 200 53 11</p>
              </div>
              <div className="bg-white p-4 text-center md:text-left rounded-3xl rounded-tl-[0px] shadow-sm min-h-[90px] flex flex-col justify-center">
                <h4 className="font-semibold lg:pl-[30px] pl-[10px]">{t('Adress')}</h4>
                <p className='lg:pl-[30px] pl-[0] font-extrabold'>{t('Location')}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 mb-10 mt-[50px] lg:justify-between lg:flex-row ">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 w-full lg:w-[60%]">
              <div className='text-center md:text-left'>
                <h4 className="mb-4 text-lg font-bold">Dizayn</h4>
                <ul>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">3D Motion Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Modern Qrafik Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">2D Motion Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">UX UI Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Interyer Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Multidiciplinary Dizayn</a></li>
                </ul>
              </div>

              <div className='text-center md:text-left'>
                <h4 className="mb-4 text-lg font-bold">Dizayn</h4>
                <ul>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">3D Motion Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Modern Qrafik Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">2D Motion Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">UX UI Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Interyer Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Multidiciplinary Dizayn</a></li>
                </ul>
              </div>

              <div className='text-center md:text-left'>
                <h4 className="mb-4 text-lg font-bold">Dizayn</h4>
                <ul>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">3D Motion Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Modern Qrafik Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">2D Motion Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">UX UI Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Interyer Dizayn</a></li>
                  <li className="mb-2 text-[14px] text-[#1018278F]"><a href="#" className="text-gray-700 hover:underline">Multidiciplinary Dizayn</a></li>
                </ul>
              </div>
            </div>

            <div className='lg:max-w-[330px]'>
              <div className="p-6 text-white bg-[#0E1C26] rounded-4xl">
                <h4 className="mb-2 text-lg font-bold">{t('Get news from us')}</h4>
                <p className="mb-4 text-sm text-gray-400">{t('News decription')}</p>
                <div className="flex items-center py-2 mb-6 border-b border-gray-400">
                  <input type="email" placeholder="E-mail" className="w-full px-2 py-1 mr-3 leading-tight text-white placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none" />
                  <button type="submit" className="flex-shrink-0">
                   <img src="/assets/icons/90degreeline.svg" alt="" />
                  </button>
                </div>
                <div className="flex space-x-4">
                  <a href="#" aria-label="Instagram" className="hover:opacity-75 w-7 h-7">
                    <img src="/assets/icons/insta-footer.svg" alt="insta" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:opacity-75 w-7 h-7">
                    <img src="/assets/icons/linkedin-footer.svg" alt="linkedin" />
                  </a>
                  <a href="#" aria-label="TikTok" className="hover:opacity-75 w-7 h-7">
                    <img src="/assets/icons/tiktok-footer.svg" alt="tiktok" />
                  </a>
                  <a href="#" aria-label="Facebook" className="hover:opacity-75 w-7 h-7">
                    <img src="/assets/icons/fb-footer.svg" alt="facebook" />
                  </a>
                  <a href="#" aria-label="YouTube" className="hover:opacity-75 w-7 h-7">
                    <img src="/assets/icons/yt-footer.svg" alt="youtube" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-gray-300 text-center text-[14px] text-[#1018278F]">
            © {new Date().getFullYear()} {t('Copyright footer')}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer