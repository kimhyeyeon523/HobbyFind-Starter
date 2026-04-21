'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  CATEGORY_NAV,
  type HobbyCategory,
} from '@/features/hobbyfind/constants/hobbies';

type TopBarProps = {
  activeCategory?: HobbyCategory | null;
};

export function TopBar({ activeCategory = null }: TopBarProps) {
  const [elevated, setElevated] = useState(false);

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
          href="/"
          className="shrink-0 text-2xl font-bold tracking-tighter text-brand transition-transform active:scale-95"
        >
          HobbyFind
        </Link>
        <div className="flex min-w-0 flex-1 justify-end overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-8 pr-1">
            {CATEGORY_NAV.map((item) => {
              const isActive = activeCategory === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className={cn(
                    'flex flex-col items-center gap-1 whitespace-nowrap border-b-2 pb-2 text-xs font-semibold transition-all',
                    isActive
                      ? 'border-brand text-brand'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
