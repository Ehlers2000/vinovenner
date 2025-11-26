'use client'

import { useEffect, useRef } from 'react'

type VideoPlayerProps = {
  youtubeId: string
  title?: string
  autoplay?: boolean
}

export function VideoPlayer({ youtubeId, title, autoplay = true }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // YouTube iframe API requires the iframe to be loaded
    // The embed URL handles everything we need
  }, [youtubeId])

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}${autoplay ? '?autoplay=1' : ''}`

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-graphite-900">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title || 'YouTube video player'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}

