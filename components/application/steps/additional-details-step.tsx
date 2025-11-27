"use client"

import { useFormContext } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"

export function AdditionalDetailsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Additional Details</h2>

      <FormField label="Special Needs or Learning Support" error={errors.additional?.specialNeeds?.message as string}>
        <textarea
          {...register("additional.specialNeeds")}
          rows={3}
          placeholder="Please describe any special educational needs or learning support required"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        />
      </FormField>

      <FormField label="Previous School Issues" error={errors.additional?.previousSchoolIssues?.message as string}>
        <textarea
          {...register("additional.previousSchoolIssues")}
          rows={3}
          placeholder="Any behavioral, academic, or social issues from previous schools"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        />
      </FormField>

      <FormField label="Siblings at Greensprings School" error={errors.additional?.siblingsAtSchool?.message as string}>
        <textarea
          {...register("additional.siblingsAtSchool")}
          rows={2}
          placeholder="List any siblings currently attending Greensprings School (name and year)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        />
      </FormField>

      <FormField
        label="How did you hear about Greensprings School?"
        error={errors.additional?.howDidYouHear?.message as string}
      >
        <select
          {...register("additional.howDidYouHear")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        >
          <option value="">Select an option</option>
          <option value="website">School Website</option>
          <option value="social_media">Social Media</option>
          <option value="referral">Referral from Current Parent</option>
          <option value="advertisement">Advertisement</option>
          <option value="education_fair">Education Fair</option>
          <option value="other">Other</option>
        </select>
      </FormField>
    </div>
  )
}
