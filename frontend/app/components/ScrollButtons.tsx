// frontend/app/components/ScrollButtons.tsx
'use client';

import { Download } from 'lucide-react';

export default function ScrollButtons() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full">
      <button 
        onClick={() => scrollTo('projects')}
        className="w-full sm:w-auto whitespace-nowrap bg-rose-600 text-white px-8 py-3 rounded-full font-medium hover:bg-rose-700 transition shadow-lg shadow-rose-600/20 text-center cursor-pointer"
      >
        View Projects
      </button>
      <button 
        onClick={() => scrollTo('contact')}
        className="w-full sm:w-auto whitespace-nowrap bg-neutral-800 text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-700 transition border border-neutral-700 text-center cursor-pointer"
      >
        Contact Me
      </button>
      <a 
        href="/resume.pdf" target="_blank" 
        className="w-full sm:w-auto whitespace-nowrap bg-transparent border border-neutral-700 text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-800 transition flex items-center justify-center gap-2"
      >
        <Download size={18} /> Download CV
      </a>
    </div>
  );
}