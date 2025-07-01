import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const email = localStorage.getItem('studentEmail');
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:5000/api/user/${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setName(data.user.name);
        } else {
          setError(data.message || 'User not found');
        }
      } catch (err) {
        setError('Could not fetch user profile.');
      } finally {
        setLoading(false);
      }
    };
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/${encodeURIComponent(email)}/results`);
        const data = await res.json();
        if (data.success) setTestResults(data.results);
      } catch {}
    };
    if (email) {
      fetchUser();
      fetchResults();
    }
  }, [email]);

  const handleSave = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setEditMode(false);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Could not update profile.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">No user found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
            <span role="img" aria-label="avatar">👤</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-rich-black">User Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Email:</label>
          <div className="bg-gray-100 rounded px-3 py-2">{user.email}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Name:</label>
          {editMode ? (
            <input
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          ) : (
            <div className="bg-gray-100 rounded px-3 py-2">{user.name}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Attempts Used:</label>
          <div className="bg-gray-100 rounded px-3 py-2">{user.attemptsUsed} / {user.totalAttempts}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Eligibility Status:</label>
          <div className="bg-gray-100 rounded px-3 py-2">{user.eligibilityStatus}</div>
        </div>
        <div className="flex gap-4 mt-6">
          {editMode ? (
            <>
              <button onClick={handleSave} className="px-6 py-2 bg-lavish-gold text-white rounded-lg font-semibold">Save</button>
              <button onClick={() => { setEditMode(false); setName(user.name); }} className="px-6 py-2 bg-gray-300 text-rich-black rounded-lg font-semibold">Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold">Edit Profile</button>
          )}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h3 className="text-xl font-bold mb-4 text-rich-black">Test History</h3>
        {testResults.length === 0 ? (
          <div className="text-gray-500">No test attempts yet.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b">Date</th>
                <th className="py-2 px-3 border-b">Domain</th>
                <th className="py-2 px-3 border-b">Score</th>
                <th className="py-2 px-3 border-b">Result</th>
                <th className="py-2 px-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map(r => (
                <tr key={r._id}>
                  <td className="py-2 px-3 border-b">{r.testDate ? new Date(r.testDate).toLocaleString() : '-'}</td>
                  <td className="py-2 px-3 border-b">{r.domain || '-'}</td>
                  <td className="py-2 px-3 border-b">{r.score} / {r.totalQuestions}</td>
                  <td className="py-2 px-3 border-b">{r.percentage >= 65 ? 'Pass' : 'Fail'}</td>
                  <td className="py-2 px-3 border-b">
                    <a href={`/result/${r._id}`} className="text-blue-600 hover:underline">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 