import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projets, projetPhotos } from '@/lib/schema'
import { desc, asc } from 'drizzle-orm'

export async function GET() {
  const allProjets = await db
    .select()
    .from(projets)
    .orderBy(desc(projets.createdAt))

  const allPhotos = await db
    .select()
    .from(projetPhotos)
    .orderBy(asc(projetPhotos.ordre))

  const result = allProjets.map((p) => ({
    ...p,
    photos: allPhotos.filter((ph) => ph.projetId === p.id),
  }))

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const { photos, ...projetData } = await request.json()

  const [created] = await db.insert(projets).values(projetData).returning()

  if (photos && photos.length > 0) {
    await db.insert(projetPhotos).values(
      photos.map((url: string, i: number) => ({
        projetId: created.id,
        url,
        ordre: i,
      }))
    )
  }

  return NextResponse.json({ ...created, photos: photos ?? [] }, { status: 201 })
}
