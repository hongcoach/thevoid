"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ChatInterface from "@/components/ChatInterface";

export default function ChatPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                    <span className="text-xs tracking-[0.3em] opacity-50">ENTERING VOID</span>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-void-950 text-slate-200 flex justify-center">
            <div className="w-full max-w-2xl bg-void-950 shadow-2xl shadow-black border-x border-void-800/30">
                <ChatInterface />
            </div>
        </main>
    );
}
