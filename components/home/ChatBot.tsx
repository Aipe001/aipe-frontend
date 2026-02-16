"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

export function ChatBot() {
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Chat messages state
  const [messages] = useState([
    {
      id: 1,
      role: "ai",
      content: "Hi, I am FIRA, how can I help you today ?",
    },
    {
      id: 2,
      role: "user",
      content:
        "Hi, I haven't filled my ITR for past 5 years, can you help me with it ?",
    },
    {
      id: 3,
      role: "ai",
      content: (
        <>
          Sure, please head over to our{" "}
          <Link
            href="/services/all"
            className="underline font-bold hover:text-blue-100"
          >
            Services
          </Link>{" "}
          section and click ITR to book a service with 1 of our experts.
        </>
      ),
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      // Chatbot Tooltip Logic
      // User is scrolling, hide tooltip
      setShowChatTooltip(false);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to show tooltip after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setShowChatTooltip(true);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowChatTooltip(false);
    }
  };

  return (
    <>
      {/* Chat Box (Positioned above the button) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[220px] right-8 z-[60] w-[320px] md:w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1C8AFF] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="/assets/FIRA_logo-removebg.png"
                    alt="FIRA"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">FIRA Assistant</h3>
                  <p className="text-xs text-white/80">Active now</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 flex flex-col gap-4 max-h-[300px] overflow-y-auto bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar (Only for AI) */}
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 relative overflow-hidden border border-blue-200">
                      <Image
                        src="/assets/FIRA_logo-removebg.png"
                        alt="FIRA"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`p-3 rounded-2xl text-sm shadow-sm max-w-[80%] ${
                      msg.role === "ai"
                        ? "bg-[#1C8AFF] text-white rounded-tl-none"
                        : "bg-gray-200 text-gray-800 rounded-tr-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C8AFF]/50 text-gray-800"
              />
              <button className="w-9 h-9 bg-[#1C8AFF] rounded-full flex items-center justify-center text-white hover:bg-[#1570d0] transition-colors shadow-sm">
                <Send size={16} className="ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Chatbot Button - Always fixed */}
      <div className="fixed bottom-[144px] right-8 z-50 flex items-center justify-end gap-3 pointer-events-none">
        {/* Tooltip */}
        <AnimatePresence>
          {showChatTooltip && !isChatOpen && !hasInteracted && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-[#000000] px-4 py-2 rounded-xl shadow-lg border border-gray-100 text-sm font-bold whitespace-nowrap origin-right absolute right-[70px]"
            >
              Meet Fira, your Finance Companion
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleChat}
          className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform w-16 h-16 flex items-center justify-center border border-gray-100 pointer-events-auto z-50"
        >
          <div className="relative w-12 h-12">
            <Image
              src="/assets/FIRA_logo-removebg.png"
              alt="FIRA Chatbot"
              fill
              className="object-contain"
            />
          </div>
        </button>
      </div>
    </>
  );
}
