import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/storage'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  try {
    const url = await uploadImage(file)
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json(
      { error: 'Upload failed. Configure BLOB_READ_WRITE_TOKEN.' },
      { status: 500 }
    )
  }
}
