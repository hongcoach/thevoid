"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signInWithRedirect, signInAnonymously, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginAnonymously: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error: any) {
            console.error("Google Login Popup Failed", error);
            // Fallback for popup blockers or mobile webviews
            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/popup-blocked') {
                console.warn("Popup blocked/closed, falling back to redirect...");
                try {
                    await signInWithRedirect(auth, googleProvider);
                } catch (redirectError) {
                    console.error("Google Login Redirect Failed", redirectError);
                    throw redirectError;
                }
            } else {
                throw error;
            }
        }
    };

    const loginAnonymously = async () => {
        try {
            await signInAnonymously(auth);
        } catch (error) {
            console.error("Anonymous Login Failed", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginAnonymously, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
