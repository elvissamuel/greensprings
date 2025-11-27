"use client"
import { ParentForm } from "@/components/application/parent-form"

export function ParentsGuardianStep() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Parents/Guardian Information</h2>

      <ParentForm type="father" label="Father's Details" />
      <ParentForm type="mother" label="Mother's Details" />
      <ParentForm type="guardian" label="Guardian's Details (Optional)" />
    </div>
  )
}
