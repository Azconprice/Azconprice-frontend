import { Check, Info, Star, X } from "lucide-react";
import Image from "next/image";
import profilePhoto from '@/assets/images/testuser.png'
import questionCircle from '@/assets/images/question_circle.svg';

const ProfileDetails = () => {
  return (
    <div className="p-[32px] mt-[80px] overflow-y-auto h-[calc(100vh-80px)]">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-[700] text-[#1E293B]">Profil</h3>
        <div className="flex items-center gap-[8px]">
          <button className="shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer border-1 border-[#CBD5E1] relative group">
            <Info size={16} color="#475569" />

            <div className="absolute top-[-15px] right-[150%] w-[300px] p-[12px] bg-[#101827] rounded-[16px] pointer-events-none transition group-hover:opacity-100 opacity-0">
              <h4 className="font-bold text-[14px] text-white mb-[8px]">
                Tooltip title
              </h4>
              <p className="text-[12px] text-white">
                Tooltips display informative text when users hover over, focus
                on, or tap an element.
              </p>

              <div className="absolute top-[50%] translate-y-[-50%] right-[-4px] w-[16px] h-[16px] bg-[#101827] rotate-45"></div>
            </div>
          </button>

          <div className="flex items-center gap-[8px] bg-[#F37321] rounded-full px-[16px] py-[10px] text-white font-[700] text-[14px]">
            Pro
            <Star size={20} color="#FFFFFF" />
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

      <div className="max-w-[800px]">
        <div className="w-full flex justify-between mb-[24px] items-center">
          <label htmlFor="name" className="font-[700] text-[16px] text-[#1E293B]">Ad</label>
          <input
            type="text"
            name="name"
            id="name"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full flex justify-between mb-[24px] items-center">
          <label htmlFor="surname" className="font-[700] text-[16px] text-[#1E293B]">Soyad</label>
          <input
            type="text"
            name="surname"
            id="surname"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full flex justify-between mb-[24px] items-center">
          <label htmlFor="email" className="font-[700] text-[16px] text-[#1E293B]">Elektron poçt</label>
          <input
            type="text"
            name="email"
            id="email"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full flex justify-between mb-[24px] items-center">
          <label htmlFor="address" className="font-[700] text-[16px] text-[#1E293B]">Yaşayış ünvanı</label>
          <input
            type="text"
            name="address"
            id="address"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="w-full flex justify-between items-center">
          <label htmlFor="phone" className="font-[700] text-[16px] text-[#1E293B]">Mobil nömrə</label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="w-full flex justify-between items-center">
          <p className="font-[700] text-[16px] text-[#1E293B]">
            Profil
          </p>

          <div className="md:w-[520px] w-full flex items-center gap-[16px]">
            <Image
              src={profilePhoto}
              width={64}
              height={64}
              alt="photo"
              className="rounded-full"
            />

            <button className="bg-[#101827] px-[16px] py-[10px] border-1 border-[#101827] text-[#F0EEEE] text-[14px] font-[700] rounded-full transition hover:text-[#101827] hover:bg-transparent cursor-pointer">Edit</button>
            <button className="bg-[#F37321] px-[16px] py-[10px] border-1 border-[#F37321] text-[#F0EEEE] text-[14px] font-[700] rounded-full transition hover:text-[#F37321] hover:bg-transparent cursor-pointer">Delete</button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="w-full flex justify-between items-center">
          <p className="font-[700] text-[16px] text-[#1E293B]">
            Plan
          </p>

          <div className="md:w-[520px] w-full bg-[#101827] rounded-full p-[12px] text-[#F0EEEE] text-[16px] font-[500]">
            Aylıq plan 99$
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="w-full flex justify-between items-start">
          <p className="font-[700] text-[16px] text-[#1E293B] flex items-center gap-[8px]">
            Haqqımda

            <Image
              src={questionCircle}
              height={16}
              width={16}
              alt="info"
            />
          </p>

          <div className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-[24px] relative overflow-hidden">
            <textarea name="info" id="info" className="p-[12px] pb-[50px] w-full outline-none min-h-[200px] text-[16px] text-[#475569]"></textarea>
            <p className="absolute p-[10px] bg-white bottom-0 left-0 text-[#94A3B8] text-[12px] font-[500] z-[100]">325 characters remaining</p>
          </div>
        </div>

      </div>

      <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

      <div className="flex justify-end gap-[8px]">
        <button className="px-[16px] py-[10px] border-1 border-[#CBD5E1] rounded-full flex justify-center items-center gap-[8px] text-[#475569] text-[14px] font-bold cursor-pointer">
          Cancel
          <X size={20} color="#475569" />
        </button>
        <button className="px-[16px] py-[10px] bg-[#F37321] border-1 border-[#F37321] transition hover:bg-transparent hover:text-[#F37321] rounded-full flex justify-center items-center gap-[8px] text-white text-[14px] font-bold cursor-pointer group">
          Save
          <Check size={20} color="#ffffff" className="group-hover:stroke-[#F37321] transition" />
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
