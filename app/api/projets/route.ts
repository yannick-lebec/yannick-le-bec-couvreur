import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projets } from '@/lib/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  const all = await db.select().from(projets).orderBy(desc(projets.createdAt))
  return NextResponse.json(all)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const [created] = await db.insert(projets).values(data).returning()
  return NextResponse.json(created, { status: 201 })
}
