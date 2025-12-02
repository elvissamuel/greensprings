import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { DownloadLeadsButton } from "@/components/admin/download-leads-button"

export const revalidate = 0
export const dynamic = "force-dynamic"

const STEP_LABELS = [
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

export default async function AdminLeadsPage() {
  let leads: Awaited<ReturnType<typeof prisma.lead.findMany>> = []
  let error: string | null = null

  try {
    leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch (err) {
    console.error("[Admin Leads] Error fetching leads:", err)
    error = err instanceof Error ? err.message : "Failed to load leads"
  }

  const stats = {
    total: leads.length,
    started: leads.filter((l) => l.currentStep > 0).length,
    notStarted: leads.filter((l) => l.currentStep === 0).length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <a
                href="/admin/applications"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Applications
              </a>
              <DownloadLeadsButton leads={leads} stepLabels={STEP_LABELS} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
            <p className="text-gray-600 mt-1">
              View all leads captured from the landing page and their current application step.
            </p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">Error: {error}</p>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">Started Application</p>
              <p className="text-3xl font-bold text-forest-600 mt-1">{stats.started}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">Not Started Yet</p>
              <p className="text-3xl font-bold text-gold-600 mt-1">{stats.notStarted}</p>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">All Leads</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      S/N
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Current Step
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead, index) => {
                    const stepLabel =
                      lead.currentStep >= 0 && lead.currentStep < STEP_LABELS.length
                        ? STEP_LABELS[lead.currentStep]
                        : "Not started"

                    return (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {lead.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {lead.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              lead.currentStep > 0
                                ? "bg-forest-100 text-forest-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {lead.currentStep > 0 ? stepLabel : "Not started"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(lead.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {leads.length === 0 && !error && (
                <div className="text-center py-16">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No leads yet</h3>
                  <p className="mt-1 text-gray-500">
                    Leads captured from the landing page will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


