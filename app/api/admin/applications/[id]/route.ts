import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { prisma } from "@/lib/prisma"

// GET - Fetch single application details
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only" })
  
  if (!token || token.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        applicant: true,
        campus: true,
        academicYear: true,
        payment: true,
        documents: true,
        parents: true,
        schoolRecords: true,
      },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 })
  }
}

// PATCH - Update application (e.g., payment status)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only" })
  
  if (!token || token.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()

  try {
    // Update payment status
    if (body.paymentStatus) {
      const application = await prisma.application.findUnique({
        where: { id },
        include: { payment: true, campus: true },
      })

      if (!application) {
        return NextResponse.json({ error: "Application not found" }, { status: 404 })
      }

      if (application.payment) {
        // Update existing payment
        await prisma.payment.update({
          where: { id: application.payment.id },
          data: {
            status: body.paymentStatus,
            paidAt: body.paymentStatus === "completed" ? new Date() : null,
          },
        })
      } else {
        // Create payment record if doesn't exist
        await prisma.payment.create({
          data: {
            applicationId: id,
            amount: application.campus.fee,
            currency: "NGN",
            status: body.paymentStatus,
            paidAt: body.paymentStatus === "completed" ? new Date() : null,
          },
        })
      }

      return NextResponse.json({ success: true, message: "Payment status updated" })
    }

    // Update application status
    if (body.status) {
      await prisma.application.update({
        where: { id },
        data: { status: body.status },
      })

      return NextResponse.json({ success: true, message: "Application status updated" })
    }

    return NextResponse.json({ error: "No valid update fields provided" }, { status: 400 })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
  }
}

