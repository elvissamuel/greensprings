"use client"

import { useFormContext, FieldErrors } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"

export function StudentDetailsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const studentErrors = errors.student as FieldErrors | undefined

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Surname" error={studentErrors?.lastName?.message as string} required>
          <input
            type="text"
            {...register("student.lastName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>

        <FormField label="First Name" error={studentErrors?.firstName?.message as string} required>
          <input
            type="text"
            {...register("student.firstName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>

        <FormField label="Other Name(s)" error={studentErrors?.middleName?.message as string}>
          <input
            type="text"
            {...register("student.middleName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Date of Birth" error={studentErrors?.dateOfBirth?.message as string} required>
          <input
            type="date"
            {...register("student.dateOfBirth")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>

        <FormField label="Gender" error={studentErrors?.gender?.message as string} required>
          <select
            {...register("student.gender")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </FormField>
      </div>

      <FormField label="Nationality" error={studentErrors?.nationality?.message as string} required>
        <input
          type="text"
          {...register("student.nationality")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
        />
      </FormField>

      <FormField label="Address" error={studentErrors?.address?.message as string} required>
        <textarea
          {...register("student.address")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Home Language" error={studentErrors?.homeLanguage?.message as string} required>
          <input
            type="text"
            {...register("student.homeLanguage")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>

        <FormField label="First Language" error={studentErrors?.firstLanguage?.message as string} required>
          <input
            type="text"
            {...register("student.firstLanguage")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField label="Ethnicity" error={studentErrors?.ethnicity?.message as string}>
        <input
          type="text"
          {...register("student.ethnicity")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
        />
      </FormField>
      <FormField label="Religion" error={studentErrors?.religion?.message as string}>
          <select
            {...register("student.religion")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          >
            <option value="">Select religion</option>
            <option value="christianity">Christianity</option>
            <option value="islam">Islam</option>
            <option value="others">Others</option>
          </select>
        </FormField>
      </div>

      

      <FormField label="Year Applied For" error={studentErrors?.yearAppliedFor?.message as string} required>
        <input
          type="text"
          placeholder="e.g., Year 1, Year 7"
          {...register("student.yearAppliedFor")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="State of Origin" error={studentErrors?.stateOfOrigin?.message as string} required>
          <input
            type="text"
            {...register("student.stateOfOrigin")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>

        <FormField label="Local Government Area (LGA)" error={studentErrors?.lga?.message as string} required>
          <input
            type="text"
            {...register("student.lga")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Place of Birth" error={studentErrors?.placeOfBirth?.message as string} required>
          <input
            type="text"
            {...register("student.placeOfBirth")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
          />
        </FormField>

        
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="requireBus"
          {...register("student.requireBus")}
          className="w-4 h-4 text-maroon-700 border-gray-300 rounded focus:ring-maroon-500"
        />
        <label htmlFor="requireBus" className="ml-2 text-sm text-gray-700">
          Requires school bus service
        </label>
      </div>
    </div>
  )
}
