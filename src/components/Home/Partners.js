import { Marquee } from "@/components/magicui/marquee";
import Autodesk from "@/assets/images/autodesk_logo.svg";
import DesignFoundation from "@/assets/images/design_foundation_logo.svg";
import DigitalMarketing from "@/assets/images/digital_marketing_logo.svg";
import Fortinet from "@/assets/images/fortinet_logo.svg";
import Github from "@/assets/images/github_logo.svg";
import Microsoft from "@/assets/images/microsoft_logo.svg";
import Redhat from "@/assets/images/redhat_logo.svg";
import Image from "next/image";
import { useTranslations } from 'next-intl';



const Partners = () => {
    const images = [Autodesk, DesignFoundation, DigitalMarketing, Fortinet, Github, Microsoft, Redhat];
        const t = useTranslations('OurPartners');

  return (
    <section className="w-full max-w-[1350px] m-auto flex flex-col gap-[20px]"> 
        <h2 className="px-[20px] text-[32px] sm:text-[36px] md:text-[48px] text-center"> <span className="font-bold"> {t('OurPartners')}</span></h2>
        <div className="relative w-full overflow-hidden">
          <Marquee className="[--duration:30s] gap-[20px]">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Partner Logo ${index + 1}`}
                className="w-[100px] md:w-[150px] mx-[20px]"
              />
            ))}
          </Marquee>
        </div>
    </section>
  )
}

export default Partners