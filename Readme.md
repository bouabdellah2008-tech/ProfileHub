# ProfileHub

A modern, secure profile management application built with Next.js. Users can create their professional profiles with personal information and profile pictures.

## Features

- **Modern UI**: Clean, professional design with TailwindCSS
- **Form Validation**: Zod schema validation for all inputs
- **Image Upload**: Secure Cloudinary integration for profile pictures
- **Database**: PostgreSQL with Prisma ORM
- **Responsive**: Mobile-first design works on all devices

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Prisma (PostgreSQL)
- React Hook Form
- Zod
- Cloudinary

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your database and Cloudinary credentials in `.env`

4. Run database migration:
```bash
npx prisma db push
```

5. Start development server:
```bash
npm run dev
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── profile/route.ts    # Profile API
│   │   └── upload/route.ts     # Image upload API
│   ├── profile/page.tsx        # Profile form page
│   ├── profiles/page.tsx       # Profiles listing
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/ui/              # Shadcn/ui components
├── lib/
│   ├── db.ts                   # Database client
│   ├── utils.ts                # Utility functions
│   └── validations.ts          # Zod schemas
└── hooks/
    └── use-toast.tsx           # Toast notifications
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:studio` - Open Prisma Studio