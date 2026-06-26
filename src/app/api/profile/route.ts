import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { profileFormSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { success: false, message: 'Failed to create profile' },
      { status: 400 }
    )
  }
}

export async function GET() {
  const profiles = await db.userProfile.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ success: true, data: profiles })
}