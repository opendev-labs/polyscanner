"use client"

import { useState, useRef } from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    FileSpreadsheet,
    Upload,
    Play,
    Terminal,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    Search,
    Link as LinkIcon
} from "lucide-react"
import { toast } from "sonner"

export default function SheetsPage() {
    // State
    const [sheetId, setSheetId] = useState("")
    const [isConnecting, setIsConnecting] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [isScanning, setIsScanning] = useState(false)
    const [logs, setLogs] = useState<string[]>([])
    const [scanProgress, setScanProgress] = useState(0)

    // File Upload Ref
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Mock Data for "Scanned" Results
    const [scannedRows, setScannedRows] = useState<any[]>([])

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-8))
    }

    const handleConnect = async () => {
        if (!sheetId) return toast.error("Please enter a Sheet ID")
        setIsConnecting(true)
        addLog("Connecting to Google Sheets API...")

        // Simulating connection delay
        await new Promise(r => setTimeout(r, 1500))

        setIsConnecting(false)
        setIsConnected(true)
        addLog(`Connected to Sheet: ${sheetId.substring(0, 8)}...`)
        toast.success("Sheet Connected Successfully")
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setIsConnecting(true)
            addLog(`Uploading file: ${file.name}...`)
            setTimeout(() => {
                setIsConnecting(false)
                setIsConnected(true)
                setSheetId(`file://${file.name}`)
                addLog("File parsed successfully. Ready to scan.")
                toast.success("File Uploaded")
            }, 1000)
        }
    }

    const startScan = async () => {
        if (!isConnected) return toast.error("Please connect a sheet first")

        setIsScanning(true)
        setScannedRows([])
        setScanProgress(0)
        addLog("Starting Scan Sequence...")

        const steps = [
            { msg: "Reading Row 1: CONFIG...", data: null },
            { msg: "Reading Row 2: BTCUSDT...", data: null },
            { msg: "Analyzing Condition: VWAP_CROSS_UP...", data: null },
            { msg: "MATCH FOUND! Row 2 triggers alert.", data: { id: "001", symbol: "BTCUSDT", condition: "VWAP_CROSS_UP", price: "$44,250", status: "SENT" } },
            { msg: "Reading Row 3: ETHUSDT...", data: null },
            { msg: "Condition: RSI > 70. Value: 65. No match.", data: { id: "002", symbol: "ETHUSDT", condition: "RSI_OVERSOLD", price: "$2,250", status: "PENDING" } },
            { msg: "Reading Row 4: SOLUSDT...", data: null },
            { msg: "MATCH FOUND! Row 4 triggers alert.", data: { id: "003", symbol: "SOLUSDT", condition: "VOLUME_SPIKE", price: "$98.50", status: "SENT" } },
            { msg: "Scan Complete. Waiting for next cycle.", data: null }
        ]

        for (let i = 0; i < steps.length; i++) {
            await new Promise(r => setTimeout(r, 800)) // Step delay
            addLog(steps[i].msg)
            setScanProgress(((i + 1) / steps.length) * 100)

            if (steps[i].data) {
                setScannedRows(prev => {
                    const newRows = [...prev, steps[i].data]
                    localStorage.setItem('polyscan_latest_scan', JSON.stringify(newRows))
                    return newRows
                })
            }
        }

        setIsScanning(false)
        toast.success("Scan Completed: Alerts Sent & Synced to Master")
    }

    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <header className="h-[44px] border-b border-border flex items-center justify-between px-4 bg-[#050505] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-bold text-[13px] tracking-tight text-white/90">Sheet Scanner <span className="text-zinc-600 font-normal mx-1">/</span> <span className="text-zinc-500 font-mono text-[10px]">v1.0.2</span></h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col items-center custom-scrollbar">
                <div className="text-center mb-10 max-w-xl">
                    <h2 className="text-3xl font-black mb-3 text-white tracking-tight uppercase italic">Intelligence Pipeline</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        Connect your logic engine via Google Sheets. High-frequency scanners deployed on your own infrastructure.
                    </p>
                </div>

                {/* Connection Panel */}
                <Card className="w-full max-w-4xl bg-[#050505] border-border mb-8 shadow-2xl rounded-sm">
                    <CardHeader className="py-4 border-b border-border">
                        <CardTitle className="text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <LinkIcon className="w-3.5 h-3.5 text-primary" />
                            Data Source Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex gap-2">
                                <Input
                                    placeholder="Enter Google Sheet ID (e.g. 1CStqi...)"
                                    className="bg-[#141414] border-border focus:border-primary/50 font-mono text-xs rounded-sm h-9"
                                    value={sheetId}
                                    onChange={(e) => setSheetId(e.target.value)}
                                    disabled={isConnected || isConnecting}
                                />
                                <Button
                                    variant="secondary"
                                    className="font-bold h-9 px-4 rounded-sm"
                                    onClick={handleConnect}
                                    disabled={isConnected || isConnecting}
                                >
                                    {isConnecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Connect"}
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 text-white/20 font-bold text-xs uppercase tracking-widest px-2">
                                OR
                            </div>

                            <div className="w-full md:w-auto">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleFileUpload}
                                />
                                <Button
                                    className="w-full bg-[#313131] hover:bg-[#3D3D3D] text-white border border-border font-bold h-9 rounded-sm"
                                    onClick={handleUploadClick}
                                    disabled={isConnected || isConnecting}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Local File
                                </Button>
                            </div>
                        </div>

                        {isConnected && (
                            <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-sm flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                    <span className="text-primary font-bold text-xs">SOURCE AUTHORIZED</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => { setIsConnected(false); setSheetId(""); setScannedRows([]); setLogs([]); }}
                                    className="h-auto py-1 text-xs text-white/40 hover:text-white"
                                >
                                    Disconnect
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Scanner Console */}
                <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Terminal & Controls */}
                    <div className="lg:col-span-1 space-y-4">
                        <Card className="bg-[#050505] border-border h-full flex flex-col rounded-sm shadow-xl">
                            <CardHeader className="py-3 border-b border-border">
                                <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2 font-black">
                                    <Terminal className="w-3.5 h-3.5" />
                                    Execution Log
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col p-4">
                                <div className="flex-1 bg-black/40 rounded-sm border border-border p-3 font-mono text-[10px] text-primary overflow-y-auto mb-4 space-y-1 custom-scrollbar">
                                    {logs.length === 0 && <span className="text-white/20 italic">Ready to scan...</span>}
                                    {logs.map((log, i) => (
                                        <div key={i} className="animate-in fade-in slide-in-from-left-2">{log}</div>
                                    ))}
                                    {isScanning && (
                                        <div className="flex items-center gap-2 pt-2">
                                            <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full" />
                                            <span className="text-emerald-500">Processing...</span>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    className={`w-full font-bold h-10 rounded-sm text-xs transition-all ${isScanning ? 'bg-zinc-800 text-zinc-400' : 'bg-primary hover:bg-[#FF5511] text-[#050505]'}`}
                                    onClick={startScan}
                                    disabled={!isConnected || isScanning}
                                >
                                    {isScanning ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            INTERRUPTING...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-4 h-4 mr-2 fill-current" />
                                            INITIATE SCAN
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Results Table */}
                    <div className="lg:col-span-2">
                        <Card className="bg-[#050505] border-border h-full rounded-sm shadow-xl">
                            <CardHeader className="flex flex-row items-center justify-between py-3 border-b border-border">
                                <div>
                                    <CardTitle className="text-xs font-black uppercase tracking-widest text-white/80">Signal Intelligence Feed</CardTitle>
                                </div>
                                {isScanning && (
                                    <div className="flex items-center gap-2 bg-primary/10 px-2 py-0.5 rounded-sm border border-primary/20">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                        <span className="text-[9px] text-primary font-bold uppercase tracking-tighter">Live STREAM</span>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-lg border border-white/5 overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-white/5">
                                            <TableRow className="border-white/5 hover:bg-transparent">
                                                <TableHead className="w-[80px] text-white/60">ID</TableHead>
                                                <TableHead className="text-white/60">Symbol</TableHead>
                                                <TableHead className="text-white/60">Condition</TableHead>
                                                <TableHead className="text-right text-white/60">Price</TableHead>
                                                <TableHead className="text-right text-white/60">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {scannedRows.length === 0 ? (
                                                <TableRow className="hover:bg-transparent">
                                                    <TableCell colSpan={5} className="h-64 text-center text-zinc-700 border-border">
                                                        <Search className="w-6 h-6 mx-auto mb-2 opacity-20" />
                                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Idle - Awaiting Intelligence</span>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                scannedRows.map((row) => (
                                                    <TableRow key={row.id} className="border-border hover:bg-white/[0.02] animate-in fade-in slide-in-from-bottom-2">
                                                        <TableCell className="font-mono text-zinc-600 text-[10px]">{row.id}</TableCell>
                                                        <TableCell className="font-bold text-[12px]">{row.symbol}</TableCell>
                                                        <TableCell className="text-[10px] font-mono text-primary uppercase">{row.condition}</TableCell>
                                                        <TableCell className="text-right font-mono text-[11px] text-zinc-300">{row.price}</TableCell>
                                                        <TableCell className="text-right">
                                                            <div className={`inline-flex px-1.5 py-0.5 rounded-sm text-[9px] font-black uppercase ${row.status === 'SENT'
                                                                ? 'bg-primary/10 text-primary border border-primary/20'
                                                                : 'bg-zinc-800 text-zinc-500'
                                                                }`}>
                                                                {row.status}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

            </main>
        </div>
    )
}
