import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { avis } from '@/lib/schema'
import { desc } from 'drizzle-orm'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const all = await db.select().from(avis).orderBy(desc(avis.createdAt))
  return NextResponse.json(all)
}
