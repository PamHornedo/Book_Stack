import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdMenuBook, MdLogout, MdDarkMode } from 'react-icons/md';

const NAV_LINKS = [
  { to: '/', label: 'Books' },
  { to: '/users', label: 'Users' },
  { to: '/reviews', label: 'Reviews' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  /** First two letters of username for the avatar circle */
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? '';

  return (
    <nav className="glass fixed inset-x-0 top-0 z-50 rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ──────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
            <MdMenuBook className="text-xl" />
          </span>
          <span className="text-lg font-bold tracking-tight text-accent">
            Read&amp;Review
          </span>
        </Link>

        {/* ── Center nav links ──────────────────── */}
        <div className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map(({ to, label }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition
                  ${
                    isActive
                      ? 'text-accent'
                      : 'text-slate-600 hover:bg-white/40 hover:text-slate-900'
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* ── Right section ─────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Theme toggle placeholder (light-only for now) */}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/40 hover:text-slate-800"
            aria-label="Toggle theme"
          >
            <MdDarkMode className="text-xl" />
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {initials}
                </span>
                <span className="hidden text-sm font-medium text-slate-700 md:inline">
                  {user.username}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                aria-label="Logout"
              >
                <MdLogout className="text-lg" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-lg px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-white/40"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-accent px-5 py-1.5 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent/90"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
