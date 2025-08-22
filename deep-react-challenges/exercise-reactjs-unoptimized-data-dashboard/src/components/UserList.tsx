import type { User } from '../types/types';

function UserList({ users }: { users: User[] }) {
  console.log('Rendering UserList...');

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc' }}>
      {users.map(user => (
        <div key={user.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
          {user.firstName} {user.lastName} ({user.age})
        </div>
      ))}
    </div>
  );
}

export default UserList;