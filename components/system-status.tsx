import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface SystemStatusProps {
  title: string
  status: string
  detail: string
  icon: LucideIcon
  color: string
}

export default function SystemStatus({ title, status, detail, icon: Icon, color }: SystemStatusProps) {
  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 smooth-transition hover:shadow-lg hover:shadow-primary/15 group cursor-pointer">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className={`text-3xl font-bold ${color} group-hover:scale-105 smooth-transition`}>{status}</p>
          </div>
          <Icon
            className={`w-7 h-7 ${color} opacity-40 group-hover:opacity-60 smooth-transition group-hover:scale-110`}
          />
        </div>
        <p className="text-xs text-muted-foreground/80">{detail}</p>
      </CardContent>
    </Card>
  )
}
