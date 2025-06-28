import { Check, Info, Star, X } from "lucide-react";
import React from "react";

const ChangePassword = () => {
  return (
    <>
      <div className="p-[32px] mt-[80px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-[700] text-[#1E293B]">
            Təhlükəsizlik ayarları
          </h3>
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
            <label
              htmlFor="password"
              className="font-[700] text-[16px] text-[#1E293B]"
            >
              Cari şifrə
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
            />
          </div>

          <div className="w-full flex justify-between mb-[24px] items-center">
            <label
              htmlFor="newpassword"
              className="font-[700] text-[16px] text-[#1E293B]"
            >
              Yeni şifrə
            </label>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
            />
          </div>

          <div className="w-full flex justify-between mb-[24px] items-center">
            <label
              htmlFor="newpasswordagain"
              className="font-[700] text-[16px] text-[#1E293B]"
            >
              Yeni şifrə təkrarı
            </label>
            <input
              type="password"
              name="newpasswordagain"
              id="newpasswordagain"
              className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
            />
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
            <Check
              size={20}
              color="#ffffff"
              className="group-hover:stroke-[#F37321] transition"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
