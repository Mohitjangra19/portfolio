import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Github from './components/Github';
import Contact from './components/Contact';
import Skills from './components/Skills';
import HorizontalScrollProjects from './components/HorizontalScrollProjects';
import { projects as projectData } from './data/site';

function App() {
  const hsProjects = projectData.map((p) => ({ ...p, tags: p.tech }));
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="scroll-smooth">
        <Hero />
        <About />
        <HorizontalScrollProjects id="projects" projects={hsProjects} />
        <section id="skills" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Skills</h2>
          <div className="mt-8"><Skills /></div>
        </section>
        <Experience />
        <Github />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
