import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const AppAccordion = ({
  type,
  date,
  status,
  content,
  isExpandedByDefault = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="bg-white rounded-[12px] shadow-sm border border-[#E5E7EB] mb-[12px] overflow-hidden"
      onClick={toggleAccordion} // Bu əlavə etməklə, bütün section-a tıklananda açılır
    >
      <div className="p-[16px]">
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex-1 ">
            <div className="grid grid-cols-3 gap-[20px] items-center">
              <div>
                <p className="text-[#6B7280] text-[12px] font-[500] mb-[4px]">
                  Müraciət tipi
                </p>
                <p className="text-[#374151] text-[14px] font-[600]">{type}</p>
              </div>
              <div>
                <p className="text-[#6B7280] text-[12px] font-[500] mb-[4px]">
                  Tarixi
                </p>
                <p className="text-[#374151] text-[14px] font-[600]">{date}</p>
              </div>
              <div>
                <p className="text-[#6B7280] text-[12px] font-[500] mb-[4px]">
                  Status
                </p>
                <span className="bg-[#374151] text-white px-[16px] py-[6px] rounded-full text-[12px] font-[500]">
                  {status}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} // İkon tıklaması ilə də açılma
            className="ml-[20px] p-[8px] hover:bg-[#F3F4F6] rounded-full transition-colors cursor-pointer"
          >
            <ChevronDown size={20} color="#6B7280" className={`${isExpanded ? 'rotate-180' : ''} transition`} />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-[16px] pt-[16px] border-t border-[#E5E7EB]">
            <p className="text-[#6B7280] text-[12px] font-[500] mb-[8px]">
              Müraciətiniz
            </p>
            <p className="text-[#374151] text-[14px] leading-[1.6]">
              {content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppAccordion;
