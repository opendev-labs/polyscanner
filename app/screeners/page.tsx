"use client"

import { useState, useEffect, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    TrendingUp,
    BarChart3,
    Activity,
    ArrowUpRight,
    Zap,
    Target,
    Waves,
    LineChart,
    Lock,
    Cpu,
    Filter,
    Search,
    Clock,
    Percent,
    Play,
    LayoutGrid,
    List
} from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

interface Screener {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    timeframe: string
    winRate: number
    frequency: "High" | "Medium" | "Low"
    premium: boolean
    tags: string[]
}

const screenerCatalog: Screener[] = [
    {
        id: "probability-spike",
        title: "Probability Spike Radar",
        description: "Detects rapid shifts in event odds (±15% in <1h) that signal insider movement or breaking news.",
        icon: <Zap className="w-5 h-5 text-orange-500" />,
        timeframe: "1h",
        winRate: 72,
        frequency: "High",
        premium: false,
        tags: ["Volatility", "Momentum"]
    },
    {
        id: "sentiment-divergence",
        title: "Sentiment Shift Detector",
        description: "Identifies divergence between crowd volume and price movement. Predicts exhaustion or reversals.",
        icon: <Waves className="w-5 h-5 text-blue-400" />,
        timeframe: "4h",
        winRate: 68,
        frequency: "Medium",
        premium: false,
        tags: ["Sentiment", "Crowd"]
    },
    {
        id: "confidence-delta",
        title: "Crowd Conviction Tracker",
        description: "Measures the 'hardness' of a price level based on trade size and frequency of odds changes.",
        icon: <Activity className="w-5 h-5 text-purple-400" />,
        timeframe: "1d",
        winRate: 84,
        frequency: "Low",
        premium: true,
        tags: ["Conviction", "Volume"]
    },
    {
        id: "prediction-arbitrage",
        title: "Cross-Market Arbitrage",
        description: "Scans multiple prediction platforms to find price discrepancies for the same event outcome.",
        icon: <Target className="w-5 h-5 text-red-500" />,
        timeframe: "Real-time",
        winRate: 76,
        frequency: "High",
        premium: true,
        tags: ["Arbitrage", "DeFi"]
    },
    {
        id: "event-volatility",
        title: "Event Horizon Scanner",
        description: "Identifies markets with upcoming resolution dates and high implied volatility.",
        icon: <BarChart3 className="w-5 h-5 text-yellow-500" />,
        timeframe: "12h",
        winRate: 64,
        frequency: "Medium",
        premium: false,
        tags: ["Events", "Volatility"]
    }
]

export default function Screeners() {
    const [activeScreeners, setActiveScreeners] = useState<string[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterTimeframe, setFilterTimeframe] = useState<string | null>(null)
    const [filterPremium, setFilterPremium] = useState<boolean | null>(null)
    const [viewMode, setViewMode] = useState<"card" | "list">("card")

    // Load state
    useEffect(() => {
        const saved = localStorage.getItem("polyscan_active_screeners") || localStorage.getItem("scantrade_active_screeners")
        if (saved) {
            setActiveScreeners(JSON.parse(saved))
        }
        setIsLoaded(true)
    }, [])

    const toggleScreener = (id: string) => {
        let newActive: string[]
        if (activeScreeners.includes(id)) {
            newActive = activeScreeners.filter(s => s !== id)
            toast.info("Screener Deactivated")
        } else {
            newActive = [...activeScreeners, id]
            toast.success("Screener Activated & Scanning")
        }
        setActiveScreeners(newActive)
        localStorage.setItem("polyscan_active_screeners", JSON.stringify(newActive))
    }

    const filteredScreeners = useMemo(() => {
        return screenerCatalog.filter(s => {
            const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesTimeframe = filterTimeframe ? s.timeframe === filterTimeframe : true
            const matchesPremium = filterPremium !== null ? s.premium === filterPremium : true
            return matchesSearch && matchesTimeframe && matchesPremium
        })
    }, [searchQuery, filterTimeframe, filterPremium])

    if (!isLoaded) return null

    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            {/* Header / Stats Bar - Styled like a Postman Toolbar */}
            <header className="border-b border-border bg-[#050505] px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-sm border border-primary/20">
                        <Cpu className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-bold text-sm tracking-tight text-white/90">Active Intelligence</h1>
                        <p className="text-[10px] text-zinc-500 font-mono tracking-tighter">{activeScreeners.length} Models Encaged</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-[9px] uppercase text-zinc-600 font-bold tracking-wider">Est. Signals</div>
                            <div className="text-sm font-mono font-bold text-primary">{activeScreeners.length * 4 + 12}/d</div>
                        </div>
                        <div className="w-px h-6 bg-border"></div>
                        <div className="text-right">
                            <div className="text-[9px] uppercase text-zinc-600 font-bold tracking-wider">Avg Win Rate</div>
                            <div className="text-sm font-mono font-bold text-zinc-300">72.4%</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                {/* Filters & Controls - Postman Sidebar style */}
                <div className="flex flex-col md:flex-row gap-2 mb-4 items-start md:items-center justify-between">
                    <div className="relative w-full md:w-64 group">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Filter models..."
                            className="pl-8 bg-[#050505] border-border h-8 w-full focus:bg-[#141414] focus:border-primary/50 text-[12px] placeholder:text-zinc-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-1.5 w-full md:w-auto items-center">
                        <div className="bg-[#050505] p-0.5 rounded-sm border border-border flex gap-0.5 mr-2">
                            <button
                                onClick={() => setViewMode("card")}
                                className={`p-1 rounded-sm transition-all ${viewMode === 'card' ? 'bg-primary text-[#050505]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-1 rounded-sm transition-all ${viewMode === 'list' ? 'bg-primary text-[#050505]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}
                            >
                                <List className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="w-px h-5 bg-border mx-1 hidden md:block"></div>
                        {['5m', '15m', '1h', '4h'].map(tf => (
                            <button
                                key={tf}
                                onClick={() => setFilterTimeframe(filterTimeframe === tf ? null : tf)}
                                className={`px-2 py-1 rounded-sm text-[10px] font-mono font-bold border transition-all ${filterTimeframe === tf
                                    ? "bg-primary/10 text-primary border-primary/50"
                                    : "bg-transparent text-zinc-500 border-border hover:border-zinc-700 hover:text-zinc-300"
                                    }`}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className={viewMode === 'card' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "flex flex-col gap-2"}>
                    <AnimatePresence mode="popLayout">
                        {filteredScreeners.map((s) => {
                            const isActive = activeScreeners.includes(s.id)
                            return (
                                <motion.div
                                    key={s.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className={`group relative rounded-sm border transition-all overflow-hidden ${isActive
                                        ? "bg-[#FF6C37]/5 border-[#FF6C37]/30 shadow-md"
                                        : "bg-[#050505] border-[#222222] hover:border-[#404040] hover:bg-[#252525]"
                                        } ${viewMode === 'list' ? 'flex flex-row items-center p-2 gap-4' : 'p-3 flex flex-col h-full'}`}
                                >
                                    {isActive && <div className={`absolute bg-[#FF6C37] ${viewMode === 'list' ? 'left-0 top-0 bottom-0 w-[3px]' : 'top-0 left-0 right-0 h-[3px]'}`}></div>}

                                    {/* Header Section */}
                                    <div className={`flex items-start gap-3 ${viewMode === 'list' ? 'flex-1 items-center' : 'mb-4'}`}>
                                        <div className={`p-2 rounded-sm border transition-colors shrink-0 ${isActive ? "bg-[#FF6C37]/10 border-[#FF6C37]/20" : "bg-[#141414] border-[#404040] group-hover:bg-[#353535]"
                                            }`}>
                                            {s.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-[13px] flex items-center gap-1.5 truncate text-white/90">
                                                {s.title}
                                                {s.premium && <Lock className="w-3 h-3 text-amber-500" />}
                                            </h3>
                                            {viewMode === 'card' && (
                                                <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
                                                    {s.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Compact Stats for List View */}
                                    {viewMode === 'list' && (
                                        <div className="flex items-center gap-6 mr-4">
                                            <div className="w-16">
                                                <div className="text-[9px] text-zinc-600 uppercase font-bold tracking-wider mb-0.5">TF</div>
                                                <div className="font-mono text-[11px] text-zinc-400">{s.timeframe}</div>
                                            </div>
                                            <div className="w-16">
                                                <div className="text-[9px] text-zinc-600 uppercase font-bold tracking-wider mb-0.5">Win Rate</div>
                                                <div className="font-mono text-[11px] text-primary font-bold">{s.winRate}%</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats Grid for Card View */}
                                    {viewMode === 'card' && (
                                        <div className="grid grid-cols-2 gap-1.5 mb-4 mt-auto">
                                            <div className="bg-black/10 rounded-sm p-1.5 border border-white/5">
                                                <div className="text-[9px] text-zinc-600 uppercase font-bold tracking-wider mb-0.5">Timeframe</div>
                                                <div className="font-mono text-[11px] text-zinc-400 font-medium">{s.timeframe}</div>
                                            </div>
                                            <div className="bg-black/10 rounded-sm p-1.5 border border-white/5">
                                                <div className="text-[9px] text-zinc-600 uppercase font-bold tracking-wider mb-0.5">Win Rate</div>
                                                <div className="font-mono text-[11px] text-[#22c55e] font-bold">{s.winRate}%</div>
                                            </div>
                                            <div className="bg-black/10 rounded-sm p-1.5 border border-white/5">
                                                <div className="text-[9px] text-zinc-600 uppercase font-bold tracking-wider mb-0.5">Frequency</div>
                                                <div className="font-mono text-[11px] text-zinc-400">{s.frequency}</div>
                                            </div>
                                            <div className="bg-black/10 rounded-sm p-1.5 border border-white/5">
                                                <div className="text-[9px] text-zinc-600 uppercase font-bold tracking-wider mb-0.5">Status</div>
                                                <div className={`font-mono text-[9px] font-bold mt-0.5 ${isActive ? 'text-primary' : 'text-zinc-600'}`}>
                                                    {isActive ? 'ACTIVE' : 'OFFLINE'}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <div className={viewMode === 'list' ? "shrink-0" : "mt-auto"}>
                                        <Button
                                            variant={isActive ? "outline" : "default"}
                                            size="sm"
                                            className={`w-full font-bold transition-all ${isActive
                                                ? "border-[#FF6C37]/30 text-[#FF6C37] hover:bg-[#FF6C37]/10"
                                                : "bg-primary text-[#050505] hover:bg-[#FF5511]"
                                                }`}
                                            onClick={() => toggleScreener(s.id)}
                                        >
                                            {isActive ? (
                                                <div className="flex items-center gap-1.5">
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                                                    </span>
                                                    Active
                                                </div>
                                            ) : (
                                                "Deploy"
                                            )}
                                        </Button>
                                    </div>

                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                {filteredScreeners.length === 0 && (
                    <div className="text-center py-32 text-zinc-600">
                        <Filter className="w-16 h-16 mx-auto mb-6 opacity-20" />
                        <p className="text-lg font-medium">No algorithms match your search.</p>
                        <Button variant="link" onClick={() => { setSearchQuery(""); setFilterTimeframe(null); setFilterPremium(null) }} className="text-orange-500 mt-2">
                            Reset Filters
                        </Button>
                    </div>
                )}
            </main>
        </div>
    )
}
