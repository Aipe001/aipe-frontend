import {
  CreditCard,
  FileText,
  TrendingUp,
  PenTool,
  FileCheck,
  Building2,
} from "lucide-react";

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "credits-loans",
    title: "Credits & Loans",
    icon: <CreditCard className="w-8 h-8 text-[#1C8AFF]" />,
  },
  {
    id: "taxation",
    title: "Taxation",
    icon: <FileText className="w-8 h-8 text-[#1C8AFF]" />,
  },
  {
    id: "investment",
    title: "Investment",
    icon: <TrendingUp className="w-8 h-8 text-[#1C8AFF]" />,
  },
  {
    id: "apply",
    title: "Apply",
    icon: <PenTool className="w-8 h-8 text-[#1C8AFF]" />,
  },
  {
    id: "filing",
    title: "Filing",
    icon: <FileCheck className="w-8 h-8 text-[#1C8AFF]" />,
  },
  {
    id: "registrations",
    title: "Registrations",
    icon: <Building2 className="w-8 h-8 text-[#1C8AFF]" />,
  },
];

export function TitleServiceCard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center text-center gap-3 aspect-square"
        >
          <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
            {category.icon}
          </div>
          <span className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-[#1C8AFF] transition-colors">
            {category.title}
          </span>
        </div>
      ))}
    </div>
  );
}
