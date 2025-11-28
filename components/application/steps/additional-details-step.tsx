"use client"

import { useFormContext } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"

export function AdditionalDetailsStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()

  const linksToSchool = watch("additional.linksToSchool")

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Additional Details</h2>

      <FormField
        label="Links to the School"
        error={(errors.additional as any)?.linksToSchool?.message as string}
      >
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="links-old-students"
              value="old_students"
              {...register("additional.linksToSchool")}
              className="w-4 h-4 text-maroon-600 border-gray-300 focus:ring-maroon-600"
            />
            <label htmlFor="links-old-students" className="ml-2 text-gray-900">
              Old Students
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="links-current-students"
              value="current_students"
              {...register("additional.linksToSchool")}
              className="w-4 h-4 text-maroon-600 border-gray-300 focus:ring-maroon-600"
            />
            <label htmlFor="links-current-students" className="ml-2 text-gray-900">
              Current Students
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="links-staff"
              value="staff"
              {...register("additional.linksToSchool")}
              className="w-4 h-4 text-maroon-600 border-gray-300 focus:ring-maroon-600"
            />
            <label htmlFor="links-staff" className="ml-2 text-gray-900">
              Staff
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="links-family-member"
              value="family_member"
              {...register("additional.linksToSchool")}
              className="w-4 h-4 text-maroon-600 border-gray-300 focus:ring-maroon-600"
            />
            <label htmlFor="links-family-member" className="ml-2 text-gray-900">
              Family Member
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="links-social-connections"
              value="social_connections"
              {...register("additional.linksToSchool")}
              className="w-4 h-4 text-maroon-600 border-gray-300 focus:ring-maroon-600"
            />
            <label htmlFor="links-social-connections" className="ml-2 text-gray-900">
              Social Connections
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="links-none"
              value="none"
              {...register("additional.linksToSchool")}
              className="w-4 h-4 text-maroon-600 border-gray-300 focus:ring-maroon-600"
            />
            <label htmlFor="links-none" className="ml-2 text-gray-900">
              None
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="links-other"
              value="other"
              {...register("additional.linksToSchool")}
              className="w-4 h-4 text-maroon-600 border-gray-300 focus:ring-maroon-600"
            />
            <label htmlFor="links-other" className="ml-2 text-gray-900">
              Other (specify)
            </label>
          </div>
        </div>

        {linksToSchool === "other" && (
          <div className="mt-3">
            <input
              type="text"
              {...register("additional.linksToSchoolOther")}
              placeholder="Please specify"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
            />
            {(errors.additional as any)?.linksToSchoolOther && (
              <p className="mt-1 text-sm text-red-600">
                {(errors.additional as any).linksToSchoolOther.message as string}
              </p>
            )}
          </div>
        )}
      </FormField>

      <FormField
        label="How did you hear about Greensprings School?"
        error={(errors.additional as any)?.howDidYouHear?.message as string}
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
