"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Flame, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { auth } from "@/lib/firebase";

export default function ChatInterface() {
    const { messages, sendMessage, status, setMessages } = useChat({
        // Callbacks removed to avoid implicit any type errors
    });

    const [input, setInput] = useState("");
    const [isBurning, setIsBurning] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!hasInitialized.current && messages.length === 0) {
            setMessages([
                { id: "1", role: "assistant", content: "그대여, 어서오세요. 이 깊은 어둠 속에서는 어떤 이야기도 안전합니다. 마음속의 짐을 내려놓으세요." } as any,
            ]);
            hasInitialized.current = true;
        }
    }, [setMessages, messages.length]);

    // Derive isLoading from status
    const isLoading = status === "submitted" || status === "streaming";

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: "user", content: input };
        const assistantMessageId = (Date.now() + 1).toString();

        // Add user message immediately
        setMessages((prev: any) => [...prev, userMessage]);
        setInput("");

        try {
            // Create placeholder for assistant message
            setMessages((prev: any) => [
                ...prev,
                { id: assistantMessageId, role: "assistant", content: "" }
            ]);

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((msg: any) => ({ role: msg.role, content: msg.content }))
                }),
            });

            if (!response.ok) throw new Error(response.statusText);

            // Read the stream
            const reader = response.body?.getReader();
            if (!reader) throw new Error("No reader available");

            let accumulatedContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const text = new TextDecoder().decode(value);
                accumulatedContent += text;

                // Update the assistant message directly
                setMessages((prev: any) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.id === assistantMessageId) {
                        lastMessage.content = accumulatedContent;
                    }
                    return newMessages;
                });
            }

        } catch (err) {
            console.error("Chat failed:", err);
            // Optionally remove the placeholder if it failed completely, or show error
            setMessages((prev: any) => [
                ...prev,
                { id: Date.now().toString(), role: "assistant", content: "연결이 끊어졌습니다. 잠시 후 다시 시도해주세요." }
            ]);
        }
    };

    const handleBurn = async () => {
        if (!messages.length || messages.length <= 1) return;

        setIsBurning(true);

        // 1. Start the visual effect immediately
        const burnDuration = 2000;

        // 2. Schedule the chat clearing regardless of DB success
        setTimeout(() => {
            setMessages([{
                id: Date.now().toString(),
                role: "assistant",
                content: "모든 것이 재가 되어 사라졌습니다. 당신의 마음도 한결 가벼워지길."
            } as any]);
            setIsBurning(false);
        }, burnDuration);

        // 3. Try to save to Firestore (Fire and forget, don't block UI)
        try {
            if (auth.currentUser) {
                const { collection, addDoc } = await import("firebase/firestore");
                const { db } = await import("@/lib/firebase");

                await addDoc(collection(db, "users", auth.currentUser.uid, "rituals"), {
                    timestamp: new Date(),
                    messageCount: messages.length,
                    type: "burn",
                    note: "The void has consumed this burden."
                });
            }
        } catch (error) {
            console.error("Ritual save failed (non-critical):", error);
            // We don't stop the burning effect here because the user's experience > data persistence
        }
    };

    return (
        <div className={`flex flex-col h-screen max-w-2xl mx-auto relative overflow-hidden transition-all duration-1000 ${isBurning ? "brightness-0 blur-sm scale-95" : ""}`}>
            {/* Header */}
            <header className="flex justify-between items-center p-6 border-b border-white/5 bg-black/20 backdrop-blur-md z-10">
                <h1 className="text-2xl font-extralight tracking-[0.2em] text-white/80">THE VOID</h1>
                <button
                    onClick={handleBurn}
                    className="p-3 text-rose-500/80 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-all duration-300 group"
                    title="태워버리기"
                >
                    <Flame className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide" ref={scrollRef}>
                <AnimatePresence>
                    {messages.map((msg: any) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, filter: "blur(10px)" }}
                            className={`flex w-full mb-8 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] sm:max-w-[75%] leading-relaxed tracking-wide ${msg.role === "user"
                                    ? "bg-white/5 backdrop-blur-xl border border-white/10 text-slate-100 p-4 px-6 rounded-2xl rounded-tr-sm shadow-2xl"
                                    : "text-violet-100/90 px-4 font-light text-lg"
                                    }`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="flex items-center gap-3 mb-2 opacity-50">
                                        <div className="w-1 h-1 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
                                        <span className="text-xs uppercase tracking-[0.2em] text-violet-300">The Void</span>
                                    </div>
                                )}
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2 text-white/50 pl-4"
                    >
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </motion.div>
                )}
            </main>

            {/* Input Area */}
            <footer className="p-6 bg-transparent">
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-6 py-4 border border-white/10 focus-within:border-white/20 focus-within:bg-white/15 transition-all duration-300 shadow-2xl relative z-10">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="이곳에 당신의 이야기를 털어놓으세요..."
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 text-lg"
                            style={{ color: '#ffffff', opacity: 1 }}
                        />
                        {input.trim() ? (
                            <button type="submit" className="text-white/70 hover:text-white hover:scale-110 transition-all duration-300">
                                <Send className="w-6 h-6" />
                            </button>
                        ) : (
                            <button type="button" className="text-white/30 cursor-default">
                                <Mic className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </form>
            </footer>

            {/* Burn Overlay Effect */}
            {/* Burn Overlay Effect */}
            <AnimatePresence>
                {isBurning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 pointer-events-none flex items-end justify-center overflow-hidden"
                    >
                        {/* Red overlay */}
                        <div className="absolute inset-0 bg-orange-600/20 mix-blend-overlay animate-pulse" />

                        {/* Fire particles (CSS driven or simple divs) */}
                        <div className="w-full h-1/2 bg-gradient-to-t from-orange-500/40 via-red-500/20 to-transparent blur-xl" />

                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-10 text-white/80 tracking-[0.5em] font-light text-sm"
                        >
                            BURNING...
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
