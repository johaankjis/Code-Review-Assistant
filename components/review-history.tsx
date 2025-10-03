"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getReviewHistory, deleteReview, clearHistory, type ReviewHistoryItem } from "@/lib/review-storage"
import { Clock, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ReviewHistoryProps {
  onSelectReview: (item: ReviewHistoryItem) => void
}

export function ReviewHistory({ onSelectReview }: ReviewHistoryProps) {
  const [history, setHistory] = useState<ReviewHistoryItem[]>([])

  useEffect(() => {
    setHistory(getReviewHistory())
  }, [])

  const handleDelete = (id: string) => {
    deleteReview(id)
    setHistory(getReviewHistory())
  }

  const handleClearAll = () => {
    clearHistory()
    setHistory([])
  }

  if (history.length === 0) {
    return (
      <Card className="p-8 bg-card border-border">
        <div className="text-center space-y-3">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            No review history yet. Submit your first code review to get started.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Review History</h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive">
              Clear All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear all history?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your review history. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAll}>Clear All</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => onSelectReview(item)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {item.language}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.reviewType}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono truncate mb-2">{item.code.split("\n")[0]}...</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(item.id)
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
