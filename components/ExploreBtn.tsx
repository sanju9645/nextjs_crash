'use client'

import Link from "next/link"
import NextImage from "next/image"
import posthog from "posthog-js"

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={() => posthog.capture('explore_events_clicked')}>
        <Link href="#events">
            Explore Events
            <NextImage
              src="/icons/arrow-down.svg"
              width={24}
              height={20}
              className="w-5 h-4 -rotate-90"
              alt=""
            />
        </Link>
    </button>
  )
}

export default ExploreBtn