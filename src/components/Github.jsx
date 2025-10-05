import React from 'react';
import { profile } from '../data/site';

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  );
}

export default function Github() {
  const [stats, setStats] = React.useState(null);
  const [repos, setRepos] = React.useState([]);
  const username = profile.socials.github ?? null;

  React.useEffect(() => {
    let active = true;
    async function load() {
      if (!username) return;
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=6&sort=updated`),
        ]);
        if (!active) return;
        if (uRes.ok) {
          const u = await uRes.json();
          setStats({
            followers: u.followers,
            following: u.following,
            public_repos: u.public_repos,
          });
        }
        if (rRes.ok) {
          const r = await rRes.json();
          setRepos(
            Array.isArray(r)
              ? r.slice(0, 6).map((it) => ({
                  id: it.id,
                  name: it.name,
                  description: it.description,
                  stargazers_count: it.stargazers_count,
                  html_url: it.html_url,
                  language: it.language,
                }))
              : []
          );
        }
      } catch (e) {
        // ignore network errors gracefully
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [username]);

  return (
    <section id="github" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">GitHub</h2>
        {username && (
          <a href={`https://github.com/${username}`} className="text-sm text-zinc-300 hover:text-white">
            @{username} ↗
          </a>
        )}
      </div>

      {!username ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-yellow-400/10 text-yellow-200 px-4 py-3">
          Add your GitHub username in src/data/site.js (profile.socials.github) to enable live stats and recent repositories.
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <Stat label="Followers" value={stats ? stats.followers : '—'} />
            <Stat label="Following" value={stats ? stats.following : '—'} />
            <Stat label="Public Repos" value={stats ? stats.public_repos : '—'} />
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((r) => (
              <article key={r.id} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                <h3 className="text-white font-semibold">{r.name}</h3>
                {r.description && (
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{r.description}</p>
                )}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-zinc-400">{r.language ?? '—'}</span>
                  <a className="text-indigo-400 hover:text-indigo-300" href={r.html_url}>Open ↗</a>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
