import { Button } from "@/components/ui/button";
import { CreditCard, Check, Zap, ZapOff } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <header className="h-[44px] border-b border-border flex items-center justify-between px-4 bg-[#050505] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <CreditCard className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-bold text-[13px] tracking-tight text-white/90">Pricing <span className="text-zinc-600 font-normal mx-1">/</span> <span className="text-zinc-500 font-mono text-[10px]">Tiers</span></h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 flex flex-col items-center custom-scrollbar">
                <div className="text-center mb-12 max-w-xl">
                    <h2 className="text-3xl font-black mb-3 text-white tracking-tight uppercase italic">Access Tiers</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        Start for free. Scale with high-frequency intelligence.
                    </p>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                    {/* Free Tier */}
                    <div className="p-8 rounded-sm bg-[#050505] border border-border flex flex-col shadow-xl">
                        <div className="mb-6">
                            <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Starter</span>
                            <div className="text-4xl font-black mt-2 text-white">Free</div>
                            <p className="text-zinc-500 text-xs mt-2 italic">Standard latency execution.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium"><ZapOff className="w-4 h-4 text-zinc-500" /> <span>3 Standard Screeners</span></li>
                            <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium"><Check className="w-4 h-4 text-primary" /> <span>15m Alert Delay</span></li>
                            <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium"><Check className="w-4 h-4 text-primary" /> <span>Community Support</span></li>
                        </ul>

                        <Button variant="outline" className="w-full border-border hover:bg-white/5 h-10 rounded-sm font-bold text-xs uppercase tracking-widest" asChild>
                            <Link href="/discord">Join Infrastructure</Link>
                        </Button>
                    </div>

                    {/* Pro Tier */}
                    <div className="p-8 rounded-sm bg-[#050505] border border-primary/30 flex flex-col relative overflow-hidden shadow-2xl ring-1 ring-primary/20">
                        <div className="absolute top-0 right-0 bg-primary text-[#050505] text-[9px] font-black px-3 py-1 uppercase tracking-tighter">Recommended</div>
                        <div className="mb-6">
                            <span className="text-[10px] font-black tracking-widest text-primary uppercase">Pro Trader</span>
                            <div className="text-4xl font-black mt-2 text-white">$29<span className="text-lg text-zinc-600 font-normal">/mo</span></div>
                            <p className="text-zinc-500 text-xs mt-2 italic">Low-latency intelligence stream.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium"><Zap className="w-4 h-4 text-primary animate-pulse" /> <span>Unlimited Screeners</span></li>
                            <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium"><Check className="w-4 h-4 text-primary" /> <span>Instant Alerts (0 delay)</span></li>
                            <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium"><Check className="w-4 h-4 text-primary" /> <span>Custom Sheet Logic</span></li>
                            <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium"><Check className="w-4 h-4 text-primary" /> <span>Priority Channel Access</span></li>
                        </ul>

                        <Button className="w-full bg-primary hover:bg-[#FF5511] text-[#050505] font-bold h-10 rounded-sm text-xs uppercase tracking-widest">
                            Authorize Pro Stream
                        </Button>
                        <p className="text-center text-[9px] text-zinc-600 mt-3 uppercase tracking-widest font-mono">Verified Secure Billing</p>
                    </div>
                </div>

                <div className="mt-16 text-center text-zinc-600 text-[10px] uppercase tracking-[0.2em] max-w-lg leading-loose">
                    Non-Custodial Service / Professional Software / Crypto-Ready
                </div>

            </main>
        </div>
    )
}
