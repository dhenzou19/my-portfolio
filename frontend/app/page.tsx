// frontend/app/page.tsx
import { ArrowUpRight, Code2, Layers, Terminal } from 'lucide-react';
import ContactForm from './components/ContactForm';
import Link from 'next/link';

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

async function getSkills() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json();
}

export default async function Home() {
  const projects = await getProjects();
  const skills = await getSkills();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 selection:bg-rose-500/30">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-[#0a0a0a] to-[#0a0a0a]"></div>

      <div className="max-w-5xl mx-auto px-6 py-24">
        
        {/* HERO SECTION */}
        <section className="mb-32 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/50 border border-neutral-700/50 text-sm text-neutral-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Available for work
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">Dhenmarc.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A Full Stack Developer specializing in building exceptional digital experiences. 
            From robust backends to pixel-perfect frontends.
          </p>
          
          <div className="flex gap-4">
            <Link href="#projects" className="bg-rose-600 text-white px-8 py-3 rounded-full font-medium hover:bg-rose-700 transition shadow-lg shadow-rose-600/20">
              View Projects
            </Link>
            <Link href="#contact" className="bg-neutral-800 text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-700 transition border border-neutral-700">
              Contact Me
            </Link>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="mb-32">
          <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill: any) => (
              <span key={skill.id} className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:border-rose-500/50 transition-colors">
                <Code2 size={16} className="text-rose-500" />
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-32">
          <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-8">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project: any) => (
              <div key={project.id} className="group relative bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 hover:bg-neutral-800/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-neutral-800 rounded-2xl text-rose-500 group-hover:scale-110 transition-transform">
                    <Layers size={24} />
                  </div>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition">
                      <ArrowUpRight size={24} />
                    </a>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-400 mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8">
                  <Terminal size={14} />
                  {project.techStack}
                </div>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-rose-400 transition-colors">
                    Live Demo <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-8">Get In Touch</h2>
          <ContactForm />
        </section>

      </div>
    </main>
  );
}