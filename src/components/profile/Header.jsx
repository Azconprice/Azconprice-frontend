'use client';

import Image from "next/image";
import profilePhoto from "@/assets/images/testuser.png";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "@/utils/auth";
import { logoutUser } from "@/utils/logout";

const Header = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logoutUser();
    setIsDropdownOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user) return "İstifadəçi";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    if (firstName && lastName) {
      return `${firstName} ${lastName.charAt(0)}.`;
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

  return (
    <div className="w-[calc(100%-312px)] fixed top-0 bg-[#F8FAFC] border-b-1 border-[#CBD5E1] px-[32px] pt-[32px] pb-[5px] flex items-center justify-between z-[1000]">
      <h2 className="text-[30px] font-bold text-[#1E293B]">{title}</h2>
      <div className="flex items-center gap-[16px]">
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={handleDropdownToggle}
          >
            <div className="flex items-center gap-[12px]">
              <Image
                width={32}
                height={32}
                src={profilePhoto}
                alt="user"
                className="rounded-full"
              />
              <div>
                <p className="text-[14px] font-[700] text-[#1E293B] uppercase">{getUserDisplayName()}</p>
                <p className="text-[10px] font-[500] text-[#1018278F]">{getUserRole()}</p>
              </div>
            </div>
            <button className="shrink-0 p-[8px] cursor-pointer">
              <ChevronDown 
                className={`w-[20px] h-[20px] shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
                color="#101827" 
              />
            </button>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-[200px] bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-[1001]">
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-[#F8FAFC] flex items-center gap-3 text-[14px] text-[#475569] cursor-pointer">
                  <Settings size={16} />
                  Profil ayarları
                </button>
                
                <div className="border-t border-[#E2E8F0] mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-[#FEF2F2] flex items-center gap-3 text-[14px] text-[#DC2626] cursor-pointer"
                  >
                    <LogOut size={16} />
                    Çıxış
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
