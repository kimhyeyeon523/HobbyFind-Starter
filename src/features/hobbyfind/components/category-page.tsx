'use client';

import { useSearchParams } from 'next/navigation';
import { HeroSection } from '@/features/hobbyfind/components/hero-section';
import { HobbyGrid } from '@/features/hobbyfind/components/hobby-grid';
import { HobbySearchBar } from '@/features/hobbyfind/components/hobby-search-bar';
import { TopBar } from '@/features/hobbyfind/components/top-bar';
import {
  CATEGORY_META,
  getHobbiesByCategory,
  type HobbyCategory,
} from '@/features/hobbyfind/constants/hobbies';
import { filterHobbiesByQuery } from '@/features/hobbyfind/lib/hobby-search';

type CategoryPageProps = {
  category: HobbyCategory;
};

export function CategoryPageView({ category }: CategoryPageProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const meta = CATEGORY_META[category];
  const hobbies = getHobbiesByCategory(category);
  const filtered = filterHobbiesByQuery(hobbies, query);

  return (
    <div className="min-h-screen bg-white">
      <TopBar activeCategory={category} />
      <main className="animate-in fade-in duration-500">
        <HeroSection
          title={meta.title}
          subtitle={meta.summary}
          align="left"
        >
          <HobbySearchBar />
        </HeroSection>
        {filtered.length === 0 ? (
          <div className="mx-auto max-w-7xl px-6 py-16 text-center text-neutral-600 md:px-10 lg:px-20 xl:px-24">
            <p className="text-base font-semibold text-neutral-900">
              검색 결과가 없습니다.
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              다른 키워드로 다시 검색해 보세요.
            </p>
          </div>
        ) : (
          <HobbyGrid hobbies={filtered} />
        )}
      </main>
    </div>
  );
}
