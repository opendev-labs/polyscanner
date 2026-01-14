"use client"

import { motion } from "framer-motion"
import { Zap, Activity, ArrowRight, PieChart, Database, Shield, Globe } from "lucide-react"

export default function Home() {
    return (
        <div className="min-h-screen bg-[#020202] text-white overflow-hidden selection:bg-primary selection:text-black">
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#FF6C37]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF6C37]/5 rounded-full blur-[120px]" />
            </div>

            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-sm bg-[#FF6C37]/10 border border-[#FF6C37]/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#FF6C37]" />
                    </div>
                    <span className="text-xl font-black italic tracking-tighter uppercase">POLYSCAN</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-zinc-500">
                    <a href="#" className="hover:text-[#FF6C37] transition-colors">Taxonomy</a>
                    <a href="#" className="hover:text-[#FF6C37] transition-colors">Manifest</a>
                    <a href="#" className="hover:text-[#FF6C37] transition-colors">API</a>
                    <button className="px-4 py-2 bg-white text-black rounded-sm hover:bg-[#FF6C37] transition-all">
                        Launch Hub
                    </button>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-8 py-20 lg:py-40">
                <div className="max-w-4xl space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6C37]/10 border border-[#FF6C37]/20"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#FF6C37] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6C37]">Parallel Evolution v0.1.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter leading-none"
                    >
                        Probability <br />
                        <span className="text-[#FF6C37] glow-text-primary">Intelligence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-medium leading-relaxed"
                    >
                        Transforming raw prediction market noise into readable probability signals. Built for the next generation of decision intelligence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 pt-4"
                    >
                        <button className="group px-8 py-5 bg-[#FF6C37] text-black font-black uppercase tracking-wider rounded-sm flex items-center justify-center gap-3 hover:bg-[#ff8a5e] transition-all shadow-2xl shadow-[#FF6C37]/20">
                            Start Scanning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-wider rounded-sm hover:bg-white/10 transition-all">
                            Read Manifest
                        </button>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
                    {[
                        { title: "Peer-Derived", desc: "Intelligence extracted from real-time crowd positioning.", icon: Globe },
                        { title: "Verified Truth", desc: "Outcomes secured by decentralized optimistic oracles.", icon: Shield },
                        { title: "USDC Native", desc: "Settled on high-liquidity crypto data rails.", icon: Database },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-xl bg-[#080808] border border-white/5 hover:border-[#FF6C37]/30 transition-all group"
                        >
                            <feature.icon className="w-8 h-8 text-[#FF6C37] mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-black uppercase tracking-widest mb-2">{feature.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>

            <footer className="relative z-10 border-t border-white/5 py-12 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#FF6C37]" />
                        <span className="text-sm font-black italic tracking-tighter uppercase">POLYSCAN PROTOCOL</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700">
                        © 2026 OPendev Labs. All Rights Reserved.
                    </div>
                    <div className="flex gap-6">
                        <Activity className="w-4 h-4 text-zinc-700 hover:text-[#FF6C37] cursor-pointer transition-colors" />
                        <PieChart className="w-4 h-4 text-zinc-700 hover:text-[#FF6C37] cursor-pointer transition-colors" />
                        <Globe className="w-4 h-4 text-zinc-700 hover:text-[#FF6C37] cursor-pointer transition-colors" />
                    </div>
                </div>
            </footer>
        </div>
    )
}
