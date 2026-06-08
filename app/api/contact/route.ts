import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  const { entreprise, nom, email, telephone, typeMission, description } =
    await request.json()

  if (!entreprise || !nom || !email || !typeMission || !description) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  try {
    await transporter.sendMail({
      from: `"Site yannick-le-bec.fr" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nouvelle demande de ${entreprise} — ${typeMission}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Entreprise :</strong> ${entreprise}</p>
        <p><strong>Contact :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
        <p><strong>Type de mission :</strong> ${typeMission}</p>
        <p><strong>Description :</strong><br>${description}</p>
      `,
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 })
  }
}
