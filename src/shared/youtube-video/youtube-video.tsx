import { useMemo } from 'react'

export const YouTubeVideo = ({ videoId }: { videoId: string }) => {
  const videoSrc = useMemo(() => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&disablekb=1&modestbranding=1&loop=1&playsinline=1&iv_load_policy=3&color=white`
  }, [videoId])

  return (
    <div className='aspect-video w-full rounded-xl overflow-hidden bg-muted'>
      <iframe
        className='w-full h-full'
        src={videoSrc}
        title='YouTube video'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </div>
  )
}
