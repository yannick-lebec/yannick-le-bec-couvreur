import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projets, projetPhotos } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { deleteImage } from '@/lib/storage'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { photos, ...projetData } = await request.json()
  const numId = parseInt(id)

  const [updated] = await db
    .update(projets)
    .set(projetData)
    .where(eq(projets.id, numId))
    .returning()

  if (photos !== undefined) {
    // Get existing photos to delete from Blob if removed
    const existing = await db
      .select()
      .from(projetPhotos)
      .where(eq(projetPhotos.projetId, numId))

    const newUrls = new Set(photos as string[])
    for (const p of existing) {
      if (!newUrls.has(p.url)) {
        try { await deleteImage(p.url) } catch { /* ignore */ }
      }
    }

    await db.delete(projetPhotos).where(eq(projetPhotos.projetId, numId))

    if (photos.length > 0) {
      await db.insert(projetPhotos).values(
        (photos as string[]).map((url, i) => ({
          projetId: numId,
          url,
          ordre: i,
        }))
      )
    }
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const numId = parseInt(id)

  const photos = await db
    .select()
    .from(projetPhotos)
    .where(eq(projetPhotos.projetId, numId))

  for (const p of photos) {
    try { await deleteImage(p.url) } catch { /* ignore */ }
  }

  await db.delete(projets).where(eq(projets.id, numId))
  return NextResponse.json({ success: true })
}
