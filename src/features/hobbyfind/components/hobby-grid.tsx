'use client';

import { cn } from '@/lib/utils';
import type { Hobby } from '@/features/hobbyfind/constants/hobbies';
import { HobbyCard } from '@/features/hobbyfind/components/hobby-card';

type HobbyGridProps = {
  hobbies: Hobby[];
  className?: string;
};

export function HobbyGrid({ hobbies, className }: HobbyGridProps) {
  if (hobbies.length === 0) {
    return (
      <div
        className={cn(
          'mx-auto max-w-7xl px-6 py-16 text-center text-neutral-600 md:px-10 lg:px-20 xl:px-24',
          className,
        )}
      >
        취미 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-20 xl:grid-cols-4 xl:px-24 2xl:grid-cols-6',
        className,
      )}
    >
      {hobbies.map((hobby) => (
        <HobbyCard key={hobby.id} hobby={hobby} />
      ))}
    </div>
  );
}
