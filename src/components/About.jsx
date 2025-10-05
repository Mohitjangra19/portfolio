import React from 'react';
import { profile } from '../data/site';

export default function About() {
  const hasPhoto = Boolean(profile.photo);
  const alt = profile.name ? `Portrait of ${profile.name}` : 'Profile photo';
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress as About approaches center (from 80% -> 20% of viewport)
      const start = vh * 0.8;
      const end = vh * 0.2;
      const raw = (start - rect.top) / (start - end);
      const progress = Math.max(0, Math.min(raw, 1));
      const y = 40 * (1 - progress);
      el.style.setProperty('--about-opacity', String(0.2 + progress * 0.8));
      el.style.setProperty('--about-translate', `${y}px`);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 -mt-24 sm:-mt-32 md:-mt-40 lg:-mt-48 mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20"
      style={{
        opacity: 'var(--about-opacity, 0.2)',
        transform: 'translateY(var(--about-translate, 40px))',
        transition: 'opacity 200ms linear, transform 200ms linear',
      }}
    >
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="mx-[-24px] sm:mx-[-24px] h-full bg-gradient-to-b from-black/0 via-black/40 to-black/0" />
      </div>
      <div className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 md:order-last">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 aspect-[4/5] flex items-center justify-start">
              {hasPhoto ? (
                <img src={profile.photo} alt={alt} className="h-full w-full rounded-3xl object-cover object-left" />
              ) : null}
            </div>
          </div>
        </div>
        <div className="md:col-span-7 md:order-first">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">About me</h2>
          <p className="mt-4 text-zinc-300 leading-relaxed max-w-prose">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-md bg-white text-zinc-900 px-4 py-2 font-medium shadow-sm hover:bg-zinc-100">Explore Projects</a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-zinc-800 text-white px-4 py-2 font-medium border border-white/10 hover:bg-zinc-700">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
