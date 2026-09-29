import { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import type { ReadingStatus } from '@/types';
import { STATUS_META, STATUS_ORDER } from '@/types';

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => string | null;
}

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const err = onAdd(title, status);
    if (err) {
      setError(err);
      return;
    }
    setTitle('');
    setStatus('want');
    setError(null);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 px-4 py-4 text-sm font-medium text-slate-500 transition hover:border-slate-400 hover:bg-white hover:text-slate-700 sm:py-5"
      >
        <Plus className="h-4 w-4 transition group-hover:rotate-90" />
        Add a book
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center gap-2 text-slate-700">
        <BookOpen className="h-4 w-4 text-slate-400" />
        <span className="text-sm font-semibold">Add a book</span>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book title"
          maxLength={60}
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
        />
        <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1">
          {STATUS_ORDER.map((s) => {
            const meta = STATUS_META[s];
            const active = status === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`flex-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:flex-none ${
                  active
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {meta.short}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
      )}

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setTitle('');
            setStatus('want');
            setError(null);
          }}
          className="rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </div>
    </form>
  );
}
