interface ImageContainerProps {
    src: string;
    alt: string;
    priority?: boolean;
  }
  
  export function ImageContainer({ src, alt, priority = false }: ImageContainerProps) {
    return (
      <div className="relative w-full overflow-hidden rounded-md">
        <div className="relative pb-[125%]"> {/* 5:4 aspect ratio with padding trick */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-contain bg-gray-100"
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      </div>
    )
  }
  
  