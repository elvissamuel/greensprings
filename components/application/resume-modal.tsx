"use client"

import { formatSavedDate } from "@/hooks/use-form-persistence"

type Props = {
  savedAt: string
  savedStep: number
  stepName: string
  documentCount: number
  onResume: () => void
  onStartFresh: () => void
}

export function ResumeApplicationModal({
  savedAt,
  savedStep,
  stepName,
  documentCount,
  onResume,
  onStartFresh,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-maroon-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Continue Your Application?
          </h2>
          <p className="text-gray-600">
            We found a saved application from your previous session.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last saved:</span>
            <span className="font-medium text-gray-900">{formatSavedDate(savedAt)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress:</span>
            <span className="font-medium text-gray-900">Step {savedStep + 1} - {stepName}</span>
          </div>
          {documentCount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Documents uploaded:</span>
              <span className="font-medium text-amber-600">{documentCount} (need re-upload)</span>
            </div>
          )}
        </div>

        {documentCount > 0 && (
          <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg mb-6">
            <strong>Note:</strong> For security, uploaded documents are not saved locally. You&apos;ll need to re-upload them.
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={onResume}
            className="w-full px-6 py-3 bg-maroon-800 text-white rounded-lg hover:bg-maroon-900 font-semibold transition-colors"
          >
            Continue Application
          </button>
          <button
            onClick={onStartFresh}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Start Fresh
          </button>
        </div>
      </div>
    </div>
  )
}

