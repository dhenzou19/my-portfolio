import { Code2 } from 'lucide-react';
import { skills } from '../../data'; // Import local data

export default function SkillsSection() {
  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <span key={skill.id} className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:border-rose-500/50 transition-colors">
          <Code2 size={16} className="text-rose-500" />
          {skill.name}
        </span>
      ))}
    </div>
  );
}