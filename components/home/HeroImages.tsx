const hero1 = "/assets/hero-1.jpg";
const hero2 = "/assets/hero-2.jpg";
const hero3 = "/assets/hero-3.jpg";
const hero4 = "/assets/hero-4.jpg";

export function HeroImages() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <img
        src={hero1}
        alt="Financial consultant reviewing documents"
        className="w-full h-44 object-cover rounded-lg"
      />
      <img
        src={hero2}
        alt="Business consultation with laptop"
        className="w-full h-44 object-cover rounded-lg"
      />
      <img
        src={hero3}
        alt="Tax planning discussion"
        className="w-full h-44 object-cover rounded-lg"
      />
      <img
        src={hero4}
        alt="Financial advisor explaining services"
        className="w-full h-44 object-cover rounded-lg"
      />
    </div>
  );
}
