"use client"

import { useState } from "react"
import {
    Settings,
    Database,
    Cloud,
    Bot,
    Key,
    Save,
    CheckCircle2,
    AlertTriangle,
    Terminal,
    Shield,
    Globe,
    Cpu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function SettingsPage() {
    // State for various config sections
    const [googleSheetId, setGoogleSheetId] = useState("1CStqiA404-7jfAV_wwcZMVy_pXLEDe2r8xj1XRdA-dg")
    const [vercelToken, setVercelToken] = useState("")
    const [geminiKey, setGeminiKey] = useState("")
    const [cloudConsoleId, setCloudConsoleId] = useState("")

    const handleSave = (section: string) => {
        toast.success(`${section} Settings Saved Locally`)
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            {/* Header */}
            <div className="h-16 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between px-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">Settings Hub</h1>
                        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">System Configuration & Integrations</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Environment: Production</span>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-8 py-12 max-w-6xl">
                <Tabs defaultValue="integrations" className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation for Settings */}
                    <TabsList className="flex md:flex-col h-auto bg-transparent space-y-2 justify-start w-full md:w-64 p-0">
                        <TabsTrigger
                            value="integrations"
                            className="w-full justify-start px-4 py-3 data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-indigo-500 rounded-none transition-all"
                        >
                            <Database className="w-4 h-4 mr-3 text-zinc-400" />
                            Integrations
                        </TabsTrigger>
                        <TabsTrigger
                            value="ai"
                            className="w-full justify-start px-4 py-3 data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-emerald-500 rounded-none transition-all"
                        >
                            <Bot className="w-4 h-4 mr-3 text-zinc-400" />
                            AI Models (Gemini)
                        </TabsTrigger>
                        <TabsTrigger
                            value="cloud"
                            className="w-full justify-start px-4 py-3 data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-blue-500 rounded-none transition-all"
                        >
                            <Cloud className="w-4 h-4 mr-3 text-zinc-400" />
                            Cloud Console
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="w-full justify-start px-4 py-3 data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white data-[state=active]:border-l-2 data-[state=active]:border-red-500 rounded-none transition-all"
                        >
                            <Shield className="w-4 h-4 mr-3 text-zinc-400" />
                            Security & Keys
                        </TabsTrigger>
                    </TabsList>

                    {/* Content Area */}
                    <div className="flex-1 min-h-[500px]">

                        {/* Integrations Tab */}
                        <TabsContent value="integrations" className="space-y-6 mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-white/5 space-y-6">
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div className="p-3 rounded-lg bg-green-500/10">
                                        <Database className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold">Google Sheets Integration</h2>
                                        <p className="text-sm text-zinc-500">Connect your trading logic spreadsheet.</p>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label>Sheet ID</Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Terminal className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                                <Input
                                                    value={googleSheetId}
                                                    onChange={(e) => setGoogleSheetId(e.target.value)}
                                                    className="pl-10 bg-[#0a0a0a] border-white/10 font-mono text-sm"
                                                />
                                            </div>
                                            <Button onClick={() => handleSave("Sheets")} className="bg-white text-black hover:bg-zinc-200 font-bold">
                                                <Save className="w-4 h-4 mr-2" /> Save
                                            </Button>
                                        </div>
                                        <p className="text-xs text-zinc-600">
                                            Found in URL: docs.google.com/spreadsheets/d/<strong>[ID]</strong>/edit
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-white/5 space-y-6">
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div className="p-3 rounded-lg bg-black">
                                        <svg viewBox="0 0 1155 1000" className="w-6 h-6 text-white fill-current">
                                            <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold">Vercel Environment</h2>
                                        <p className="text-sm text-zinc-500">Deployment and environment variable configuration.</p>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label>Vercel Auth Token</Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Key className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                                <Input
                                                    type="password"
                                                    value={vercelToken}
                                                    onChange={(e) => setVercelToken(e.target.value)}
                                                    placeholder="vc_..."
                                                    className="pl-10 bg-[#0a0a0a] border-white/10 font-mono text-sm"
                                                />
                                            </div>
                                            <Button onClick={() => handleSave("Vercel")} className="bg-white text-black hover:bg-zinc-200 font-bold">
                                                <Save className="w-4 h-4 mr-2" /> Save
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* AI Tab */}
                        <TabsContent value="ai" className="space-y-6 mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-white/5 space-y-6">
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div className="p-3 rounded-lg bg-indigo-500/10">
                                        <Bot className="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold">Gemini AI Studio</h2>
                                        <p className="text-sm text-zinc-500">Configure your LEO Agent's cognitive engine.</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 mb-4">
                                    <div className="flex gap-3">
                                        <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-indigo-300/80 leading-relaxed">
                                            <strong>Model Selection:</strong> Currently using <code>gemini-pro-1.5</code>. Ensure your API key has access to this model tier.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label>Gemini API Key</Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Key className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                                <Input
                                                    type="password"
                                                    value={geminiKey}
                                                    onChange={(e) => setGeminiKey(e.target.value)}
                                                    placeholder="AIzaSy..."
                                                    className="pl-10 bg-[#0a0a0a] border-white/10 font-mono text-sm"
                                                />
                                            </div>
                                            <Button onClick={() => {
                                                localStorage.setItem("polyscan_gemini_key", geminiKey)
                                                handleSave("Gemini")
                                            }} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold">
                                                <Save className="w-4 h-4 mr-2" /> Update
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Cloud Tab */}
                        <TabsContent value="cloud" className="space-y-6 mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-white/5 space-y-6">
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div className="p-3 rounded-lg bg-blue-500/10">
                                        <Cloud className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold">Google Cloud Console</h2>
                                        <p className="text-sm text-zinc-500">Manage Service Accounts and Cloud Storage Buckets.</p>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label>Project ID</Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Globe className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                                <Input
                                                    value={cloudConsoleId}
                                                    onChange={(e) => setCloudConsoleId(e.target.value)}
                                                    placeholder="my-trading-project-id"
                                                    className="pl-10 bg-[#0a0a0a] border-white/10 font-mono text-sm"
                                                />
                                            </div>
                                            <Button onClick={() => handleSave("Cloud")} className="bg-blue-600 hover:bg-blue-500 text-white font-bold">
                                                <Save className="w-4 h-4 mr-2" /> Save
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security" className="space-y-6 mt-0 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="p-6 rounded-xl bg-[#0f0f0f] border border-white/5 space-y-6">
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div className="p-3 rounded-lg bg-red-500/10">
                                        <Shield className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold">Security & Keys</h2>
                                        <p className="text-sm text-zinc-500">Manage encryption keys and access tokens.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded border border-red-500/20 bg-red-500/5">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-red-500 text-sm">Sensitive Area</h4>
                                                <p className="text-xs text-red-400/80 mt-1">
                                                    Keys displayed here grant full access to your cloud infrastructure. Never share screenshots of this page.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="destructive" className="w-full">
                                        Rotate All API Keys
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </main>
        </div>
    )
}
