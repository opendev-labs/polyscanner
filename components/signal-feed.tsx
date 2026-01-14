"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal, ArrowRight, Activity, CheckCircle2 } from "lucide-react"

export interface SignalItem {
    time: string
    source: string
    symbol: string
    signal: string
    status: "sent" | "pending"
}

interface SignalFeedProps {
    signals: SignalItem[]
    isScanning: boolean
}

export function SignalFeed({ signals, isScanning }: SignalFeedProps) {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [signals])

    return (
        <div className="w-full h-full flex flex-col bg-zinc-950 border-t border-white/5 font-mono text-xs">
            {/* Header / StatusBar */}
            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
                <div className="flex items-center gap-2 text-white/40">
                    <Terminal className="w-3 h-3" />
                    <span className="font-bold tracking-widest uppercase text-[10px]">Signal Activity Feed</span>
                </div>
                <div className="flex items-center gap-2">
                    {isScanning && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                            <span className="text-[9px] text-emerald-400 font-bold uppercase">Scanning Node...</span>
                        </div>
                    )}
                    <span className="text-[10px] text-white/20">v2.1.0</span>
                </div>
            </div>

            {/* Log Area */}
            <ScrollArea className="flex-1 p-2">
                <div className="space-y-1">
                    {signals.length === 0 && (
                        <div className="text-white/20 italic p-4 text-center">
                            // Waiting for signals...<br />
                            // Connect a Sheet and click "Scan Network"
                        </div>
                    )}

                    {signals.map((sig, i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-1.5 rounded hover:bg-white/5 transition-colors group">
                            <span className="text-white/30 w-16 shrink-0">{sig.time}</span>

                            <div className="flex items-center gap-1.5 text-cyan-400 w-24 shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                                {sig.source}
                            </div>

                            <div className="flex items-center gap-2 flex-1">
                                <span className="font-bold text-white text-yellow-400">{sig.symbol}</span>
                                <ArrowRight className="w-3 h-3 text-white/20" />
                                <span className={sig.signal.includes("BUY") ? "text-emerald-400" : "text-rose-400"}>
                                    {sig.signal}
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-white/20 group-hover:text-emerald-400 transition-colors">
                                <span className="text-[9px] uppercase tracking-wider">{sig.status}</span>
                                <CheckCircle2 className="w-3 h-3" />
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>
        </div>
    )
}
