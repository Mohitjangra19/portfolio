import React from 'react';
import { profile } from '../data/site';

export default function Contact() {
  const emailHref = profile.email ? `mailto:${profile.email}` : '#';
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/60 to-zinc-800/60 p-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Let’s connect</h2>
        <p className="mt-3 text-zinc-300 max-w-2xl">
          Have a project in mind or want to collaborate? I’m open to freelance and full‑time opportunities.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={emailHref} className="inline-flex items-center gap-2 rounded-md bg-white text-zinc-900 px-4 py-2 font-medium shadow-sm hover:bg-zinc-100">
            Email me
          </a>
          {profile.socials.linkedin && (
            <a href={profile.socials.linkedin} className="inline-flex items-center gap-2 rounded-md bg-zinc-800 text-white px-4 py-2 font-medium border border-white/10 hover:bg-zinc-700">
              LinkedIn
            </a>
          )}
          {profile.socials.website && (
            <a href={profile.socials.website} className="inline-flex items-center gap-2 rounded-md bg-zinc-800 text-white px-4 py-2 font-medium border border-white/10 hover:bg-zinc-700">
              Portfolio
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
