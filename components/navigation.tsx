"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Search,
  Bot,
  Settings,
  Database,
  CreditCard,
  MessageSquare,
  Activity,
  Files,
  Cpu,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { label: "Master Hub", href: "/master", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "LEO Architect", href: "/leo", icon: <Cpu className="w-5 h-5" /> },
    { label: "Screeners", href: "/screeners", icon: <Search className="w-5 h-5" /> },
    { label: "Data Sources", href: "/google-sheets", icon: <Database className="w-5 h-5" /> },
    { label: "Alerts", href: "/discord", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Resources", href: "/how-it-works", icon: <Files className="w-5 h-5" /> },
  ]

  const bottomItems = [
    { label: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> },
    { label: "Website", href: "/", icon: <Globe className="w-5 h-5" /> },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col items-center py-4 z-50">

      {/* Logo / Brand */}
      <div className="mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Activity className="w-6 h-6 text-black" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 w-full flex flex-col items-center gap-2 px-2">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href} className="w-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`
                        w-full h-10 rounded-lg transition-all duration-200
                        ${isActive
                          ? "bg-orange-500/10 text-orange-500"
                          : "text-zinc-500 hover:bg-[#1a1a1a] hover:text-zinc-300"
                        }
                      `}
                    >
                      {item.icon}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-orange-500 rounded-r-full" />
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[#1a1a1a] border-white/10 text-white text-xs font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </nav>

      {/* Bottom Navigation */}
      <div className="w-full flex flex-col items-center gap-2 px-2 pt-4 border-t border-[#1a1a1a]">
        <TooltipProvider delayDuration={0}>
          {bottomItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link href={item.href} className="w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full h-10 rounded-lg text-zinc-500 hover:bg-[#1a1a1a] hover:text-zinc-300 transition-all"
                  >
                    {item.icon}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1a1a1a] border-white/10 text-white text-xs font-medium">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </aside>
  )
}
