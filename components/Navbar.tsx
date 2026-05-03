import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'

export default function Navbar() {
  return (
    <header>
        <nav>
            <Link href="/" className="logo">
                <NextImage src="/icons/logo.png" width={24} height={24} alt="Dev Event" />
                <p>Dev Event</p>
            </Link>
            <ul>
                <Link href="/">Home</Link>
                <Link href="/events">Events</Link>
                <Link href="/about">About</Link>
            </ul>
        </nav>
    </header>
  )
}
