"use client"

type Props = {
  onStartNew: () => void
  onProceedToPayment: () => void
}

export function SubmissionModal({ onStartNew, onProceedToPayment }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600">
            Your application was submitted successfully. You will now be redirected to pay the Application Fee.
          </p>
          <p className="text-gray-600 mt-4 font-medium">Would you like to fill another form?</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onStartNew}
            className="w-full px-6 py-3 border-2 border-maroon-800 text-maroon-800 rounded-lg hover:bg-maroon-50 font-semibold transition-colors"
          >
            Yes, I would!
          </button>
          <button
            onClick={onProceedToPayment}
            className="w-full px-6 py-3 bg-maroon-800 text-white rounded-lg hover:bg-maroon-900 font-semibold transition-colors"
          >
            No, proceed to Payment!
          </button>
        </div>
      </div>
    </div>
  )
}
