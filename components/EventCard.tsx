'use client'

import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import posthog from 'posthog-js'

interface Props {
  title: string
  image: string
  slug: string
  location: string
  date: string
  time: string
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link href={`/events/${slug}`} className="event-card" onClick={() => posthog.capture('event_card_clicked', { event_title: title, event_slug: slug, event_location: location, event_date: date })}>
        <div className="poster">
            <NextImage src={image} alt={title} width={410} height={300} />
            <div className="flex flex-raw gap-2 mt-2 mb-2 text-xs">
                <NextImage src="/icons/pin.svg" alt="Location" width={14} height={14} />
                <p className="text-light-200">{location}</p>
            </div>
        </div>  
        <p className="title">{title}</p>

        <div className="datetime flex flex-row gap-2 text-xs items-center text-light-200">
            <div className="flex flex-row">
                <NextImage src="/icons/calendar.svg" alt="Date" width={14} height={14} />
                <p className="m-2">{date}</p>
            </div>

            <div className="flex flex-row">
                <NextImage src="/icons/clock.svg" alt="Time" width={14} height={14} />
                <p className="m-1">{time}</p>
            </div>
        </div>

    </Link>
  )
}

export default EventCard