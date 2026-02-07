import { Link } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const reviewCount = book._count?.reviews || book.reviews?.length || 0;
  const formattedDate = new Date(book.createdAt).toLocaleDateString();
  const initials = (book.user?.username ?? 'U').slice(0, 2).toUpperCase();

  return (
    <div className="glass flex gap-5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10">
      {/* ── Left: review count badge ── */}
      <div className="flex flex-shrink-0 flex-col items-center gap-1 pt-1">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-base font-bold text-accent">
          {reviewCount}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {reviewCount === 1 ? 'review' : 'reviews'}
        </span>
      </div>

      {/* ── Right: content ── */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Title */}
        <Link
          to={`/books/${book.id}`}
          className="text-lg font-semibold leading-snug text-slate-900 no-underline transition hover:text-accent"
        >
          {book.title}
        </Link>

        {/* Description — 2-line clamp */}
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
          {book.description}
        </p>

        {/* Author */}
        <p className="text-xs font-medium text-slate-500">
          by <span className="text-slate-700">{book.author}</span>
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-white/40 pt-3">
          {/* User avatar + metadata */}
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
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
