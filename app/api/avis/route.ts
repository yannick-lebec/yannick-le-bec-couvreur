import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { avis } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
})

export async function GET() {
  const validated = await db
    .select()
    .from(avis)
    .where(eq(avis.valide, true))
    .orderBy(desc(avis.createdAt))
  return NextResponse.json(validated)
}

export async function POST(request: NextRequest) {
  const { nom, entreprise, poste, note, commentaire } = await request.json()

  if (!nom || !note || !commentaire) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }
  if (note < 1 || note > 5) {
    return NextResponse.json({ error: 'Note invalide' }, { status: 400 })
  }

  const [created] = await db
    .insert(avis)
    .values({ nom, entreprise, poste, note, commentaire })
    .returning()

  try {
    await transporter.sendMail({
      from: `"Site yannick-le-bec.fr" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nouvel avis en attente de validation — ${nom}`,
      html: `
        <h2>Nouvel avis à valider</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        ${entreprise ? `<p><strong>Entreprise :</strong> ${entreprise}</p>` : ''}
        ${poste ? `<p><strong>Poste :</strong> ${poste}</p>` : ''}
        <p><strong>Note :</strong> ${'⭐'.repeat(note)}</p>
        <p><strong>Commentaire :</strong><br>${commentaire}</p>
        <p><a href="https://yannick-le-bec-couvreur.vercel.app/admin/avis">
          → Valider ou refuser sur /admin/avis
        </a></p>
      `,
    })
  } catch { /* email failure non-bloquant */ }

  return NextResponse.json(created, { status: 201 })
}
