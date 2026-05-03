'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import posthog from 'posthog-js'

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <NextImage src="/icons/logo.png" width={24} height={24} alt="Dev Event" />
          <p>Dev Event</p>
        </Link>
        <ul>
            <Link
              href="/"
              onClick={() => posthog.capture('nav_link_clicked', { destination: 'home' })}
            >
              Home
            </Link>
            <Link
              href="/"
              onClick={() => posthog.capture('nav_link_clicked', { destination: 'events' })}
            >
              Events
            </Link>
            <Link
              href="/create-event"
              onClick={() =>
                posthog.capture('nav_link_clicked', { destination: 'create-event' })
              }
            >
              Create Event
            </Link>
        </ul>
      </nav>
    </header>
  )
}
