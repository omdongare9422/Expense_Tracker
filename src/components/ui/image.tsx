import { forwardRef, type ImgHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  // fittingType is kept for compatibility but ignored
  fittingType?: 'contain' | 'cover' | 'fill'
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({ src, className, alt, ...props }, ref) => {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        ref={ref}
        className={cn("bg-muted flex items-center justify-center text-muted-foreground", className)}
        {...props}
      >
        <span className="text-xs">No Image</span>
      </div>
    )
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt || ''}
      className={cn("object-cover", className)}
      onError={() => setError(true)}
      {...props}
    />
  )
})
Image.displayName = 'Image'
