'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { VideoPlayer } from '@/components/video-player'

type VideoButtonProps = {
  youtubeId: string
  title: string
  description?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link'
  className?: string
}

export function VideoButton({ youtubeId, title, description, children, variant = 'secondary', className = 'w-full' }: VideoButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={variant}
        className={className}
      >
        {children}
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
        size="lg"
      >
        <VideoPlayer youtubeId={youtubeId} title={title} />
      </Modal>
    </>
  )
}

