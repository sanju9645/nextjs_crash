import React from 'react'
import ExploreBtn from '@/components/ExploreBtn'
import EventCard from '@/components/EventCard'
import { events } from '@/lib/constants'

function Page() {
  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev Event You Mustn&apos;t Miss</h1>
      <p className="text-center mt-5 text-light-200">Hackathons, Workshops, and Conferences. All in one place.</p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h2 className="text-center">Featured Events</h2>
        <ul className="events">
          {events.map((event) => (
            <li key={event.id} id={`event-${event.id}`}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page