"use client"

import { useState } from "react"
import { Settings, Shield, Zap, Bell, Keyboard } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function SettingsDialog() {
    const [open, setOpen] = useState(false)

    const handleSave = () => {
        setOpen(false)
        toast.success("System configurations updated", {
            description: "Institutional settings synchronized across all clusters."
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-border hover:border-primary/50 hover:bg-primary/5 smooth-transition bg-transparent"
                >
                    <Settings className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] glass-effect border-primary/20">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Control Plane Settings
                    </DialogTitle>
                    <DialogDescription>
                        Configure institutional-grade system parameters and security protocols.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Shield className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label htmlFor="api-key">Enterprise API Key</Label>
                                <Input id="api-key" type="password" value="••••••••••••••••" className="h-8" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-cyan-400/10 rounded-lg">
                                <Zap className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label htmlFor="retry">Execution Retries</Label>
                                <Input id="retry" type="number" defaultValue="3" className="h-8" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-yellow-400/10 rounded-lg">
                                <Bell className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label htmlFor="notifications">Alert Webhook</Label>
                                <Input id="notifications" placeholder="https://hooks.slack.com/..." className="h-8" />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border/50" />

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Advanced Features</h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <Keyboard className="w-4 h-4 text-muted-foreground" />
                                <span>Hyper-Latency Execution</span>
                            </div>
                            <div className="w-10 h-5 bg-primary/20 border border-primary/30 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Save Configurations
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
