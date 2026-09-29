import type { FilterStatus, ReadingStatus } from '@/types';
import { STATUS_META, STATUS_ORDER } from '@/types';

interface FilterBarProps {
  filter: FilterStatus;
  counts: Record<FilterStatus, number>;
  onChange: (filter: FilterStatus) => void;
}

export function FilterBar({ filter, counts, onChange }: FilterBarProps) {
  const tabs: { key: FilterStatus; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    ...STATUS_ORDER.map((s: ReadingStatus) => ({
      key: s as FilterStatus,
      label: STATUS_META[s].label,
      count: counts[s],
    })),
  ];

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
      {tabs.map((tab) => {
        const active = filter === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition ${
              active
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-white text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                active
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
