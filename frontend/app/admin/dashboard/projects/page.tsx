// frontend/app/admin/dashboard/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', techStack: '', liveUrl: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/projects/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/projects`;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include',
    });

    if (res.ok) {
      setForm({ title: '', description: '', techStack: '', liveUrl: '' });
      setEditingId(null);
      fetchProjects();
    } else {
      alert("Failed to save. Make sure you are logged in as admin.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/projects/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) fetchProjects();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Manage Projects</h1>
      
      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Project Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none" required />
          <input placeholder="Tech Stack (e.g. Next.js, Node)" value={form.techStack} onChange={(e) => setForm({...form, techStack: e.target.value})} className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none" required />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none" rows={3} required />
        <input placeholder="Live URL (Optional)" value={form.liveUrl} onChange={(e) => setForm({...form, liveUrl: e.target.value})} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none" />
        
        <button type="submit" className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-700 transition flex items-center gap-2">
          {editingId ? <><Pencil size={18} /> Update Project</> : <><Plus size={18} /> Add Project</>}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-800/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-400">Title</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-400">Tech Stack</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-neutral-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => (
              <tr key={project.id} className="border-t border-neutral-800">
                <td className="px-6 py-4 text-white font-medium">{project.title}</td>
                <td className="px-6 py-4 text-neutral-400 text-sm">{project.techStack}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => { setEditingId(project.id); setForm(project); window.scrollTo(0,0); }} className="text-blue-400 hover:text-blue-300 transition">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300 transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}