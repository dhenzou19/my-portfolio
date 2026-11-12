// frontend/app/admin/dashboard/page.tsx
export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, Admin</h1>
      <p className="text-neutral-400 mb-8">Manage your portfolio content seamlessly without touching code.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <h3 className="text-neutral-400 text-sm mb-1">Total Projects</h3>
          <p className="text-3xl font-bold text-white">Manage in Projects tab</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <h3 className="text-neutral-400 text-sm mb-1">Skills</h3>
          <p className="text-3xl font-bold text-white">Manage in Skills tab</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <h3 className="text-neutral-400 text-sm mb-1">Messages</h3>
          <p className="text-3xl font-bold text-white">Manage in Messages tab</p>
        </div>
      </div>
    </div>
  );
}