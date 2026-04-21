'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/features/favorites/store/favorites-store';

type FavoriteIconButtonProps = {
  hobbyId: string;
  className?: string;
  stopNavigation?: boolean;
};

export function FavoriteIconButton({
  hobbyId,
  className,
  stopNavigation = false,
}: FavoriteIconButtonProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(hobbyId));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={(event) => {
        if (stopNavigation) {
          event.preventDefault();
          event.stopPropagation();
        }
        toggle(hobbyId);
      }}
      className={cn(
        'inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        className,
      )}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    >
      <Heart
        className={cn(
          'h-3.5 w-3.5 transition-colors',
          isFavorite ? 'fill-brand text-brand' : 'text-neutral-700',
        )}
      />
    </button>
  );
}

