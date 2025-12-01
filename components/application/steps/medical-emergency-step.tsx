"use client"

import { useFormContext } from "react-hook-form"
import { FormField } from "@/components/ui/form-field"

export function MedicalEmergencyStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Medical & Emergency Contact</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Emergency Contact</h3>
        <p className="text-sm text-blue-800">
          Please provide an emergency contact who can be reached if parents/guardians are unavailable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Emergency Contact Name"
          error={(errors.medical as any)?.emergencyContactName?.message as string}
          required
        >
          <input
            type="text"
            {...register("medical.emergencyContactName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
          />
        </FormField>

        <FormField
          label="Emergency Contact Phone"
          error={(errors.medical as any)?.emergencyContactPhone?.message as string}
          required
        >
          <input
            type="tel"
            {...register("medical.emergencyContactPhone")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
          />
        </FormField>

        <FormField
          label="Relationship"
          error={(errors.medical as any)?.emergencyContactRelationship?.message as string}
          required
        >
          <input
            type="text"
            {...register("medical.emergencyContactRelationship")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
          />
        </FormField>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-blue-900 mb-2">Medical Information</h3>
        <p className="text-sm text-blue-800">Please provide any relevant medical information about the child.</p>
      </div>

      <FormField label="Medical Conditions" error={(errors.medical as any)?.medicalConditions?.message as string}>
        <textarea
          {...register("medical.medicalConditions")}
          rows={3}
          placeholder="List any medical conditions, disabilities, or health concerns"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        />
      </FormField>

      <FormField label="Allergies" error={(errors.medical as any)?.allergies?.message as string}>
        <textarea
          {...register("medical.allergies")}
          rows={2}
          placeholder="List any known allergies (food, medication, environmental)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        />
      </FormField>

      <FormField label="Current Medications" error={(errors.medical as any)?.medications?.message as string}>
        <textarea
          {...register("medical.medications")}
          rows={2}
          placeholder="List any medications the child is currently taking"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Family Doctor Name" error={(errors.medical as any)?.doctorName?.message as string}>
          <input
            type="text"
            {...register("medical.doctorName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
          />
        </FormField>

        <FormField label="Family Doctor Phone" error={(errors.medical as any)?.doctorPhone?.message as string}>
          <input
            type="tel"
            {...register("medical.doctorPhone")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent"
          />
        </FormField>
      </div>
    </div>
  )
}
