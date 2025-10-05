import React from 'react';


function Icon({ name }) {
  const common = 'h-6 w-6';
  const icons = {
    JavaScript: (
      <svg viewBox="0 0 32 32" className={common} aria-label="JavaScript" role="img">
        <rect width="32" height="32" rx="6" fill="#f7df1e" />
        <path d="M20 23.5c.6 1.2 1.6 2 3.2 2 1.3 0 2.2-.7 2.2-1.6 0-1.1-.9-1.5-2.5-2.1l-.8-.3c-2.3-.9-3.9-2.1-3.9-4.6 0-2.3 1.8-4.1 4.6-4.1 2 0 3.4.7 4.4 2.5l-2.4 1.6c-.5-.9-1-1.2-2-1.2s-1.7.6-1.7 1.2c0 .8.6 1.2 2 1.8l.8.3c2.8 1.2 4.4 2.4 4.4 5 0 2.9-2.3 4.5-5.3 4.5-3 0-4.9-1.4-5.8-3.3l2.8-1.7zM8.5 23.7c.5.9 1 1.7 2.2 1.7 1.1 0 1.8-.4 1.8-2V13h3v10.4c0 3.1-1.8 4.6-4.4 4.6-2.4 0-3.8-1.3-4.6-2.8l2-1.5z" fill="#141414" />
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 32 32" className={common} aria-label="TypeScript" role="img">
        <rect width="32" height="32" rx="6" fill="#3178c6" />
        <path d="M7 12h18v3h-7v10h-4V15H7v-3z" fill="#fff" />
      </svg>
    ),
    HTML: (
      <svg viewBox="0 0 32 32" className={common} aria-label="HTML" role="img">
        <path fill="#e34f26" d="M5 3l2.2 24.7L16 29l8.8-1.3L27 3H5z" />
        <path fill="#ef652a" d="M16 5v21.7l7.1-1L24.8 5H16z" />
        <path fill="#fff" d="M16 16.8h-4.7l.3 3.8 4.4.9v-4.7zM20.4 10.2H16V13h3.1l-.2 2.6H16v2.8h4.2l.5-8.2zM11.5 13H16v-2.8H11.7l-.2-2.6H16V5H8.8l.7 8.2z" />
      </svg>
    ),
    CSS: (
      <svg viewBox="0 0 32 32" className={common} aria-label="CSS" role="img">
        <path fill="#1572b6" d="M5 3l2.2 24.7L16 29l8.8-1.3L27 3H5z" />
        <path fill="#33a9dc" d="M16 5v21.7l7.1-1L24.8 5H16z" />
        <path fill="#fff" d="M22 10.2H16V13h5.7l-.4 4.4-5.3 1.2v3l8.7-2 1-10.4H22zM16 20.6l-4.7-1.1-.3-3h-2.8l.6 6.2 7.2 1.6v-3.7zM11.3 13H16v-2.8H8.9l.2 2.6h2.2z" />
      </svg>
    ),
    React: (
      <svg viewBox="0 0 36 36" className={common} aria-label="React" role="img">
        <circle cx="18" cy="18" r="2.5" fill="#61dafb" />
        <g fill="none" stroke="#61dafb" strokeWidth="2">
          <ellipse cx="18" cy="18" rx="16" ry="6" />
          <ellipse cx="18" cy="18" rx="6" ry="16" transform="rotate(60 18 18)" />
          <ellipse cx="18" cy="18" rx="6" ry="16" transform="rotate(120 18 18)" />
        </g>
      </svg>
    ),
    Tailwind: (
      <svg viewBox="0 0 48 28" className={common} aria-label="Tailwind" role="img">
        <path fill="#38bdf8" d="M24 0c-6 0-9.5 3-10.5 9 2-3 4.5-4 7.5-3 1.6.4 2.8 1.6 4.1 2.9C27 11.8 30 15 36 15c6 0 9.5-3 10.5-9-2 3-4.5 4-7.5 3-1.6-.4-2.8-1.6-4.1-2.9C33 3.2 30 0 24 0zM0 13c6 0 9.5 3 10.5 9-2-3-4.5-4-7.5-3-1.6.4-2.8 1.6-4.1 2.9C-3 24.8 0 28 6 28c6 0 9.5-3 10.5-9-2 3-4.5 4-7.5 3-1.6-.4-2.8-1.6-4.1-2.9C3 16.2 0 13 0 13z" />
      </svg>
    ),
    Redux: (
      <svg viewBox="0 0 32 32" className={common} aria-label="Redux" role="img">
        <path fill="#764abc" d="M16 6c-5.3 0-9.6 3.8-9.6 8.6 0 3 1.9 5.6 4.7 7l1.5-2.6c-1.5-.8-2.5-2.3-2.5-4 0-2.6 2.6-4.8 5.9-4.8s5.9 2.1 5.9 4.8c0 2.1-1.6 3.8-3.9 4.5l1.3 2.7c3.8-1 6.6-4 6.6-7.5C25.6 9.8 21.3 6 16 6z" />
      </svg>
    ),
    'Next.js': (
      <svg viewBox="0 0 32 32" className={common} aria-label="Next.js" role="img">
        <rect width="32" height="32" rx="6" fill="#111" />
        <path d="M9 9h2v14H9zM14 9h2l7 10v4h-2V19l-7-10z" fill="#fff" />
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 48 48" className={common} aria-label="Node.js" role="img">
        <path d="M24 2l20 11.5v21L24 46 4 34.5v-21L24 2z" fill="#3c873a" />
        <path d="M24 8.5L10 16v16l14 7.5 14-7.5V16L24 8.5z" fill="#fff" opacity=".9" />
      </svg>
    ),
    Express: (
      <svg viewBox="0 0 64 24" className={common} aria-label="Express" role="img">
        <text x="2" y="18" fill="#fff" fontFamily="monospace" fontSize="16">ex</text>
      </svg>
    ),
    REST: (
      <svg viewBox="0 0 40 24" className={common} aria-label="REST" role="img">
        <rect x="2" y="4" width="36" height="16" rx="4" fill="#64748b" />
        <circle cx="10" cy="12" r="2" fill="#0ea5e9" />
        <circle cx="16" cy="12" r="2" fill="#22c55e" />
        <circle cx="22" cy="12" r="2" fill="#eab308" />
        <circle cx="28" cy="12" r="2" fill="#ef4444" />
      </svg>
    ),
    Git: (
      <svg viewBox="0 0 32 32" className={common} aria-label="Git" role="img">
        <path fill="#f05133" d="M28.7 14.6L17.4 3.3a2.3 2.3 0 0 0-3.2 0l-2.1 2.1 3 3a2 2 0 0 1 2.6 2.6l3 3a2 2 0 1 1-1.4 1.4l-3-3-.4.4v7.8a2 2 0 1 1-1.6 0V12l-3-3-6 6a2.3 2.3 0 0 0 0 3.2l11.3 11.3a2.3 2.3 0 0 0 3.2 0L28.7 17.8a2.3 2.3 0 0 0 0-3.2z" />
      </svg>
    ),
    Jest: (
      <svg viewBox="0 0 32 32" className={common} aria-label="Jest" role="img">
        <path fill="#99425b" d="M16 4l2.7 6.2 6.6.5-5 4.3 1.5 6.4L16 18.7l-5.8 2.7 1.5-6.4-5-4.3 6.6-.5L16 4z" />
      </svg>
    ),
    Vite: (
      <svg viewBox="0 0 32 32" className={common} aria-label="Vite" role="img">
        <defs>
          <linearGradient id="v1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#646cff" />
            <stop offset="100%" stopColor="#ffca3a" />
          </linearGradient>
        </defs>
        <path d="M16 3l12 6-12 20L4 9 16 3z" fill="url(#v1)" />
      </svg>
    ),
    Webpack: (
      <svg viewBox="0 0 32 32" className={common} aria-label="Webpack" role="img">
        <path fill="#8ed6fb" d="M16 2l14 8v12l-14 8-14-8V10l14-8z" />
        <path fill="#1c78c0" d="M16 6l10 6-10 6-10-6 10-6z" />
      </svg>
    ),
  };
  return icons[name] || (
    <div className={`${common} rounded-md bg-white/10 text-xs flex items-center justify-center`} aria-label={name} role="img">
      {name[0]}
    </div>
  );
}

export default function Skills({ groups }) {
  const defaults =
    groups ?? [
      { title: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS'] },
      { title: 'Frontend', items: ['React', 'Tailwind', 'Redux', 'Next.js'] },
      { title: 'Backend', items: ['Node.js', 'Express', 'REST'] },
      { title: 'Tools', items: ['Git', 'Jest', 'Vite', 'Webpack'] },
    ];

  const rows = [
    [...defaults[0].items, ...defaults[1].items],
    [...defaults[2].items, ...defaults[3].items],
  ];

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      {rows.map((items, idx) => (
        <div
          key={idx}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex items-center gap-6 py-5 will-change-transform" style={{ animation: `${idx % 2 === 0 ? 'marquee' : 'marqueeR'} 18s linear infinite` }}>
            {[...items, ...items].map((s, i) => (
              <div key={s + i} className="flex items-center gap-3 px-2">
                <Icon name={s} />
                <span className="text-sm text-zinc-300">{s}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
