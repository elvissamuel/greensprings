"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

type LeadFormState = {
  name: string
  email: string
  phone: string
}

export function HeroLeadForm() {
  const router = useRouter()
  const [form, setForm] = useState<LeadFormState>({
    name: "",
    email: "",
    phone: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof LeadFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in all fields to start your application.")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message || "Unable to start application. Please try again.")
      }

      const data = await res.json()
      const leadId = data.id as string | undefined

      if (leadId) {
        // Also cache the leadId immediately so progress tracking works
        if (typeof window !== "undefined") {
          window.localStorage.setItem("greensprings_lead_id", leadId)
        }
        router.push(`/apply?leadId=${encodeURIComponent(leadId)}`)
      } else {
        router.push("/apply")
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to start application. Please try again."
      setError(message)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/20 w-full max-w-md">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
        Start Your Application
      </h2>
      <p className="text-sm text-maroon-100 mb-6">
        Tell us how to reach you and we&apos;ll prefill your details in the
        application form.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-maroon-100 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-maroon-900/40 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent placeholder:text-maroon-300/60"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-100 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-maroon-900/40 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent placeholder:text-maroon-300/60"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-100 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-maroon-900/40 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent placeholder:text-maroon-300/60"
            placeholder="+234..."
          />
        </div>

        {error && (
          <p className="text-xs text-red-200 bg-red-900/30 border border-red-500/40 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-maroon-900 font-bold px-4 py-3 rounded-xl text-sm md:text-base transition-all hover:shadow-xl hover:shadow-gold-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Starting..." : "Start Application"}
          {!isSubmitting && (
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
          )}
        </button>

        <p className="text-[11px] text-maroon-200/80 mt-1">
          We&apos;ll only use this information for your admissions application.
        </p>
      </form>
    </div>
  )
}


