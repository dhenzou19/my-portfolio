// frontend/app/page.tsx
import { ArrowUpRight, Code2, Layers, Terminal, User, MapPin, Mail, Download } from 'lucide-react';
import ContactForm from './components/ContactForm';
import Link from 'next/link';
import Image from 'next/image';

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
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 selection:bg-rose-500/30 font-sans">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-[#0a0a0a] to-[#0a0a0a]"></div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        
        {/* HERO SECTION (Split Layout) */}
        <section className="mb-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/50 border border-neutral-700/50 text-sm text-neutral-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for work
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Hi, I'm <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">Dhenmarc.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed">
              A Full Stack Developer specializing in building exceptional digital experiences. 
              From robust backends to pixel-perfect frontends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#projects" className="bg-rose-600 text-white px-8 py-3 rounded-full font-medium hover:bg-rose-700 transition shadow-lg shadow-rose-600/20 text-center">
                View Projects
              </Link>
              <a href="/resume.pdf" target="_blank" className="bg-neutral-800 text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-700 transition border border-neutral-700 flex items-center justify-center gap-2">
                <Download size={18} /> Download CV
              </a>
            </div>
          </div>

          {/* Right Side: Photo with Glow */}
          <div className="flex-1 flex justify-center md:justify-end relative">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-600 to-purple-600 rounded-full blur-3xl opacity-20 transform scale-75 md:scale-100"></div>
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-neutral-800 overflow-hidden shadow-2xl">
              {/* IMPORTANT: I-replace ni sa imong exact filename kung lahi (e.g., profile.png) */}
              <Image 
                src="/profile.jpg" 
                alt="Dhenmarc Profile" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className="mb-32">
          <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-8">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Text Area */}
            <div className="md:col-span-2 space-y-6 text-neutral-400 leading-relaxed">
              <p>
                I am a passionate Full Stack Developer with a strong foundation in building 
                scalable web applications. My journey in tech started with a curiosity for 
                how things work, which eventually led me to mastering the JavaScript ecosystem.
              </p>
              <p>
                I specialize in <strong className="text-white">Next.js, TypeScript, and Node.js</strong>, 
                backed by robust databases like PostgreSQL. I love bridging the gap between 
                beautiful design and efficient backend architecture.
              </p>
              <p>
                When I'm not coding, I'm usually exploring new developer tools, 
                optimizing database queries, or sharing my knowledge with the community.
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="space-y-4">
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-neutral-800 rounded-xl text-rose-500"><User size={20} /></div>
                <div>
                  <p className="text-sm text-neutral-500">Name</p>
                  <p className="font-medium text-white">Dhenmarc Noval</p>
                </div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-neutral-800 rounded-xl text-rose-500"><MapPin size={20} /></div>
                <div>
                  <p className="text-sm text-neutral-500">Location</p>
                  <p className="font-medium text-white">Cebu, Philippines</p>
                </div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-neutral-800 rounded-xl text-rose-500"><Mail size={20} /></div>
                <div>
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="font-medium text-white">dhenmarctagsip@gmail.com</p>
                </div>
              </div>
            </div>

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