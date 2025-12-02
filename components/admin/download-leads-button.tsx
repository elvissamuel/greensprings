"use client"

type Lead = {
  id: string
  name: string
  email: string
  phone: string
  source: string | null
  currentStep: number
  createdAt: Date
  updatedAt: Date
}

type DownloadLeadsButtonProps = {
  leads: Lead[]
  stepLabels: string[]
}

export function DownloadLeadsButton({ leads, stepLabels }: DownloadLeadsButtonProps) {
  const handleDownload = () => {
    if (leads.length === 0) {
      alert("No leads to download")
      return
    }

    // Define CSV headers
    const headers = [
      "Lead ID",
      "Name",
      "Email",
      "Phone",
      "Source",
      "Current Step",
      "Step Label",
      "Created Date",
      "Updated Date",
    ]

    // Convert leads to CSV rows
    const rows = leads.map((lead) => {
      const stepLabel =
        lead.currentStep >= 0 && lead.currentStep < stepLabels.length
          ? stepLabels[lead.currentStep]
          : "Not started"

      const createdDate = lead.createdAt
        ? new Date(lead.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })
        : ""

      const updatedDate = lead.updatedAt
        ? new Date(lead.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })
        : ""

      return [
        lead.id,
        lead.name,
        lead.email,
        lead.phone,
        lead.source || "N/A",
        lead.currentStep,
        stepLabel,
        createdDate,
        updatedDate,
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
    link.setAttribute("download", `leads_${new Date().toISOString().split("T")[0]}.csv`)
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

