'use client'

export function ResourceCard({
  title,
  description,
  emoji,
  image,
  link,
  linkLabel,
  date,
  participants,
  status,
}: {
  title: string
  description: string
  image?: string
  emoji?: string
  link?: string
  linkLabel?: string
  date?: string
  participants?: number
  status?: 'ongoing' | 'past'
}) {
  const isPast = status === 'past'

  return (
    <div
      className={`relative rounded-xl overflow-hidden border transition-all duration-300 min-w-[300px] max-w-xs
        ${isPast ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-gray-800 hover:shadow-md'}
        ${image ? 'min-h-[400px]':'min-h-[230px]'}
      `}
    >
      {/* Badge */}
      {status && (
        <div
          className={`absolute top-2 z-10 px-2 py-1 rounded text-xs font-semibold shadow-sm
            ${isPast ? 'bg-gray-300 text-gray-600' : 'bg-green-100 text-green-800'}
            ${image ? 'left-2':'right-2'}
          `}
        >
          {isPast ? 'Past' : 'Ongoing'}
        </div>
      )}

      {/* Image or Emoji */}
      {image ? (
        <img
          src={image}
          alt={title}
          className={`w-full h-40 object-cover ${
            isPast ? 'opacity-50 grayscale' : ''
          }`}
        />
      ) : emoji ? (
        <div className="text-5xl p-6">{emoji}</div>
      ) : null}

      {/* Card Content */}
      <div className="p-5">
        <h4
          className={`text-lg font-semibold mb-2 ${
            isPast ? 'text-gray-500' : 'text-blue-900'
          }`}
        >
          {title}
        </h4>

        <p className="text-sm mb-3">{description}</p>

        <div className="text-xs mb-4 space-y-1">
          {date && <p>📅 {date}</p>}
          {participants !== undefined && <p>👥 {participants} participants</p>}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block text-sm font-medium ${
              isPast
                ? 'text-gray-400 hover:text-gray-500'
                : 'text-blue-600 hover:underline'
            }`}
          >
            {linkLabel || 'Learn More'} →
          </a>
        )}
      </div>
    </div>
  )
}
