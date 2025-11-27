"use client"

import { useFormContext } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"

type Campus = {
  id: string
  name: string
  fee: number
}

type AcademicYear = {
  id: string
  year: string
}

type Props = {
  campuses: Campus[]
  academicYears: AcademicYear[]
}

export function ApplicationInfoStep({ campuses, academicYears }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Application Information</h2>

      <FormField label="Campus" error={errors.campusId?.message as string} required>
        <select
          {...register("campusId")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        >
          <option value="">Select a campus</option>
          {campuses.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Academic Year" error={errors.academicYearId?.message as string} required>
        <select
          {...register("academicYearId")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        >
          <option value="">Select academic year</option>
          {academicYears.map((year) => (
            <option key={year.id} value={year.id}>
              {year.year}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Applying As" error={errors.applyingAs?.message as string} required>
        <select
          {...register("applyingAs")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        >
          <option value="">Select Application Type</option>
          <option value="day_student">Day Student</option>
          <option value="boarding_student">Boarding Student</option>
        </select>
      </FormField>
    </div>
  )
}
