"use client"

import { useState, useEffect } from "react"
import TradingViewWidget from "@/components/tradingview-widget"
import { MissionControl } from "@/components/mission-control"
import { Button } from "@/components/ui/button"
import { ExternalLink, RefreshCw, Terminal } from "lucide-react"
import { toast } from "sonner"

export default function MasterPage() {
    // Config State
    const [sheetId, setSheetId] = useState("1CStqiA404-7jfAV_wwcZMVy_pXLEDe2r8xj1XRdA-dg")
    const [symbol, setSymbol] = useState("BTCUSDT")

    // Load initial state
    useEffect(() => {
        const savedSheet = localStorage.getItem("polyscan_sheet_id") || localStorage.getItem("scantrade_sheet_id")
        const savedSymbol = localStorage.getItem("polyscan_symbol") || localStorage.getItem("scantrade_symbol")
        if (savedSheet) setSheetId(savedSheet)
        if (savedSymbol) setSymbol(savedSymbol)
    }, [])

    const handleConfigChange = (config: { sheetId: string, symbol: string }) => {
        setSheetId(config.sheetId)
        setSymbol(config.symbol)
    }

    // Scanner State
    const [scanResults, setScanResults] = useState<any[]>([])

    // Load initial state and poll for updates
    useEffect(() => {
        const loadScanResults = () => {
            const saved = localStorage.getItem("polyscan_latest_scan") || localStorage.getItem("scantrade_latest_scan")
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    setScanResults(parsed)
                } catch (e) {
                    console.error("Failed to parse scan results", e)
                }
            }
        }

        loadScanResults()
        const interval = setInterval(loadScanResults, 2000) // Poll every 2s
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            {/* Main Navigation */}
            {/* Main Navigation - Removed (Global) */}

            {/* Sub-Header / Tool Bar - Postman Style */}
            <div className="h-[44px] border-b border-border bg-[#050505] flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-sm flex items-center justify-center border border-primary/20">
                            <Terminal className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <h1 className="text-sm font-bold tracking-tight text-white/90">
                            Master View <span className="text-zinc-600 font-normal mx-1">/</span> <span className="text-zinc-400 font-mono text-[11px]">{symbol}</span>
                        </h1>
                    </div>

                    <div className="h-4 w-px bg-border mx-1" />

                    <div className="hidden md:flex items-center gap-2">
                        <div className="px-1.5 py-0.5 rounded-sm bg-primary/5 border border-primary/10 flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-primary animate-pulse shadow-[0_0_5px_var(--primary)]" />
                            <span className="text-[9px] font-bold text-primary/80 uppercase tracking-widest">Live Engine</span>
                        </div>
                        {scanResults.length > 0 && (
                            <div className="px-1.5 py-0.5 rounded-sm bg-zinc-800 border border-border flex items-center gap-2">
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{scanResults.length} Signals</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <MissionControl onConfigChange={handleConfigChange} />

                    <Button
                        size="sm"
                        variant="secondary"
                        className="hidden sm:flex h-7 px-3 text-[11px]"
                        onClick={() => window.open(`https://docs.google.com/spreadsheets/d/${sheetId}/edit`, '_blank')}
                    >
                        <ExternalLink className="w-3 h-3 mr-1.5 text-zinc-500" />
                        Open Data
                    </Button>

                    <Button
                        size="sm"
                        className="hidden sm:flex h-7 px-3 text-[11px] font-bold"
                    >
                        <RefreshCw className="w-3 h-3 mr-1.5" />
                        Sync
                    </Button>
                </div>
            </div>

            {/* Main Content: Split View */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: TradingView Chart */}
                <div className="flex-1 border-r border-border relative bg-background">
                    <TradingViewWidget symbol={symbol} />
                </div>

                {/* Right: Google Sheet Execution Terminal + Live Scanner Feed */}
                <div className="w-1/2 md:w-[45%] lg:w-[40%] flex flex-col bg-background">

                    {/* Top Half: Sheet Terminal */}
                    <div className="h-1/2 flex flex-col border-b border-border">
                        <div className="h-8 border-b border-border bg-[#050505] flex items-center justify-between px-3 shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Execution Terminal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono text-primary/60">CONNECTED</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-white">
                            <iframe
                                src={`https://docs.google.com/spreadsheets/d/${sheetId}/edit?rm=minimal`}
                                className="w-full h-full border-none"
                                title="Google Sheet Execution Terminal"
                            />
                        </div>
                    </div>

                    {/* Bottom Half: Live Scanner Feed */}
                    <div className="h-1/2 flex flex-col bg-transparent">
                        <div className="h-8 border-b border-border bg-[#050505] flex items-center justify-between px-3 shrink-0">

                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded bg-primary/10">
                                    <Terminal className="w-3 h-3 text-primary" />
                                </div>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Signal Stream</span>
                            </div>
                            {scanResults.length > 0 && (
                                <span className="text-[9px] font-mono text-primary animate-pulse">STREAMING</span>
                            )}
                        </div>
                        <div className="flex-1 overflow-y-auto p-0">
                            {scanResults.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/20">
                                    <Terminal className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-xs">No active signals.</p>
                                    <p className="text-[10px]">Run a scan in "Sheets" page.</p>
                                </div>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[10px] uppercase text-white/40 sticky top-0 bg-[#0a0a0a]">
                                            <th className="p-2 font-medium">Symbol</th>
                                            <th className="p-2 font-medium">Condition</th>
                                            <th className="p-2 font-medium text-right">Price</th>
                                            <th className="p-2 font-medium text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scanResults.map((row, i) => (
                                            <tr key={i} className="border-b border-white/5 text-xs hover:bg-white/5 transition-colors">
                                                <td className="p-2 font-bold text-white">{row.symbol}</td>
                                                <td className="p-2 font-mono text-emerald-400">{row.condition}</td>
                                                <td className="p-2 text-right font-mono text-white/70">{row.price}</td>
                                                <td className="p-2 text-right">
                                                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${row.status === 'SENT' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
