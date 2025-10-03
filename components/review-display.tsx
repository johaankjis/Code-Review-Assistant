"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Info, Zap } from "lucide-react"

interface ReviewDisplayProps {
  review: string
  language: string
  reviewType: string
  timestamp: string
}

const REVIEW_TYPE_CONFIG = {
  comprehensive: {
    label: "Comprehensive Review",
    icon: CheckCircle2,
    color: "text-blue-500",
  },
  security: {
    label: "Security Analysis",
    icon: AlertCircle,
    color: "text-red-500",
  },
  performance: {
    label: "Performance Review",
    icon: Zap,
    color: "text-yellow-500",
  },
  style: {
    label: "Style Guide",
    icon: Info,
    color: "text-purple-500",
  },
}

export function ReviewDisplay({ review, language, reviewType, timestamp }: ReviewDisplayProps) {
  const config = REVIEW_TYPE_CONFIG[reviewType as keyof typeof REVIEW_TYPE_CONFIG] || REVIEW_TYPE_CONFIG.comprehensive
  const Icon = config.icon

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon className={`h-5 w-5 ${config.color}`} />
          <h2 className="text-xl font-semibold">{config.label}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs">
            {language}
          </Badge>
          <span className="text-xs text-muted-foreground">{new Date(timestamp).toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{review}</div>
      </div>
    </Card>
  )
}
