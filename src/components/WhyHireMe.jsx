import React from 'react';
import { whyHireMe } from '../data/site';

export default function WhyHireMe() {
    return (
        <section id="why-hire-me" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 bg-zinc-900/40 my-10 rounded-3xl border border-white/5">
            <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Hire Me?</h2>
                    <p className="text-zinc-400 leading-relaxed">
                        I bring production-grade expertise to the table, ensuring your projects are built to last and scale.
                    </p>
                    <div className="mt-8">
                        <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white px-5 py-2.5 font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                            Let's Work Together
                        </a>
                    </div>
                </div>
                <div className="md:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyHireMe.map((item, idx) => (
                        <div key={idx} className="bg-zinc-900/60 p-5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-colors group">
                            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
