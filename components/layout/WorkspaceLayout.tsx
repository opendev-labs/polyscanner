"use client"

import { useState, useEffect, useCallback } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopHeader } from '@/components/layout/TopHeader'
import { TooltipProvider } from '@/components/ui/tooltip'
import { usePathname } from 'next/navigation'

export function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const shouldHideLayout = pathname === '/' || pathname === '/signin'

    // Persist sidebar state
    useEffect(() => {
        setIsMounted(true)
        const savedState = localStorage.getItem('polyscan-sidebar-collapsed')
        if (savedState !== null) {
            setIsSidebarCollapsed(savedState === 'true')
        }
    }, [])

    const toggleSidebar = useCallback(() => {
        setIsSidebarCollapsed(prev => {
            const newState = !prev
            localStorage.setItem('polyscan-sidebar-collapsed', String(newState))
            return newState
        })
    }, [])

    // Keyboard shortcut Ctrl+B
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault()
                toggleSidebar()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleSidebar])

    if (!isMounted) return null

    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex h-screen bg-[#050505] overflow-hidden">
                {!shouldHideLayout && <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />}

                <div className="flex-1 flex flex-col min-w-0">
                    {!shouldHideLayout && <TopHeader onToggleSidebar={toggleSidebar} isSidebarVisible={!isSidebarCollapsed} />}
                    <main className={`flex-1 h-full overflow-auto custom-scrollbar bg-background ${shouldHideLayout ? 'p-0' : ''}`}>
                        {children}
                    </main>
                </div>
            </div>
        </TooltipProvider>
    )
}
