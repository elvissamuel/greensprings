"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const LEAD_ID_STORAGE_KEY = "greensprings_lead_id"

export function LeadIdRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const leadIdFromUrl = searchParams.get("leadId")

  useEffect(() => {
    // If we already have a leadId in the URL, no need to redirect
    if (leadIdFromUrl) return

    // Check localStorage for saved leadId
    if (typeof window === "undefined") return

    const storedLeadId = window.localStorage.getItem(LEAD_ID_STORAGE_KEY)
    if (storedLeadId) {
      // Redirect to include the leadId in the URL
      router.replace(`/apply?leadId=${encodeURIComponent(storedLeadId)}`)
    }
  }, [leadIdFromUrl, router])

  return null // This component doesn't render anything
}

