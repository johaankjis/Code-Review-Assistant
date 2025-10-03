"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2, AlertCircle, Zap, Info } from "lucide-react"

interface ReviewTypeSelectorProps {
  value: string
  onChange: (value: string) => void
}

const REVIEW_TYPES = [
  {
    value: "comprehensive",
    label: "Comprehensive",
    description: "Full code review covering all aspects",
    icon: CheckCircle2,
  },
  {
    value: "security",
    label: "Security",
    description: "Focus on security vulnerabilities",
    icon: AlertCircle,
  },
  {
    value: "performance",
    label: "Performance",
    description: "Optimize for speed and efficiency",
    icon: Zap,
  },
  {
    value: "style",
    label: "Style Guide",
    description: "Code style and best practices",
    icon: Info,
  },
]

export function ReviewTypeSelector({ value, onChange }: ReviewTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Review Type</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-3">
        {REVIEW_TYPES.map((type) => {
          const Icon = type.icon
          return (
            <Label
              key={type.value}
              htmlFor={type.value}
              className="flex items-start gap-3 p-4 rounded-lg border-2 border-border cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <RadioGroupItem id={type.value} value={type.value} className="mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{type.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
            </Label>
          )
        })}
      </RadioGroup>
    </div>
  )
}
