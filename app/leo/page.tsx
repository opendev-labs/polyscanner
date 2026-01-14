"use client"

import { useRef, useEffect } from "react"
import { Sparkles, Paperclip, Mic, Cpu, ArrowUp, RefreshCw, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from "framer-motion"

import { useChat } from '@ai-sdk/react'

export default function LeoPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, append } = useChat({
        api: '/api/leo/chat',
    } as any) as any

    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isLoading])

    // Handle enter key to submit
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e as any)
        }
    }

    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">

            {/* Minimal Header - Postman Style */}
            <header className="h-[44px] border-b border-border flex items-center justify-between px-4 bg-[#050505] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Cpu className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-bold text-[13px] tracking-tight text-white/90">LEO Architect <span className="text-zinc-600 font-normal mx-1">/</span> <span className="text-zinc-500 font-mono text-[10px]">v1.5 Flash</span></h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-1.5 py-0.5 rounded-sm bg-zinc-800 border border-border text-[9px] text-zinc-500 font-mono uppercase tracking-widest">
                        Intelligence Stream Active
                    </div>
                </div>
            </header>

            {/* Main Chat Area */}
            <div className="flex-1 overflow-y-auto relative scroll-smooth">
                {messages.length === 0 ? (
                    // Empty State / Welcome Screen
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/50 p-4 rounded-full mb-6 ring-1 ring-white/10"
                        >
                            <Cpu className="w-12 h-12 text-orange-500" />
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl md:text-3xl font-bold mb-3 text-center"
                        >
                            How can I architect your trades today?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-500 max-w-md text-center text-sm mb-8"
                        >
                            I am LEO, your Hyper-Intelligent Logic Engine. I can analyze markets, generate Pine Script, or optimize your screeners.
                        </motion.p>

                        {/* Quick Starters */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                            {[
                                "Analyze the current structure of BTC/USD on the 4H timeframe.",
                                "Write a Pine Script for a VWAP mean reversion strategy.",
                                "Explain the 'Liquidity Sweep' concept in institutional trading.",
                                "Optimize my 'RSI Divergence' screener parameters."
                            ].map((prompt, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="p-3 text-left p-4 rounded-xl border border-white/10 bg-zinc-900/20 hover:bg-zinc-800/50 hover:border-orange-500/30 transition-all text-sm text-zinc-300"
                                    onClick={() => handleInputChange({ target: { value: prompt } } as any)}
                                >
                                    {prompt}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Chat History
                    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
                        {messages.map((msg: any, i: number) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {/* Bot Icon */}
                                {msg.role !== 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-orange-950/30 border border-orange-500/20 flex items-center justify-center shrink-0 mt-1">
                                        <Sparkles className="w-4 h-4 text-orange-500" />
                                    </div>
                                )}

                                <div className={`flex flex-col max-w-[85%] md:max-w-[75%]`}>
                                    <div className={`
                                        text-sm leading-7 prose prose-invert max-w-none
                                        prose-p:text-zinc-200 prose-headings:text-zinc-100 prose-strong:text-white
                                        prose-code:text-orange-300 prose-code:bg-black/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                                        prose-pre:bg-[#0f0f0f] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-4
                                        prose-ul:text-zinc-300 prose-ol:text-zinc-300
                                        ${msg.role === 'user'
                                            ? 'bg-zinc-800 text-white px-4 py-2.5 rounded-3xl rounded-tr-sm'
                                            : 'text-zinc-300'
                                        }
                                    `}>
                                        <ReactMarkdown>{msg.content || ''}</ReactMarkdown>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-orange-950/30 border border-orange-500/20 flex items-center justify-center shrink-0">
                                    <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
                                </div>
                                <div className="flex items-center gap-1 h-8">
                                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} className="h-4" />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gradient-to-t from-black via-black to-transparent">
                <div className="max-w-3xl mx-auto relative group">
                    {/* Input Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-[#050505] rounded-sm border border-border p-2 shadow-2xl focus-within:border-primary/30 transition-all">
                        <Button type="button" variant="ghost" size="icon" className="text-zinc-500 hover:text-white mb-1 size-8">
                            <Paperclip className="w-4 h-4" />
                        </Button>

                        <Textarea
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask LEO to architect a strategy..."
                            className="min-h-[40px] max-h-[200px] border-0 bg-transparent py-2.5 focus-visible:ring-0 resize-none text-[13px] placeholder:text-zinc-600"
                            rows={1}
                        />

                        {isLoading ? (
                            <Button
                                type="button"
                                onClick={stop}
                                variant="secondary"
                                size="icon"
                                className="size-8 mb-1 transition-all"
                            >
                                <Square className="w-3.5 h-3.5 fill-current" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                size="icon"
                                className="size-8 mb-1 transition-all disabled:opacity-50"
                                disabled={!input?.trim()}
                            >
                                <ArrowUp className="w-4 h-4" />
                            </Button>
                        )}
                    </form>
                    <div className="mt-3 text-center">
                        <span className="text-[10px] text-zinc-600 font-mono">LEO can make mistakes. Consider checking important information.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
