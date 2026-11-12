import { ArrowUpRight, Layers, Terminal } from 'lucide-react';

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export default async function ProjectsSection() {
  const projects = await getProjects();

  return (
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
  );
}