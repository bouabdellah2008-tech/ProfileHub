import './globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'ProfileHub - Create Your Profile',
  description: 'Create your professional profile with ProfileHub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              <Link href="/" className="font-bold text-xl">
                ProfileHub
              </Link>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profiles">View Profiles</Link>
              </Button>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js and TailwindCSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}