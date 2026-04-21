'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/features/favorites/store/favorites-store';

type FavoriteCtaButtonProps = {
  hobbyId: string;
  className?: string;
};

export function FavoriteCtaButton({ hobbyId, className }: FavoriteCtaButtonProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(hobbyId));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => toggle(hobbyId)}
      className={cn(
        'h-8 rounded-full border-neutral-200 bg-white px-3 text-neutral-900 shadow-sm hover:bg-neutral-50',
        className,
      )}
      aria-pressed={isFavorite}
    >
      <Heart className={cn('mr-2 h-3 w-3', isFavorite && 'fill-brand text-brand')} />
      {isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    </Button>
  );
}

