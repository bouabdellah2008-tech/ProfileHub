# ProfileHub - Development Plan

## 1. Recommended Next.js Architecture

### App Router Structure (Next.js 13+)
```
src/
├── app/
│   ├── api/
│   │   └── profile/
│   │       └── route.ts          # API endpoint for form submission
│   ├── profile/
│   │   └── page.tsx              # Profile form page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── form/                   # Form-specific components
│   └── providers/              # Context providers
├── lib/
│   ├── db.ts                   # Database connection
│   ├── validations.ts            # Zod schemas
│   └── utils.ts                # Utility functions
├── server/
│   └── actions/                # Server actions
├── types/
└── public/
    └── uploads/                # Temporary upload directory
```

### Key Architectural Decisions
- **App Router**: Using Next.js 13+ App Router for modern routing
- **Server Components**: Leverage RSC for better performance
- **Server Actions**: For form submissions with progressive enhancement
- **Middleware**: For security headers and CORS
- **Route Handlers**: For image upload API

## 2. Database Design

### PostgreSQL Schema (via Prisma)

```prisma
// prisma/schema.prisma
model UserProfile {
  id              String    @id @default(cuid())
  firstName       String
  lastName        String
  email           String    @unique
  phone           String?
  dateOfBirth     DateTime?
  bio             String?   @db.Text
  profilePicture  String?   // Cloudinary URL
  address         String?
  city            String?
  state           String?
  country         String?
  zipCode         String?
  occupation      String?
  company         String?
  website         String?   // Added
  linkedin        String?   // Added
  twitter         String?   // Added
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

### Database Setup
- **PostgreSQL**: Primary database (via Supabase or standalone)
- **Prisma ORM**: Type-safe database client
- **Connection Pooling**: Via Prisma connection pool

## 3. Image Upload and Storage Solution

### Cloudinary Integration
- **Cloudinary**: Cloud-based image storage (free tier available)
- **Signed Uploads**: Server-side signed upload for security
- **Image Optimization**: Automatic resizing, formatting, and optimization
- **Transformations**: On-the-fly image transformations

### Upload Flow
1. Client selects image
2. Client fetches signed upload parameters from API
3. Client uploads directly to Cloudinary
4. Cloudinary URL stored in database

## 4. Form Validation and Security

### Validation with Zod
```typescript
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional(),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  occupation: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  twitter: z.string().optional(),
});
```

### Security Best Practices
- **Input sanitization**: Zod validation on all inputs
- **File validation**: Check file type, size (max 5MB), dimensions
- **Rate limiting**: Prevent abuse (via middleware)
- **CORS**: Restrict API access
- **Content Security Policy**: Helmet.js or Next.js config
- **CSRF Protection**: Built-in Next.js protection

## 5. Modern UI/UX Design

### Design System
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library (headless UI + Tailwind)
- **Lucide React**: Icon library
- **React Hook Form**: Form state management
- **Zod + RHF**: Type-safe form validation

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly controls

### UI Components
- Form card with shadow and rounded corners
- Floating labels on inputs
- Image preview with upload progress
- Loading states with skeleton screens
- Success/error toast notifications
- Dark mode support

## 6. Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | Next.js 15+ | React framework |
| Language | TypeScript | Type safety |
| Styling | TailwindCSS | CSS framework |
| Components | Shadcn/ui | Pre-built components |
| Icons | Lucide React | SVG icons |
| Form | React Hook Form | Form management |
| Validation | Zod | Schema validation |
| Database | PostgreSQL | Relational database |
| ORM | Prisma | Database client |
| Image Storage | Cloudinary | Cloud storage |
| Deployment | Vercel | Hosting platform |

## 7. Step-by-Step Implementation Roadmap

### Phase 1: Project Setup (Day 1)
1. Initialize Next.js project with TypeScript
2. Install and configure TailwindCSS
3. Set up Shadcn/ui components
4. Configure ESLint and Prettier

### Phase 2: Database Layer (Day 1-2)
1. Set up PostgreSQL database (Supabase recommended)
2. Install and configure Prisma
3. Create UserProfile model
4. Generate Prisma client

### Phase 3: Image Upload (Day 2)
1. Create Cloudinary account
2. Set up API route for signed uploads
3. Create image upload component
4. Implement client-side upload logic

### Phase 4: Form Implementation (Day 2-3)
1. Create form validation schema
2. Build form UI components
3. Implement React Hook Form
4. Add form state management

### Phase 5: API Integration (Day 3)
1. Create profile API route
2. Implement form submission handler
3. Add error handling
4. Test API endpoints

### Phase 6: UI Polish (Day 3-4)
1. Add responsive design
2. Implement loading states
3. Add success/error feedback
4. Mobile optimization

### Phase 7: Security & Testing (Day 4)
1. Add rate limiting
2. Configure security headers
3. Test form validation
4. Test image upload flow
5. Verify database storage

### Phase 8: Deployment (Day 4-5)
1. Set up environment variables
2. Deploy to Vercel
3. Configure production database
4. Final testing

## 8. API Structure

### Endpoints
```
POST /api/profile
- Creates new user profile
- Validates input with Zod
- Returns created profile

POST /api/upload
- Generates Cloudinary signed upload params
- Returns upload signature
```

### Request/Response Examples
```json
// POST /api/profile
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "profilePicture": "https://res.cloudinary.com/...",
  ...
}

// Response
{
  "success": true,
  "data": { ... },
  "message": "Profile created successfully"
}
```

## 9. Environment Variables

```env
DATABASE_URL="postgresql://..."
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

## 10. Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection working
- [ ] Cloudinary credentials set
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Image size/type validation
- [ ] Form validation tested
- [ ] Mobile responsive verified
- [ ] Production build successful