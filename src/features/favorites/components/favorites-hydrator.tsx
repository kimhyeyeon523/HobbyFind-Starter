'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from '@/features/favorites/store/favorites-store';

export function FavoritesHydrator() {
  useEffect(() => {
    void useFavoritesStore.persist.rehydrate();
  }, []);

  return null;
}

