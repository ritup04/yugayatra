import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: HomeIcon },
  { name: 'Test History', path: '/admin/test-results', icon: ClipboardDocumentListIcon },
  { name: 'Payment History', path: '/admin/payment-history', icon: CreditCardIcon },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  // Sidebar is always visible on desktop, controlled by isOpen on mobile
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-200 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
        aria-label="Close sidebar overlay"
      />
      <aside
        className={`bg-white/70 backdrop-blur-lg h-screen w-56 flex flex-col fixed top-0 left-0 z-30 border-r border-gray-100 shadow-2xl transition-transform duration-300 pt-16
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          animate-sidebar-slide-in`}
        aria-label="Admin sidebar"
      >
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <span className="text-2xl font-bold text-yellow-600 tracking-tight">Admin</span>
        </div>
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-2xl font-medium transition-all duration-200 text-base ${
                    isActive
                      ? 'bg-lavish-gold/20 text-yellow-700 shadow-lg border border-yellow-300'
                      : 'text-gray-700 hover:bg-yellow-50/70'
                  }`
                }
                onClick={onClose}
              >
                <Icon className="w-5 h-5" />
                <span className="ml-1">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-auto p-4 border-t border-gray-100">
          <button className="w-full bg-red-100 text-red-700 py-2 rounded-2xl font-semibold hover:bg-red-200 transition-colors" onClick={handleLogout}>Log out</button>
        </div>
      </aside>
    </>
  );
}

// Hamburger menu button for parent layout
export function AdminSidebarToggle({ onClick }) {
  return (
    <button
      className="lg:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
      onClick={onClick}
      aria-label="Open sidebar"
    >
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
} 