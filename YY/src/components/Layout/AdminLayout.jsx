import { useState } from 'react';
import AdminSidebar, { AdminSidebarToggle } from './AdminSidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-50">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex flex-col min-h-screen transition-all duration-300 lg:ml-56">
        {/* Top bar for mobile */}
        <div className="lg:hidden flex items-center h-16 px-4 bg-white shadow border-b border-gray-100 sticky top-0 z-20">
          <AdminSidebarToggle onClick={() => setSidebarOpen(true)} />
          <span className="ml-4 text-lg font-semibold text-blue-700">Admin Panel</span>
        </div>
        <main className="flex-1 flex flex-col w-full h-full min-h-screen px-0 py-6 animate-fade-in-slide lg:mt-20">
          <div className="w-full h-full min-h-screen flex flex-col">{children}</div>
        </main>
      </div>
    </div>
  );
} 