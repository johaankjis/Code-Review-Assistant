"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CodeEditor } from "@/components/code-editor"
import { ReviewDisplay } from "@/components/review-display"
import { ReviewTypeSelector } from "@/components/review-type-selector"
import { ReviewHistory } from "@/components/review-history"
import { ReviewAnalytics } from "@/components/review-analytics"
import { Loader2, Code2, Sparkles, History, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { saveReview, type ReviewHistoryItem } from "@/lib/review-storage"

interface ReviewResult {
  review: string
  language: string
  reviewType: string
  timestamp: string
}

export default function HomePage() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [reviewType, setReviewType] = useState("comprehensive")
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const { toast } = useToast()

  const handleReview = async () => {
    if (!code.trim()) {
      toast({
        title: "No code provided",
        description: "Please paste some code to review",
        variant: "destructive",
      })
      return
    }

    setIsReviewing(true)
    setReviewResult(null)

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, reviewType }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate review")
      }

      const result = await response.json()
      setReviewResult(result)

      saveReview({
        code,
        language: result.language,
        reviewType: result.reviewType,
        review: result.review,
        timestamp: result.timestamp,
      })

      setRefreshKey((prev) => prev + 1)

      toast({
        title: "Review complete",
        description: "Your code has been analyzed successfully",
      })
    } catch (error) {
      console.error("[v0] Review error:", error)
      toast({
        title: "Review failed",
        description: "Failed to generate code review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsReviewing(false)
    }
  }

  const handleSelectReview = (item: ReviewHistoryItem) => {
    setCode(item.code)
    setLanguage(item.language)
    setReviewType(item.reviewType)
    setReviewResult({
      review: item.review,
      language: item.language,
      reviewType: item.reviewType,
      timestamp: item.timestamp,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-balance">AI Code Review Assistant</h1>
              <p className="text-sm text-muted-foreground">Powered by GPT-4o Mini</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="review" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="review" className="gap-2">
              <Code2 className="h-4 w-4" />
              Review
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="review" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Code Input */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-balance">Submit Your Code</h2>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Paste your code below and select the type of review you need. Our AI will analyze it and provide
                    detailed feedback.
                  </p>
                </div>

                <CodeEditor value={code} onChange={setCode} language={language} onLanguageChange={setLanguage} />

                <ReviewTypeSelector value={reviewType} onChange={setReviewType} />

                <Button onClick={handleReview} disabled={isReviewing || !code.trim()} className="w-full" size="lg">
                  {isReviewing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Code...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Review Code
                    </>
                  )}
                </Button>
              </div>

              {/* Right Column - Review Results */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-balance">Review Results</h2>
                  <p className="text-sm text-muted-foreground text-pretty">
                    AI-generated insights and recommendations for your code.
                  </p>
                </div>

                {reviewResult ? (
                  <ReviewDisplay
                    review={reviewResult.review}
                    language={reviewResult.language}
                    reviewType={reviewResult.reviewType}
                    timestamp={reviewResult.timestamp}
                  />
                ) : (
                  <div className="flex items-center justify-center h-[500px] border-2 border-dashed border-border rounded-lg bg-muted/20">
                    <div className="text-center space-y-3 max-w-sm px-4">
                      <Code2 className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground text-balance">
                        Your code review will appear here. Submit your code to get started.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-balance">Review History</h2>
              <p className="text-sm text-muted-foreground text-pretty">
                View and revisit your previous code reviews. Click on any review to load it.
              </p>
            </div>
            <ReviewHistory key={refreshKey} onSelectReview={handleSelectReview} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-balance">Analytics Dashboard</h2>
              <p className="text-sm text-muted-foreground text-pretty">
                Track your code review activity and see insights about your coding patterns.
              </p>
            </div>
            <ReviewAnalytics key={refreshKey} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
