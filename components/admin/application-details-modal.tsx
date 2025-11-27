"use client"

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
  application: Application
  onClose: () => void
}

export function ApplicationDetailsModal({ application, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-maroon-800">
          <div>
            <h2 className="text-xl font-bold text-white">Application Details</h2>
            <p className="text-maroon-200 text-sm">ID: {application.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 space-y-6">
          {/* Student Information */}
          {application.applicant && (
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-maroon-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Student Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Full Name</p>
                  <p className="font-medium">{application.applicant.firstName} {application.applicant.middleName} {application.applicant.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date of Birth</p>
                  <p className="font-medium">{new Date(application.applicant.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Gender</p>
                  <p className="font-medium capitalize">{application.applicant.gender}</p>
                </div>
                <div>
                  <p className="text-gray-500">Nationality</p>
                  <p className="font-medium">{application.applicant.nationality}</p>
                </div>
                <div>
                  <p className="text-gray-500">State of Origin</p>
                  <p className="font-medium">{application.applicant.stateOfOrigin}</p>
                </div>
                <div>
                  <p className="text-gray-500">LGA</p>
                  <p className="font-medium">{application.applicant.lga}</p>
                </div>
                <div>
                  <p className="text-gray-500">Place of Birth</p>
                  <p className="font-medium">{application.applicant.placeOfBirth}</p>
                </div>
                <div>
                  <p className="text-gray-500">Religion</p>
                  <p className="font-medium capitalize">{application.applicant.religion || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Year Applied For</p>
                  <p className="font-medium">{application.applicant.yearAppliedFor}</p>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium">{application.applicant.address}</p>
                </div>
                <div>
                  <p className="text-gray-500">Lives With</p>
                  <p className="font-medium capitalize">{application.applicant.livesWith.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-gray-500">Requires Bus</p>
                  <p className="font-medium">{application.applicant.requireBus ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Application Details */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold text-maroon-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Application Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Campus</p>
                <p className="font-medium">{application.campus.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Academic Year</p>
                <p className="font-medium">{application.academicYear.year}</p>
              </div>
              <div>
                <p className="text-gray-500">Applying As</p>
                <p className="font-medium capitalize">{application.applyingAs.replace("_", " ")}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  application.status === "submitted" ? "bg-forest-100 text-forest-800" :
                  application.status === "pending" ? "bg-gold-100 text-gold-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {application.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500">Submitted</p>
                <p className="font-medium">
                  {application.submittedAt 
                    ? new Date(application.submittedAt).toLocaleDateString() 
                    : "Not submitted"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold text-maroon-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Payment Information
            </h3>
            {application.payment ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-medium">₦{(application.payment.amount / 100).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    application.payment.status === "completed" ? "bg-forest-100 text-forest-800" : "bg-gold-100 text-gold-800"
                  }`}>
                    {application.payment.status}
                  </span>
                </div>
                {application.payment.paidAt && (
                  <div>
                    <p className="text-gray-500">Paid On</p>
                    <p className="font-medium">{new Date(application.payment.paidAt).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No payment record</p>
            )}
          </div>

          {/* Parents/Guardians */}
          {application.parents.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-maroon-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Parents / Guardians
              </h3>
              <div className="space-y-4">
                {application.parents.map((parent) => (
                  <div key={parent.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-maroon-700 capitalize mb-2">{parent.type.toLowerCase()}</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium">{parent.firstName} {parent.lastName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium">{parent.email || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="font-medium">{parent.mobilePhone || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Occupation</p>
                        <p className="font-medium">{parent.occupation || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* School Records */}
          {application.schoolRecords.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-maroon-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Previous Schools
              </h3>
              <div className="space-y-3">
                {application.schoolRecords.map((school) => (
                  <div key={school.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium">{school.schoolName}</p>
                    <p className="text-sm text-gray-500">{school.cityCountry} • {school.yearAttended} • {school.classLevel}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {application.documents.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-maroon-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {application.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg p-3 border border-gray-200 hover:border-maroon-300 hover:bg-maroon-50 transition-colors"
                  >
                    <p className="font-medium text-sm text-maroon-700 capitalize">{doc.type.replace(/_/g, " ").toLowerCase()}</p>
                    <p className="text-xs text-gray-500 truncate">{doc.filename}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

