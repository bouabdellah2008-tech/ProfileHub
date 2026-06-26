import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, UserPlus, Shield, Upload, Database } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Create Your Professional{' '}
          <span className="text-primary">Profile</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Build a stunning profile with secure image uploads and professional details.
          All data is stored safely in our database with enterprise-grade security.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/profile">
              Create Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/profiles">View Profiles</Link>
          </Button>
        </div>
        
        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold">Easy Registration</h3>
            <p className="text-sm text-muted-foreground">Quick and simple profile creation</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold">Secure Uploads</h3>
            <p className="text-sm text-muted-foreground">Cloudinary powered image storage</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold">Data Protection</h3>
            <p className="text-sm text-muted-foreground">PostgreSQL with Prisma ORM</p>
          </div>
        </div>
      </div>
    </div>
  )
}