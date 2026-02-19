"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white overflow-hidden relative font-sans">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[15000ms]" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-slate-800/5 rounded-full blur-[80px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-[0.2em] text-white/90"
        >
          THE VOID
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/login"
            className="px-6 py-2 text-xs font-medium tracking-widest uppercase border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Login
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20">
            Cheaper than Therapy.<br />
            Safer than a Diary.
          </h1>

          <p className="text-base md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            이곳은 당신의 이야기를 듣고, 기억하고, 그리고 <span className="text-white/80 font-normal">태워버립니다.</span><br className="hidden md:block" />
            어떠한 판단도 없는 완전한 어둠 속에서 마음의 짐을 내려놓으세요.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-[0.1em] uppercase shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-shadow"
              >
                Enter The Void
              </motion.button>
            </Link>

            <Link href="#features" className="text-white/40 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors">
              Show me how
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Feature Section (Minimalist) */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {[
            {
              title: "Absolute Privacy",
              desc: "익명으로 입장하세요. 당신의 이야기는 오직 당신과 Void 사이의 비밀입니다."
            },
            {
              title: "Tough Love AI",
              desc: "빈말은 하지 않습니다. 당신의 감정을 있는 그대로 공감하고, 때로는 직설적으로 위로합니다."
            },
            {
              title: "Burning Ritual",
              desc: "이야기를 털어놓은 후, '태우기' 버튼을 누르세요. 화면 속 불꽃과 함께 스트레스도 사라집니다."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="space-y-4 text-center md:text-left"
            >
              <h3 className="text-xl font-light tracking-widest text-white/90">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-white/10 text-xs tracking-widest border-t border-white/5">
        <p>© 2026 THE VOID. ALL BURDENS LEFT BEHIND.</p>
      </footer>
    </div>
  );
}
