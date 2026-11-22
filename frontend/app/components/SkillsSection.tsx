import { Code2 } from 'lucide-react';

async function getSkills() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return []; // Return empty array so the page doesn't crash
  }
}

export default async function SkillsSection() {
  const skills = await getSkills();

  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill: any) => (
        <span key={skill.id} className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:border-rose-500/50 transition-colors">
          <Code2 size={16} className="text-rose-500" />
          {skill.name}
        </span>
      ))}
    </div>
  );
}