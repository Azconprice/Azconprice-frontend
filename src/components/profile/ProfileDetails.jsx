import { Info, Star } from "lucide-react";

const ProfileDetails = () => {
  return (
    <div className="p-[32px] mt-[80px]">
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
        <div className="w-full flex justify-between mb-[24px]">
          <label htmlFor="name" className="font-[700] text-[16px] text-[#1E293B]">Ad</label>
          <input
            type="text"
            name="name"
            id="name"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full flex justify-between mb-[24px]">
          <label htmlFor="surname" className="font-[700] text-[16px] text-[#1E293B]">Soyad</label>
          <input
            type="text"
            name="surname"
            id="surname"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full flex justify-between mb-[24px]">
          <label htmlFor="email" className="font-[700] text-[16px] text-[#1E293B]">Elektron poçt</label>
          <input
            type="text"
            name="email"
            id="email"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full flex justify-between mb-[24px]">
          <label htmlFor="address" className="font-[700] text-[16px] text-[#1E293B]">Yaşayış ünvanı</label>
          <input
            type="text"
            name="address"
            id="address"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>

        <div className="flex justify-between w-full">
          <label htmlFor="phone" className="font-[700] text-[16px] text-[#1E293B]">Mobil nömrə</label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="md:w-[520px] w-full border-1 border-[#CBD5E1] rounded-full p-[12px] text-[16px] font-[500] text-[#475569]"
          />
        </div>

        <div className="w-full h-[1px] bg-[#E2E8F0] my-[24px]"></div>
      </div>
    </div>
  );
};

export default ProfileDetails;
