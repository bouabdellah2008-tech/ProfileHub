# ProfileHub

A modern, secure profile management application built with Next.js. Users can create their professional profiles with personal information and profile pictures.

## Features

- **Modern UI**: Clean, professional design with TailwindCSS
- **Form Validation**: Zod schema validation for all inputs
- **Image Upload**: Secure Cloudinary integration for profile pictures
- **Database**: PostgreSQL with Prisma ORM
- **Responsive**: Mobile-first design works on all devices
- **Toast Notifications**: User feedback with custom toast hook

## Tech Stack

- Next.js 15 (App Router)
- React 19 (RC)
- TypeScript
- TailwindCSS
- Prisma (PostgreSQL)
- React Hook Form
- Zod
- Cloudinary
- Shadcn/ui components

## Setup

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Cloudinary account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file:
```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/profilehub?schema=public"

# Cloudinary - Get from your Cloudinary dashboard
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Run database migration:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── profile/route.ts    # Profile CRUD API
│   │   └── upload/route.ts     # Cloudinary upload signature API
│   ├── profile/page.tsx        # Create profile form
│   ├── profiles/page.tsx       # View all profiles
│   ├── layout.tsx              # Root layout with nav/footer
│   └── globals.css             # Tailwind CSS variables
├── components/ui/              # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── lib/
│   ├── db.ts                   # Prisma client singleton
│   ├── utils.ts                # cn() utility for class merging
│   └── validations.ts          # Zod schemas
└── hooks/
    └── use-toast.tsx           # Toast notification hook
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:studio` - Open Prisma Studio

## Notes

- The application requires a PostgreSQL database to be running
- Profile images are uploaded to Cloudinary (free tier available)
- All form inputs are validated with Zod schemas