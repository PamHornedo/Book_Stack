import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenuBook, MdRateReview, MdBookmarkBorder } from 'react-icons/md';

interface LayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { to: '/', label: 'All Books', icon: MdMenuBook },
  { to: '/reviews', label: 'Reviews', icon: MdRateReview },
  { to: '/reading-list', label: 'Reading List', icon: MdBookmarkBorder },
];

const TRENDING_TAGS = [
  '#fiction',
  '#tech',
  '#historical',
  '#ai',
  '#philosophy',
];

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* ── Sidebar ─────────────────────────────── */}
        <aside className="lg:col-span-3">
          <div className="glass-sidebar sticky top-24 space-y-8 p-5">
            {/* Navigation */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Navigation
              </h3>
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
                  const isActive = pathname === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition
                        ${
                          isActive
                            ? 'bg-accent text-white shadow-md shadow-accent/30'
                            : 'text-slate-700 hover:bg-white/50'
                        }`}
                    >
                      <Icon className="text-lg" />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Trending Tags */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Trending Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <span key={tag} className="accent-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs leading-relaxed text-slate-400">
              &copy; {new Date().getFullYear()} Read&amp;Review Dashboard. Built
              for the community of readers.
            </p>
          </div>
        </aside>

        {/* ── Main Content ────────────────────────── */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
