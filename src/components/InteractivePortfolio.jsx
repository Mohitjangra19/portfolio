import React from 'react';

// Self-contained interactive portfolio section with sticky panels and anime.js scroll scrubbing
export default function InteractivePortfolio() {
  // Data: projects rendered dynamically
  const projects = React.useMemo(() => [
    {
      title: 'Smart Tasks',
      description:
        'Task manager with keyboard-first UX, offline support, calendar sync, and blazing-fast search.',
      tags: ['React', 'TypeScript', 'IndexedDB'],
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
      colors: ['#6366f1', '#22d3ee'],
    },
    {
      title: 'ShopLite',
      description:
        'Minimal e‑commerce starter with cart, checkout flow, and headless APIs. Built for speed and scale.',
      tags: ['React', 'Tailwind', 'Node'],
      image:
        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
      colors: ['#f43f5e', '#f59e0b'],
    },
    {
      title: 'ImageCraft',
      description:
        'On‑device image editor with GPU‑accelerated filters, crop, and export to PNG/WebP.',
      tags: ['Canvas', 'Web Workers'],
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
      colors: ['#10b981', '#06b6d4'],
    },
  ], []);

  const wrapperRef = React.useRef(null);
  const stickyRef = React.useRef(null);
  const panelRefs = React.useRef([]);
  const cardRefs = React.useRef([]);
  const detailRefs = React.useRef([]);
  const timelinesRef = React.useRef([]);
  const layoutRef = React.useRef({ vh: window.innerHeight, top: 0 });
  const tickingRef = React.useRef(false);

  // Setup sizes, timelines, and scroll handling
  React.useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Set dynamic height: projects * 100vh
    const setLayout = () => {
      const vh = window.innerHeight;
      layoutRef.current.vh = vh;
      el.style.height = `${projects.length * vh}px`;
      // cache top offset
      let top = 0;
      let node = el;
      while (node) {
        top += node.offsetTop || 0;
        node = node.offsetParent;
      }
      layoutRef.current.top = top;
    };

    setLayout();

    // Guard: anime.js must be loaded globally
    if (!window.anime) {
      // eslint-disable-next-line no-console
      console.warn('[InteractivePortfolio] anime.js not found on window. Add <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script> to public/index.html.');
    } else {
      // Build timelines (non-autoplay) for each project
      timelinesRef.current = projects.map((_, i) => {
        const tl = window.anime.timeline({ autoplay: false, duration: 1000, easing: 'easeOutQuad' });
        const card = cardRefs.current[i];
        const details = detailRefs.current[i];
        tl.add({
          targets: card,
          scale: [1, 0.85],
          duration: 1000,
        }, 0)
          .add({
            targets: details,
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 1000,
          }, 0);
        // set initial state
        tl.seek(0);
        return tl;
      });
    }

    // Only the first panel visible on mount
    panelRefs.current.forEach((p, i) => {
      if (!p) return;
      p.style.opacity = i === 0 ? '1' : '0';
      p.style.visibility = i === 0 ? 'visible' : 'hidden';
      p.style.pointerEvents = i === 0 ? 'auto' : 'none';
      p.style.zIndex = String(projects.length - i);
    });

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const { vh, top } = layoutRef.current;
        const y = window.scrollY - top;
        const maxIndex = projects.length - 1;
        const clampedY = Math.max(0, Math.min(y, projects.length * vh));
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
      // Re-seek current frame after resize for visual consistency
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // initial position
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [projects.length]);

  return (
    <section id="interactive-portfolio" className="bg-black text-white">
      {/* Inline dark scrollbar styling */}
      <style>{`
        :root { color-scheme: dark; }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #27272a, #111113); border-radius: 9999px; border: 2px solid #0a0a0a; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #3f3f46, #18181b); }
        html { scrollbar-color: #27272a #0a0a0a; scrollbar-width: thin; }
      `}</style>

      {/* Top placeholder content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Featured Work</h2>
        <p className="mt-3 text-zinc-300 max-w-2xl">Scroll to explore an interactive showcase. Each panel reacts to your scroll with smooth, precise animations.</p>
      </div>

      {/* Sticky scroll-driven gallery */}
      <div ref={wrapperRef} className="relative">
        <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-950 to-black" />
          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => (panelRefs.current[i] = el)}
              className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
              aria-hidden={false}
            >
              <div
                ref={(el) => (cardRefs.current[i] = el)}
                className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-md p-6 sm:p-8 shadow-[0_10px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Accent gradient */}

                <div className="relative grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-3">
                    <div className="overflow-hidden rounded-2xl border border-white/10 aspect-video bg-zinc-800">
                      <img
                        src={p.image}
                        alt={`${p.title} preview`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div ref={(el) => (detailRefs.current[i] = el)} className="will-change-transform">
                      <h3 className="text-2xl sm:text-3xl font-semibold">{p.title}</h3>
                      <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{p.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="inline-flex items-center rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-300 border border-white/10">{t}</span>
                        ))}
                      </div>
                      <div className="mt-5 h-1 w-24 rounded-full" style={{ background: `linear-gradient(90deg, ${p.colors[0]}, ${p.colors[1]})` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom placeholder content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <h3 className="text-3xl font-bold">Like what you see?</h3>
        <p className="mt-3 text-zinc-300 max-w-2xl">I craft performant, accessible interfaces with a focus on detail. Let’s build something great together.</p>
        <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-white text-zinc-900 px-4 py-2 font-medium shadow-sm hover:bg-zinc-100">Get in touch</a>
      </div>
    </section>
  );
}
