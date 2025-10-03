"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { getReviewStats } from "@/lib/review-storage"
import { BarChart3, Code2, FileCheck, TrendingUp } from "lucide-react"

export function ReviewAnalytics() {
  const [stats, setStats] = useState({
    totalReviews: 0,
    languageCount: {} as Record<string, number>,
    reviewTypeCount: {} as Record<string, number>,
  })

  useEffect(() => {
    const data = getReviewStats()
    setStats(data)
  }, [])

  const topLanguage = Object.entries(stats.languageCount).sort(([, a], [, b]) => b - a)[0]
  const topReviewType = Object.entries(stats.reviewTypeCount).sort(([, a], [, b]) => b - a)[0]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/10">
            <FileCheck className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.totalReviews}</p>
            <p className="text-xs text-muted-foreground">Total Reviews</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/10">
            <Code2 className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{Object.keys(stats.languageCount).length}</p>
            <p className="text-xs text-muted-foreground">Languages</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500/10">
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-bold truncate">{topLanguage ? topLanguage[0] : "N/A"}</p>
            <p className="text-xs text-muted-foreground">Top Language</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-500/10">
            <BarChart3 className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-bold truncate">{topReviewType ? topReviewType[0] : "N/A"}</p>
            <p className="text-xs text-muted-foreground">Top Review Type</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
