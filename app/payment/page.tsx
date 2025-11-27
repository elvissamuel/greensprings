import { prisma } from "@/lib/prisma"
import { PaymentForm } from "@/components/payment/payment-form"
import { redirect } from "next/navigation"

type Props = {
  searchParams: Promise<{ applicationId?: string }>
}

export default async function PaymentPage(props: Props) {
  const searchParams = await props.searchParams
  const applicationId = searchParams.applicationId

  if (!applicationId) {
    redirect("/apply")
  }

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      applicant: true,
      campus: true,
      payment: true,
    },
  })

  if (!application) {
    redirect("/apply")
  }

  // Check if payment already exists
  if (application.payment?.status === "completed") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Completed</h1>
              <p className="text-gray-600">Payment for this application has already been processed.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Payment</h1>
            <p className="text-gray-600">Complete your payment to process your application.</p>
          </div>

          <PaymentForm application={application} />
        </div>
      </div>
    </div>
  )
}
