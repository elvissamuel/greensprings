import { z } from "zod"

// String validations - Prisma schema uses String type, not enums
// These are validated as strings with optional constraints

// Student/Applicant schema
const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  middleName: z.string().max(100).optional().or(z.literal("")),
  lastName: z.string().min(1, "Last name is required").max(100),
  dateOfBirth: z.string().min(1, "Date of birth is required").refine(
    (date) => {
      const d = new Date(date)
      return !isNaN(d.getTime())
    },
    { message: "Invalid date format" }
  ),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required").max(100),
  address: z.string().min(1, "Address is required").max(500),
  homeLanguage: z.string().min(1, "Home language is required").max(100),
  firstLanguage: z.string().min(1, "First language is required").max(100),
  ethnicity: z.string().max(100).optional().or(z.literal("")),
  yearAppliedFor: z.string().min(1, "Year applied for is required").max(50),
  stateOfOrigin: z.string().min(1, "State of origin is required").max(100),
  lga: z.string().min(1, "LGA is required").max(100),
  requireBus: z.boolean().default(false),
  religion: z.string().max(100).optional().or(z.literal("")),
  placeOfBirth: z.string().min(1, "Place of birth is required").max(100),
  livesWith: z.string().min(1, "This field is required"),
  livesWithOther: z.string().max(200).optional().or(z.literal("")),
})

// Parent schema
const parentSchema = z.object({
  type: z.string().min(1, "Parent type is required"),
  detailsNotAvailable: z.boolean().default(false),
  title: z.string().max(50).optional().or(z.literal("")),
  firstName: z.string().max(100).optional().or(z.literal("")),
  middleName: z.string().max(100).optional().or(z.literal("")),
  lastName: z.string().max(100).optional().or(z.literal("")),
  nationality: z.string().max(100).optional().or(z.literal("")),
  address: z.string().max(500).optional().or(z.literal("")),
  email: z
    .string()
    .email("Invalid email format")
    .max(255)
    .optional()
    .or(z.literal("")),
  mobilePhone: z.string().max(50).optional().or(z.literal("")),
  workPhone: z.string().max(50).optional().or(z.literal("")),
  occupation: z.string().max(200).optional().or(z.literal("")),
  companyName: z.string().max(200).optional().or(z.literal("")),
  companyAddress: z.string().max(500).optional().or(z.literal("")),
  nin: z.string().max(50).optional().or(z.literal("")),
})

// School record schema
const schoolRecordSchema = z.object({
  schoolName: z.string().min(1, "School name is required").max(200),
  yearAttended: z.string().min(1, "Year attended is required").max(50),
  cityCountry: z.string().min(1, "City/Country is required").max(200),
  classLevel: z.string().min(1, "Class/Level is required").max(50),
})

// Medical/Emergency schema
const medicalSchema = z.object({
  emergencyContactName: z.string().min(1, "Emergency contact name is required").max(200),
  emergencyContactPhone: z.string().min(1, "Emergency contact phone is required").max(50),
  emergencyContactRelationship: z.string().min(1, "Emergency contact relationship is required").max(100),
  medicalConditions: z.string().max(1000).optional().or(z.literal("")),
  allergies: z.string().max(1000).optional().or(z.literal("")),
  medications: z.string().max(1000).optional().or(z.literal("")),
  doctorName: z.string().max(200).optional().or(z.literal("")),
  doctorPhone: z.string().max(50).optional().or(z.literal("")),
})

// Additional details schema
const additionalSchema = z.object({
  linksToSchool: z.string().max(200).optional().or(z.literal("")),
  linksToSchoolOther: z.string().max(500).optional().or(z.literal("")),
  howDidYouHear: z.string().max(200).optional().or(z.literal("")),
})

// Declaration schema
const declarationSchema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to continue",
  }),
  agreeToDataProcessing: z.boolean().refine((val) => val === true, {
    message: "You must consent to data processing to continue",
  }),
})

// Main application form schema
export const applicationFormSchema = z
  .object({
    campusId: z.string().min(1, "Campus is required"),
    academicYearId: z.string().min(1, "Academic year is required"),
    applyingAs: z.string().min(1, "Applying as is required"),
    student: studentSchema,
    schools: z
      .array(schoolRecordSchema)
      .min(1, "At least one school record is required")
      .refine(
        (schools) => {
          return schools.every(
            (school) =>
              school.schoolName &&
              school.yearAttended &&
              school.cityCountry &&
              school.classLevel
          )
        },
        { message: "All school fields are required" }
      ),
    parents: z.object({
      father: parentSchema,
      mother: parentSchema,
      guardian: parentSchema.optional(),
    }),
    medical: medicalSchema,
    additional: additionalSchema,
    declaration: declarationSchema,
  })
  .superRefine((data, ctx) => {
    // Validate livesWithOther when livesWith is "other"
    if (data.student.livesWith === "other" && !data.student.livesWithOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify who the child lives with",
        path: ["student", "livesWithOther"],
      })
    }

    // Validate father details if not marked as unavailable
    if (!data.parents.father.detailsNotAvailable) {
      if (!data.parents.father.firstName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "First name is required",
          path: ["parents", "father", "firstName"],
        })
      }
      if (!data.parents.father.lastName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Last name is required",
          path: ["parents", "father", "lastName"],
        })
      }
      if (!data.parents.father.mobilePhone?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mobile phone is required",
          path: ["parents", "father", "mobilePhone"],
        })
      }
    }

    // Validate mother details if not marked as unavailable
    if (!data.parents.mother.detailsNotAvailable) {
      if (!data.parents.mother.firstName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "First name is required",
          path: ["parents", "mother", "firstName"],
        })
      }
      if (!data.parents.mother.lastName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Last name is required",
          path: ["parents", "mother", "lastName"],
        })
      }
      if (!data.parents.mother.mobilePhone?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mobile phone is required",
          path: ["parents", "mother", "mobilePhone"],
        })
      }
    }
  })

// Type export for TypeScript
export type ApplicationFormData = z.infer<typeof applicationFormSchema>

// Schema for API validation (same as form schema)
export const applicationApiSchema = applicationFormSchema

