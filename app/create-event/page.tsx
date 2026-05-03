import CreateEventForm from '@/components/CreateEventForm'

export default function CreateEventPage() {
  return (
    <section className="container mx-auto max-w-2xl px-5 py-10 sm:px-10">
      <h1 className="mb-2 text-center text-2xl font-semibold text-light-100">
        Create event
      </h1>
      <p className="mb-8 text-center text-sm text-light-200">
        Fields marked <span className="text-primary">*</span> are required.
      </p>
      <CreateEventForm />
    </section>
  )
}
