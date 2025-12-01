import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { leadId, currentStep } = body as {
      leadId?: string
      currentStep?: number
    }

    if (!leadId || typeof currentStep !== "number") {
      return NextResponse.json(
        { message: "leadId and currentStep are required." },
        { status: 400 }
      )
    }

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        currentStep,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[leads.progress] Error updating lead progress:", error)
    return NextResponse.json(
      { message: "Failed to update lead progress." },
      { status: 500 }
    )
  }
}


