"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Activity, ArrowRight, PieChart, Database, Globe, BarChart3, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function PolyscanHome() {
    return (
        <div className="min-h-screen bg-[#020202] text-white overflow-hidden selection:bg-primary selection:text-black font-sans">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px]" />
            </div>

            <nav className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-black italic tracking-tighter uppercase leading-none">Polyscan</span>
                        <span className="text-[9px] font-black tracking-[0.2em] text-primary/80 uppercase">Intelligence Desk</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    {[
                        { label: "Intelligence Hub", href: "#" },
                        { label: "Screeners", href: "#" },
                        { label: "Taxonomy", href: "#" },
                        { label: "Protocol", href: "#" }
                    ].map(item => (
                        <a key={item.label} href={item.href} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors cursor-pointer">
                            {item.label}
                        </a>
                    ))}
                    <button className="px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-primary transition-all shadow-lg shadow-white/5">
                        Launch Terminal
                    </button>
                </div>
            </nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 pt-24 pb-40 text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Polymarket-grade Intelligence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "circOut" }}
                            className="text-7xl md:text-8xl xl:text-9xl font-black italic uppercase tracking-tighter leading-[0.85]"
                        >
                            Trade <br />
                            <span className="text-primary glow-text-primary">Probabilities</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg md:text-xl text-zinc-400 max-w-xl font-medium leading-relaxed mx-auto lg:mx-0"
                        >
                            Polyscan is the machine intelligence desk for prediction markets.
                            We transform crowd noise into actionable signals for institutional-grade probability analysis.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                        >
                            <button className="group px-10 py-5 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-sm flex items-center justify-center gap-3 hover:bg-white transition-all shadow-2xl shadow-primary/20">
                                Access Intelligence Hub <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-10 py-5 bg-[#0A0A0A] border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-sm hover:border-primary/50 transition-all">
                                Read Taxonomy
                            </button>
                        </motion.div>
                    </div>

                    <div className="relative">
                        {/* Terminal Preview */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full aspect-video rounded-xl bg-black border border-white/10 shadow-[0_0_100px_rgba(255,108,55,0.1)] overflow-hidden relative group"
                        >
                            <div className="h-8 border-b border-white/5 bg-white/5 flex items-center px-4 justify-between">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">POLYSCAN_LIVE_FEED.json</span>
                                <div className="w-8" />
                            </div>

                            <div className="p-6 space-y-4 font-mono">
                                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                    <span className="text-zinc-500">MARKET_ID: #0X77...</span>
                                    <span className="text-primary font-bold">PROBABILITY: 74.2%</span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                    <span className="text-zinc-500">VOLUME: $1.2M</span>
                                    <span className="text-zinc-200">DELTA: +2.1% (1H)</span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                    <span className="text-zinc-500">CROWD_CONVICTION: HIGH</span>
                                    <span className="text-green-500">STATUS: STABLE</span>
                                </div>

                                <div className="flex gap-1 items-end h-24 pt-4">
                                    {[40, 60, 45, 70, 85, 65, 90, 75, 80, 55, 65, 95].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                                            className="flex-1 bg-primary/20 border-t border-primary/50"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                    </div>
                </section>

                {/* Feature Cards */}
                <section className="bg-white/[0.02] border-y border-white/5 py-32 relative">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 relative z-10">
                        {[
                            {
                                title: "Sentiment Extraction",
                                desc: "We parse decentralized data rails to extract peer-derived intelligence that traditional models miss.",
                                icon: BarChart3
                            },
                            {
                                title: "Probability Arbitrage",
                                desc: "Identify latency and price discrepancies across prediction platforms with millisecond precision.",
                                icon: TrendingUp
                            },
                            {
                                title: "Collective Intelligence",
                                desc: "Access the wisdom of the crowd through confidence metrics, volatility bands, and conviction mapping.",
                                icon: Users
                            }
                        ].map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-xl bg-black border border-white/5 hover:border-primary/40 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <f.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{f.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Intelligence CTA */}
                <section className="max-w-7xl mx-auto px-6 py-40">
                    <div className="relative overflow-hidden rounded-2xl bg-primary p-12 lg:p-24 text-center space-y-8">
                        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-black leading-none">
                            Ready to Read <br /> the Crowd?
                        </h2>
                        <p className="text-black/70 max-w-xl mx-auto font-bold text-lg">
                            Polyscan delivers the insights you need to win in prediction markets. Join the intelligence revolution.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <button className="px-12 py-5 bg-black text-white font-black uppercase tracking-widest text-xs rounded-sm hover:scale-105 transition-all">
                                Open Intelligence Hub
                            </button>
                            <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-sm hover:scale-105 transition-all">
                                Access Documentation
                            </button>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 -translate-x-16 -translate-y-16 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 translate-x-16 translate-y-16 rounded-full blur-3xl" />
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/5 py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-zinc-600">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <div className="flex items-center gap-2 text-zinc-300">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-black italic tracking-tighter uppercase">Polyscan PROTOCOL</span>
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.3em]">Institutional Strategy Desktop</p>
                    </div>

                    <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest">
                        <a href="#" className="hover:text-primary transition-colors">Manifesto</a>
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3 text-[10px] font-black uppercase tracking-widest">
                        <span>© 2026 OPENDEV LABS</span>
                        <div className="flex gap-4">
                            <Activity className="w-3.5 h-3.5" />
                            <Shield className="w-3.5 h-3.5" />
                            <Globe className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
