import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin/pending-users')
      .then((res) => res.json())
      .then(({ freelancers, clients }) => {
        setFreelancers(freelancers);  
      })
      .catch((err) => console.error(err));
  }, []);

  const approveUser = (id, role) => {
    fetch(`/admin/approve-user/${id}`, { method: 'POST' })
      .then(() => {
        if (role === 'freelancer') {
          setFreelancers((users) => users.filter((user) => user._id !== id));
        }
      });
  };

  const declineUser = (id, role) => {
    fetch(`/admin/decline-user/${id}`, { method: 'POST' })
      .then(() => {
        if (role === 'freelancer') {
          setFreelancers((users) => users.filter((user) => user._id !== id));
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {freelancers.map((user) => (
        <Link
        to={`/profile/${user._id}`}
        key={user._id}
        className="no-underline"
      >
        <div
          key={user._id}
          className="bg-gray-800 border border-gray-700 p-4 rounded-lg hover:shadow-lg hover:bg-gray-700"
        >
          <h3 className="text-xl font-bold text-purple-400 mb-2">{user.name}</h3>
          <p className="text-gray-400 mb-4">{user.email}</p>
          <div className="flex space-x-4">
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
          </div>
        </div>
 </Link>
      ))}
    </div>
  )}

  <h2 className="text-2xl mb-4">Clients</h2>
  {clients.length === 0 ? (
    <p className="text-gray-400">No pending clients.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((user) => (
        <div
          key={user._id}
          className="bg-gray-800 border border-gray-700 p-4 rounded-lg hover:shadow-lg hover:bg-gray-700"
        >

            
          <h3 className="text-xl font-bold text-purple-400 mb-2">{user.name}</h3>
          <p className="text-gray-400 mb-4">{user.email}</p>
          <div className="flex space-x-4">
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
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default AdminPage;
