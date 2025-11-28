import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { uploadToCloudinary } from "@/lib/cloudinary"

// Maximum file size: 8MB
const MAX_FILE_SIZE = 8 * 1024 * 1024

// Allowed MIME types
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const dataString = formData.get("data") as string

    if (!dataString) {
      return NextResponse.json({ message: "No data provided" }, { status: 400 })
    }

    const data = JSON.parse(dataString)

    // Create application
    const application = await prisma.application.create({
      data: {
        campusId: data.campusId,
        academicYearId: data.academicYearId,
        applyingAs: data.applyingAs,
        status: "pending",
        applicant: {
          create: {
            firstName: data.student.firstName,
            middleName: data.student.middleName,
            lastName: data.student.lastName,
            dateOfBirth: new Date(data.student.dateOfBirth),
            gender: data.student.gender,
            nationality: data.student.nationality,
            address: data.student.address,
            homeLanguage: data.student.homeLanguage,
            firstLanguage: data.student.firstLanguage,
            ethnicity: data.student.ethnicity,
            yearAppliedFor: data.student.yearAppliedFor,
            stateOfOrigin: data.student.stateOfOrigin,
            lga: data.student.lga,
            requireBus: data.student.requireBus || false,
            religion: data.student.religion,
            placeOfBirth: data.student.placeOfBirth,
            livesWith: data.student.livesWith,
            livesWithOther: data.student.livesWithOther,
          },
        },
        parents: {
          create: [
            data.parents.father,
            data.parents.mother,
            ...(data.parents.guardian?.firstName ? [data.parents.guardian] : []),
          ],
        },
        schoolRecords: {
          create: data.schools.map((school: any) => ({
            schoolName: school.schoolName,
            yearAttended: school.yearAttended,
            cityCountry: school.cityCountry,
            classLevel: school.classLevel,
          })),
        },
      },
      include: {
        campus: true,
      },
    })

    // Handle file uploads with Cloudinary
    const documentTypes = [
      "BIRTH_CERTIFICATE",
      "CHARACTER_TESTIMONIAL",
      "ACADEMIC_REPORT_1",
      "ACADEMIC_REPORT_2",
      "MEDICAL_HISTORY",
      "PASSPORT_PHOTO",
      "PSYCHOLOGICAL_ASSESSMENT",
    ]

    for (const docType of documentTypes) {
      const file = formData.get(docType) as File | null

      if (file) {
        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
          throw new Error(`Invalid file type for ${docType}`)
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`File size exceeds 8MB for ${docType}`)
        }

        // Upload to Cloudinary
        const folder = `applications/${application.id}`
        const publicId = `${docType.toLowerCase()}_${Date.now()}`
        
        const uploadResult = await uploadToCloudinary(file, folder, publicId)

        // Save document record in database
        await prisma.document.create({
          data: {
            applicationId: application.id,
            type: docType,
            filename: file.name,
            path: uploadResult.secure_url,
            mimeType: file.type,
            size: file.size,
          },
        })
      }
    }

    // Update application status to submitted
    await prisma.application.update({
      where: { id: application.id },
      data: {
        status: "submitted",
        submittedAt: new Date(),
      },
    })

    // Get campus fee
    const campus = await prisma.campus.findUnique({
      where: { id: data.campusId },
    })

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      applicationFee: campus?.fee || 5000000, // Default to 50,000 NGN in kobo
      redirectToPayment: true,
    })
  } catch (error) {
    console.error("Application submission error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to submit application" },
      { status: 500 },
    )
  }
}

function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".")
  return lastDot === -1 ? "" : filename.substring(lastDot)
}
