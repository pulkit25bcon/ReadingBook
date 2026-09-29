export type ReadingStatus = 'want' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  addedAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; short: string; color: string; dot: string; badge: string }
> = {
  want: {
    label: 'Want to Read',
    short: 'Want',
    color: 'text-amber-700',
    dot: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  reading: {
    label: 'Reading',
    short: 'Reading',
    color: 'text-sky-700',
    dot: 'bg-sky-400',
    badge: 'bg-sky-50 text-sky-700 ring-sky-200',
  },
  finished: {
    label: 'Finished',
    short: 'Finished',
    color: 'text-emerald-700',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
};

export const STATUS_ORDER: ReadingStatus[] = ['want', 'reading', 'finished'];

export type FilterStatus = ReadingStatus | 'all';
