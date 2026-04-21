'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type FavoritesState = {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
};

function uniqueIds(ids: string[]): string[] {
  return Array.from(new Set(ids.filter((id) => id.trim().length > 0)));
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      isFavorite: (id) => get().favoriteIds.includes(id),
      add: (id) =>
        set((state) => ({ favoriteIds: uniqueIds([...state.favoriteIds, id]) })),
      remove: (id) =>
        set((state) => ({ favoriteIds: state.favoriteIds.filter((x) => x !== id) })),
      toggle: (id) =>
        set((state) => {
          const exists = state.favoriteIds.includes(id);
          return {
            favoriteIds: exists
              ? state.favoriteIds.filter((x) => x !== id)
              : uniqueIds([...state.favoriteIds, id]),
          };
        }),
      clear: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'hobbyfind:favorites',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    },
  ),
);

