import { useEffect, useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const DOMAIN_OPTIONS = [
  'All',
  'Frontend',
  'Backend',
  'Fullstack',
  'Data Science',
  'DevOps',
  'UI/UX',
  'HR',
  'Content Writing',
  'Digital',
  'Mobile',
  'ML',
  'Aptitude',
  'Analytics',
];
const ELIGIBILITY_OPTIONS = ['All', 'Eligible', 'Not Eligible', 'Pending'];

export default function AdminInternships() {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [eligibility, setEligibility] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/internships')
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let data = [...applications];
    if (search) {
      data = data.filter(app =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (domain !== 'All') {
      data = data.filter(app => app.domain === domain);
    }
    if (eligibility !== 'All') {
      data = data.filter(app => (app.eligibility || 'Pending') === eligibility);
    }
    if (dateFrom) {
      data = data.filter(app => new Date(app.createdAt) >= new Date(dateFrom));
    }
    if (dateTo) {
      data = data.filter(app => new Date(app.createdAt) <= new Date(dateTo));
    }
    setFiltered(data);
  }, [applications, search, domain, eligibility, dateFrom, dateTo]);

  const resetFilters = () => {
    setSearch('');
    setDomain('All');
    setEligibility('All');
    setDateFrom('');
    setDateTo('');
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="w-full bg-[#f8fafc] rounded-3xl p-6 md:p-10 shadow-inner">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">Applicants</h1>
      {/* Filters Bar */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-wrap gap-4 items-end border border-gray-100">
        <div className="flex flex-col min-w-[160px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Search</label>
          <input
            type="text"
            placeholder="Name or Email"
            className="input input-bordered border-gray-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-yellow-200 bg-gray-50"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col min-w-[120px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Domain</label>
          <select
            className="input input-bordered border-gray-200 rounded-full px-4 py-2 text-sm bg-gray-50"
            value={domain}
            onChange={e => setDomain(e.target.value)}
          >
            {DOMAIN_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col min-w-[120px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Eligibility</label>
          <select
            className="input input-bordered border-gray-200 rounded-full px-4 py-2 text-sm bg-gray-50"
            value={eligibility}
            onChange={e => setEligibility(e.target.value)}
          >
            {ELIGIBILITY_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col min-w-[120px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Date From</label>
          <input
            type="date"
            className="input input-bordered border-gray-200 rounded-full px-4 py-2 text-sm bg-gray-50"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
          />
        </div>
        <div className="flex flex-col min-w-[120px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Date To</label>
          <input
            type="date"
            className="input input-bordered border-gray-200 rounded-full px-4 py-2 text-sm bg-gray-50"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
          />
        </div>
        <button
          className="ml-auto bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-5 py-2 rounded-full border border-yellow-200 shadow-sm transition-colors"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>
      {/* Applicants Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow border border-gray-100">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700 font-semibold">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Domain</th>
              <th className="p-4 text-left">Education</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Skills</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Eligibility</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center text-gray-400 py-8">No applicants found.</td>
              </tr>
            ) : (
              filtered.map((app, i) => (
                <tr
                  key={app._id}
                  className={
                    i % 2 === 0
                      ? 'bg-white hover:bg-yellow-50 transition-colors'
                      : 'bg-gray-50 hover:bg-yellow-50 transition-colors'
                  }
                >
                  <td className="p-4 font-medium text-gray-900">{app.name}</td>
                  <td className="p-4">{app.email}</td>
                  <td className="p-4">{app.phone}</td>
                  <td className="p-4">{app.domain}</td>
                  <td className="p-4">{app.education}</td>
                  <td className="p-4">{app.experience}</td>
                  <td className="p-4">{app.skills}</td>
                  <td className="p-4 max-w-xs truncate" title={app.message}>{app.message}</td>
                  <td className="p-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span
                      className={
                        'inline-block px-2 py-1 rounded-full text-xs font-semibold ' +
                        ((app.eligibility || 'Pending') === 'Eligible'
                          ? 'bg-green-100 text-green-700'
                          : (app.eligibility || 'Pending') === 'Not Eligible'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700')
                      }
                    >
                      {app.eligibility || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 