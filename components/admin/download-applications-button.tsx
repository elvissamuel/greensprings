"use client"

import { Prisma } from "@prisma/client"
import { formatCurrency } from "@/lib/utils"

type ApplicationWithRelations = Prisma.ApplicationGetPayload<{
  include: {
    applicant: true
    campus: true
    academicYear: true
    payment: true
    documents: true
  }
}>

type DownloadApplicationsButtonProps = {
  applications: ApplicationWithRelations[]
}

export function DownloadApplicationsButton({ applications }: DownloadApplicationsButtonProps) {
  const handleDownload = () => {
    if (applications.length === 0) {
      alert("No applications to download")
      return
    }

    // Define CSV headers
    const headers = [
      "Application ID",
      "Student First Name",
      "Student Last Name",
      "Year Applied For",
      "Campus",
      "Academic Year",
      "Status",
      "Payment Amount",
      "Payment Status",
      "Document Count",
      "Submitted Date",
      "Created Date",
    ]

    // Convert applications to CSV rows
    const rows = applications.map((app) => {
      const submittedDate = app.submittedAt
        ? new Date(app.submittedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Not submitted"

      const createdDate = app.createdAt
        ? new Date(app.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : ""

      return [
        app.id,
        app.applicant?.firstName || "",
        app.applicant?.lastName || "",
        app.applicant?.yearAppliedFor || "",
        app.campus?.name || "",
        app.academicYear?.year || "",
        app.status.replace("_", " "),
        app.payment ? formatCurrency(app.payment.amount, "NGN") : "Not paid",
        app.payment?.status || "N/A",
        app.documents?.length || 0,
        submittedDate,
        createdDate,
      ]
    })

    // Escape CSV values (handle commas, quotes, newlines)
    const escapeCSV = (value: string | number) => {
      const stringValue = String(value)
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }

    // Combine headers and rows
    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `applications_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download CSV
    </button>
  )
}

