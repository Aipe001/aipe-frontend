const hero1 = "/assets/hero-1.png";
const hero2 = "/assets/hero-2.png";
const hero3 = "/assets/hero-3.png";
const hero4 = "/assets/hero-4.png";

import Image from "next/image";

export function HeroImages() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="relative h-44 w-full">
        <Image
          src={hero1}
          alt="Financial consultant reviewing documents"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="relative h-44 w-full">
        <Image
          src={hero2}
          alt="Business consultation with laptop"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="relative h-44 w-full">
        <Image
          src={hero3}
          alt="Tax planning discussion"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="relative h-44 w-full">
        <Image
          src={hero4}
          alt="Financial advisor explaining services"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
