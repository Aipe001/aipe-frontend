import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const spotlightItems = [
  {
    id: 1,
    title: "Start a New Business",
    subtitle: "(Expert Help)",
    buttonText: "Expert Help",
    bgClass: "bg-gradient-to-br from-primary/90 to-primary",
  },
  {
    id: 2,
    title: "Expert Consultation",
    subtitle: "(Book Now)",
    buttonText: "Book Now",
    bgClass: "bg-gradient-to-br from-primary/80 to-primary/95",
  },
  {
    id: 3,
    title: "Tax Season Special",
    subtitle: "(Offers)",
    buttonText: "Offers",
    bgClass: "bg-gradient-to-br from-primary/85 to-primary",
  },
];

export function SpotlightSection() {
  return (
    <section className="py-12">
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            In the spotlight
          </h2>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightItems.map((item) => (
            <div
              key={item.id}
              className={`${item.bgClass} rounded-xl p-6 text-primary-foreground h-32 flex flex-col justify-between card-shadow-hover`}
            >
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm opacity-90">{item.subtitle}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-fit bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                {item.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
