'use client';

import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';
import { cn } from '@/lib/utils';

type HobbySearchBarProps = {
  className?: string;
  placeholder?: string;
  debounceMs?: number;
};

function buildNextUrl(pathname: string, searchParams: URLSearchParams): string {
  const qs = searchParams.toString();
  return qs.length > 0 ? `${pathname}?${qs}` : pathname;
}

export function HobbySearchBar({
  className,
  placeholder = '취미를 검색해 보세요 (예: 러닝, 요가, 독서)',
  debounceMs = 250,
}: HobbySearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryFromUrl = searchParams.get('q') ?? '';
  const [value, setValue] = useState(queryFromUrl);

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  const nextParamsBase = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const commit = (nextValue: string) => {
    const params = new URLSearchParams(nextParamsBase);
    const trimmed = nextValue.trim();

    if (trimmed.length === 0) {
      params.delete('q');
    } else {
      params.set('q', trimmed);
    }

    router.replace(buildNextUrl(pathname, params), { scroll: false });
  };

  useDebounce(
    () => {
      commit(value);
    },
    debounceMs,
    [value, pathname, nextParamsBase],
  );

  const hasValue = value.trim().length > 0;

  return (
    <div className={cn('relative', className)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
        aria-hidden
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            commit(value);
          }
          if (e.key === 'Escape') {
            e.preventDefault();
            setValue('');
            commit('');
          }
        }}
        placeholder={placeholder}
        inputMode="search"
        className={cn(
          'h-12 w-full rounded-full border border-neutral-200 bg-white pl-11 pr-12 text-sm text-neutral-900 shadow-sm outline-none transition-colors',
          'placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        )}
        aria-label="취미 검색"
      />
      <button
        type="button"
        onClick={() => {
          setValue('');
          commit('');
        }}
        className={cn(
          'absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full',
          'text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
          !hasValue && 'pointer-events-none opacity-0',
        )}
        aria-label="검색어 지우기"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

