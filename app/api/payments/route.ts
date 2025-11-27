import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { applicationId, amount, paymentMethod } = await request.json()

    if (!applicationId || !amount) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if payment already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { applicationId },
    })

    if (existingPayment) {
      return NextResponse.json({ message: "Payment already exists" }, { status: 400 })
    }

    // ========================================
    // STRIPE INTEGRATION (commented out)
    // ========================================
    //
    // To integrate with Stripe:
    //
    // 1. Install Stripe SDK:
    //    npm install stripe
    //
    // 2. Initialize Stripe:
    //    import Stripe from 'stripe'
    //    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    //      apiVersion: '2023-10-16',
    //    })
    //
    // 3. Create PaymentIntent:
    //    const paymentIntent = await stripe.paymentIntents.create({
    //      amount: amount, // Amount in smallest currency unit (kobo for NGN)
    //      currency: 'ngn',
    //      metadata: {
    //        applicationId,
    //      },
    //      automatic_payment_methods: {
    //        enabled: true,
    //      },
    //    })
    //
    // 4. Save payment record:
    //    const payment = await prisma.payment.create({
    //      data: {
    //        applicationId,
    //        amount,
    //        currency: 'NGN',
    //        status: 'processing',
    //        paymentMethod,
    //        providerReference: paymentIntent.id,
    //      },
    //    })
    //
    // 5. Return client secret:
    //    return NextResponse.json({
    //      success: true,
    //      clientSecret: paymentIntent.client_secret,
    //      paymentId: payment.id,
    //    })
    //
    // 6. On the client side, use Stripe.js to complete payment
    //
    // 7. Set up webhook to handle payment events:
    //    - payment_intent.succeeded
    //    - payment_intent.payment_failed
    //
    // ========================================

    // Stub: Create pending payment record
    const payment = await prisma.payment.create({
      data: {
        applicationId,
        amount,
        currency: "NGN",
        status: "pending",
        paymentMethod,
      },
    })

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      message: "Payment stub created. Integrate Stripe for real payments.",
    })
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create payment" },
      { status: 500 },
    )
  }
}
