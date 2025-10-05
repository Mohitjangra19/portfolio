import React from 'react';
import { experience } from '../data/site';

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">Experience</h2>
      <ol className="mt-8 relative border-s border-white/10">
        {experience.map((e, idx) => (
          <li key={e.company + idx} className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-white/60 rounded-full mt-2 -start-1.5 border border-white/30" />
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{e.title} · {e.company}</h3>
                <span className="text-xs text-zinc-400">{e.period}</span>
              </div>
              <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-zinc-300">
                {e.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
