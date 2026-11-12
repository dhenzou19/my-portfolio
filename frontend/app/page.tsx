// frontend/app/page.tsx
import { Suspense } from 'react';
import Image from 'next/image';
import { User, MapPin, Mail } from 'lucide-react';
import ContactForm from './components/ContactForm';
import ScrollButtons from './components/ScrollButtons';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200 selection:bg-rose-500/30 font-sans">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-[#0a0a0a] to-[#0a0a0a]"></div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        
        {/* HERO SECTION */}
        <section className="mb-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/50 border border-neutral-700/50 text-sm text-neutral-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for work
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Hi, I'm <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">Dhenmarc.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-lg mb-10 leading-relaxed mx-auto md:mx-0">
              A Full Stack Developer specializing in building exceptional digital experiences. 
              From robust backends to pixel-perfect frontends.
            </p>
            
            <ScrollButtons />
          </div>

          {/* Image Wrapper */}
          <div className="flex-1 flex justify-center md:justify-end relative w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-600 to-purple-600 rounded-full blur-3xl opacity-20 transform scale-75 md:scale-100"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-neutral-800 overflow-hidden shadow-2xl">
              <Image src="/pfp.png" alt="Dhenmarc Profile" fill className="object-cover" priority />
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className="mb-32">
          <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-8">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            
            {/* Text Area */}
            <div className="md:col-span-3 space-y-6 text-neutral-400 leading-relaxed text-lg">
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
            <div className="md:col-span-2 space-y-4">
              <div className="bg-neutral-900/50 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4 hover:border-neutral-700 transition-colors">
                <div className="p-3 bg-neutral-800 rounded-xl text-rose-500"><User size={20} /></div>
                <div>
                  <p className="text-sm text-neutral-500">Name</p>
                  <p className="font-medium text-white">Dhenmarc</p>
                </div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4 hover:border-neutral-700 transition-colors">
                <div className="p-3 bg-neutral-800 rounded-xl text-rose-500"><MapPin size={20} /></div>
                <div>
                  <p className="text-sm text-neutral-500">Location</p>
                  <p className="font-medium text-white">Cebu, Philippines</p>
                </div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4 hover:border-neutral-700 transition-colors">
                <div className="p-3 bg-neutral-800 rounded-xl text-rose-500"><Mail size={20} /></div>
                <div>
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="font-medium text-white">your.email@gmail.com</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="mb-32">
          <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-8">Tech Stack</h2>
          <Suspense fallback={
            <div className="flex flex-wrap gap-3">
              <div className="h-10 w-24 bg-neutral-800 animate-pulse rounded-xl"></div>
              <div className="h-10 w-32 bg-neutral-800 animate-pulse rounded-xl"></div>
              <div className="h-10 w-28 bg-neutral-800 animate-pulse rounded-xl"></div>
            </div>
          }>
            <SkillsSection />
          </Suspense>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-32">
          <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-8">Featured Work</h2>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-neutral-800 animate-pulse rounded-3xl"></div>
              <div className="h-64 bg-neutral-800 animate-pulse rounded-3xl"></div>
            </div>
          }>
            <ProjectsSection />
          </Suspense>
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