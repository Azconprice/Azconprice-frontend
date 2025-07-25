import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#0f1727] w-full py-10 px-6 text-white">
      <div className="relative flex flex-col items-center justify-between max-w-6xl gap-[30px] mx-auto md:flex-row">
        
       
        <div className="mt-10 text-center md:text-left md:mt-0">
          <p className="font-bold uppercase text-[19px]">Əlaqə</p>
          <p className="text-[16px] font-semibold">+994 51 644 2982</p>
          <p className="text-[16px] font-semibold">azconprice@gmail.com</p>
        </div>

       
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[120px] h-[60px] flex justify-center items-end shadow-md">
          <Image
            src="/assets/icons/footerlogo2.svg"
            alt="logo"
            width={196}
            height={168}
            className="w-[196px] h-[168px] object-contain"
          />
        </div>

       
        <div className="flex flex-col items-center gap-2 mt-10 md:mt-0">
          <p>@azconprice</p>
          <div className="flex gap-4 text-[20px]">
            <a
              href="https://www.instagram.com/azconprice?igsh=bzBtY3hnMzh3aGpv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@azconprice?_t=ZS-8yKUpxlYjw7&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
            <a
              href="https://wa.me/994709558885"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://youtube.com/@azconprice?feature=shared"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
