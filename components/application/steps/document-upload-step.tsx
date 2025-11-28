"use client"

import { useState } from "react"

type Props = {
  documents: Record<string, File>
  setDocuments: (docs: Record<string, File>) => void
}

const REQUIRED_DOCUMENTS = [
  { type: "BIRTH_CERTIFICATE", label: "Birth Certificate", required: false },
  { type: "CHARACTER_TESTIMONIAL", label: "Character Testimonial", required: false },
  { type: "ACADEMIC_REPORT_1", label: "Academic Report (Most Recent)", required: false },
  { type: "ACADEMIC_REPORT_2", label: "Academic Report (Previous Year)", required: true },
  { type: "MEDICAL_HISTORY", label: "Medical History Form", required: true, downloadable: true },
  { type: "PASSPORT_PHOTO", label: "Passport Photograph", required: true },
  { type: "PSYCHOLOGICAL_ASSESSMENT", label: "Psychological Assessment (if applicable)", required: false },
]

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"]

export function DocumentUploadStep({ documents, setDocuments }: Props) {
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({})

  const handleFileChange = (type: string, file: File | null) => {
    if (!file) {
      const newDocs = { ...documents }
      delete newDocs[type]
      setDocuments(newDocs)
      setUploadStatus({ ...uploadStatus, [type]: "" })
      return
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadStatus({
        ...uploadStatus,
        [type]: "Invalid file type. Only JPEG, PNG, and PDF are allowed.",
      })
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setUploadStatus({
        ...uploadStatus,
        [type]: "File size exceeds 8MB limit.",
      })
      return
    }

    setDocuments({ ...documents, [type]: file })
    setUploadStatus({ ...uploadStatus, [type]: "success" })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Document Uploads</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Upload Requirements</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Accepted formats: JPEG, PNG, PDF</li>
          <li>• Maximum file size: 8MB per file</li>
          <li>• All required documents must be uploaded before submission</li>
        </ul>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-semibold text-amber-900 mb-2">NDPR Compliance Notice</h3>
        <p className="text-sm text-amber-800">
          Greensprings School collects and processes personal data supplied in this application under the Nigerian Data
          Protection Regulation (NDPR, 2019). Data will be used for admissions processes and related communications. By
          submitting you consent to this processing. If you wish to opt-out of your child's image being used by the
          school, please send a written request to admissions@greensprings.edu.
        </p>
      </div>

      <div className="space-y-4">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <div key={doc.type} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <label className="block font-medium text-gray-900 mb-1">
                  {doc.label}
                  {doc.required && <span className="text-red-600 ml-1">*</span>}
                </label>
                {doc.downloadable && (
                  <a
                    href="/Medical-History-Form.pdf"
                    download="Medical-History-Form.pdf"
                    className="text-sm text-maroon-800 hover:text-maroon-900 underline"
                  >
                    Download Medical History Form
                  </a>
                )}
              </div>
              {documents[doc.type] && (
                <button
                  type="button"
                  onClick={() => handleFileChange(doc.type, null)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              type="file"
              key={doc.type}
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileChange(doc.type, e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent text-sm"
            />

            {documents[doc.type] && uploadStatus[doc.type] === "success" && (
              <div className="mt-2 flex items-center text-green-700 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {documents[doc.type].name}
              </div>
            )}

            {uploadStatus[doc.type] && uploadStatus[doc.type] !== "success" && (
              <p className="mt-2 text-red-600 text-sm">{uploadStatus[doc.type]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
