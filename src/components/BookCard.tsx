import { Trash2 } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { STATUS_META, STATUS_ORDER } from '@/types';

interface BookCardProps {
  book: Book;
  onSetStatus: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onSetStatus, onRemove }: BookCardProps) {
  const meta = STATUS_META[book.status];

  return (
    <div className="group relative flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate pr-8 text-sm font-semibold text-slate-800">
          {book.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${meta.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1">
          {STATUS_ORDER.map((s) => {
            const m = STATUS_META[s];
            const active = book.status === s;
            return (
              <button
                key={s}
                onClick={() => onSetStatus(book.id, s)}
                title={m.label}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  active
                    ? `${m.badge} ring-1 ring-inset`
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
              >
                {m.short}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => onRemove(book.id)}
        title="Delete"
        className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>

    </div>
  );
}
