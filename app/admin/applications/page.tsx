import { prisma } from "@/lib/prisma"
import { formatCurrency } from "@/lib/utils"
import { AdminHeader } from "@/components/admin/admin-header"
import { ApplicationActions } from "@/components/admin/application-actions"
import { Prisma } from "@prisma/client"

// Disable caching for this page to ensure fresh data
export const revalidate = 0
export const dynamic = "force-dynamic"

type ApplicationWithRelations = Prisma.ApplicationGetPayload<{
  include: {
    applicant: true
    campus: true
    academicYear: true
    payment: true
    documents: true
  }
}>

export default async function AdminApplicationsPage() {
  let applications: ApplicationWithRelations[] = []
  let error: string | null = null

  try {
    // First, get the total count to verify database connection
    const totalCount = await prisma.application.count()
    
    // Fetch all applications with all relations
    applications = await prisma.application.findMany({
      include: {
        applicant: true,
        campus: true,
        academicYear: true,
        payment: true,
        documents: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Log for debugging
    console.log(`[Admin Applications] Total count: ${totalCount}, Fetched: ${applications.length}`)
    
    // Warn if there's a mismatch
    if (totalCount !== applications.length) {
      console.warn(
        `[Admin Applications] Mismatch detected! Database has ${totalCount} records but query returned ${applications.length}`
      )
    }
  } catch (err) {
    console.error("Error fetching applications:", err)
    error = err instanceof Error ? err.message : "Failed to load applications"
  }

  const stats = {
    total: applications.length,
    submitted: applications.filter((a) => a.status === "submitted").length,
    pending: applications.filter((a) => a.status === "pending").length,
    paid: applications.filter((a) => a.payment?.status === "completed").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-1">Manage and review submitted applications</p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">Error: {error}</p>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">Submitted</p>
              <p className="text-3xl font-bold text-forest-600 mt-1">{stats.submitted}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-gold-600 mt-1">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm font-medium text-gray-500">Payment Confirmed</p>
              <p className="text-3xl font-bold text-maroon-700 mt-1">{stats.paid}</p>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">All Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Application ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Campus
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {app.id.slice(0, 8)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {app.applicant?.firstName} {app.applicant?.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{app.applicant?.yearAppliedFor}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {app.campus.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.status === "submitted"
                              ? "bg-forest-100 text-forest-800"
                              : app.status === "pending"
                                ? "bg-gold-100 text-gold-800"
                                : app.status === "under_review"
                                  ? "bg-blue-100 text-blue-800"
                                  : app.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : app.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {app.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {app.payment ? (
                          <div>
                            <span
                              className={`font-medium ${
                                app.payment.status === "completed"
                                  ? "text-forest-600"
                                  : "text-gold-600"
                              }`}
                            >
                              {formatCurrency(app.payment.amount, "NGN")}
                            </span>
                            <p className="text-xs text-gray-500 capitalize">{app.payment.status}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not paid</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{app.documents.length} files</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {app.submittedAt
                          ? new Date(app.submittedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : <span className="text-gray-400">Not submitted</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <ApplicationActions
                          applicationId={app.id}
                          hasPayment={!!app.payment}
                          paymentStatus={app.payment?.status || null}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {applications.length === 0 && (
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No applications yet</h3>
                  <p className="mt-1 text-gray-500">Applications will appear here once submitted.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
