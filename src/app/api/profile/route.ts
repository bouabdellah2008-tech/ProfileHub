import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { profileFormSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: false, message: 'DATABASE_URL not configured. Please set up your .env file.' },
        { status: 500 }
      )
    }
    const body = await request.json()
    const validatedData = profileFormSchema.parse(body)

    const profile = await db.userProfile.create({
      data: validatedData,
    })

    return NextResponse.json(
      { success: true, data: profile },
      { status: 201 }
    )
  } catch (error) {
    console.error('Profile creation error:', error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to create profile' },
      { status: 400 }
    )
  }
}

export async function GET() {
  try {
    const profiles = await db.userProfile.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: profiles })
  } catch (error) {
    console.error('Profiles fetch error:', error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to fetch profiles' },
      { status: 500 }
    )
  }
}