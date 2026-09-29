import { useCallback, useEffect, useState } from 'react';
import type { Book, ReadingStatus } from '@/types';

const STORAGE_KEY = 'reading-list-books';

function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (b) =>
        b &&
        typeof b.id === 'string' &&
        typeof b.title === 'string' &&
        ['want', 'reading', 'finished'].includes(b.status)
    );
  } catch {
    return [];
  }
}

export function useReadingList() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {
      // ignore quota errors
    }
  }, [books]);

  const addBook = useCallback(
    (title: string, status: ReadingStatus): string | null => {
      const trimmed = title.trim().replace(/\s+/g, ' ');
      if (!trimmed) return null;
      if (trimmed.length > 60) {
        return 'Book title must be 60 characters or fewer.';
      }
      const exists = books.some(
        (b) => b.title.toLowerCase() === trimmed.toLowerCase()
      );
      if (exists) {
        return 'This book is already in your reading list.';
      }
      setBooks((prev) => [
        {
          id:
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? crypto.randomUUID()
              : String(Date.now() + Math.random()),
          title: trimmed,
          status,
          addedAt: Date.now(),
        },
        ...prev,
      ]);
      return null;
    },
    [books]
  );

  const setStatus = useCallback((id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }, []);

  const removeBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { books, addBook, setStatus, removeBook };
}
