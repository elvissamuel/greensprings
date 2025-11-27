# Greensprings Admissions Portal

A complete full-stack admissions portal built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features

- **Multi-step Application Form**: 10-step form with validation and progress tracking
- **File Upload System**: Local file storage with validation (JPEG, PNG, PDF, max 8MB)
- **Payment Integration**: Stubbed payment UI ready for Stripe integration
- **Admin Dashboard**: View submitted applications and uploaded documents
- **NDPR Compliance**: Nigerian Data Protection Regulation compliance notices
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Prisma (SQLite for dev, PostgreSQL for production)
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth (optional, stubbed)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up environment variables**:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edit `.env` and configure your database URL.

3. **Initialize database**:
   \`\`\`bash
   npx prisma migrate dev --name init
   \`\`\`

4. **Seed database**:
   \`\`\`bash
   npx prisma db seed
   \`\`\`
   
   This creates:
   - Admin user: `admin@greensprings.edu` / `admin123`
   - Two campuses: Anthony Campus, Lekki 1 Campus
   - Academic years: 2024/2025, 2025/2026

5. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**:
   Navigate to `http://localhost:3000`

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── applications/    # Application submission endpoint
│   │   └── payments/        # Payment processing endpoint (stubbed)
│   ├── admin/
│   │   └── applications/    # Admin dashboard
│   ├── apply/               # Multi-step application form
│   ├── payment/             # Payment page
│   └── page.tsx             # Home page
├── components/
│   ├── application/         # Form steps and components
│   ├── payment/             # Payment UI components
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── prisma.ts            # Prisma client singleton
│   ├── utils.ts             # Utility functions
│   └── validations/         # Zod schemas
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed script
└── uploads/                 # File upload directory (created at runtime)
\`\`\`

## Database Schema

### Main Models

- **Application**: Core application record
- **Applicant**: Student information
- **Parent**: Parent/guardian details (Father, Mother, Guardian)
- **SchoolRecord**: Previous schools attended
- **Document**: Uploaded files (birth certificate, reports, etc.)
- **Payment**: Payment records and status
- **Campus**: School campuses
- **AcademicYear**: Academic year configurations

## Form Steps

1. **Application Info**: Campus, academic year, applying as
2. **Student Details**: Personal information
3. **Child Lives With**: Living arrangement
4. **Schools Attended**: Previous education history
5. **Parents/Guardian**: Parent/guardian contact information
6. **Medical & Emergency**: Medical info and emergency contacts
7. **Additional Details**: Special needs, siblings, referral source
8. **Document Uploads**: Required documents upload
9. **Declaration**: Terms and data processing consent
10. **Review & Submit**: Final review before submission

## File Upload System

### Current Implementation (Local Storage)

Files are stored in `/uploads/{applicationId}/` directory with validation:
- **Allowed types**: JPEG, PNG, PDF
- **Max size**: 8MB per file
- **Required documents**: Birth certificate, character testimonial, academic reports (2), medical history, passport photo

### Migration to S3 (Instructions in Code)

See comments in `/app/api/applications/route.ts` for detailed instructions on:
- Installing AWS SDK
- Configuring S3 client
- Generating presigned URLs
- Updating file upload logic

## Payment Integration

### Current Implementation (Stubbed)

The payment page displays a cart with:
- Line items for each child
- Subtotal, tax, and total
- Payment method selector (Visa, MasterCard, Verve)

### Stripe Integration (Instructions in Code)

See comments in `/app/api/payments/route.ts` for:
- Installing Stripe SDK
- Creating PaymentIntents
- Handling webhooks
- Client-side payment confirmation

## Admin Dashboard

Access the admin dashboard at `/admin/applications` to view:
- All submitted applications
- Student information
- Payment status
- Uploaded documents count
- Submission dates

**Note**: In production, protect this route with authentication (NextAuth or similar).

## Security & Compliance

### NDPR Compliance

The application includes Nigerian Data Protection Regulation (NDPR) compliance notices:
- Data collection and processing consent
- Image usage opt-out information
- Contact details for data requests

### Validation

- **Client-side**: React Hook Form with Zod schemas
- **Server-side**: Zod validation in API routes
- **File validation**: Type and size checks on both client and server

## Production Deployment

### Database Migration

1. Change database provider in `prisma/schema.prisma`:
   \`\`\`prisma
   datasource db {
     provider = "postgresql"  // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   \`\`\`

2. Update `DATABASE_URL` in production environment variables

3. Run migrations:
   \`\`\`bash
   npx prisma migrate deploy
   \`\`\`

### Environment Variables

Set these in your production environment:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `STRIPE_SECRET_KEY`: Your Stripe secret key (when ready)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

### File Storage

For production, migrate from local storage to S3:
1. Follow instructions in `/app/api/applications/route.ts`
2. Set AWS environment variables
3. Update file upload logic
4. Create endpoint for presigned URL generation

## Development

### Database Management

\`\`\`bash
# View database in Prisma Studio
npm run prisma:studio

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
\`\`\`

### Code Quality

\`\`\`bash
# Lint code
npm run lint

# Format code
npm run format
\`\`\`

## Troubleshooting

### Common Issues

1. **Database connection error**:
   - Ensure SQLite file path is correct in `.env`
   - For PostgreSQL, verify connection string

2. **File upload fails**:
   - Check `/uploads` directory permissions
   - Verify file size and type restrictions

3. **Prisma client errors**:
   - Run `npx prisma generate` to regenerate client

## License

Private - Greensprings School

## Support

For issues or questions, contact: admissions@greensprings.edu
