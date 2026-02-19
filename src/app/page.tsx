"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void-950 text-slate-200 selection:bg-indigo-500/30 selection:text-white overflow-hidden relative font-sans">
      {/* Background Ambient Effects - Deeper and subtler */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-indigo-950/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[12000ms]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-void-900/40 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[18000ms]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-[0.2em] text-white/90"
        >
          THE VOID
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/login"
            className="px-6 py-2 text-xs font-semibold tracking-widest uppercase text-white/70 hover:text-white transition-colors"
          >
            Login
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[75vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-10 max-w-5xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tighter leading-[1.1]">
            <span className="block text-white/90">Cheaper than <span className="font-normal text-white">Therapy.</span></span>
            <span className="block text-white/50">Safer than a <span className="font-normal text-white/70">Diary.</span></span>
          </h1>

          <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            이곳은 판단 없는 공간입니다.<br className="hidden md:block" />
            당신의 가장 무거운 이야기를 털어놓고, <span className="text-indigo-400/80 font-normal">영원히 태워버리세요.</span>
          </p>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-void px-10 py-5 rounded-full text-white font-medium text-sm tracking-[0.15em] uppercase"
              >
                Enter The Void
              </motion.button>
            </Link>

            <Link href="#features" className="text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white/60 transition-colors pb-1 border-b border-transparent hover:border-white/20">
              How it works
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Feature Section */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {[
            {
              title: "Absolute Privacy",
              desc: "회원가입 없이도 가능합니다. 익명으로 입장하여 누구에게도 말 못한 이야기를 털어놓으세요."
            },
            {
              title: "Tough Love AI",
              desc: "빈말뿐인 위로는 없습니다. 당신의 감정을 있는 그대로 직면하고, 날카롭지만 따뜻하게 공감합니다."
            },
            {
              title: "The Burning Ritual",
              desc: "모든 대화가 끝나면 '태우기' 버튼을 누르세요. 당신의 고민은 디지털 재가 되어 영원히 사라집니다."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="space-y-6 text-center md:text-left group"
            >
              <div className="w-12 h-[1px] bg-indigo-500/50 mx-auto md:mx-0 group-hover:w-20 transition-all duration-500" />
              <h3 className="text-lg font-normal tracking-widest text-white/80 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-loose font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center border-t border-white/5">
        <p className="text-white/10 text-[0.6rem] tracking-[0.3em] font-light uppercase">
          © 2026 The Void. Designed for Emotional Zero.
        </p>
      </footer>
    </div>
  );
}
