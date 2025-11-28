"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { usePathname } from "next/navigation"
import { ApplicationInfoStep } from "./steps/application-info-step"
import { StudentDetailsStep } from "./steps/student-details-step"
import { ChildLivesWithStep } from "./steps/child-lives-with-step"
import { SchoolsAttendedStep } from "./steps/schools-attended-step"
import { ParentsGuardianStep } from "./steps/parents-guardian-step"
import { MedicalEmergencyStep } from "./steps/medical-emergency-step"
import { AdditionalDetailsStep } from "./steps/additional-details-step"
import { DocumentUploadStep } from "./steps/document-upload-step"
import { DeclarationStep } from "./steps/declaration-step"
import { ReviewStep } from "./steps/review-step"
import { ProgressIndicator } from "./progress-indicator"
import { SubmissionModal } from "./submission-modal"
import { ResumeApplicationModal } from "./resume-modal"
import { useFormPersistence } from "@/hooks/use-form-persistence"

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

const STEPS = [
  "Application Info",
  "Student Details",
  "Child Lives With",
  "Schools Attended",
  "Parents/Guardian",
  "Medical & Emergency",
  "Additional Details",
  "Document Uploads",
  "Declaration",
  "Review & Submit",
]

export default function ApplicationForm({ campuses, academicYears }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)
  const [showModal, setShowModal] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [savedApplicationData, setSavedApplicationData] = useState<{
    savedAt: string
    currentStep: number
    documentNames: string[]
  } | null>(null)
  const [submissionData, setSubmissionData] = useState<{ applicationId: string; applicationFee: number } | null>(null)

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      campusId: "",
      academicYearId: "",
      applyingAs: "new_student" as const,
      student: {
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "male" as const,
        nationality: "Nigerian",
        address: "",
        homeLanguage: "",
        firstLanguage: "",
        ethnicity: "",
        yearAppliedFor: "",
        stateOfOrigin: "",
        lga: "",
        requireBus: false,
        religion: "",
        placeOfBirth: "",
        livesWith: "both_parents" as const,
        livesWithOther: "",
      },
      schools: [
        {
          schoolName: "",
          yearAttended: "",
          cityCountry: "",
          classLevel: "",
        },
      ],
      parents: {
        father: {
          type: "FATHER" as const,
          detailsNotAvailable: false,
          title: "",
          firstName: "",
          middleName: "",
          lastName: "",
          address: "",
          email: "",
          mobilePhone: "",
          workPhone: "",
          occupation: "",
          companyName: "",
          companyAddress: "",
          nin: "",
        },
        mother: {
          type: "MOTHER" as const,
          detailsNotAvailable: false,
          title: "",
          firstName: "",
          middleName: "",
          lastName: "",
          address: "",
          email: "",
          mobilePhone: "",
          workPhone: "",
          occupation: "",
          companyName: "",
          companyAddress: "",
          nin: "",
        },
        guardian: {
          type: "GUARDIAN" as const,
          detailsNotAvailable: false,
          title: "",
          firstName: "",
          middleName: "",
          lastName: "",
          address: "",
          email: "",
          mobilePhone: "",
          workPhone: "",
          occupation: "",
          companyName: "",
          companyAddress: "",
          nin: "",
        },
      },
      medical: {
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelationship: "",
        medicalConditions: "",
        allergies: "",
        medications: "",
        doctorName: "",
        doctorPhone: "",
      },
      additional: {
        linksToSchool: "",
        linksToSchoolOther: "",
        howDidYouHear: "",
      },
      declaration: {
        agreeToTerms: false,
        agreeToDataProcessing: false,
      },
    },
  })

  const pathname = usePathname()

  // Form persistence hook
  const { getSavedData, clearSavedData, restoreData } = useFormPersistence(
    methods,
    currentStep,
    setCurrentStep,
    uploadedDocuments
  )

  // Track if we've already handled the resume prompt for this session
  const [hasCheckedSavedData, setHasCheckedSavedData] = useState(false)

  // Check for saved data - this function can be called multiple times safely
  const checkForSavedData = useCallback(() => {
    // Only show the modal if:
    // 1. We haven't already shown it
    // 2. User is on step 0 (hasn't started filling)
    // 3. There's saved data
    if (!hasCheckedSavedData && currentStep === 0) {
      const saved = getSavedData()
      if (saved && saved.currentStep > 0) {
        setSavedApplicationData({
          savedAt: saved.savedAt,
          currentStep: saved.currentStep,
          documentNames: saved.documentNames,
        })
        setShowResumeModal(true)
      }
      setHasCheckedSavedData(true)
    }
  }, [getSavedData, hasCheckedSavedData, currentStep])

  // Check for saved data on mount and when pathname changes (navigation)
  useEffect(() => {
    checkForSavedData()
  }, [pathname, checkForSavedData])

  // Also check when the page becomes visible (user switches back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && currentStep === 0 && !showResumeModal) {
        setHasCheckedSavedData(false) // Reset to allow re-check
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [currentStep, showResumeModal])

  const handleResumeApplication = () => {
    const saved = getSavedData()
    if (saved) {
      restoreData(saved)
    }
    setShowResumeModal(false)
  }

  const handleStartFresh = () => {
    clearSavedData()
    methods.reset()
    setCurrentStep(0)
    setShowResumeModal(false)
  }

  const nextStep = async () => {
    let isValid = false
    const formValues = methods.getValues()

    // Validate current step
    switch (currentStep) {
      case 0: // Application Info
        // Check required fields manually
        if (!formValues.campusId || !formValues.academicYearId || !formValues.applyingAs) {
          isValid = false
          if (!formValues.campusId) {
            methods.setError("campusId", { type: "required", message: "Campus is required" })
          }
          if (!formValues.academicYearId) {
            methods.setError("academicYearId", { type: "required", message: "Academic Year is required" })
          }
          if (!formValues.applyingAs) {
            methods.setError("applyingAs", { type: "required", message: "Applying As is required" })
          }
        } else {
          isValid = true
        }
        break
      case 1: // Student Details
        // Check all required student fields
        const student = formValues.student
        if (
          !student?.firstName ||
          !student?.lastName ||
          !student?.dateOfBirth ||
          !student?.gender ||
          !student?.nationality ||
          !student?.address ||
          !student?.homeLanguage ||
          !student?.firstLanguage ||
          !student?.yearAppliedFor ||
          !student?.stateOfOrigin ||
          !student?.lga ||
          !student?.placeOfBirth
        ) {
          isValid = false
          if (!student?.firstName) {
            methods.setError("student.firstName", { type: "required", message: "First name is required" })
          }
          if (!student?.lastName) {
            methods.setError("student.lastName", { type: "required", message: "Last name is required" })
          }
          if (!student?.dateOfBirth) {
            methods.setError("student.dateOfBirth", { type: "required", message: "Date of birth is required" })
          }
          if (!student?.gender) {
            methods.setError("student.gender", { type: "required", message: "Gender is required" })
          }
          if (!student?.nationality) {
            methods.setError("student.nationality", { type: "required", message: "Nationality is required" })
          }
          if (!student?.address) {
            methods.setError("student.address", { type: "required", message: "Address is required" })
          }
          if (!student?.homeLanguage) {
            methods.setError("student.homeLanguage", { type: "required", message: "Home language is required" })
          }
          if (!student?.firstLanguage) {
            methods.setError("student.firstLanguage", { type: "required", message: "First language is required" })
          }
          if (!student?.yearAppliedFor) {
            methods.setError("student.yearAppliedFor", { type: "required", message: "Year applied for is required" })
          }
          if (!student?.stateOfOrigin) {
            methods.setError("student.stateOfOrigin", { type: "required", message: "State of origin is required" })
          }
          if (!student?.lga) {
            methods.setError("student.lga", { type: "required", message: "LGA is required" })
          }
          if (!student?.placeOfBirth) {
            methods.setError("student.placeOfBirth", { type: "required", message: "Place of birth is required" })
          }
        } else {
          isValid = true
        }
        break
      case 2: // Child Lives With
        const livesWith = formValues.student?.livesWith as string | undefined
        if (!livesWith) {
          isValid = false
          methods.setError("student.livesWith", { type: "required", message: "This field is required" })
        } else {
          // If "other" is selected, livesWithOther is required
          const livesWithStr = String(livesWith)
          if (livesWithStr === "other") {
            const livesWithOther = formValues.student?.livesWithOther
            if (!livesWithOther) {
              isValid = false
              methods.setError("student.livesWithOther", { type: "required", message: "Please specify who the child lives with" })
            } else {
              isValid = true
            }
          } else {
            isValid = true
          }
        }
        break
      case 3: // Schools Attended
        // Check that at least one school has all required fields
        const schools = formValues.schools || []
        if (schools.length === 0) {
          isValid = false
          methods.setError("schools", { type: "required", message: "At least one school record is required" })
        } else {
          const allSchoolsValid = schools.every(
            (school: any) =>
              school.schoolName && school.yearAttended && school.cityCountry && school.classLevel
          )
          if (!allSchoolsValid) {
            isValid = false
            // Set errors for incomplete schools
            schools.forEach((school: any, index: number) => {
              if (!school.schoolName) {
                methods.setError(`schools.${index}.schoolName`, { type: "required", message: "School name is required" })
              }
              if (!school.yearAttended) {
                methods.setError(`schools.${index}.yearAttended`, { type: "required", message: "Year attended is required" })
              }
              if (!school.cityCountry) {
                methods.setError(`schools.${index}.cityCountry`, { type: "required", message: "City/Country is required" })
              }
              if (!school.classLevel) {
                methods.setError(`schools.${index}.classLevel`, { type: "required", message: "Class/Level is required" })
              }
            })
          } else {
            isValid = true
          }
        }
        break
      case 4: // Parents/Guardian
        // Validate father and mother (guardian is optional)
        const father = formValues.parents?.father
        const mother = formValues.parents?.mother

        // Check father
        let fatherValid = true
        if (!father?.detailsNotAvailable) {
          if (!father?.firstName || !father?.lastName || !father?.mobilePhone) {
            fatherValid = false
            if (!father?.firstName) {
              methods.setError("parents.father.firstName", { type: "required", message: "First name is required" })
            }
            if (!father?.lastName) {
              methods.setError("parents.father.lastName", { type: "required", message: "Last name is required" })
            }
            if (!father?.mobilePhone) {
              methods.setError("parents.father.mobilePhone", { type: "required", message: "Mobile phone is required" })
            }
          }
        }

        // Check mother
        let motherValid = true
        if (!mother?.detailsNotAvailable) {
          if (!mother?.firstName || !mother?.lastName || !mother?.mobilePhone) {
            motherValid = false
            if (!mother?.firstName) {
              methods.setError("parents.mother.firstName", { type: "required", message: "First name is required" })
            }
            if (!mother?.lastName) {
              methods.setError("parents.mother.lastName", { type: "required", message: "Last name is required" })
            }
            if (!mother?.mobilePhone) {
              methods.setError("parents.mother.mobilePhone", { type: "required", message: "Mobile phone is required" })
            }
          }
        }

        isValid = fatherValid && motherValid
        break
      case 5: // Medical & Emergency
        // Check required emergency contact fields
        const medical = formValues.medical
        if (
          !medical?.emergencyContactName ||
          !medical?.emergencyContactPhone ||
          !medical?.emergencyContactRelationship
        ) {
          isValid = false
          if (!medical?.emergencyContactName) {
            methods.setError("medical.emergencyContactName", { type: "required", message: "Emergency contact name is required" })
          }
          if (!medical?.emergencyContactPhone) {
            methods.setError("medical.emergencyContactPhone", { type: "required", message: "Emergency contact phone is required" })
          }
          if (!medical?.emergencyContactRelationship) {
            methods.setError("medical.emergencyContactRelationship", { type: "required", message: "Emergency contact relationship is required" })
          }
        } else {
          isValid = true
        }
        break
      case 6: // Additional Details
        isValid = true // Optional fields
        break
      case 7: // Document Uploads
        // Only check required documents - optional documents can be left empty
        // Required documents: ACADEMIC_REPORT_2, MEDICAL_HISTORY, PASSPORT_PHOTO
        // Optional documents: BIRTH_CERTIFICATE, CHARACTER_TESTIMONIAL, ACADEMIC_REPORT_1, PSYCHOLOGICAL_ASSESSMENT
        const requiredDocs = [
          "ACADEMIC_REPORT_2", // Academic Report (Previous Year) - REQUIRED
          "MEDICAL_HISTORY", // Medical History Form - REQUIRED
          "PASSPORT_PHOTO", // Passport Photograph - REQUIRED
        ]
        const missingDocs: string[] = []
        requiredDocs.forEach((doc) => {
          // Check if document exists and is a valid File object
          const uploadedDoc = uploadedDocuments[doc]
          if (!uploadedDoc || !(uploadedDoc instanceof File) || uploadedDoc.size === 0) {
            missingDocs.push(doc)
          }
        })
        // Only validate required documents - optional documents are ignored
        isValid = missingDocs.length === 0
        if (!isValid) {
          const docLabels: Record<string, string> = {
            ACADEMIC_REPORT_2: "Academic Report (Previous Year)",
            MEDICAL_HISTORY: "Medical History Form",
            PASSPORT_PHOTO: "Passport Photograph",
          }
          const missingLabels = missingDocs.map((doc) => docLabels[doc] || doc).join(", ")
          alert(`Please upload all required documents before proceeding: ${missingLabels}`)
        } else {
          // All required documents are present - allow proceeding even if optional ones are missing
          isValid = true
        }
        break
      case 8: // Declaration
        // Check both checkboxes are checked
        const declaration = formValues.declaration
        if (!declaration?.agreeToTerms || !declaration?.agreeToDataProcessing) {
          isValid = false
          if (!declaration?.agreeToTerms) {
            methods.setError("declaration.agreeToTerms", { type: "required", message: "You must agree to the terms to continue" })
          }
          if (!declaration?.agreeToDataProcessing) {
            methods.setError("declaration.agreeToDataProcessing", { type: "required", message: "You must consent to data processing to continue" })
          }
        } else {
          isValid = true
        }
        break
      default:
        isValid = true
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: any) => {
    // Prevent double submission
    if (isSubmittingRef.current || isSubmitting) {
      return
    }

    isSubmittingRef.current = true
    setIsSubmitting(true)

    try {
      // Create FormData for file uploads
      const formData = new FormData()
      formData.append("data", JSON.stringify(data))

      // Add documents
      Object.entries(uploadedDocuments).forEach(([type, file]) => {
        formData.append(type, file)
      })

      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to submit application")
      }

      const result = await response.json()
      
      // Clear saved data on successful submission
      clearSavedData()
      
      setSubmissionData({
        applicationId: result.applicationId,
        applicationFee: result.applicationFee,
      })
      setShowModal(true)
      // Keep isSubmittingRef as true to prevent resubmission until modal is closed
      // Don't reset here - let handleStartNew reset it
    } catch (error) {
      console.error("Submission error:", error)
      alert(error instanceof Error ? error.message : "Failed to submit application. Please try again.")
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }

  const handleStartNew = () => {
    clearSavedData()
    methods.reset()
    setUploadedDocuments({})
    setCurrentStep(0)
    setShowModal(false)
    isSubmittingRef.current = false
    setIsSubmitting(false)
  }

  const handleProceedToPayment = () => {
    if (submissionData) {
      window.location.href = `/payment?applicationId=${submissionData.applicationId}`
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          // Additional check to prevent double submission
          if (isSubmittingRef.current || isSubmitting) {
            return
          }
          onSubmit(data)
        })}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Progress Indicator */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-6">
              <ProgressIndicator steps={STEPS} currentStep={currentStep} />
            </div>
          </div>

          {/* Right side - Form Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {currentStep === 0 && <ApplicationInfoStep campuses={campuses} academicYears={academicYears} />}
              {currentStep === 1 && <StudentDetailsStep />}
              {currentStep === 2 && <ChildLivesWithStep />}
              {currentStep === 3 && <SchoolsAttendedStep />}
              {currentStep === 4 && <ParentsGuardianStep />}
              {currentStep === 5 && <MedicalEmergencyStep />}
              {currentStep === 6 && <AdditionalDetailsStep />}
              {currentStep === 7 && (
                <DocumentUploadStep documents={uploadedDocuments} setDocuments={setUploadedDocuments} />
              )}
              {currentStep === 8 && <DeclarationStep />}
              {currentStep === 9 && (
                <ReviewStep
                  formData={methods.getValues()}
                  documents={uploadedDocuments}
                  campuses={campuses}
                  academicYears={academicYears}
                />
              )}
            </div>

            <div className="flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Previous
                </button>
              )}

              {currentStep < STEPS.length - 1 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-maroon-800 text-white rounded-lg hover:bg-maroon-900 font-medium"
                >
                  Next
                </button>
              )}

              {currentStep === STEPS.length - 1 && (
                <button
                  type="submit"
                  disabled={isSubmitting || !methods.watch("declaration.agreeToTerms")}
                  className="ml-auto px-8 py-3 bg-maroon-800 text-white rounded-lg hover:bg-maroon-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {showModal && submissionData && (
        <SubmissionModal onStartNew={handleStartNew} onProceedToPayment={handleProceedToPayment} />
      )}

      {showResumeModal && savedApplicationData && (
        <ResumeApplicationModal
          savedAt={savedApplicationData.savedAt}
          savedStep={savedApplicationData.currentStep}
          stepName={STEPS[savedApplicationData.currentStep]}
          documentCount={savedApplicationData.documentNames.length}
          onResume={handleResumeApplication}
          onStartFresh={handleStartFresh}
        />
      )}
    </FormProvider>
  )
}
