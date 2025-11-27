"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ApplicationDetailsModal } from "./application-details-modal"
import { ConfirmPaymentModal } from "./confirm-payment-modal"

type Application = {
  id: string
  status: string
  applyingAs: string
  submittedAt: string | null
  createdAt: string
  applicant: {
    firstName: string
    lastName: string
    middleName: string | null
    dateOfBirth: string
    gender: string
    nationality: string
    address: string
    homeLanguage: string
    firstLanguage: string
    ethnicity: string | null
    yearAppliedFor: string
    stateOfOrigin: string
    lga: string
    requireBus: boolean
    religion: string | null
    placeOfBirth: string
    livesWith: string
    livesWithOther: string | null
  } | null
  campus: {
    id: string
    name: string
    fee: number
  }
  academicYear: {
    id: string
    year: string
  }
  payment: {
    id: string
    amount: number
    status: string
    paidAt: string | null
  } | null
  parents: Array<{
    id: string
    type: string
    firstName: string | null
    lastName: string | null
    email: string | null
    mobilePhone: string | null
    occupation: string | null
  }>
  documents: Array<{
    id: string
    type: string
    filename: string
    path: string
  }>
  schoolRecords: Array<{
    id: string
    schoolName: string
    yearAttended: string
    cityCountry: string
    classLevel: string
  }>
}

type Props = {
  applicationId: string
  hasPayment: boolean
  paymentStatus: string | null
}

export function ApplicationActions({ applicationId, hasPayment, paymentStatus }: Props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showConfirmPayment, setShowConfirmPayment] = useState(false)
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom")
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Calculate dropdown position when opening
  const handleToggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const dropdownHeight = 150 // Approximate height of dropdown
      
      if (spaceBelow < dropdownHeight) {
        setDropdownPosition("top")
      } else {
        setDropdownPosition("bottom")
      }
    }
    setIsOpen(!isOpen)
  }

  const fetchDetails = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}`)
      if (res.ok) {
        const data = await res.json()
        setApplication(data)
        setShowDetails(true)
      }
    } catch (error) {
      console.error("Failed to fetch application details:", error)
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const handleMarkAsPaidClick = () => {
    setIsOpen(false)
    setShowConfirmPayment(true)
  }

  const updatePaymentStatus = async () => {
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "completed" }),
      })
      if (res.ok) {
        setShowConfirmPayment(false)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to update payment status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const showUpdateButton = !hasPayment || paymentStatus !== "completed"

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={handleToggleDropdown}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div 
              className={`absolute right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 ${
                dropdownPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            >
              <div className="py-1">
                <button
                  onClick={fetchDetails}
                  disabled={isLoading}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                  View Details
                </button>
                
                {showUpdateButton && (
                  <button
                    onClick={handleMarkAsPaidClick}
                    className="w-full px-4 py-2 text-left text-sm text-forest-700 hover:bg-forest-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && application && (
        <ApplicationDetailsModal
          application={application}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* Confirm Payment Dialog */}
      {showConfirmPayment && (
        <ConfirmPaymentModal
          isUpdating={isUpdating}
          onConfirm={updatePaymentStatus}
          onCancel={() => setShowConfirmPayment(false)}
        />
      )}
    </>
  )
}
