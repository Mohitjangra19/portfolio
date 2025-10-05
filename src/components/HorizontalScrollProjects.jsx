import React from 'react';

/**
 * Horizontally scrolling projects driven by vertical scroll.
 * - Sticky viewport with a wide horizontal track.
 * - Center card is active (scale 1), others inactive (scale 0.9).
 * - Uses window.anime timelines to reveal details on the active card.
 * - Fully data-driven via the `projects` prop.
 */
export default function HorizontalScrollProjects({ projects = [], id = 'projects-horizontal' }) {
  const wrapperRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const detailRefs = React.useRef([]);
  const timelinesRef = React.useRef([]);
  const layoutRef = React.useRef({ vh: typeof window !== 'undefined' ? window.innerHeight : 0, top: 0, trackWidth: 0, wrapperHeight: 0 });
  const tickingRef = React.useRef(false);
  const activeIndexRef = React.useRef(-1);

  // Measure layout and set wrapper height relative to track width
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const setLayout = () => {
      const vh = window.innerHeight;
      layoutRef.current.vh = vh;
      // Compute wrapper's top offset in the document
      let top = 0;
      let node = wrapper;
      while (node) {
        top += node.offsetTop || 0;
        node = node.offsetParent;
      }
      layoutRef.current.top = top;

      const trackWidth = track.scrollWidth;
      layoutRef.current.trackWidth = trackWidth;
      // Vertical height needed to scroll the full horizontal width
      const wrapperHeight = Math.max(1, trackWidth - window.innerWidth + vh);
      layoutRef.current.wrapperHeight = wrapperHeight;
      wrapper.style.height = `${wrapperHeight}px`;
    };

    const setupTimelines = () => {
      const anime = window.anime;
      timelinesRef.current = cardRefs.current.map((card, i) => {
        const details = detailRefs.current[i];
        if (!details || !anime) return null;
        // Start hidden
        Array.from(details.children).forEach((el) => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(16px)';
        });
        const tl = anime.timeline({ autoplay: false, duration: 900, easing: 'easeOutQuad' });
        tl.add({
          targets: details.children,
          opacity: [0, 1],
          translateY: [16, 0],
          delay: anime.stagger(90),
        });
        tl.seek(0);
        return tl;
      });
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const { top, wrapperHeight, vh, trackWidth } = layoutRef.current;
        const maxY = Math.max(1, wrapperHeight - vh);
        const y = window.scrollY - top;
        const clamped = Math.max(0, Math.min(y, maxY));
        const progress = clamped / maxY;

        const maxTranslate = Math.max(0, trackWidth - window.innerWidth);
        const tx = -progress * maxTranslate;
        track.style.transform = `translateX(${tx}px)`;

        // Determine which card is closest to the viewport center
        const centerX = window.innerWidth / 2;
        let bestIndex = -1;
        let bestDist = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const d = Math.abs(centerX - cardCenter);
          if (d < bestDist) {
            bestDist = d;
            bestIndex = i;
          }
        });
        activeIndexRef.current = bestIndex;

        // Apply scale and scrub timelines
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const active = i === bestIndex;
          const targetScale = active ? 1 : 0.85;
          const targetOpacity = active ? 1 : 0.7;
          card.style.transform = `scale(${targetScale})`;
          card.style.opacity = String(targetOpacity);
          card.style.transition = 'transform 300ms ease, opacity 300ms ease';

          const details = detailRefs.current[i];
          const tl = timelinesRef.current[i];
          if (tl && typeof tl.seek === 'function') {
            if (active) {
              const rect = card.getBoundingClientRect();
              const cardCenter = rect.left + rect.width / 2;
              const d = Math.abs(centerX - cardCenter);
              const reveal = Math.max(0, Math.min(1, 1 - d / (window.innerWidth / 2)));
              tl.seek(tl.duration * reveal);
            } else {
              tl.seek(0);
            }
          } else if (details) {
            details.style.opacity = active ? '1' : '0';
            details.style.transform = active ? 'translateY(0)' : 'translateY(16px)';
            details.style.transition = 'opacity 200ms ease, transform 200ms ease';
          }
        });

        tickingRef.current = false;
      });
    };

    const onResize = () => {
      setLayout();
      onScroll();
    };

    setLayout();
    setupTimelines();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [projects.length]);

  return (
    <section id={id} className="relative bg-black text-white">
      <div ref={wrapperRef} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-950 to-black" />
          <div ref={trackRef} className="h-full flex items-center gap-6 px-6 will-change-transform">
            {projects.map((p, i) => (
              <div
                key={(p.title || 'project') + i}
                ref={(el) => (cardRefs.current[i] = el)}
                className="relative shrink-0 w-[92vw] sm:w-[86vw] md:w-[78vw] lg:w-[70vw] xl:w-[62vw] transition-transform"
              >
                <div className="rounded-2xl border border-white/10 bg-zinc-900/60 shadow-[0_10px_50px_rgba(0,0,0,0.5)] p-5 sm:p-6">
                  <div className="grid md:grid-cols-5 gap-5 items-center">
                    <div className="md:col-span-2 md:order-first" ref={(el) => (detailRefs.current[i] = el)}>
                      {p.title && <h3 className="text-xl sm:text-2xl font-semibold">{p.title}</h3>}
                      {p.description && (
                        <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{p.description}</p>
                      )}
                      {Array.isArray(p.tags) && p.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span key={t} className="text-xs rounded-full bg-white/5 border border-white/10 px-2 py-0.5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 flex gap-2">
                        {p.live && (
                          <a
                            href={p.live}
                            className="inline-flex items-center gap-2 rounded-md bg-white text-zinc-900 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-zinc-100"
                          >
                            Live
                          </a>
                        )}
                        {p.repo && (
                          <a
                            href={p.repo}
                            className="inline-flex items-center gap-2 rounded-md bg-zinc-800 text-white px-3 py-1.5 text-sm font-medium border border-white/10 hover:bg-zinc-700"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-3 md:order-last">
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={`${p.title || 'Project'} visual`}
                            className="h-56 sm:h-64 md:h-72 w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-56 sm:h-64 md:h-72 w-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
