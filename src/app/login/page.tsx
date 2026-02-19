"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
    const { loginWithGoogle, loginAnonymously } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            router.push("/chat");
        } catch (err: any) {
            setError("Google login failed. Please try again.");
            console.error(err);
        }
    };

    const handleAnonymousLogin = async () => {
        try {
            await loginAnonymously();
            router.push("/chat");
        } catch (err: any) {
            setError("Anonymous login failed.");
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-sm text-center shadow-2xl"
            >
                <h1 className="text-3xl font-thin tracking-[0.3em] mb-2 text-white/90">THE VOID</h1>
                <p className="text-white/50 text-sm mb-8 tracking-wider font-light">
                    Enter the emptiness.<br />Leave your burdens behind.
                </p>

                {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-3 px-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-medium text-sm tracking-wide"
                    >
                        Sign in with Google
                    </button>
                    <button
                        onClick={handleAnonymousLogin}
                        className="w-full py-3 px-4 bg-transparent border border-white/20 text-white/70 rounded-full hover:bg-white/5 hover:text-white transition-all font-light text-sm tracking-wide"
                    >
                        Enter Anonymously
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
