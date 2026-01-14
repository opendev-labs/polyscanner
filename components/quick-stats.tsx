import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Target, Zap, AlertTriangle, Shield } from "lucide-react"

export default function QuickStats({ data }: { data: any }) {
  const stats = [
    {
      title: "Active Scanners",
      value: data ? `${data.active_scanners || 5}/5` : "5/5",
      subtitle: "Market analysis running",
      icon: BarChart3,
      color: "text-cyan-400",
      trend: "+2 today",
    },
    {
      title: "Active Bots",
      value: data ? `${data.active_bots || 3}/10` : "3/10",
      subtitle: "Automated traders online",
      icon: Zap,
      color: "text-emerald-400",
      trend: "Stable",
    },
    {
      title: "Performance",
      value: data ? `${Math.round(data.win_rate || 68)}%` : "68%",
      subtitle: "Win rate (30d avg)",
      icon: Target,
      color: "text-blue-400",
      trend: data ? `${data.total_pnl_pct >= 0 ? '+' : ''}${data.total_pnl_pct.toFixed(2)}%` : "+4.2%",
    },
    {
      title: "Risk Level",
      value: data ? (data.max_drawdown > 10 ? "CRITICAL" : data.max_drawdown > 5 ? "HIGH" : "MEDIUM") : "MEDIUM",
      subtitle: `Portfolio DD: ${data ? data.max_drawdown.toFixed(2) : '4.2'}%`,
      icon: AlertTriangle,
      color: "text-yellow-400",
      trend: "Monitored",
    },
    {
      title: "Capital Deployed",
      value: data ? `$${Math.round(data.portfolio_value / 1000)}K` : "$487K",
      subtitle: "Active positions",
      icon: Shield,
      color: "text-primary",
      trend: `${data ? Math.round(data.exposure_pct) : '67'}% of max`,
    },
    {
      title: "Data Freshness",
      value: "2s",
      subtitle: "Last signal refresh",
      icon: TrendingUp,
      color: "text-violet-400",
      trend: "Real-time",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="stat-card group border-border hover:border-primary/40 cursor-pointer">
            <CardContent className="pt-5 pb-4">
              <div className="flex justify-between items-start mb-4">
                <Icon
                  className={`w-5 h-5 ${stat.color} opacity-50 group-hover:opacity-70 group-hover:scale-110 smooth-transition`}
                />
                <span className="text-xs font-semibold text-muted-foreground/60">{stat.trend}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">{stat.title}</p>
              <p className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground/70">{stat.subtitle}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
