// frontend/app/admin/dashboard/layout.tsx
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Wrench, MessageSquare, Home } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-rose-500 tracking-tight">Admin Panel</h2>
        
        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 text-neutral-400 hover:text-white hover:bg-neutral-800 px-4 py-3 rounded-xl transition-all">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link href="/admin/dashboard/projects" className="flex items-center gap-3 text-neutral-400 hover:text-white hover:bg-neutral-800 px-4 py-3 rounded-xl transition-all">
            <FolderKanban size={20} /> Projects
          </Link>
          <Link href="/admin/dashboard/skills" className="flex items-center gap-3 text-neutral-400 hover:text-white hover:bg-neutral-800 px-4 py-3 rounded-xl transition-all">
            <Wrench size={20} /> Skills
          </Link>
          <Link href="/admin/dashboard/messages" className="flex items-center gap-3 text-neutral-400 hover:text-white hover:bg-neutral-800 px-4 py-3 rounded-xl transition-all">
            <MessageSquare size={20} /> Messages
          </Link>
        </nav>

        <Link href="/" className="flex items-center gap-3 text-neutral-500 hover:text-white mt-auto px-4 py-3 transition-all">
          <Home size={20} /> Back to Site
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}