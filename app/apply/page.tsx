import Image from "next/image"
import Link from "next/link"
import ApplicationForm from "@/components/application/application-form"
import { LeadIdRedirect } from "@/components/apply/lead-id-redirect"
import { prisma } from "@/lib/prisma"

type ApplyPageProps = {
  searchParams: {
    leadId?: string
  }
}

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  try {
    const [campuses, academicYears, lead] = await Promise.all([
      prisma.campus.findMany({
        where: { active: true },
        orderBy: { name: "asc" },
      }),
      prisma.academicYear.findMany({
        where: { active: true },
        orderBy: { year: "desc" },
      }),
      searchParams.leadId
        ? prisma.lead.findUnique({
            where: { id: searchParams.leadId },
          })
        : Promise.resolve(null),
    ])

    return (
      <div className="min-h-screen bg-gradient-to-br from-maroon-50 via-gray-50 to-forest-50">
        {/* Client-side redirect to add leadId from localStorage to URL */}
        <LeadIdRedirect />

        {/* Header */}
        <header className="bg-white border-b border-maroon-100 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/GSL-Logo.png"
                  alt="Greensprings School Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <div className="hidden sm:block">
                  <p className="font-bold text-maroon-800">Greensprings School</p>
                  <p className="text-xs text-forest-700">Admissions Portal</p>
                </div>
              </Link>
              <Link
                href="/"
                className="text-sm text-maroon-700 hover:text-maroon-900 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-maroon-100 p-6 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-maroon-900 mb-2">
                Application Form
              </h1>
              <p className="text-gray-600">
                Please complete all sections of the application form accurately. Your progress is automatically saved.
              </p>
            </div>

            <ApplicationForm
              campuses={campuses}
              academicYears={academicYears}
              leadContact={
                lead
                  ? {
                      name: lead.name,
                      email: lead.email,
                      phone: lead.phone,
                    }
                  : undefined
              }
              leadId={lead?.id}
            />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("[v0] Database error:", error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-maroon-50 via-gray-50 to-forest-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-red-900 mb-2">Database Setup Required</h2>
              <p className="text-red-700 mb-4">
                The database needs to be initialized before you can use the application form.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-red-900">
                <li>
                  Run the Prisma migration: <code className="bg-red-100 px-2 py-1 rounded">npx prisma migrate dev</code>
                </li>
                <li>
                  Seed the database: <code className="bg-red-100 px-2 py-1 rounded">npx prisma db seed</code>
                </li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
