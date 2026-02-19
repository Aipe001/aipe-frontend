"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Image as ImageIcon, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatPlusDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#1C8AFF] hover:bg-[#1C8AFF]/10 p-2 rounded-full transition-colors duration-200"
        aria-label="Add options"
      >
        <Plus
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-0 mb-2 w-48 bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden z-50"
          >
            <div className="flex flex-col p-1">
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-[#1C8AFF]/10 transition-colors text-sm text-gray-700 font-medium rounded-lg text-left">
                <ImageIcon className="w-4 h-4 text-[#1C8AFF]" />
                Add Photo
              </button>
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-[#1C8AFF]/10 transition-colors text-sm text-gray-700 font-medium rounded-lg text-left">
                <FileText className="w-4 h-4 text-[#1C8AFF]" />
                Upload File
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
