"use client"

import { useFormContext } from "react-hook-form"

export function DeclarationStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Declaration</h2>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6">
        <h3 className="font-bold text-amber-900 mb-4 text-lg">Important: Data Protection & School Policies</h3>
        <p className="text-amber-900 mb-4 leading-relaxed">
          By submitting this application you consent to storage and processing of supplied personal data in accordance
          with the Nigerian Data Protection Regulation (NDPR, 2019). Greensprings School maintains a zero-tolerance
          policy for abuse, violence, discrimination and bullying. Parents give permission for child images to be used
          by the school unless a written opt-out is submitted.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeToTerms"
            {...register("declaration.agreeToTerms")}
            className="w-5 h-5 text-maroon-700 border-gray-300 rounded focus:ring-maroon-600 mt-1"
          />
          <label htmlFor="agreeToTerms" className="ml-3 text-gray-900">
            I declare that all information provided in this application is true and accurate to the best of my
            knowledge. I understand that providing false information may result in the rejection of this application or
            dismissal from the school.
            <span className="text-red-600 ml-1">*</span>
          </label>
        </div>
        {errors.declaration?.agreeToTerms && (
          <p className="text-red-600 text-sm ml-8">{errors.declaration.agreeToTerms.message as string}</p>
        )}

        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeToDataProcessing"
            {...register("declaration.agreeToDataProcessing")}
            className="w-5 h-5 text-maroon-700 border-gray-300 rounded focus:ring-maroon-600 mt-1"
          />
          <label htmlFor="agreeToDataProcessing" className="ml-3 text-gray-900">
            I consent to the collection, storage, and processing of personal data provided in this application in
            accordance with the Nigerian Data Protection Regulation (NDPR, 2019) for the purposes of admission
            processing and school communications.
            <span className="text-red-600 ml-1">*</span>
          </label>
        </div>
        {errors.declaration?.agreeToDataProcessing && (
          <p className="text-red-600 text-sm ml-8">{errors.declaration.agreeToDataProcessing.message as string}</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> After submitting this application, you will be redirected to pay the application fee.
          Your application will not be processed until payment is received.
        </p>
      </div>
    </div>
  )
}
