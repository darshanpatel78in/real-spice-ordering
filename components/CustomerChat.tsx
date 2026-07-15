"use client";

import { usePathname } from "next/navigation";
import ChatBot from "./ChatBot";

export default function CustomerChat() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <ChatBot
      api="/api/chat"
      title="Customer Assistant"
    />
  );
}