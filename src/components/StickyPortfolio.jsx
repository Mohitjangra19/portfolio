import React from 'react';
import { profile, projects, experience } from '../data/site';
import Skills from './Skills';

export default function StickyPortfolio() {
  const items = React.useMemo(
    () => [
      {
        key: 'home',
        title: profile.name,
        subtitle: `${profile.role} · ${profile.location}`,
        description: profile.summary,
        image:   profile.photo || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1600&auto=format&fit=crop',
        colors: ['#6366f1', '#22d3ee'],
      },
      {
        key: 'about',
        title: 'About',
        subtitle: 'A bit about me',
        description: profile.summary,
        image: profile.photo || 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
        colors: ['#f43f5e', '#f59e0b'],
      },
      {
        key: 'experience',
        title: 'Experience',
        subtitle: experience[0]?.company ?? 'Professional journey',
        description: 'Shipped design systems, real-time features, and performance wins.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
        colors: ['#a78bfa', '#22c55e'],
      },
      {
        key: 'github',
        title: 'GitHub',
        subtitle: profile.socials.github ? `@${profile.socials.github}` : 'Connect on GitHub',
        description: 'Open-source activity and recents repositories.',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
        colors: ['#60a5fa', '#34d399'],
      },
      {
        key: 'skills',
        title: 'Skills',
        subtitle: 'Core technologies',
        description: 'Tools and tech I use to build reliable, accessible products.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
        colors: ['#f472b6', '#38bdf8'],
      },
      {
        key: 'contact',
        title: 'Contact',
        subtitle: 'Let’s connect',
        description: 'Open to freelance and full-time opportunities. Say hello!',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop',
        colors: ['#22d3ee', '#f59e0b'],
      },
    ],
    [profile.name, profile.role, profile.location, profile.summary, profile.photo, profile.socials.github, projects.length, experience]
  );

  const wrapperRef = React.useRef(null);
  const panelRefs = React.useRef([]);
  const cardRefs = React.useRef([]);
  const detailRefs = React.useRef([]);
  const timelinesRef = React.useRef([]);
  const layoutRef = React.useRef({ vh: window.innerHeight, top: 0 });
  const tickingRef = React.useRef(false);

  React.useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const setLayout = () => {
      const vh = window.innerHeight;
      layoutRef.current.vh = vh;
      el.style.height = `${items.length * vh}px`;
      let top = 0;
      let node = el;
      while (node) {
        top += node.offsetTop || 0;
        node = node.offsetParent;
      }
      layoutRef.current.top = top;
    };

    setLayout();

    if (!window.anime) {
      // eslint-disable-next-line no-console
      console.warn('[StickyPortfolio] anime.js not found on window. Add the CDN script in public/index.html.');
    } else {
      timelinesRef.current = items.map((it, i) => {
        const tl = window.anime.timeline({ autoplay: false, duration: 1000, easing: 'easeOutQuad' });
        const card = cardRefs.current[i];
        const details = detailRefs.current[i];
        if (it.key !== 'home' && it.key !== 'about') {
          tl.add({ targets: card, scale: [1, 0.85], duration: 1000 }, 0);
        }
        tl.add({ targets: details, opacity: [0, 1], translateY: [24, 0], duration: 1000 }, 0);
        tl.seek(0);
        return tl;
      });
    }

    panelRefs.current.forEach((p, i) => {
      if (!p) return;
      p.style.opacity = i === 0 ? '1' : '0';
      p.style.visibility = i === 0 ? 'visible' : 'hidden';
      p.style.pointerEvents = i === 0 ? 'auto' : 'none';
      p.style.zIndex = String(items.length - i);
    });

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const { vh, top } = layoutRef.current;
        const y = window.scrollY - top;
        const maxIndex = items.length - 1;
        const clampedY = Math.max(0, Math.min(y, items.length * vh));
        const index = Math.max(0, Math.min(Math.floor(clampedY / vh), maxIndex));
        const start = index * vh;
        const progress = Math.max(0, Math.min((clampedY - start) / vh, 1));

        panelRefs.current.forEach((p, i) => {
          if (!p) return;
          const active = i === index;
          p.style.opacity = active ? '1' : '0';
          p.style.visibility = active ? 'visible' : 'hidden';
          p.style.pointerEvents = active ? 'auto' : 'none';
        });

        const tl = timelinesRef.current[index];
        if (tl && typeof tl.seek === 'function') {
          tl.seek(tl.duration * progress);
        }
        tickingRef.current = false;
      });
    };

    const onResize = () => {
      setLayout();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [items.length]);

  return (
    <section id="portfolio-sticky" className="bg-black text-white">
      <style>{`
        :root { color-scheme: dark; }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #27272a, #111113); border-radius: 9999px; border: 2px solid #0a0a0a; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #3f3f46, #18181b); }
        html { scrollbar-color: #27272a #0a0a0a; scrollbar-width: thin; }
      `}</style>


      <header id="welcome" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">Welcome</h1>
        <p className="mt-3 text-zinc-300">Scroll down to know more</p>
        <div className="mt-6 text-2xl text-zinc-400 animate-bounce" aria-hidden>↓</div>
      </header>

      <div ref={wrapperRef} className="relative bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-950 to-black" />
          {items.map((it, i) => (
            <div key={it.key} ref={(el) => (panelRefs.current[i] = el)} className="absolute inset-0 flex items-center justify-center px-6 z-[7]">
              <div ref={(el) => (cardRefs.current[i] = el)} className="relative w-full max-w-5xl rounded-3xl border-0 bg-transparent backdrop-blur-md p-8 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                <div className="relative grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-3 md:order-last">
                    <div className={it.key === 'home' || it.key === 'about' ? 'overflow-hidden rounded-2xl border border-white/10 aspect-[4/3] bg-zinc-900/40 shadow-xl' : 'overflow-hidden rounded-2xl border border-white/10 aspect-video bg-zinc-800 shadow-xl'}>
                      <img src={it.image} alt={`${it.title} visuals`} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <div className="md:col-span-2 md:order-first">
                    <div ref={(el) => (detailRefs.current[i] = el)} className="will-change-transform">
                      <h3 className="text-2xl sm:text-3xl font-semibold">{it.title}</h3>
                      <p className="mt-1 text-sm text-zinc-400">{it.subtitle}</p>
                      <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{it.description}</p>

                      {it.key === 'projects' && (
                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-300">
                          {projects.slice(0, 4).map((p) => (
                            <div key={p.title} className="rounded-lg border border-white/10 bg-white/5 p-2">
                              <div className="font-medium text-white truncate">{p.title}</div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {p.tech.slice(0, 3).map((t) => (
                                  <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 border border-white/10">{t}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {it.key === 'experience' && (
                        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                          {experience.slice(0, 3).map((e, idx) => (
                            <li key={e.company + idx} className="rounded-lg border border-white/10 bg-white/5 p-2">
                              <div className="text-white font-medium">{e.title} · {e.company}</div>
                              <div className="text-xs text-zinc-400">{e.period}</div>
                            </li>
                          ))}
                        </ul>
                      )}

                      {it.key === 'github' && (
                        <a href={profile.socials.github ? `https://github.com/${profile.socials.github}` : '#'} className="mt-4 inline-flex items-center gap-2 rounded-md bg-white text-zinc-900 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-zinc-100">Open GitHub</a>
                      )}

                      {it.key === 'skills' && (
                        <div className="mt-4"><Skills /></div>
                      )}

                      {it.key === 'contact' && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {profile.email && (
                            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-md bg-white text-zinc-900 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-zinc-100">Email me</a>
                          )}
                          {profile.socials.linkedin && (
                            <a href={profile.socials.linkedin} className="inline-flex items-center gap-2 rounded-md bg-zinc-800 text-white px-3 py-1.5 text-sm font-medium border border-white/10 hover:bg-zinc-700">LinkedIn</a>
                          )}
                        </div>
                      )}

                      <div className="mt-5 h-1 w-24 rounded-full" style={{ background: `linear-gradient(90deg, ${it.colors[0]}, ${it.colors[1]})` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
