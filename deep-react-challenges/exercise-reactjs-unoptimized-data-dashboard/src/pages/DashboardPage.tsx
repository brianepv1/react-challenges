import { useEffect, useState } from 'react';
import type { User } from '../types/types';
import UserStats from '../components/UserStats';
import UserList from '../components/UserList';
import ErroneousWidget from '../components/ErroneousWidget';
import ErrorBoundary from '../components/ErrorBoundary';

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch a large list of users on initial mount
    const fetchUsers = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=100');
      const data = await res.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Dashboard</h1>
      <input
        type="text"
        placeholder="Filter by first name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      
      {/* These are the widgets you need to fix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <UserStats users={users} />
          <ErroneousWidget users={users} />
        </ErrorBoundary>
      </div>

      <h2 style={{ marginTop: '2rem' }}>User List</h2>
      <UserList users={filteredUsers} />
    </div>
  );
}