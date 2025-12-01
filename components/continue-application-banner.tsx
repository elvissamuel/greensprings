"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const STORAGE_KEY = "greensprings_application_draft"

type SavedData = {
  formData: any
  currentStep: number
  savedAt: string
  documentNames: string[]
}

const STEPS = [
  "Application Info",
  "Student Details",
  "Child Lives With",
  "Schools Attended",
  "Parents/Guardian",
  "Medical & Emergency",
  "Additional Details",
  "Document Uploads",
  "Declaration",
  "Review & Submit",
]

export function ContinueApplicationBanner() {
  const [savedData, setSavedData] = useState<SavedData | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as SavedData
        // Only show if they've actually started (step > 0)
        if (parsed && parsed.currentStep > 0) {
          setSavedData(parsed)
          setIsVisible(true)
        }
      }
    } catch {
      // Ignore errors
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!isVisible || !savedData) return null

  const stepName = STEPS[savedData.currentStep] || "Unknown Step"
  const savedDate = new Date(savedData.savedAt)
  const formattedDate = savedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <div className="relative z-20 bg-gradient-to-r from-gold-500 to-gold-600 text-maroon-900 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="font-semibold text-sm sm:text-base">
                You have an incomplete application
              </p>
            </div>
            <p className="text-xs sm:text-sm text-maroon-800/90">
              Last saved: {formattedDate} • Currently on: {stepName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-maroon-900 hover:bg-maroon-800 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all hover:shadow-lg"
            >
              Continue Application
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-maroon-900/20 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

