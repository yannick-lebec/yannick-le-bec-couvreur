import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projets } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { deleteImage } from '@/lib/storage'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const data = await request.json()
  const [updated] = await db
    .update(projets)
    .set(data)
    .where(eq(projets.id, parseInt(id)))
    .returning()
  return NextResponse.json(updated)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const [projet] = await db
    .select()
    .from(projets)
    .where(eq(projets.id, parseInt(id)))
  if (projet?.photoUrl) {
    try {
      await deleteImage(projet.photoUrl)
    } catch {
      // ignore blob deletion errors if token not configured
    }
  }
  await db.delete(projets).where(eq(projets.id, parseInt(id)))
  return NextResponse.json({ success: true })
}
