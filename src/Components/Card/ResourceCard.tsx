'use client'
import { Avatar, Tooltip } from 'antd'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function seededShuffle<T>(array: T[], seedStr: string): T[] {
  const seed = Array.from(seedStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = seededRandom(seed);
  const newArr = [...array];

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
}

// Simulate a realistic avatar pool
const AVATAR_POOL = [
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=alex', name:'Alex'},
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=bella', name:'Bella' },
  { type: 'letter', value: 'C', color: '#f56a00', name:'Clint' },
  { type: 'letter', value: 'D', color: '#7265e6', name:'Dior' },
  { type: 'icon', icon: <UserOutlined />, color: '#87d068', name:'Evan' },
  { type: 'icon', icon: <AntDesignOutlined />, color: '#1677ff', name:'Constance' },
  { type: 'letter', value: 'E', color: '#ffbf00', name:'Eve' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=frank', name:'Frank' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=max', name:'Max' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2', name:'Steven' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1', name:'David' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4', name:'John' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=10', name:'Kyle' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=bill', name:'Bill' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Crystal', name:'Crystal' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Hudson', name:'Hudson' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Eva', name:'Eva' },
  { type: 'img', src: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Ana', name:'Ana' },
  { type: 'letter', value: 'G', color: '#00a2ae', name:'Gu' },
  { type: 'letter', value: 'X', color: '#7265e6', name:'Xinyi' },
  { type: 'letter', value: 'Z', color: '#72656e', name:'Zhang' },
]

function getDailyAvatars(count: number, start: number) {
  const today = new Date().toISOString().split('T')[0]; // e.g. '2025-04-08'
  const shuffled = seededShuffle(AVATAR_POOL, today);
  return shuffled.slice(start, count+start);
}



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
          {participants !== undefined && (
          <div className="mb-4">
            <Avatar.Group
              max={{
                count: 3,
                style: { color: '#f56a00', backgroundColor: '#fde3cf' },
              }}
            >
              {getDailyAvatars(participants, participants-3).map((avatar, idx) => {
                if (avatar.type === 'img') {
                  return (
                    <Tooltip title={`${avatar.name}`} key={idx}>
                      <Avatar src={avatar.src} />
                    </Tooltip>
                  );
                }
                if (avatar.type === 'letter') {
                  return (
                    <Tooltip title={`${avatar.name}`} key={idx}>
                      <Avatar style={{ backgroundColor: avatar.color }}>
                        {avatar.value}
                      </Avatar>
                    </Tooltip>
                  );
                }
                if (avatar.type === 'icon') {
                  return (
                    <Tooltip title={`${avatar.name}`} key={idx}>
                      <Avatar style={{ backgroundColor: avatar.color }} icon={avatar.icon} />
                    </Tooltip>
                  );
                }
                return null;
              })}
            </Avatar.Group>
          </div>
        )}

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
