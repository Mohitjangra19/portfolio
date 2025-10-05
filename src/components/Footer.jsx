import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-zinc-400 flex items-center justify-between">
        <p>© {year} Mohit Jangra. All rights reserved.</p>
        <a href="#home" className="text-zinc-300 hover:text-white">Back to top ↑</a>
      </div>
    </footer>
  );
}
