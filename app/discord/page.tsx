"use strict";

import { Button } from "@/components/ui/button";

export default function DiscordPage() {
    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <header className="h-[44px] border-b border-border flex items-center justify-between px-4 bg-[#050505] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-indigo-400">D</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-[13px] tracking-tight text-white/90">Discord Alerts <span className="text-zinc-600 font-normal mx-1">/</span> <span className="text-zinc-500 font-mono text-[10px]">Hub</span></h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 flex flex-col items-center custom-scrollbar">
                <div className="text-center mb-12 max-w-xl">
                    <h2 className="text-3xl font-black mb-3 text-white tracking-tight">Your Signal Terminal</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        PollyScanner deploys intelligence directly to your Discord server.
                        High-frequency signals, low-latency delivery.
                    </p>
                </div>

                {/* Discord Mockup */}
                <div className="w-full max-w-2xl bg-[#313338] rounded-xl border border-[#1e1f22] shadow-2xl overflow-hidden mb-12 font-sans select-none">
                    {/* Header */}
                    <div className="h-12 border-b border-[#1e1f22] flex items-center px-4 bg-[#2b2d31]">
                        <div className="font-bold text-white/90 text-sm"># crypto-alerts</div>
                        <div className="ml-auto text-xs text-white/30">PollyScanner Server</div>
                    </div>

                    {/* Messages */}
                    <div className="p-4 space-y-6">
                        {/* Message 1 */}
                        <div className="flex gap-4 group hover:bg-[#2e3035] -mx-4 px-4 py-2 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-xl shrink-0 text-white font-bold shadow-lg">S</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-white hover:underline cursor-pointer">PollyScanner Bot</span>
                                    <span className="text-[10px] bg-[#5865F2] px-1.5 py-0.5 rounded-[4px] text-white uppercase font-bold leading-none tracking-wide">APP</span>
                                    <span className="text-xs text-white/40 font-medium">Today at 10:42 AM</span>
                                </div>
                                <div className="text-white/90 bg-[#2b2d31] p-3 rounded-md border-l-4 border-primary max-w-md shadow-sm">
                                    <div className="font-bold mb-2 text-primary flex items-center gap-2">
                                        <span>🚨</span> VWAP Breakout Detected
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                                        <div className="text-white/50">Asset:</div>
                                        <div className="font-mono text-white">BTC/USDT</div>

                                        <div className="text-white/50">Price:</div>
                                        <div className="font-mono text-white">$44,250.00</div>

                                        <div className="text-white/50">Volume:</div>
                                        <div className="font-mono text-yellow-400">2.5x Avg</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message 2 */}
                        <div className="flex gap-4 opacity-60 group hover:opacity-100 hover:bg-[#2e3035] -mx-4 px-4 py-2 transition-all">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-xl shrink-0 text-white font-bold shadow-lg">S</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-white hover:underline cursor-pointer">PollyScanner Bot</span>
                                    <span className="text-[10px] bg-[#5865F2] px-1.5 py-0.5 rounded-[4px] text-white uppercase font-bold leading-none tracking-wide">APP</span>
                                    <span className="text-xs text-white/40 font-medium">Today at 9:15 AM</span>
                                </div>
                                <div className="text-white/90 bg-[#2b2d31] p-3 rounded-md border-l-4 border-red-500 max-w-md shadow-sm">
                                    <div className="font-bold mb-2 text-red-400 flex items-center gap-2">
                                        <span>🔻</span> RSI Overbought Reversal
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                                        <div className="text-white/50">Asset:</div>
                                        <div className="font-mono text-white">SOL/USDT</div>

                                        <div className="text-white/50">Price:</div>
                                        <div className="font-mono text-white">$108.20</div>

                                        <div className="text-white/50">RSI:</div>
                                        <div className="font-mono text-red-400">78 (Div)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <a
                    href="https://discord.com/oauth2/authorize?client_id=1460333588431114301&permissions=2684354592&scope=bot%20applications.commands"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                >
                    <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold h-10 px-8 rounded-sm">
                        Deploy Interaction Agent
                    </Button>
                </a>
                <p className="text-[10px] text-zinc-600 mt-4 uppercase tracking-widest font-mono">
                    Requires Webhook Authorization
                </p>
            </main>
        </div>
    )
}
