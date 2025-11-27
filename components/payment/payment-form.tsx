"use client"

import { formatCurrency } from "@/lib/utils"

type Application = {
  id: string
  applicant: {
    firstName: string
    lastName: string
  } | null
  campus: {
    id: string
    name: string
    fee: number
  }
}

type Props = {
  application: Application
}

export function PaymentForm({ application }: Props) {
  const subtotal = application.campus.fee
  const tax = 0 // 0% tax
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr className="text-left">
                <th className="py-3 text-sm font-medium text-gray-700">#</th>
                <th className="py-3 text-sm font-medium text-gray-700">Child Name</th>
                <th className="py-3 text-sm font-medium text-gray-700">Item & Description</th>
                <th className="py-3 text-sm font-medium text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 text-sm text-gray-900">1</td>
                <td className="py-4 text-sm text-gray-900">
                  {application.applicant?.firstName} {application.applicant?.lastName}
                </td>
                <td className="py-4 text-sm text-gray-700">
                  <div>
                    <p className="font-medium">Application Fee</p>
                    <p className="text-xs text-gray-500">{application.campus.name}</p>
                  </div>
                </td>
                <td className="py-4 text-sm font-medium text-gray-900">{formatCurrency(subtotal, "NGN")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium text-gray-900">{formatCurrency(subtotal, "NGN")}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Tax (0%):</span>
            <span className="font-medium text-gray-900">{formatCurrency(tax, "NGN")}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
            <span className="text-gray-900">Total:</span>
            <span className="text-maroon-800">{formatCurrency(total, "NGN")}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Bank Transfer Details</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please make payment to the account below and send proof of payment to the email addresses provided.
        </p>

        <div className="bg-maroon-50 border border-maroon-200 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-maroon-600 uppercase tracking-wide mb-1">Bank</p>
              <p className="text-lg font-semibold text-maroon-900">Union Bank PLC</p>
            </div>
            <div>
              <p className="text-xs font-medium text-maroon-600 uppercase tracking-wide mb-1">Account Number</p>
              <p className="text-lg font-semibold text-maroon-900 font-mono">0062082425</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-maroon-600 uppercase tracking-wide mb-1">Account Name</p>
            <p className="text-lg font-semibold text-maroon-900">Greensprings Educational Services Ltd</p>
          </div>

          <div>
            <p className="text-xs font-medium text-maroon-600 uppercase tracking-wide mb-1">Sort Code</p>
            <p className="text-lg font-semibold text-maroon-900 font-mono">032156825</p>
          </div>
        </div>

        <div className="mt-6 bg-gold-50 border border-gold-200 rounded-xl p-6">
          <h3 className="font-semibold text-gold-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Payment Confirmation To
          </h3>
          <div className="space-y-2">
            <a 
              href="mailto:finance.anthony@greenspringsschool.com" 
              className="block text-maroon-700 hover:text-maroon-900 font-medium"
            >
              finance.anthony@greenspringsschool.com
            </a>
            <a 
              href="mailto:admission.anthony@greenspringsschool.com" 
              className="block text-maroon-700 hover:text-maroon-900 font-medium"
            >
              admission.anthony@greenspringsschool.com
            </a>
          </div>
        </div>

        <div className="mt-6 bg-forest-50 border border-forest-200 rounded-lg p-4">
          <p className="text-sm text-forest-800">
            <strong>Important:</strong> Please include the applicant&apos;s name ({application.applicant?.firstName} {application.applicant?.lastName}) 
            and application reference in your payment description and confirmation email.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">NDPR Compliance</h3>
        <p className="text-sm text-blue-800">
          Greensprings School collects and processes personal data supplied in this application under the Nigerian Data
          Protection Regulation (NDPR, 2019). Data will be used for admissions processes and related communications. By
          submitting you consent to this processing.
        </p>
      </div>
    </div>
  )
}
