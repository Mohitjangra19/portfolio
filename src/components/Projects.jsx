import React from 'react';
import { projects } from '../data/site';

function TechBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-300 border border-white/10">
      {label}
    </span>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Projects</h2>
        <a href="#contact" className="text-sm text-zinc-300 hover:text-white">Get in touch →</a>
      </div>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <article key={p.title + i} className="group relative rounded-2xl border border-white/10 bg-zinc-900/60 p-5 hover:border-white/20 transition-colors">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-indigo-500/0 via-fuchsia-500/0 to-emerald-400/0 group-hover:from-indigo-500/10 group-hover:via-fuchsia-500/10 group-hover:to-emerald-400/10" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <TechBadge key={t} label={t} />
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <a href={p.live} className="text-sm text-indigo-400 hover:text-indigo-300">Live ↗</a>
                <a href={p.repo} className="text-sm text-zinc-300 hover:text-white">Code</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
