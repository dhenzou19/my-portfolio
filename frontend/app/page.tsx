// frontend/app/page.tsx
import ContactForm from './components/ContactForm';

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
    <main className="min-h-screen bg-neutral-900 text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        
        {/* HERO SECTION */}
        <section className="mb-20 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Hi, I'm Dhenmarc.</h1>
          <p className="text-xl text-gray-400">
            Full Stack Developer specializing in modern web apps.
          </p>
        </section>

        {/* SKILLS SECTION */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">My Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill: any) => (
              <span key={skill.id} className="bg-rose-600 px-4 py-2 rounded-full text-sm font-medium">
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project: any) => (
              <div key={project.id} className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 hover:border-rose-500 transition">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <p className="text-sm text-rose-400 mb-4">Tech: {project.techStack}</p>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition">
                    View Live Site
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

         {/* CONTACT SECTION */}
        <section className="pb-10">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Contact Me</h2>
          <ContactForm />
        </section>

      </div>
    </main>
  );
}