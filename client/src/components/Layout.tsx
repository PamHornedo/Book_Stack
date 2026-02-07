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
    <div className="pt-24 pb-16">
      <div className="flex">
        {/* ── Sidebar ─────────────────────────────── */}
        <aside className="w-64 flex-shrink-0 hidden lg:block fixed left-0 top-14 bottom-0 overflow-y-auto">
          <div className="glass-strong h-full rounded-none rounded-r-2xl p-5 shadow-lg shadow-brand-600/5 space-y-8">
            {/* Navigation */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
                Explore
              </h3>
              <nav className="flex flex-col gap-1.5">
                {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
                  const isActive = pathname === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition
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

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-brand-200/60 to-transparent" />

            {/* Trending Tags */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
                Trending Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-brand-200/60 to-transparent" />

            {/* Your Stats */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
                Your Stats
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col items-center justify-center rounded-lg bg-white/40 p-3 text-center">
                  <div className="text-2xl mb-1">📚</div>
                  <div className="text-lg font-bold text-slate-800">3</div>
                  <div className="text-xs text-slate-500">Books</div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg bg-white/40 p-3 text-center">
                  <div className="text-2xl mb-1">✍️</div>
                  <div className="text-lg font-bold text-slate-800">0</div>
                  <div className="text-xs text-slate-500">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Content ────────────────────────── */}
        <main className="lg:ml-64 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
