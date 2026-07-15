    "use client";

    import { useEffect, useRef, useState } from "react";
   import {  Sparkles } from "lucide-react";

    type Message = {
    role: "user" | "assistant";
    content: string;
    };

    type ChatBotProps = {
    api: string;
    title?: string;
    };
    const defaultMessages: Message[] = [
    {
        role: "assistant",
        content: `Hello 👋

    Welcome to The Real Spice!

    How can I help you today?`,
    },
    ];

    export default function ChatBot({
    api,
    title = "Real Spice Assistant",
    }: ChatBotProps) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);


    const [messages, setMessages] =
        useState<Message[]>(defaultMessages);

    const messagesEndRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      open &&
      chatRef.current &&
      !chatRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open]);

    // Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        });
    }, [messages, loading]);

    // Clear chat whenever chatbot closes
    useEffect(() => {
        if (!open) {
        setMessages(defaultMessages);
        setInput("");
        setLoading(false);
        }
    }, [open]);

    async function sendMessage() {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();

        setMessages((prev) => [
        ...prev,
        {
            role: "user",
            content: userMessage,
        },
        ]);

        setInput("");
        setLoading(true);

        try {
        const res = await fetch(api, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            message: userMessage,
            }),
        });

        const data = await res.json();

        setMessages((prev) => [
            ...prev,
            {
            role: "assistant",
            content:
                data.reply ??
                "Sorry, I couldn't process your request.",
            },
        ]);
        } catch (error) {
        console.error(error);

        setMessages((prev) => [
            ...prev,
            {
            role: "assistant",
            content:
                "Something went wrong. Please try again.",
            },
        ]);
        } finally {
        setLoading(false);
        }
    }

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
        }
    }

    return (
        <>
        {/* Floating Button */}
 <button 
 onClick={() => setOpen((prev) => !prev)} 
 className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.9)] hover:scale-105 transition-all duration-100" >
     <Sparkles className="text-white" size={30} />
 </button>
        {/* Chat Window */}
        {open && (
<div
  ref={chatRef}
  className="fixed bottom-24 right-5 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-yellow-500 bg-[#1f1f1f] shadow-2xl"
>
            {/* Header */}
            <div className="flex items-center justify-between bg-yellow-500 px-4 py-3">
                <h2 className="text-lg font-bold text-black">
                {title}
                </h2>

                <button
                onClick={() => setOpen(false)}
                className="text-3xl font-bold text-black"
                >
                ×
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">

                {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${
                    msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                >
                    <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap text-sm ${
                        msg.role === "user"
                        ? "bg-yellow-500 text-black"
                        : "bg-[#2b2b2b] text-white"
                    }`}
                    >
                    {msg.content}
                    </div>
                </div>
                ))}

                {loading && (
                <div className="flex justify-start">
                    <div className="rounded-2xl bg-[#2b2b2b] px-4 py-3 text-sm text-white">
                    Typing...
                    </div>
                </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-700 p-3">

                <div className="flex gap-2">

                <input
                    value={input}
                    onChange={(e) =>
                    setInput(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask your question..."
                    className="flex-1 rounded-lg border border-yellow-700 bg-[#2b2b2b] px-3 py-2 text-sm text-white outline-none focus:border-yellow-500"
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-50"
                >
                    Send
                </button>

                </div>

            </div>

            </div>
        )}
        </>
    );
    }