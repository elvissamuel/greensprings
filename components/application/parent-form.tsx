"use client"

import { useFormContext, FieldErrors } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"

type Props = {
  type: "father" | "mother" | "guardian"
  label: string
}

export function ParentForm({ type, label }: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const detailsNotAvailable = watch(`parents.${type}.detailsNotAvailable`)
  
  const parentsErrors = errors.parents as Record<string, FieldErrors> | undefined
  const parentErrors = parentsErrors?.[type]

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{label}</h3>

      <div className="flex items-center">
        <input
          type="checkbox"
          id={`${type}-details-not-available`}
          {...register(`parents.${type}.detailsNotAvailable`)}
          className="w-4 h-4 text-maroon-700 border-gray-300 rounded focus:ring-maroon-500"
        />
        <label htmlFor={`${type}-details-not-available`} className="ml-2 text-sm text-gray-700">
          Details Not Available
        </label>
      </div>

      {!detailsNotAvailable && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField label="Title" error={parentErrors?.title?.message as string}>
              <select
                {...register(`parents.${type}.title`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
              </select>
            </FormField>

            <FormField label="First Name" error={parentErrors?.firstName?.message as string} required>
              <input
                type="text"
                {...register(`parents.${type}.firstName`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Middle Name" error={parentErrors?.middleName?.message as string}>
              <input
                type="text"
                {...register(`parents.${type}.middleName`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Last Name" error={parentErrors?.lastName?.message as string} required>
              <input
                type="text"
                {...register(`parents.${type}.lastName`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
            </FormField>
          </div>

          <FormField label="Nationality" error={parentErrors?.nationality?.message as string}>
            <input
              type="text"
              {...register(`parents.${type}.nationality`)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Address" error={parentErrors?.address?.message as string}>
            <textarea
              {...register(`parents.${type}.address`)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Email" error={parentErrors?.email?.message as string}>
              <input
                type="email"
                {...register(`parents.${type}.email`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Mobile Phone" error={parentErrors?.mobilePhone?.message as string} required>
              <input
                type="tel"
                {...register(`parents.${type}.mobilePhone`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Work Phone" error={parentErrors?.workPhone?.message as string}>
              <input
                type="tel"
                {...register(`parents.${type}.workPhone`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Occupation" error={parentErrors?.occupation?.message as string}>
              <input
                type="text"
                {...register(`parents.${type}.occupation`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
            </FormField>
          </div>

          <FormField label="Company Name" error={parentErrors?.companyName?.message as string}>
            <input
              type="text"
              {...register(`parents.${type}.companyName`)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Company Address" error={parentErrors?.companyAddress?.message as string}>
            <textarea
              {...register(`parents.${type}.companyAddress`)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </FormField>

          <FormField
            label="National Identification Number (NIN)"
            error={parentErrors?.nin?.message as string}
          >
            <input
              type="text"
              {...register(`parents.${type}.nin`)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </FormField>
        </>
      )}
    </div>
  )
}
