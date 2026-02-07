import { useEffect, useState } from 'react';
import { MdPeople, MdEmail, MdCalendarToday } from 'react-icons/md';
import { userAPI } from '../services/api';
import type { User } from '../types';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await userAPI.getAll();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MdPeople className="text-3xl text-accent" />
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Community Members
        </h1>
      </div>

      {users.length === 0 ? (
        <div className="glass py-16 text-center">
          <p className="text-slate-500">No users found.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => {
            const initials = user.username.slice(0, 2).toUpperCase();
            const joined = new Date(user.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={user.id}
                className="glass flex items-center gap-4 p-5 transition hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-md shadow-accent/25">
                  {initials}
                </div>

                {/* Info */}
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {user.username}
                  </p>
                  <p className="flex items-center gap-1.5 truncate text-xs text-slate-500">
                    <MdEmail className="shrink-0 text-sm text-slate-400" />
                    {user.email}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MdCalendarToday className="shrink-0 text-sm" />
                    Joined {joined}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Users;
