import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    paymentStats: {
      totalOrders: 0,
      totalPayments: 0,
      totalErrors: 0,
      totalAmount: 0,
      recentPayments: []
    },
    testStats: {
      totalTests: 0,
      averageScore: 0,
      recentTests: []
    },
    applicationStats: {
      totalApplications: 0,
      pendingApplications: 0,
      recentApplications: []
    },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/admin-dashboard');
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.data);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor payments, tests, and applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Payment Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Orders:</span>
                <span className="font-semibold">{dashboardData.paymentStats.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Successful Payments:</span>
                <span className="font-semibold text-green-600">{dashboardData.paymentStats.totalPayments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">₹{dashboardData.paymentStats.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Errors:</span>
                <span className="font-semibold text-red-600">{dashboardData.paymentStats.totalErrors}</span>
              </div>
            </div>
          </div>

          {/* Test Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Tests:</span>
                <span className="font-semibold">{dashboardData.testStats.totalTests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-semibold">{dashboardData.testStats.averageScore.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Application Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Applications:</span>
                <span className="font-semibold">{dashboardData.applicationStats.totalApplications}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Review:</span>
                <span className="font-semibold text-yellow-600">{dashboardData.applicationStats.pendingApplications}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/admin/internships')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                View Applications
              </button>
              <button 
                onClick={() => window.open('/admin.html', '_blank')}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              >
                Payment Logs
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            {dashboardData.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentActivity.slice(0, 10).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.type === 'PAYMENT_SUCCESS' && 'Payment Successful'}
                        {activity.type === 'ORDER_CREATED' && 'Order Created'}
                        {activity.type === 'PAYMENT_FAILED' && 'Payment Failed'}
                        {activity.type === 'ORDER_CREATION_ERROR' && 'Order Creation Error'}
                        {activity.type === 'PAYMENT_VERIFICATION_ERROR' && 'Payment Verification Error'}
                        {activity.type === 'UNHANDLED_ERROR' && 'System Error'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {activity.amount && (
                        <p className="text-sm font-semibold">₹{activity.amount}</p>
                      )}
                      {activity.orderId && (
                        <p className="text-xs text-gray-500">{activity.orderId}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

export function AdminTestResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-signin');
      return;
    }
    fetch('http://localhost:5000/api/test-results', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setResults(data.results || data.records || []);
        } else {
          setError(data.message || 'Failed to fetch results.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Could not connect to the server.');
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Test Results</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Domain</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Percentage</th>
              <th className="p-2 border">Time Taken</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">View</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r._id || i} className="border-b">
                <td className="p-2 border">{r.studentName || r.name || '-'}</td>
                <td className="p-2 border">{r.email}</td>
                <td className="p-2 border">{r.domain}</td>
                <td className="p-2 border">{r.score}/{r.totalQuestions}</td>
                <td className="p-2 border">{r.percentage}%</td>
                <td className="p-2 border">{Math.floor((r.timeTaken || 0) / 60)}m {(r.timeTaken || 0) % 60}s</td>
                <td className="p-2 border">{r.completedOn ? new Date(r.completedOn).toLocaleString() : '-'}</td>
                <td className="p-2 border">
                  <Link to={`/result/${r._id}`} className="text-blue-600 underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 