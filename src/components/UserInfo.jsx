'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, isAuthenticated } from '@/utils/auth';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      const userDetails = getCurrentUser();
      setUser(userDetails);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading user info...</div>;
  }

  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="font-semibold text-lg mb-3">User Information</h3>
      <div className="space-y-2 text-sm">
        <p><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Role:</span> {user.role}</p>
        <p><span className="font-medium">User ID:</span> {user.userId}</p>
        <p><span className="font-medium">Token expires:</span> {new Date(user.exp * 1000).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default UserInfo; 