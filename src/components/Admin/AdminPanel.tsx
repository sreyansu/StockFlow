import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UserData } from '../../types/user';
import toast from 'react-hot-toast';

const AdminPanel: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<UserData[]>([]);
  const [managedUsers, setManagedUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      const allUsers = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as UserData[];
      
      setPendingUsers(allUsers.filter(u => u.role === 'pending'));
      setManagedUsers(allUsers.filter(u => u.role !== 'pending'));

    } catch (error) {
      toast.error('Failed to fetch users.');
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdateUserRole = async (userId: string, newRole: UserData['role']) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { role: newRole });
      toast.success(`User role has been updated to ${newRole}.`);
      fetchUsers(); // Refresh the user lists
    } catch (error) {
      toast.error('Failed to update user role.');
      console.error('Error updating user role:', error);
    }
  };

  const RolePill: React.FC<{ role: UserData['role'] }> = ({ role }) => {
    const roleClasses: { [key: string]: string } = {
      admin: 'bg-indigo-200 text-indigo-900',
      staff: 'bg-green-200 text-green-900',
      pending: 'bg-yellow-200 text-yellow-900',
      rejected: 'bg-red-200 text-red-900',
    };
    return (
      <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${roleClasses[role as keyof typeof roleClasses]}`}>
        <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${roleClasses[role as keyof typeof roleClasses]}`}></span>
        <span className="relative">{role}</span>
      </span>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      
      {/* User Verification Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Verifications</h2>
        {isLoading ? <p>Loading...</p> : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {pendingUsers.length > 0 ? pendingUsers.map(user => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{user.email}</p></td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button onClick={() => handleUpdateUserRole(user.id, 'staff')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Approve</button>
                      <button onClick={() => handleUpdateUserRole(user.id, 'rejected')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Reject</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={2} className="text-center py-4">No pending users.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Management Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        {isLoading ? <p>Loading...</p> : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Change Role</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {managedUsers.length > 0 ? managedUsers.map(user => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{user.email}</p></td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><RolePill role={user.role} /></td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <select 
                        value={user.role}
                        onChange={(e) => handleUpdateUserRole(user.id, e.target.value as UserData['role'])}
                        className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={3} className="text-center py-4">No users to manage.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
