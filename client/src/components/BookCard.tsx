import { Link } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

// 6 preset gradients for book covers
const GRADIENT_PRESETS = [
  'from-purple-500 to-pink-500',      // purple→pink
  'from-blue-500 to-cyan-400',        // blue→cyan
  'from-orange-500 to-yellow-400',    // orange→yellow
  'from-green-500 to-emerald-400',    // green→emerald
  'from-red-500 to-rose-400',         // red→rose
  'from-indigo-500 to-purple-400',    // indigo→purple
];

// Hash function to deterministically select gradient based on title
const getGradientFromTitle = (title: string): string => {
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return GRADIENT_PRESETS[hash % GRADIENT_PRESETS.length];
};

// Split title into lines for cover display
const formatTitleForCover = (title: string): string[] => {
  const words = title.split(' ');
  if (words.length <= 2) return [title];
  
  const mid = Math.ceil(words.length / 2);
  return [
    words.slice(0, mid).join(' '),
    words.slice(mid).join(' '),
  ];
};

const BookCard = ({ book }: BookCardProps) => {
  const reviewCount = book._count?.reviews || book.reviews?.length || 0;
  const formattedDate = new Date(book.createdAt).toLocaleDateString();
  const initials = (book.user?.username ?? 'U').slice(0, 2).toUpperCase();
  const gradientClass = getGradientFromTitle(book.title);
  const titleLines = formatTitleForCover(book.title);

  return (
    <div className="glass-card rounded-2xl p-3 flex gap-3">
      {/* ── Left: gradient cover placeholder ── */}
      <div className={`w-20 h-28 rounded-lg bg-gradient-to-br ${gradientClass} flex-shrink-0 flex flex-col items-center justify-center px-2 py-2`}>
        <div className="text-center">
          <div className="text-white/40 text-[10px] mb-0.5">—</div>
          {titleLines.map((line, idx) => (
            <div key={idx} className="text-[10px] text-white/90 font-semibold leading-tight uppercase mb-0.5">
              {line}
            </div>
          ))}
          <div className="text-white/40 text-[10px] mt-0.5">—</div>
        </div>
      </div>

      {/* ── Right: content ── */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {/* Title + Review badge row */}
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/books/${book.id}`}
            className="text-sm font-semibold leading-snug text-slate-900 no-underline transition hover:text-accent flex-1"
          >
            {book.title}
          </Link>
          <span className="flex-shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* Description — 2-line clamp */}
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
          {book.description}
        </p>

        {/* Author */}
        <p className="text-xs font-medium text-slate-500">
          by <span className="text-slate-700">{book.author}</span>
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-white/40 pt-2.5">
          {/* User avatar + metadata */}
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
              {initials}
            </span>
            <span className="text-xs text-slate-500">
              <strong className="text-slate-700">{book.user?.username || 'Unknown'}</strong>
              <span className="mx-1.5 text-slate-300">·</span>
              {formattedDate}
            </span>
          </div>

          {/* Read more link */}
          <Link
            to={`/books/${book.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent no-underline transition hover:gap-2"
          >
            Read more <MdArrowForward className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

