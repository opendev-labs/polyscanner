"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingUp, TrendingDown, Zap } from "lucide-react"

interface HealthScoreProps {
  score: number
}

export default function HealthScore({ score }: HealthScoreProps) {
  const [prevScore, setPrevScore] = useState(score)

  useEffect(() => {
    setPrevScore(score)
  }, [score])

  const getHealthStatus = (score: number) => {
    if (score >= 80)
      return {
        label: "OPTIMAL",
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
        borderColor: "border-emerald-400/30",
        icon: "✓",
      }
    if (score >= 70)
      return {
        label: "HEALTHY",
        color: "text-cyan-400",
        bgColor: "bg-cyan-400/10",
        borderColor: "border-cyan-400/30",
        icon: "→",
      }
    if (score >= 50)
      return {
        label: "CAUTION",
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
        borderColor: "border-yellow-400/30",
        icon: "!",
      }
    return {
      label: "RISK",
      color: "text-rose-400",
      bgColor: "bg-rose-400/10",
      borderColor: "border-rose-400/30",
      icon: "⚠",
    }
  }

  const status = getHealthStatus(score)
  const change = score - prevScore

  return (
    <Card className="bg-gradient-to-br from-card via-card/50 to-secondary border border-primary/20 overflow-hidden glow-intense">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-1">System Health Score</CardTitle>
            <CardDescription className="text-xs">
              Weighted governance formula: 30% Trend + 25% Volatility + 20% Drawdown + 15% Win Rate + 10% AI Confidence
            </CardDescription>
          </div>
          <div
            className={`px-3 py-1 rounded-md font-mono text-sm font-bold ${status.color} ${status.bgColor} border ${status.borderColor}`}
          >
            {status.label}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Score Circular Display */}
          <div className="flex items-center justify-center">
            <div className="relative w-56 h-56">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-secondary/30"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={`${(score / 100) * 565.48} 565.48`}
                  className={status.color}
                  style={{ transition: "stroke-dasharray 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-6xl font-bold ${status.color}`}>{Math.round(score)}</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
            </div>
          </div>

          {/* Components Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "Trend", value: "30%" },
              { label: "Volatility", value: "25%" },
              { label: "Drawdown", value: "20%" },
              { label: "Win Rate", value: "15%" },
              { label: "AI Conf.", value: "10%" },
            ].map((comp) => (
              <div
                key={comp.label}
                className="glass-effect-sm p-3 text-center border-border hover:border-primary/50 smooth-transition"
              >
                <div className="text-xs text-muted-foreground mb-1 font-medium">{comp.label}</div>
                <div className="font-bold text-sm text-primary">{comp.value}</div>
              </div>
            ))}
          </div>

          {/* Change Indicator */}
          <div
            className={`flex items-center justify-center gap-2 text-sm font-medium p-2 rounded-md ${change >= 0 ? "bg-emerald-400/10 text-emerald-400" : "bg-rose-400/10 text-rose-400"}`}
          >
            {change > 0.5 ? (
              <>
                <TrendingUp className="w-4 h-4" />
                <span>+{Math.abs(change).toFixed(1)} (5s)</span>
              </>
            ) : change < -0.5 ? (
              <>
                <TrendingDown className="w-4 h-4" />
                <span>{change.toFixed(1)} (5s)</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Stable</span>
              </>
            )}
          </div>

          {/* Risk Alert */}
          {score < 60 && (
            <div className="bg-rose-400/10 border border-rose-400/30 rounded-md p-3 flex gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-rose-400">
                <strong>Capital Preservation Mode:</strong> System operating in conservative state. Trading restrictions
                active.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
