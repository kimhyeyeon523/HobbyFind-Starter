'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TopBar } from '@/features/hobbyfind/components/top-bar';
import { HobbyGrid } from '@/features/hobbyfind/components/hobby-grid';
import { HobbySearchBar } from '@/features/hobbyfind/components/hobby-search-bar';
import { HOBBIES } from '@/features/hobbyfind/constants/hobbies';
import { filterHobbiesByQuery } from '@/features/hobbyfind/lib/hobby-search';
import { useFavoritesStore } from '@/features/favorites/store/favorites-store';

export function FavoritesPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);

  const favoriteSet = new Set(favoriteIds);
  const favorites = HOBBIES.filter((hobby) => favoriteSet.has(hobby.id));
  const filtered = filterHobbiesByQuery(favorites, query);

  return (
    <div className="min-h-screen bg-white">
      <TopBar activeCategory={null} />
      <main className="animate-in fade-in duration-500">
        <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-10 md:px-10 md:py-14 lg:px-20 xl:px-24">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
              즐겨찾기
            </h1>
            <p className="mt-3 max-w-2xl text-base text-neutral-600 md:text-lg">
              하트를 눌러 저장한 취미를 한곳에서 모아볼 수 있어요.
            </p>
            <div className="mt-6 max-w-xl">
              <HobbySearchBar />
            </div>
          </div>
        </section>

        {filtered.length === 0 ? (
          <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10 lg:px-20 xl:px-24">
            <p className="text-base font-semibold text-neutral-900">
              {favoriteIds.length === 0
                ? '아직 즐겨찾기한 취미가 없습니다.'
                : '검색 결과가 없습니다.'}
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              {favoriteIds.length === 0
                ? '마음에 드는 취미를 하트로 저장해 보세요.'
                : '다른 키워드로 다시 검색해 보세요.'}
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                홈으로 가기
              </Link>
            </div>
          </div>
        ) : (
          <HobbyGrid hobbies={filtered} />
        )}
      </main>
    </div>
  );
}

