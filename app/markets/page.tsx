"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    Search,
    TrendingUp,
    TrendingDown,
    Activity,
    Zap,
    Shield,
    AlertCircle,
    ArrowUpRight,
    PieChart,
    Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const MOCK_MARKETS = [
    {
        id: 1,
        category: "Politics",
        title: "Will the U.S. Fed cut rates in March 2026?",
        probability: 64,
        volume: "$1.2M",
        change: "+5.2%",
        trend: "up"
    },
    {
        id: 2,
        category: "Crypto",
        title: "BTC to hit $150k before December 2025?",
        probability: 32,
        volume: "$4.8M",
        change: "-2.1%",
        trend: "down"
    },
    {
        id: 3,
        category: "Economics",
        title: "UK inflation to stay below 2% in Q3?",
        probability: 78,
        volume: "$800K",
        change: "+0.5%",
        trend: "stable"
    },
    {
        id: 4,
        category: "Technology",
        title: "OpenAI to release GPT-5 before July?",
        probability: 45,
        volume: "$2.1M",
        change: "+12.4%",
        trend: "up"
    }
]

export default function MarketsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px] px-3">
                        Live Markets
                    </Badge>
                    <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Probability <span className="text-primary">Explorer</span>
                    </h1>
                    <p className="text-zinc-500 text-sm max-w-lg">
                        Real-time sentiment indexing across global prediction markets. Analyze crowd-wisdom before placing your trade.
                    </p>
                </div>

                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search markets..."
                        className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-primary/50 text-sm h-11"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Market Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_MARKETS.map((market, index) => (
                    <motion.div
                        key={market.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-[#080808] border border-white/5 hover:border-primary/30 rounded-xl p-6 transition-all shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Accent */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />

                        <div className="relative space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                    {market.category}
                                </span>
                                <div className={`flex items-center gap-1 text-[10px] font-bold ${market.trend === 'up' ? 'text-green-500' :
                                        market.trend === 'down' ? 'text-red-500' : 'text-zinc-500'
                                    }`}>
                                    {market.trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
                                        market.trend === 'down' ? <TrendingDown className="w-3 h-3" /> :
                                            <Activity className="w-3 h-3" />}
                                    {market.change}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-zinc-100 leading-snug min-h-[56px] group-hover:text-white transition-colors">
                                {market.title}
                            </h3>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-zinc-500 font-medium">Market Consensus</span>
                                    <span className="text-primary font-black">{market.probability}% YES</span>
                                </div>
                                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${market.probability}%` }}
                                        className="h-full bg-primary shadow-[0_0_10px_rgba(255,103,43,0.3)]"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase tracking-tighter text-zinc-600 font-black">Volume</span>
                                        <span className="text-xs font-bold text-zinc-300">{market.volume}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase tracking-tighter text-zinc-600 font-black">Liquidity</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-primary' : 'bg-zinc-800'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 text-[10px] font-black uppercase tracking-wider border-white/10 hover:border-primary/50 hover:bg-primary/5 group/btn">
                                    Analyze <ArrowUpRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Active Nodes", value: "1,248", icon: Activity },
                    { label: "Predictive Delta", value: "+14.2%", icon: Zap },
                    { label: "Users Online", value: "8,921", icon: Users },
                    { label: "Logic Accuracy", value: "78.4%", icon: PieChart },
                ].map((stat) => (
                    <div key={stat.label} className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{stat.label}</div>
                            <div className="text-xl font-bold text-white">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
