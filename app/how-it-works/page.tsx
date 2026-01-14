import { ArrowDown, Database, FileSpreadsheet, Activity, Bell, Info } from "lucide-react";

const steps = [
    {
        title: "1. Market Data",
        description: "PollyScanner monitors real-time price and volume data from major exchanges via TradingView logic.",
        icon: <Database className="w-6 h-6 text-blue-400" />
    },
    {
        title: "2. Google Sheets Logic",
        description: "Data hits your private Google Sheet. Simple formulas (e.g. IF(PRICE > VWAP)) check your rules.",
        icon: <FileSpreadsheet className="w-6 h-6 text-green-400" />
    },
    {
        title: "3. Signal Detection",
        description: "When a rule is met, the Sheet marks the row as 'PENDING' and triggers the alert script.",
        icon: <Activity className="w-6 h-6 text-purple-400" />
    },
    {
        title: "4. Discord Alert",
        description: "Our bot instantly posts the signal to your Discord server. You get a notification on your phone.",
        icon: <Bell className="w-6 h-6 text-yellow-400" />
    },
    {
        title: "5. You Trade",
        description: "You open your broker app and verify the chart. If you like the setup, you take the trade manually.",
        icon: <div className="text-xl font-bold text-white">🫵</div>
    }
];

export default function HowItWorks() {
    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <header className="h-[44px] border-b border-border flex items-center justify-between px-4 bg-[#050505] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Info className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-bold text-[13px] tracking-tight text-white/90">How it Works <span className="text-zinc-600 font-normal mx-1">/</span> <span className="text-zinc-500 font-mono text-[10px]">Architecture</span></h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 flex flex-col items-center custom-scrollbar">
                <div className="text-center mb-12 max-w-xl">
                    <h2 className="text-3xl font-black mb-3 text-white tracking-tight italic uppercase">The Anatomy of a Trade</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        A transparent, non-custodial pipeline from institutional data to your mobile device.
                        <br /> <span className="text-primary font-bold">No black boxes. No hidden logic.</span>
                    </p>
                </div>

                <div className="relative max-w-xl w-full">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden sm:block"></div>

                    <div className="space-y-12 relative">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-6 items-start relative group">
                                {/* Icon Bubble */}
                                <div className="relative z-10 w-16 h-16 rounded-sm bg-[#050505] border border-border flex items-center justify-center shrink-0 shadow-xl group-hover:border-primary/50 transition-colors">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <div className="pt-2">
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{step.description}</p>
                                </div>

                                {/* Connector Arrow (Mobile hidden) */}
                                {i !== steps.length - 1 && (
                                    <div className="absolute left-8 top-16 w-px h-12 flex items-center justify-center sm:hidden">
                                        <ArrowDown className="w-4 h-4 text-white/20" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 p-4 rounded-sm bg-primary/5 border border-primary/20 text-center max-w-lg">
                    <h4 className="text-primary font-bold mb-2 uppercase tracking-widest text-[10px]">Technical Note</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                        PollyScanner <span className="font-bold underline">does not</span> execute orders automatically.
                        We provide intelligence; the final execution decision remains manual and user-controlled.
                    </p>
                </div>

            </main>
        </div>
    )
}
