'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'

const inputClass =
  'w-full rounded-[6px] border border-dark-200 bg-dark-200 px-4 py-2.5 text-sm text-light-100 outline-none placeholder:text-light-200 focus:border-primary'

const labelClass = 'text-sm font-medium text-light-100'

export default function CreateEventForm() {
  const router = useRouter()
  const formId = useId()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData, form?: HTMLFormElement) {
    setError(null)

    const agendaRaw = String(formData.get('agenda') ?? '')
    const agendaLines = agendaRaw
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
    const tagsRaw = String(formData.get('tags') ?? '')
    const tagParts = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    if (agendaLines.length === 0) {
      setError('Add at least one agenda item (one per line).')
      return
    }
    if (tagParts.length === 0) {
      setError('Add at least one tag (comma-separated).')
      return
    }

    const image = formData.get('image')
    if (!image || typeof image === 'string' || (image instanceof File && image.size === 0)) {
      setError('Please choose an event image.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      })
      const data = (await res.json()) as {
        error?: string
        detail?: string
        event?: { title?: string; slug?: string }
      }

      if (!res.ok) {
        setError(data.detail || data.error || 'Could not create event.')
        return
      }

      posthog.capture('event_created', { title: data.event?.title })
      form?.reset()
      router.push('/')
      router.refresh()
    } catch {
      setError('Network error. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-6 rounded-xl border border-dark-200 bg-dark-100/80 p-6 sm:p-8"
      onSubmit={async (e) => {
        e.preventDefault()
        await handleSubmit(new FormData(e.currentTarget), e.currentTarget)
      }}
    >
      {error ? (
        <p className="rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-title`}>
            Title <span className="text-primary">*</span>
          </label>
          <input
            id={`${formId}-title`}
            name="title"
            required
            maxLength={100}
            className={inputClass}
            placeholder="Event title"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-description`}>
            Description <span className="text-primary">*</span>
          </label>
          <textarea
            id={`${formId}-description`}
            name="description"
            required
            maxLength={1000}
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder="Short description"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-overview`}>
            Overview <span className="text-primary">*</span>
          </label>
          <textarea
            id={`${formId}-overview`}
            name="overview"
            required
            maxLength={500}
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder="What attendees will learn"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-image`}>
            Cover image <span className="text-primary">*</span>
          </label>
          <input
            id={`${formId}-image`}
            name="image"
            type="file"
            required
            accept="image/jpeg,image/png,image/webp,image/gif"
            className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-dark-100 file:px-2 file:py-1 file:text-sm`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor={`${formId}-venue`}>
            Venue <span className="text-primary">*</span>
          </label>
          <input
            id={`${formId}-venue`}
            name="venue"
            required
            className={inputClass}
            placeholder="Venue name"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor={`${formId}-location`}>
            Location <span className="text-primary">*</span>
          </label>
          <input
            id={`${formId}-location`}
            name="location"
            required
            className={inputClass}
            placeholder="City / address"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor={`${formId}-date`}>
            Date <span className="text-primary">*</span>
          </label>
          <input id={`${formId}-date`} name="date" type="date" required className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor={`${formId}-time`}>
            Time <span className="text-primary">*</span>
          </label>
          <input id={`${formId}-time`} name="time" type="time" required className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-mode`}>
            Mode <span className="text-primary">*</span>
          </label>
          <select
            id={`${formId}-mode`}
            name="mode"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select mode
            </option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-audience`}>
            Audience <span className="text-primary">*</span>
          </label>
          <input
            id={`${formId}-audience`}
            name="audience"
            required
            className={inputClass}
            placeholder="e.g. Beginner developers"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-agenda`}>
            Agenda <span className="text-primary">*</span>
          </label>
          <textarea
            id={`${formId}-agenda`}
            name="agenda"
            required
            rows={4}
            className={`${inputClass} resize-y`}
            placeholder={'One item per line\nWelcome\nKeynote\nQ&A'}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-organizer`}>
            Organizer <span className="text-primary">*</span>
          </label>
          <input
            id={`${formId}-organizer`}
            name="organizer"
            required
            className={inputClass}
            placeholder="Organizer or company"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor={`${formId}-tags`}>
            Tags <span className="text-primary">*</span>
          </label>
          <input
            id={`${formId}-tags`}
            name="tags"
            required
            className={inputClass}
            placeholder="react, workshop, web"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-dark-200 pt-6">
        <Link
          href="/"
          className="rounded-[6px] border border-dark-200 px-4 py-2 text-center text-sm text-light-200 hover:bg-dark-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-[6px] bg-primary px-5 py-2 text-sm font-semibold text-black hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? 'Creating…' : 'Create event'}
        </button>
      </div>
    </form>
  )
}
