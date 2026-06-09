import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { avis } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { isAuthenticated } from '@/lib/auth'

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const [updated] = await db
    .update(avis)
    .set({ valide: true })
    .where(eq(avis.id, parseInt(id)))
    .returning()
  return NextResponse.json(updated)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  await db.delete(avis).where(eq(avis.id, parseInt(id)))
  return NextResponse.json({ success: true })
}
