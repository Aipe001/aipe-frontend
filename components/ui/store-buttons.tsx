import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StoreButtonsProps {
  className?: string;
  buttonClassName?: string;
}

export function StoreButtons({
  className,
  buttonClassName,
}: StoreButtonsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4 justify-center items-center",
        className,
      )}
    >
      <Link
        href="https://play.google.com/store"
        className={cn(
          "bg-black flex items-center justify-center py-3 px-4 rounded-xl shadow-lg transition-all duration-300 hover:bg-[#333333] hover:-translate-y-1 hover:shadow-xl active:translate-y-0 w-full max-w-[200px]",
          buttonClassName,
        )}
      >
        <Image
          src="/assets/download-app/google-play.svg"
          alt="Get it on Google Play"
          width={160}
          height={48}
          className="w-auto h-8 md:h-10 object-contain"
        />
      </Link>
      <Link
        href="https://apps.apple.com"
        className={cn(
          "bg-black flex items-center justify-center py-3 px-4 rounded-xl shadow-lg transition-all duration-300 hover:bg-[#333333] hover:-translate-y-1 hover:shadow-xl active:translate-y-0 w-full max-w-[200px]",
          buttonClassName,
        )}
      >
        <Image
          src="/assets/download-app/apple-app-store.svg"
          alt="Download on the App Store"
          width={160}
          height={48}
          className="w-auto h-8 md:h-10 object-contain"
        />
      </Link>
    </div>
  );
}
