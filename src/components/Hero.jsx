import React from 'react';
import { profile } from '../data/site';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden z-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-40 sm:pb-48 md:pb-56 pt-24 sm:pt-28 md:pt-32">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-green-400/10 text-green-300 border border-green-400/20 mb-4">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg text-zinc-300">{profile.role} · {profile.location}</p>
            <p className="mt-6 text-zinc-300 max-w-2xl leading-relaxed">{profile.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-md bg-white text-zinc-900 px-4 py-2 font-medium shadow-sm hover:bg-zinc-100">
                View Projects
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-zinc-800 text-white px-4 py-2 font-medium border border-white/10 hover:bg-zinc-700">
                Connect
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative">
              <div className="relative rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center justify-between"><span>Email</span><a className="text-white hover:underline" href={profile.email ? `mailto:${profile.email}` : '#'}>{profile.email ?? 'Not provided'}</a></li>
                  <li className="flex items-center justify-between"><span>Website</span><a className="text-white hover:underline" href={profile.socials.website ?? '#'}>{profile.socials.website ?? '—'}</a></li>
                  <li className="flex items-center justify-between"><span>LinkedIn</span><a className="text-white hover:underline" href={profile.socials.linkedin ?? '#'}>{profile.socials.linkedin ? 'Open' : '—'}</a></li>
                  <li className="flex items-center justify-between"><span>Twitter</span><a className="text-white hover:underline" href={profile.socials.twitter ?? '#'}>{profile.socials.twitter ? 'Open' : '—'}</a></li>
                </ul>
                {profile.resumeUrl && (
                  <a href={profile.resumeUrl} className="mt-6 inline-flex w-full justify-center rounded-md bg-indigo-500 text-white px-4 py-2 font-medium hover:bg-indigo-400">Download Resume</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
