import { z } from "zod"

// Step 1: Student Details
export const studentDetailsSchema = z.object({
  firstName: z.string().min(1, "This field is required."),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "This field is required."),
  dateOfBirth: z.string().min(1, "This field is required."),
  gender: z.enum(["male", "female"], { required_error: "This field is required." }),
  nationality: z.string().min(1, "This field is required."),
  address: z.string().min(1, "This field is required."),
  homeLanguage: z.string().min(1, "This field is required."),
  firstLanguage: z.string().min(1, "This field is required."),
  ethnicity: z.string().optional(),
  yearAppliedFor: z.string().min(1, "This field is required."),
  stateOfOrigin: z.string().min(1, "This field is required."),
  lga: z.string().min(1, "This field is required."),
  requireBus: z.boolean().default(false),
  religion: z.string().optional(),
  placeOfBirth: z.string().min(1, "This field is required."),
})

// Step 2: Child Lives With
const childLivesWithBaseSchema = z.object({
  livesWith: z.enum(["both_parents", "mother", "father", "guardian", "other"], {
    required_error: "This field is required.",
  }),
  livesWithOther: z.string().optional(),
})

export const childLivesWithSchema = childLivesWithBaseSchema.refine(
  (data) => {
    if (data.livesWith === "other") {
      return !!data.livesWithOther
    }
    return true
  },
  {
    message: "Please specify who the child lives with",
    path: ["livesWithOther"],
  },
)

// Step 3: Schools Attended
export const schoolRecordSchema = z.object({
  schoolName: z.string().min(1, "This field is required."),
  yearAttended: z.string().min(1, "This field is required."),
  cityCountry: z.string().min(1, "This field is required."),
  classLevel: z.string().min(1, "This field is required."),
})

export const schoolsAttendedSchema = z.object({
  schools: z.array(schoolRecordSchema).min(1, "At least one school record is required."),
})

// Step 4: Parents/Guardian
export const parentSchema = z
  .object({
    type: z.enum(["FATHER", "MOTHER", "GUARDIAN", "OTHER"]),
    detailsNotAvailable: z.boolean().default(false),
    title: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    mobilePhone: z.string().optional(),
    workPhone: z.string().optional(),
    occupation: z.string().optional(),
    companyName: z.string().optional(),
    companyAddress: z.string().optional(),
    nin: z.string().optional(),
  })
  .refine(
    (data) => {
      // If details are available, require key fields
      if (!data.detailsNotAvailable) {
        return !!(data.firstName && data.lastName && data.mobilePhone)
      }
      return true
    },
    {
      message: "First name, last name, and mobile phone are required when details are available",
      path: ["firstName"],
    },
  )

export const parentsGuardianSchema = z.object({
  father: parentSchema,
  mother: parentSchema,
  guardian: parentSchema.optional(),
})

// Step 5: Medical & Emergency
export const medicalEmergencySchema = z.object({
  emergencyContactName: z.string().min(1, "This field is required."),
  emergencyContactPhone: z.string().min(1, "This field is required."),
  emergencyContactRelationship: z.string().min(1, "This field is required."),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  doctorName: z.string().optional(),
  doctorPhone: z.string().optional(),
})

// Step 6: Additional Details
export const additionalDetailsSchema = z.object({
  linksToSchool: z.string().optional(),
  linksToSchoolOther: z.string().optional(),
  howDidYouHear: z.string().optional(),
})

// Step 7: Application Info (Campus & Academic Year)
export const applicationInfoSchema = z.object({
  campusId: z.string().min(1, "This field is required."),
  academicYearId: z.string().min(1, "This field is required."),
  applyingAs: z.enum(["new_student", "returning_student", "transfer_student"], {
    required_error: "This field is required.",
  }),
})

// Step 8: Declaration
export const declarationSchema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to continue.",
  }),
  agreeToDataProcessing: z.boolean().refine((val) => val === true, {
    message: "You must consent to data processing to continue.",
  }),
})

// Complete Application Schema (for server-side validation)
export const completeApplicationSchema = z.object({
  // Application info
  campusId: z.string().min(1),
  academicYearId: z.string().min(1),
  applyingAs: z.enum(["new_student", "returning_student", "transfer_student"]),

  // Student details
  student: studentDetailsSchema.merge(childLivesWithBaseSchema).refine(
    (data) => {
      if (data.livesWith === "other") {
        return !!data.livesWithOther
      }
      return true
    },
    {
      message: "Please specify who the child lives with",
      path: ["livesWithOther"],
    },
  ),

  // Schools
  schools: z.array(schoolRecordSchema).min(1),

  // Parents
  parents: z.object({
    father: parentSchema,
    mother: parentSchema,
    guardian: parentSchema.optional(),
  }),

  // Medical & Emergency (stored as JSON in additional info)
  medical: medicalEmergencySchema,

  // Additional details
  additional: additionalDetailsSchema,

  // Declaration
  declaration: declarationSchema,
})

export type CompleteApplicationInput = z.infer<typeof completeApplicationSchema>
