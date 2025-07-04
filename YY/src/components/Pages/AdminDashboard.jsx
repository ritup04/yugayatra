import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import TestHistoryTab from './TestHistoryTab';
import PaymentHistoryTab from './PaymentHistoryTab';
import { NavLink } from 'react-router-dom';

function DashboardApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ date: '', domain: '', eligibility: '', search: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.users)) {
          setApplicants(data.users.slice(0, 10));
        } else {
          setApplicants([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load applicants. Please check your backend server.');
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredApplicants = applicants.filter(app => {
    const matchesDate = filters.date ? new Date(app.createdAt).toLocaleDateString() === filters.date : true;
    const matchesDomain = filters.domain ? app.domain === filters.domain : true;
    const matchesEligibility = filters.eligibility ? app.eligibility === filters.eligibility : true;
    const matchesSearch = filters.search ? (app.name?.toLowerCase().includes(filters.search.toLowerCase()) || app.email?.toLowerCase().includes(filters.search.toLowerCase())) : true;
    return matchesDate && matchesDomain && matchesEligibility && matchesSearch;
  });

  // Use the full list of domains from the internship application form
  const domains = [
    'backend development',
    'content writing',
    'data analysis',
    'data science',
    'devops',
    'digital marketing',
    'front end development',
    'full stack development',
    'hr',
    'machine learning',
    'mobile development',
    'ui/ux design',
  ];
  const eligibilities = Array.from(new Set(applicants.map(a => a.eligibility))).filter(Boolean);

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col w-full">
      {error && (
        <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-lg py-4 mb-6 font-semibold">
          {error}
        </div>
      )}
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 items-center bg-white/70 rounded-2xl shadow p-4 border border-yellow-100 mb-2 sticky top-0 z-10 backdrop-blur-lg" style={{background: 'rgba(255,255,255,0.95)'}}>
        <div className="flex flex-col min-w-[180px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Search</label>
          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              type="text"
              placeholder="Search by name or email"
              className="bg-transparent outline-none text-sm w-32 md:w-48"
              value={filters.search || ''}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex flex-col min-w-[160px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Date</label>
          <input
            type="date"
            className="rounded-xl px-3 py-2 text-sm border border-gray-200 bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400"
            value={filters.date}
            onChange={e => setFilters(f => ({ ...f, date: e.target.value }))}
            placeholder="Select date"
          />
        </div>
        <div className="flex flex-col min-w-[140px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Domain</label>
          <select
            className="rounded-xl px-3 py-2 text-sm border border-gray-200 bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400"
            value={filters.domain}
            onChange={e => setFilters(f => ({ ...f, domain: e.target.value }))}
          >
            <option value="">All Domains</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white/90 rounded-2xl shadow-xl border border-yellow-100 w-full mx-0 animate-fade-in backdrop-blur-lg">
        <h2 className="text-xl font-bold text-yellow-700 mb-4 px-6 pt-6">Recent Applicants</h2>
        <div className="overflow-x-auto px-4 pb-4 max-h-[400px] overflow-y-auto" style={{maxHeight: '400px'}}>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-yellow-50 text-yellow-900 font-semibold">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Domain</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center text-gray-400 py-8">Loading...</td></tr>
              ) : filteredApplicants.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-gray-400 py-8">No data available</td></tr>
              ) : (
                filteredApplicants
                  .filter(app => !filters.search || (app.name?.toLowerCase().includes(filters.search.toLowerCase()) || app.email?.toLowerCase().includes(filters.search.toLowerCase())))
                  .map((app, i) => (
                  <tr key={app._id || i} className={`transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-yellow-50/40'} hover:bg-yellow-100/60`}>
                    <td className="p-3 font-medium text-gray-900">{app.name}</td>
                    <td className="p-3">{app.email}</td>
                    <td className="p-3">{app.domain}</td>
                    <td className="p-3">{new Date(app.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/test-results': 'Test History',
  '/admin/payment-history': 'Payment History',
};

export default function AdminDashboard() {
  const location = useLocation();
  const path = location.pathname;
  let content = null;
  let title = PAGE_TITLES[path] || 'Admin';

  if (path === '/admin') {
    content = <DashboardApplicants />;
  } else if (path === '/admin/test-results') {
    content = <TestHistoryTab domainsOverride={[
      'backend development',
      'content writing',
      'data analysis',
      'data science',
      'devops',
      'digital marketing',
      'front end development',
      'full stack development',
      'hr',
      'machine learning',
      'mobile development',
      'ui/ux design',
    ]} />;
  } else if (path === '/admin/payment-history') {
    content = <PaymentHistoryTab domainsOverride={[
      'backend development',
      'content writing',
      'data analysis',
      'data science',
      'devops',
      'digital marketing',
      'front end development',
      'full stack development',
      'hr',
      'machine learning',
      'mobile development',
      'ui/ux design',
    ]} />;
  } else {
    content = <div className="text-gray-500">Welcome to the Admin Dashboard!</div>;
  }

  return (
    <AdminLayout>
      <div className="w-full min-h-screen p-4 md:p-8 bg-transparent pt-24 flex flex-col items-start justify-start">
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-700 tracking-tight mb-4">{title}</h1>
        <div className="bg-white/80 rounded-3xl shadow-2xl border border-yellow-100 p-6 md:p-8 backdrop-blur-lg w-full">
          {content}
        </div>
      </div>
    </AdminLayout>
  );
} 