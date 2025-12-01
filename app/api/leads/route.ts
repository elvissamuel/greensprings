import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone } = body as {
      name?: string
      email?: string
      phone?: string
    }

    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "Name, email and phone are required." },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        source: "hero_form",
      },
    })

    return NextResponse.json({ id: lead.id }, { status: 201 })
  } catch (error) {
    console.error("[leads] Error creating lead:", error)
    return NextResponse.json(
      { message: "Failed to create lead." },
      { status: 500 }
    )
  }
}


