import { ChevronRight, Home, Layout, Search, Bell, History, User, PanelLeft, LogOut, Zap, Beaker } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface TopHeaderProps {
    onToggleSidebar?: () => void
    isSidebarVisible?: boolean
}

export function TopHeader({ onToggleSidebar, isSidebarVisible }: TopHeaderProps) {
    const { user, signOut } = useAuth()
    const [mode, setMode] = useState<"classic" | "intelligence">("intelligence")

    useEffect(() => {
        const savedMode = localStorage.getItem("polyscan_active_mode") as "classic" | "intelligence"
        if (savedMode) setMode(savedMode)
    }, [])

    const toggleMode = () => {
        const newMode = mode === "classic" ? "intelligence" : "classic"
        setMode(newMode)
        localStorage.setItem("polyscan_active_mode", newMode)
        toast.info(`Switched to ${newMode.toUpperCase()} mode`)
        // In a real app, this would trigger a context update or page refresh
        window.dispatchEvent(new Event('polyscan-mode-change'))
    }

    return (
        <header className="h-[44px] bg-[#0A0A0A] border-b border-border flex items-center px-3 justify-between select-none z-50">
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className={`p-1.5 rounded-sm hover:bg-white/5 transition-colors ${!isSidebarVisible ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                    title="Toggle Sidebar (Ctrl+B)"
                >
                    <PanelLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors" onClick={toggleMode}>
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center transition-colors ${mode === 'intelligence' ? 'bg-primary' : 'bg-zinc-700'}`}>
                        {mode === 'intelligence' ? <Zap className="w-2.5 h-2.5 text-black" /> : <span className="text-[10px] font-black text-white">S</span>}
                    </div>
                    <span className="text-xs font-bold text-zinc-300">{mode === 'intelligence' ? 'Polyscan Intelligence' : 'ScanTrade Classic'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </div>

                <div className="h-4 w-[1px] bg-white/10" />

                <div className="flex items-center gap-2 text-zinc-500">
                    <Home className="w-3.5 h-3.5 hover:text-zinc-300 cursor-pointer" />
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[12px] text-zinc-400 font-medium">{mode === 'intelligence' ? 'Probability Node' : 'Dashboard'}</span>
                </div>
            </div>

            <div className="flex-1 max-w-[400px] px-6">
                <div className="relative group">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Polyscan"
                        className="w-full bg-[#141414] border border-border/50 rounded-full py-1 pl-8 pr-3 text-[12px] text-zinc-300 placeholder:text-zinc-800 outline-none focus:border-border focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-2 text-zinc-500 border-r border-border/50 pr-4">
                    <History className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                    <Bell className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                </div>

                <div className="flex items-center gap-3 pl-1">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                                <span className="text-[11px] font-bold text-zinc-200 leading-none">{user.displayName || user.email}</span>
                                <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Pro</span>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="p-1.5 rounded-full bg-white/5 border border-white/5 hover:border-red-500/50 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 transition-all group"
                                title="Sign Out"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-all">
                            <User className="w-4 h-4 text-zinc-400" />
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
