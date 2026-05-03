import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Event from '@/database/event.model'
import { v2 as cloudinary } from 'cloudinary'

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error'
}

function postErrorStatus(error: unknown): 400 | 409 | 500 {
  if (error instanceof Error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return 400
    }
  }
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: number }).code === 11000
  ) {
    return 409
  }
  return 500
}

function postErrorLabel(status: 400 | 409 | 500): string {
  if (status === 400) return 'Invalid event data'
  if (status === 409) return 'Duplicate event'
  return 'Failed to create event'
}

export async function GET() {
  try {
    await connectDB()
    const events = await Event.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({message: 'Events fetched successfully', events: events}, { status: 200 })
  } catch (error) {
    console.error('GET /api/events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events', detail: errorMessage(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const formData = await request.formData()

    const fileEntry = formData.get('image')
    if (
      !fileEntry ||
      typeof fileEntry === 'string' ||
      !(fileEntry instanceof Blob) ||
      fileEntry.size === 0
    ) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    const file = fileEntry as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'events' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as { secure_url: string })
        }
      ).end(buffer)
    })

    const agendaText = String(formData.get('agenda') ?? '')
    const agenda = agendaText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const tagsText = String(formData.get('tags') ?? '')
    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const payload = {
      title: String(formData.get('title') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      overview: String(formData.get('overview') ?? '').trim(),
      venue: String(formData.get('venue') ?? '').trim(),
      location: String(formData.get('location') ?? '').trim(),
      date: String(formData.get('date') ?? '').trim(),
      time: String(formData.get('time') ?? '').trim(),
      mode: String(formData.get('mode') ?? '').trim(),
      audience: String(formData.get('audience') ?? '').trim(),
      organizer: String(formData.get('organizer') ?? '').trim(),
      agenda,
      tags,
      image: uploadResult.secure_url,
    }

    const createdEvent = await Event.create(payload)
    return NextResponse.json(
      { message: 'Event created successfully', event: createdEvent },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/events:', error)
    const status = postErrorStatus(error)
    return NextResponse.json(
      { error: postErrorLabel(status), detail: errorMessage(error) },
      { status }
    )
  }
}
