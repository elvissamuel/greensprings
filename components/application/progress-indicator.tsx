"use client"

import { Check } from "lucide-react"

type Props = {
  steps: string[]
  currentStep: number
}

export function ProgressIndicator({ steps, currentStep }: Props) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div key={step} className="relative">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute left-5 top-10 w-0.5 h-12 ${
                  isCompleted ? "bg-forest-600" : "bg-gray-200"
                }`}
              />
            )}

            <div className="flex items-start gap-4 pb-8">
              {/* Step circle */}
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 border-2 transition-all ${
                  isCompleted
                    ? "bg-forest-600 border-forest-600 text-white"
                    : isCurrent
                    ? "bg-white border-maroon-700 text-maroon-700"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step label */}
              <div className="pt-2">
                <p
                  className={`text-sm font-medium leading-tight ${
                    isCompleted
                      ? "text-forest-700"
                      : isCurrent
                      ? "text-maroon-800"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
