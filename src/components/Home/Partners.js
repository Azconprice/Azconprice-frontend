import { Marquee } from "@/components/magicui/marquee";
import Autodesk from "./../../../public/assets/images/autodesk_logo.svg";
import DesignFoundation from "./../../../public/assets/images/design_foundation_logo.svg";
import DigitalMarketing from "./../../../public/assets/images/digital_marketing_logo.svg";
import Fortinet from "./../../../public/assets/images/fortinet_logo.svg";
import Github from "./../../../public/assets/images/github_logo.svg";
import Microsoft from "./../../../public/assets/images/microsoft_logo.svg";
import Redhat from "./../../../public/assets/images/redhat_logo.svg";
import Image from "next/image";



const Partners = () => {
    const images = [Autodesk, DesignFoundation, DigitalMarketing, Fortinet, Github, Microsoft, Redhat];

  return (
    <section className="w-full max-w-[1350px] m-auto flex flex-col gap-[20px]"> 
        <h2 className="px-[20px] text-[32px] sm:text-[36px] md:text-[48px] text-center">Bizim <span className="font-bold">Partnyorlarımız</span></h2>
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