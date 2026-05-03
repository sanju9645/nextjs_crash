import ExploreBtn from '@/components/ExploreBtn'
import EventCard from '@/components/EventCard'
import { IEvent } from '@/database/event.model'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Page = async () => {
  const eventsResponse = await fetch(`${BASE_URL}/api/events`, {
    cache: 'no-store',
  })
  const data = await eventsResponse.json()
  const events = data.events

  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev Event You Mustn&apos;t Miss</h1>
      <p className="text-center mt-5 text-light-200">Hackathons, Workshops, and Conferences. All in one place.</p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h2 className="text-center">Featured Events</h2>
        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.slug} id={`event-${event.slug}`}>
              <EventCard
                title={event.title}
                image={event.image}
                slug={event.slug}
                location={event.location}
                date={event.date}
                time={event.time}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page