import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@greensprings.edu" },
    update: {},
    create: {
      email: "admin@greensprings.edu",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
    },
  })
  console.log("✅ Admin user created:", admin.email)

  // Create campuses
  const anthonyCampus = await prisma.campus.upsert({
    where: { name: "Anthony Campus" },
    update: {},
    create: {
      name: "Anthony Campus",
      location: "Anthony, Lagos",
      fee: 5000000, // ₦50,000.00 in kobo
      active: true,
    },
  })

  const lekki1Campus = await prisma.campus.upsert({
    where: { name: "Lekki 1 Campus" },
    update: {
      name: "Lekki Campus",
    },
    create: {
      name: "Lekki Campus",
      location: "Lekki Phase 1, Lagos",
      fee: 5000000,
      active: true,
    },
  })

  console.log("✅ Campuses created:", anthonyCampus.name, lekki1Campus.name)

  // Create academic years
  const currentYear = await prisma.academicYear.upsert({
    where: { year: "2024/2025" },
    update: {},
    create: {
      year: "2024/2025",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-07-31"),
      active: true,
    },
  })

  const nextYear = await prisma.academicYear.upsert({
    where: { year: "2025/2026" },
    update: {},
    create: {
      year: "2025/2026",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2026-07-31"),
      active: true,
    },
  })

  console.log("✅ Academic years created:", currentYear.year, nextYear.year)

  console.log("✨ Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
