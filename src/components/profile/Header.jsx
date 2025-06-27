import Image from "next/image";
import notificationIcon from "@/assets/images/notification.svg";
import profilePhoto from "@/assets/images/testuser.png";
import { ChevronDown } from "lucide-react";

const Header = ({ title }) => {
  return (
    <div className="w-[calc(100%-312px)] fixed top-0 bg-[#F8FAFC] border-b-1 border-[#CBD5E1] px-[32px] pt-[32px] pb-[5px] flex items-center justify-between z-[1000]">
      <h2 className="text-[30px] font-bold text-[#1E293B]">{title}</h2>
      <div className="flex items-center gap-[16px]">
        {/* <button className="shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer bg-[#101827]">
          <Image src={notificationIcon} alt="notification" />
        </button> */}
        <div className="flex items-center justify-between w-[177px] cursor-pointer">
        <div className="flex items-center gap-[12px]">
          <Image
            width={32}
            height={32}
            src={profilePhoto}
            alt="user"
            className="rounded-full"
          />
          <div>
            <p className="text-[12px] font-[700] text-[#1E293B]">Mehriban M.</p>
            <p className="text-[10px] font-[500] text-[#1018278F]">İstifadəçi</p>
          </div>
        </div>
        <button className="shrink-0 p-[8px] cursor-pointer">
          <ChevronDown className="w-[20px] h-[20px] shrink-0" color="#101827" />
        </button>
      </div>
      </div>
    </div>
  );
};

export default Header;
