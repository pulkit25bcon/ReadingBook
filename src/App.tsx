import { useMemo, useState } from 'react';
import { BookMarked } from 'lucide-react';
import { useReadingList } from '@/hooks/useReadingList';
import type { FilterStatus } from '@/types';
import { STATUS_ORDER } from '@/types';
import { AddBookForm } from '@/components/AddBookForm';
import { BookCard } from '@/components/BookCard';
import { FilterBar } from '@/components/FilterBar';

function App() {
  const { books, addBook, setStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<FilterStatus>('all');

  const counts = useMemo(() => {
    const c: Record<FilterStatus, number> = {
      all: books.length,
      want: 0,
      reading: 0,
      finished: 0,
    };
    for (const b of books) c[b.status]++;
    return c;
  }, [books]);

  const visibleBooks = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  const isEmpty = books.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-md">
            <BookMarked className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Reading List
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Track books you want to read, are reading, and have finished.
          </p>
        </header>

        {/* Add form */}
        <div className="mb-5">
          <AddBookForm onAdd={addBook} />
        </div>

        {/* Summary stats — only when books exist */}
        {!isEmpty && (
          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-slate-800">{counts.all}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Total Books</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-sky-600">{counts.reading}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Currently Reading</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-emerald-600">{counts.finished}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Finished</p>
            </div>
          </div>
        )}

        {/* Filter bar — only when books exist */}
        {!isEmpty && (
          <div className="mb-5">
            <FilterBar filter={filter} counts={counts} onChange={setFilter} />
          </div>
        )}

        {/* Book list / empty state */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
              <BookMarked className="h-8 w-8" />
            </div>
            <p className="text-base font-medium text-slate-600">
              Your reading list is empty. Add your first book.
            </p>
          </div>
        ) : visibleBooks.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white/60 px-6 py-10 text-center text-sm text-slate-500">
            No books in this category.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {visibleBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSetStatus={setStatus}
                onRemove={removeBook}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-slate-400">
          {books.length} {books.length === 1 ? 'book' : 'books'} in your list
          {books.length > 0 && (
            <span className="ml-1.5">
              · {STATUS_ORDER.map((s) => `${counts[s]} ${s}`).join(' · ')}
            </span>
          )}
        </footer>
      </div>
    </div>
  );
}

export default App;
