import type { User } from '../types/types';

export default function ErroneousWidget({ users }: { users: User[] }) {
  // This component will crash if it receives no users initially
  if (users.length === 0) {
    throw new Error("No users available to display in this widget!");
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h3>Widget</h3>
      <p>Successfully rendered with {users.length} users.</p>
    </div>
  );
}