export interface ReviewHistoryItem {
  id: string
  code: string
  language: string
  reviewType: string
  review: string
  timestamp: string
}

const STORAGE_KEY = "code-review-history"
const MAX_HISTORY_ITEMS = 50

export function saveReview(item: Omit<ReviewHistoryItem, "id">): void {
  if (typeof window === "undefined") return

  const history = getReviewHistory()
  const newItem: ReviewHistoryItem = {
    ...item,
    id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }

  history.unshift(newItem)

  // Keep only the most recent items
  const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory))
}

export function getReviewHistory(): ReviewHistoryItem[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function deleteReview(id: string): void {
  if (typeof window === "undefined") return

  const history = getReviewHistory()
  const filtered = history.filter((item) => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function clearHistory(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

export function getReviewStats() {
  const history = getReviewHistory()

  const languageCount: Record<string, number> = {}
  const reviewTypeCount: Record<string, number> = {}

  history.forEach((item) => {
    languageCount[item.language] = (languageCount[item.language] || 0) + 1
    reviewTypeCount[item.reviewType] = (reviewTypeCount[item.reviewType] || 0) + 1
  })

  return {
    totalReviews: history.length,
    languageCount,
    reviewTypeCount,
    recentReviews: history.slice(0, 5),
  }
}
