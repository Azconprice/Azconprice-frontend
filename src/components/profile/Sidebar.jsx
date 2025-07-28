"use client";
import logo from "@/assets/images/logo.svg";
import { Home, Key, List, LogOut, MessageCircleMore, Package, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profilePhoto from "@/assets/images/testuser.png";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import { logoutUser } from "@/utils/logout";
import { useTranslations } from 'next-intl';

const Sidebar = () => {
  const pathname = usePathname();
  const user = getCurrentUser();
  const t = useTranslations('profilesidebar');

  const getUserDisplayName = () => {
    if (!user) return "İstifadəçi";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return firstName || lastName || "İstifadəçi";
  };

  const getUserRole = () => {
    if (!user) return "İstifadəçi";
    switch (user.role) {
      case 'User':
        return 'İstifadəçi';
      case 'Company':
        return 'Şirkət';
      case 'Worker':
        return 'İşçi';
      default:
        return 'İstifadəçi';
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="py-[32px] px-[16px] w-[312px] border-r-1 border-[#E2E8F0] shrink-0">
      <Link href="/" className="mb-[50px] block">
        <Image src={logo} width={71} height={71} alt="logo" />
      </Link>
      <div className="mb-[50px]">

        <div className="flex flex-col gap-[8px]">
          <Link
            href="./details"
            className={`w-full flex items-center gap-[8px] py-[10px] px-[16px] rounded-full font-[700] text-[16px] ${pathname.includes('details') ? 'bg-[#101827] text-[#F0EEEE]' : 'text-[#1E293B]'}`}
          >
            <Home className="w-[24px] h-[24px] shrink-0" color="#94A3B8" />
           {t('Personal cabinet')}
          </Link>
           <Link
            href="./applications"
            className={`w-full flex items-center gap-[8px] py-[10px] px-[16px] rounded-full font-[700] text-[16px] ${pathname.includes('applications') ? 'bg-[#101827] text-[#F0EEEE]' : 'text-[#1E293B]'}`}
          >
            <MessageCircleMore
              className="w-[24px] h-[24px] shrink-0"
              color="#94A3B8"
            />
           {t('Files')}
          </Link>
          <Link
            href="./files"
            className={`w-full flex items-center gap-[8px] py-[10px] px-[16px] rounded-full font-[700] text-[16px] ${pathname.includes('files') ? 'bg-[#101827] text-[#F0EEEE]' : 'text-[#1E293B]'}`}
          >
            <List className="w-[24px] h-[24px] shrink-0" color="#94A3B8" />
             {t('Applications')}
          </Link>
         
          {user?.role === 'Company' && (
            <Link
              href="./products"
              className={`w-full flex items-center gap-[8px] py-[10px] px-[16px] rounded-full font-[700] text-[16px] ${pathname.includes('products') ? 'bg-[#101827] text-[#F0EEEE]' : 'text-[#1E293B]'}`}
            >
              <Package
                className="w-[24px] h-[24px] shrink-0"
                color="#94A3B8"
              />
              {t('Files')}
            </Link>
          )}
          <Link
            href="./change-password"
            className={`w-full flex items-center gap-[8px] py-[10px] px-[16px] rounded-full font-[700] text-[16px] ${pathname.includes('change-password') ? 'bg-[#101827] text-[#F0EEEE]' : 'text-[#1E293B]'}`}
          >
            <Key
              className="w-[24px] h-[24px] shrink-0 rotate-45"
              color="#94A3B8"
            />
                 {t('Security')}
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[12px]">
          <Image
            width={40}
            height={40}
            src={profilePhoto}
            alt="user"
            className="rounded-full"
          />
          <div>
            <p className="text-[16px] font-[700] text-[#1E293B] uppercase">{getUserDisplayName()}</p>
            <p className="text-[14px] font-[500] text-[#475569]">{getUserRole()}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="shrink-0 p-[8px] cursor-pointer hover:bg-[#F1F5F9] rounded-full transition-colors">
          <LogOut className="w-[20px] h-[20px] shrink-0" color="#475569" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
