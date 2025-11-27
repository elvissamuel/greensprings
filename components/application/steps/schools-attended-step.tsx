"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"

export function SchoolsAttendedStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schools",
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Schools Attended</h2>
        <button
          type="button"
          onClick={() => append({ schoolName: "", yearAttended: "", cityCountry: "", classLevel: "" })}
          className="px-4 py-2 text-sm bg-maroon-800 text-white rounded-lg hover:bg-maroon-900"
        >
          Add School
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900">School {index + 1}</h3>
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="text-red-600 hover:text-red-700 text-sm">
                Remove
              </button>
            )}
          </div>

          <FormField label="School Name" error={errors.schools?.[index]?.schoolName?.message as string} required>
            <input
              type="text"
              {...register(`schools.${index}.schoolName` as const)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Year Attended" error={errors.schools?.[index]?.yearAttended?.message as string} required>
              <input
                type="text"
                placeholder="e.g., 2020-2022"
                {...register(`schools.${index}.yearAttended` as const)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
              />
            </FormField>

            <FormField label="City/Country" error={errors.schools?.[index]?.cityCountry?.message as string} required>
              <input
                type="text"
                {...register(`schools.${index}.cityCountry` as const)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
              />
            </FormField>
          </div>

          <FormField label="Class/Level" error={errors.schools?.[index]?.classLevel?.message as string} required>
            <input
              type="text"
              placeholder="e.g., Year 5, Grade 3"
              {...register(`schools.${index}.classLevel` as const)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
            />
          </FormField>
        </div>
      ))}
    </div>
  )
}
