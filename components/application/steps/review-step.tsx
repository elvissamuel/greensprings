"use client"

type Props = {
  formData: any
  documents: Record<string, File>
  campuses: Array<{ id: string; name: string }>
  academicYears: Array<{ id: string; year: string }>
}

export function ReviewStep({ formData, documents, campuses, academicYears }: Props) {
  const campus = campuses.find((c) => c.id === formData.campusId)
  const academicYear = academicYears.find((y) => y.id === formData.academicYearId)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Review Your Application</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          Please review all information carefully before submitting. You can go back to any section to make changes.
        </p>
      </div>

      {/* Application Info */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Application Information</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Campus:</span>
            <span className="ml-2 font-medium">{campus?.name}</span>
          </div>
          <div>
            <span className="text-gray-600">Academic Year:</span>
            <span className="ml-2 font-medium">{academicYear?.year}</span>
          </div>
          <div>
            <span className="text-gray-600">Applying As:</span>
            <span className="ml-2 font-medium">
              {formData.applyingAs.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
            </span>
          </div>
        </div>
      </div>

      {/* Student Details */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Student Details</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Full Name:</span>
            <span className="ml-2 font-medium">
              {formData.student.firstName} {formData.student.middleName} {formData.student.lastName}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Date of Birth:</span>
            <span className="ml-2 font-medium">{formData.student.dateOfBirth}</span>
          </div>
          <div>
            <span className="text-gray-600">Gender:</span>
            <span className="ml-2 font-medium capitalize">{formData.student.gender}</span>
          </div>
          <div>
            <span className="text-gray-600">Nationality:</span>
            <span className="ml-2 font-medium">{formData.student.nationality}</span>
          </div>
        </div>
      </div>

      {/* Parents */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Parents/Guardian</h3>
        {!formData.parents.father.detailsNotAvailable && (
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700">Father</p>
            <p className="text-sm text-gray-600">
              {formData.parents.father.firstName} {formData.parents.father.lastName} -{" "}
              {formData.parents.father.mobilePhone}
            </p>
          </div>
        )}
        {!formData.parents.mother.detailsNotAvailable && (
          <div>
            <p className="text-sm font-medium text-gray-700">Mother</p>
            <p className="text-sm text-gray-600">
              {formData.parents.mother.firstName} {formData.parents.mother.lastName} -{" "}
              {formData.parents.mother.mobilePhone}
            </p>
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Uploaded Documents</h3>
        <div className="space-y-2">
          {Object.entries(documents).map(([type, file]) => (
            <div key={type} className="flex items-center text-sm">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
