import { ShieldCheck, EyeOff } from "lucide-react";

export default function Privacy() {
    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <header className="h-[44px] border-b border-border flex items-center justify-between px-4 bg-[#050505] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-zinc-500/10 border border-zinc-500/20 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-[13px] tracking-tight text-white/90">Privacy Policy <span className="text-zinc-600 font-normal mx-1">/</span> <span className="text-zinc-500 font-mono text-[10px]">v1.0</span></h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-12 flex flex-col items-center custom-scrollbar">
                <div className="max-w-2xl w-full">
                    <div className="mb-12 border-b border-border pb-8">
                        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic mb-2">Intelligence Privacy</h2>
                        <p className="text-zinc-500 text-sm italic">Data sovereignty and non-custodial operations.</p>
                    </div>

                    <div className="space-y-10">
                        <section>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                <EyeOff className="w-3.5 h-3.5" /> 1. Data Collection
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                We collect minimal data required to provide the service: your Discord User ID (for alerts) and generic usage analytics (page views). We do not collect personal financial data or brokerage login credentials.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">2. Google Sheets Access</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                When utilizing the Google Sheets integration, the script runs entirely within your own Google account. We do not have access to your private spreadsheet data unless you explicitly share it for support purposes.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">3. Data Sharing</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">4. Security</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access.
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
