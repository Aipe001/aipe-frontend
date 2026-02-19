import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Service } from "@/lib/api/services";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact";
  onClick?: () => void;
}

export function ServiceCard({
  service,
  variant = "default",
  onClick,
}: ServiceCardProps) {
  const isCompact = variant === "compact";

  // Use imageUrl if available, otherwise fallback to iconUrl or a placeholder
  const imageSrc = service.imageUrl || service.iconUrl || "/assets/placeholder.png";

  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-shadow border-gray-100 rounded-2xl group cursor-pointer ${onClick ? "" : "pointer-events-none"
        }`}
      onClick={onClick}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div
          className={`${isCompact ? "h-32" : "h-48"
            } bg-gray-50 relative flex items-center justify-center p-4 group-hover:bg-blue-50 transition-colors`}
        >
          <div
            className={`relative ${isCompact ? "w-20 h-20" : "w-32 h-32"
              } transition-transform duration-300 group-hover:scale-110`}
          >
            <Image
              src={imageSrc}
              alt={service.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="p-4 bg-white flex-1 flex items-center justify-center text-center">
          <h3
            className={`font-bold ${isCompact ? "text-sm" : "text-lg"
              } text-gray-800 group-hover:text-[#1C8AFF] transition-colors ${isCompact ? "line-clamp-2" : ""
              }`}
          >
            {service.name}
          </h3>
          {!isCompact && service.shortDescription && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{service.shortDescription}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
