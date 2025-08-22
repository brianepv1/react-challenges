import { useMemo } from 'react';
import type { User } from '../types/types';
import React from 'react';

// THIS IS A DELIBERATELY SLOW, EXPENSIVE FUNCTION
const calculateDepartmentStats = (users: User[]) => {
  console.log('Calculating department stats... (This should be slow)');
  // Simulate a very heavy calculation
  const start = performance.now();
  while (performance.now() - start < 300) {
    // Artificial delay to mimic a complex loop
  }

  const stats = users.reduce((acc, user) => {
    const { department } = user.company;
    acc[department] = (acc[department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return stats;
};

function UserStats({ users }: { users: User[] }) {
  const departmentStats = useMemo(() => {
    return calculateDepartmentStats(users);
  }, [users])

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h3>Department Stats</h3>
      <ul>
        {Object.entries(departmentStats).map(([dept, count]) => (
          <li key={dept}>{dept}: {count} users</li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(UserStats);