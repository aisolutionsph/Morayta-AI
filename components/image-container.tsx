interface ImageContainerProps {
  src: string
  alt: string
  priority?: boolean
}

export function ImageContainer({ src, alt, priority = false }: ImageContainerProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-md">
      <div className="relative pb-[75%]">
        {" "}
        {/* Changed from pb-[125%] to pb-[75%] for 4:3 aspect ratio */}
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain bg-gray-100"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    </div>
  )
}

