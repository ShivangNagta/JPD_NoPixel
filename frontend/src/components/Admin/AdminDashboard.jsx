import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('/admin/pending-users')
      .then((res) => res.json())
      .then(({ freelancers, clients }) => {
        setFreelancers(freelancers);
        setClients(clients);
      })
      .catch((err) => console.error(err));
  }, []);

  const approveUser = (id, role) => {
    fetch(`/admin/approve-user/${role}/${id}`, { method: 'POST' })
      .then(() => {
        if (role === 'freelancer') {
          setFreelancers((users) => users.filter((user) => user._id !== id));
        } else {
          setClients((users) => users.filter((user) => user._id !== id));
        }
      });
  };

  const declineUser = (id, role) => {
    fetch(`/admin/decline-user/${role}/${id}`, { method: 'POST' })
      .then(() => {
        if (role === 'freelancer') {
          setFreelancers((users) => users.filter((user) => user._id !== id));
        } else {
          setClients((users) => users.filter((user) => user._id !== id));
        }
      });
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 font-labil">
      <h1 className="text-3xl font-bold text-purple-500 mb-6">Admin Panel</h1>
      <h2 className="text-2xl mb-4">Freelancers</h2>
      {freelancers.length === 0 ? (
        <p className="text-gray-400">No pending freelancers.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700 mb-6">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Name</th>
              <th className="border border-gray-700 p-2">Email</th>
              <th className="border border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-700">
                <td className="border border-gray-700 p-2">{user.name}</td>
                <td className="border border-gray-700 p-2">{user.email}</td>
                <td className="border border-gray-700 p-2 space-x-4">
                  <button
                    onClick={() => approveUser(user._id, 'freelancer')}
                    className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => declineUser(user._id, 'freelancer')}
                    className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2 className="text-2xl mb-4">Clients</h2>
      {clients.length === 0 ? (
        <p className="text-gray-400">No pending clients.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Name</th>
              <th className="border border-gray-700 p-2">Email</th>
              <th className="border border-gray-700 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((user) => (
              <tr key={user._id} className="hover:bg-gray-700">
                <td className="border border-gray-700 p-2">{user.name}</td>
                <td className="border border-gray-700 p-2">{user.email}</td>
                <td className="border border-gray-700 p-2 space-x-4">
                  <button
                    onClick={() => approveUser(user._id, 'client')}
                    className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => declineUser(user._id, 'client')}
                    className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;