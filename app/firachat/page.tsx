"use client";

import { useState, useRef } from "react";
import { Send, ArrowDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { ChatPlusDropdown } from "@/components/firachat/ChatPlusDropdown";

const SUGGESTIONS = [
  {
    id: 1,
    label: "Income Tax",
    prompt:
      "Hi Fira, I need to file my Income Tax, can you help me with the process?",
  },
  {
    id: 2,
    label: "GST Claim",
    prompt: "Hi Fira, how can I claim my GST refund? Please guide me.",
  },
  {
    id: 3,
    label: "Investment",
    prompt: "Hi Fira, suggest some good investment options for tax saving.",
  },
  {
    id: 4,
    label: "Loans",
    prompt: "Hi Fira, what are the current interest rates for business loans?",
  },
  {
    id: 5,
    label: "Registrations",
    prompt: "Hi Fira, I want to register a new company. What are the steps?",
  },
];

export default function FiraChatPage() {
  /* Background Image Placeholder */

  const backgroundImage = "/assets/fira_chat_backdrop.png";

  const [inputValue, setInputValue] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [showWhoIsFira, setShowWhoIsFira] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: "user" | "ai" }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasText = inputValue.length > 0;

  const handleSuggestionClick = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newUserMessage = {
        id: Date.now(),
        text: inputValue,
        sender: "user" as const,
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setInputValue("");
      setIsSent(true);

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "Fira is coming soon to our app, hang tight !",
            sender: "ai" as const,
          },
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Message copied to clipboard");
  };

  // Hover Glow Effect Helper
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--x", `${x}px`);
    currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white flex flex-col items-center justify-center p-4">
      {/* Background Image Placeholder Layer */}

      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#1C8AFF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1C8AFF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Left Pill - Who is Fira? */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 hidden md:block z-20">
        <motion.div
          layout
          onClick={() => setShowWhoIsFira(!showWhoIsFira)}
          onMouseMove={handleMouseMove}
          className={`group/pill relative cursor-pointer overflow-hidden backdrop-blur-md border border-white/40 shadow-lg transition-all duration-300 w-80 ${
            showWhoIsFira
              ? "bg-white/60 rounded-3xl p-6"
              : "bg-white/30 hover:bg-white/40 rounded-full px-5 py-3 h-[52px]"
          }`}
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover/pill:opacity-100 transition duration-300"
            style={{
              background: `radial-gradient(600px circle at var(--x) var(--y), rgba(28, 138, 255, 0.1), transparent 40%)`,
            }}
          />
          <motion.div
            layout="position"
            className="flex items-center justify-between"
          >
            <span className="font-semibold text-[#1C8AFF] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Who is Fira?
            </span>
            <motion.div
              animate={{ rotate: showWhoIsFira ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowDown className="w-4 h-4 text-[#1C8AFF]" />
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {showWhoIsFira && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-gray-600 text-sm mt-4 leading-relaxed"
              >
                She&apos;s{" "}
                <span className="font-semibold text-[#1C8AFF]">smart</span>,{" "}
                <span className="font-semibold text-[#1C8AFF]">safe</span> and{" "}
                <span className="font-semibold text-[#1C8AFF]">sensitive</span>.
                <br />
                <br />
                The friend who helps with your finances anytime!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Top Right Pill - Fira Tagline */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 hidden md:block z-20">
        <div
          className="group/pill relative overflow-hidden px-5 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm"
          onMouseMove={handleMouseMove}
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover/pill:opacity-100 transition duration-300"
            style={{
              background: `radial-gradient(400px circle at var(--x) var(--y), rgba(28, 138, 255, 0.1), transparent 40%)`,
            }}
          />
          <span className="text-gray-600 font-medium text-sm relative z-10">
            Fira - the most{" "}
            <span className="text-[#1C8AFF] font-bold">human</span> finance AI
          </span>
        </div>
      </div>

      {/* Main Chat Area */}
      <motion.div
        layout
        className={`w-full max-w-3xl flex flex-col items-center relative z-10 ${
          isSent ? "justify-end h-full pb-8" : "justify-center"
        }`}
      >
        {/* Chat Messages */}
        <div className="w-full flex-1 overflow-y-auto overflow-x-hidden px-4 mb-4 space-y-6 no-scrollbar flex flex-col justify-end">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout
                className={`flex w-full ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="relative group/message max-w-[80%] md:max-w-[70%]">
                  {/* Copy Button (Bottom Left of Bubble) */}
                  <button
                    onClick={() => copyToClipboard(message.text)}
                    className={`absolute bottom-2 p-1.5 bg-white/80 rounded-full shadow-sm border border-gray-100 text-gray-400 hover:text-[#1C8AFF] z-10 transition-opacity duration-200 
                      opacity-100 md:opacity-0 md:group-hover/message:opacity-100
                      ${message.sender === "user" ? "-left-10" : "-right-10"}`}
                    title="Copy to clipboard"
                  >
                    <CopyIcon size={14} />
                  </button>

                  <div
                    className={`px-6 py-3 rounded-2xl text-[15px] backdrop-blur-sm shadow-sm ${
                      message.sender === "user"
                        ? "bg-[#1C8AFF] text-white rounded-tr-none"
                        : "bg-white/80 border border-white/60 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Helper Text */}
        <AnimatePresence>
          {!isSent && (
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, height: 0, marginBottom: 0 }}
              className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
            >
              Hi I am Fira, how can I help you today?
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Input Container */}
        <motion.div layout className="w-full relative group">
          <div className="relative flex items-center w-full min-h-[60px] bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_32px_rgba(28,138,255,0.1)] transition-all duration-300 focus-within:shadow-[0_8px_32px_rgba(28,138,255,0.2)] focus-within:bg-white/80 p-2">
            {/* Left Action (Plus) */}
            <div className="pl-2">
              <ChatPlusDropdown />
            </div>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Fira..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-gray-700 placeholder-gray-400 text-lg"
            />

            {/* Right Action (Send) */}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-3 rounded-full transition-all duration-300 ${
                inputValue.trim()
                  ? "bg-[#1C8AFF] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:scale-105 active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Suggestion Bubbles */}
        <AnimatePresence>
          {!hasText && !isSent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mt-8 max-w-2xl px-4"
            >
              {SUGGESTIONS.map((suggestion, index) => (
                <motion.button
                  key={suggestion.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onMouseMove={handleMouseMove}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                  className="group/pill relativeoverflow-hidden px-6 py-2.5 bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/40 rounded-full text-gray-600 hover:text-[#1C8AFF] hover:border-[#1C8AFF]/30 transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium relative overflow-hidden"
                >
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover/pill:opacity-100 transition duration-300"
                    style={{
                      background: `radial-gradient(150px circle at var(--x) var(--y), rgba(28, 138, 255, 0.15), transparent 80%)`,
                    }}
                  />
                  <span className="relative z-10">{suggestion.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
