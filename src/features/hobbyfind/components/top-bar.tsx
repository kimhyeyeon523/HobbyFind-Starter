'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CATEGORY_NAV,
  type HobbyCategory,
} from '@/features/hobbyfind/constants/hobbies';
import { useFavoritesStore } from '@/features/favorites/store/favorites-store';

type TopBarProps = {
  activeCategory?: HobbyCategory | null;
};

export function TopBar({ activeCategory = null }: TopBarProps) {
  const [elevated, setElevated] = useState(false);
  const searchParams = useSearchParams();
  const q = searchParams.get('q')?.trim() ?? '';
  const favoritesCount = useFavoritesStore((s) => s.favoriteIds.length);

  const withQuery = (href: string) => {
    if (q.length === 0) return href;
    const params = new URLSearchParams();
    params.set('q', q);
    return `${href}?${params.toString()}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 2);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 border-b border-neutral-200 bg-white px-6 transition-shadow md:px-10',
        elevated && 'shadow-sm',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-4">
        <Link
          href={withQuery('/')}
          className="shrink-0 text-2xl font-bold tracking-tighter text-brand transition-transform active:scale-95"
        >
          HobbyFind
        </Link>
        <div className="flex min-w-0 flex-1 justify-end overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2 pr-1">
            {CATEGORY_NAV.map((item) => {
              const isActive = activeCategory === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={withQuery(`/category/${item.slug}`)}
                  className={cn(
                    'flex min-h-11 flex-col items-center justify-center gap-1 whitespace-nowrap rounded-md border-b-2 px-3 pb-2 pt-2 text-sm font-semibold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                    isActive
                      ? 'border-brand bg-brand/5 text-brand'
                      : 'border-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          href={withQuery('/favorites')}
          className={cn(
            'group inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
          )}
          aria-label="즐겨찾기 보기"
        >
          <Heart className="h-4 w-4 text-neutral-700 group-hover:text-neutral-900" />
          <span className="hidden sm:inline">즐겨찾기</span>
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-900">
            {favoritesCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}
