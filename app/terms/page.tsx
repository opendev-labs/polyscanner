import { FileText, ShieldAlert } from "lucide-react";

export default function Terms() {
    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <header className="h-[44px] border-b border-border flex items-center justify-between px-4 bg-[#050505] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-zinc-500/10 border border-zinc-500/20 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-[13px] tracking-tight text-white/90">Terms of Service <span className="text-zinc-600 font-normal mx-1">/</span> <span className="text-zinc-500 font-mono text-[10px]">v1.0</span></h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-12 flex flex-col items-center custom-scrollbar">
                <div className="max-w-2xl w-full">
                    <div className="mb-12 border-b border-border pb-8">
                        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic mb-2">Legal Infrastructure</h2>
                        <p className="text-zinc-500 text-sm italic">Standard operating procedures and accountability framework.</p>
                    </div>

                    <div className="space-y-10">
                        <section>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                <ShieldAlert className="w-3.5 h-3.5" /> 1. Educational Purpose Only
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                PollyScanner is a software tool for market analysis and alerts. It does not provide financial advice, investment recommendations, or trading signals that guarantee profit. You are solely responsible for your trading decisions.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">2. No Automated Execution</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                The software is strictly prohibited from being modified to perform automated trade execution. We provide alerts; the execution is manual and at the user's discretion.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">3. Limitation of Liability</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                PollyScanner and its developers are not liable for any financial losses incurred while using this software. Markets are volatile and software can experience delays or errors.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">4. Usage Rights</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                You are granted a limited, personal, non-transferable license to use the software. You agree not to resell or redistribute the source code or access credentials.
                            </p>
                        </section>
                    </div>

                    <div className="mt-20 pt-8 border-t border-border text-center">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-mono font-bold">
                            End of Specification / Last Updated January 2026
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
