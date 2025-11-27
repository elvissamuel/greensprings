"use client"

import { useFormContext } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"

export function ChildLivesWithStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const livesWith = watch("student.livesWith")

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Child Lives With</h2>

      <FormField label="The child currently lives with" error={errors.student?.livesWith?.message as string} required>
        <select
          {...register("student.livesWith")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        >
          <option value="both_parents">Both Parents</option>
          <option value="mother">Mother</option>
          <option value="father">Father</option>
          <option value="guardian">Guardian</option>
          <option value="other">Other</option>
        </select>
      </FormField>

      {livesWith === "other" && (
        <FormField label="Please specify" error={errors.student?.livesWithOther?.message as string} required>
          <input
            type="text"
            {...register("student.livesWithOther")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
          />
        </FormField>
      )}
    </div>
  )
}
