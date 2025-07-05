import { useEffect, useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const PAYMENT_STATUS_OPTIONS = ['All', 'Success', 'Failed'];
const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL || 'http://localhost:3000';

export default function PaymentHistoryTab({ domainsOverride }) {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${PAYMENT_API_URL}/payments`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPayments(data.payments || []);
        } else {
          setPayments([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
        setPayments([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let data = [...payments];
    if (search) {
      data = data.filter(p =>
        (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.orderId || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.paymentId || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status !== 'All') {
      data = data.filter(p => {
        if (status === 'Success') return p.status === 'success';
        if (status === 'Failed') return p.status === 'failed' || p.status === 'error';
        return true;
      });
    }
    if (dateFrom) {
      data = data.filter(p => new Date(p.createdAt) >= new Date(dateFrom));
    }
    if (dateTo) {
      data = data.filter(p => new Date(p.createdAt) <= new Date(dateTo));
    }
    setFiltered(data);
  }, [payments, search, status, dateFrom, dateTo]);

  const resetFilters = () => {
    setSearch('');
    setStatus('All');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col w-full">
      {/* Filters Bar */}
      <div className="flex flex-wrap gap-3 items-center bg-white/70 rounded-2xl shadow p-4 border border-yellow-100 mb-2 sticky top-0 z-10 backdrop-blur-lg" style={{background: 'rgba(255,255,255,0.95)'}}>
        <div className="flex flex-col min-w-[200px] flex-1">
          <label className="text-xs font-semibold text-gray-500 mb-1">Search</label>
          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 w-full">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              type="text"
              placeholder="Search by name, email, order ID, or payment ID"
              className="bg-transparent outline-none text-sm w-full"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col min-w-[140px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Status</label>
          <select
            className="rounded-xl px-3 py-2 text-sm border border-gray-200 bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {PAYMENT_STATUS_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col min-w-[160px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Date From</label>
          <input
            type="date"
            className="rounded-xl px-3 py-2 text-sm border border-gray-200 bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
          />
        </div>
        <div className="flex flex-col min-w-[160px]">
          <label className="text-xs font-semibold text-gray-500 mb-1">Date To</label>
          <input
            type="date"
            className="rounded-xl px-3 py-2 text-sm border border-gray-200 bg-gray-50 focus:ring-yellow-400 focus:border-yellow-400"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-end min-w-[140px]">
          <button
            className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold px-5 py-2 rounded-xl border border-yellow-200 shadow-sm transition-colors"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
      {/* Payments Table */}
      <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-xl border border-yellow-100 backdrop-blur-lg">
        <div className="max-h-[400px] overflow-y-auto" style={{maxHeight: '400px'}}>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-yellow-50 text-yellow-900 font-semibold">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Payment ID</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center text-gray-400 py-8">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center text-gray-400 py-8">No payment data available</td></tr>
              ) : (
                filtered.map((p, i) => (
                  <tr
                    key={p._id || i}
                    className={i % 2 === 0 ? 'bg-white hover:bg-yellow-50 transition-colors' : 'bg-yellow-50/40 hover:bg-yellow-100/60 transition-colors'}
                  >
                    <td className="p-4 font-medium text-gray-900">{p.name || '-'}</td>
                    <td className="p-4">{p.email}</td>
                    <td className="p-4">{p.phone || '-'}</td>
                    <td className="p-4">₹{(p.amount / 100).toFixed(2)}</td>
                    <td className="p-4">{p.orderId}</td>
                    <td className="p-4">{p.paymentId}</td>
                    <td className="p-4">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-'}</td>
                    <td className="p-4">
                      <span className={
                        'inline-block px-2 py-1 rounded-full text-xs font-semibold ' +
                        (p.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700')
                      }>
                        {p.status === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </td>
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