import React from 'react';

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
  >
    {children}
  </a>
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-900/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-14">
        <a href="#welcome" className="text-white font-semibold tracking-tight">
          MJ
        </a>
        <nav className="hidden sm:flex items-center gap-1">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#github">GitHub</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#contact">Connect</NavLink>
        </nav>
      </div>
    </header>
  );
}
