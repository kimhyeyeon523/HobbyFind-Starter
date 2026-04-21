'use client';

import { useSearchParams } from 'next/navigation';
import { HeroSection } from '@/features/hobbyfind/components/hero-section';
import { HobbyGrid } from '@/features/hobbyfind/components/hobby-grid';
import { HobbySearchBar } from '@/features/hobbyfind/components/hobby-search-bar';
import { TopBar } from '@/features/hobbyfind/components/top-bar';
import { HOBBIES } from '@/features/hobbyfind/constants/hobbies';
import { filterHobbiesByQuery } from '@/features/hobbyfind/lib/hobby-search';

export function HomePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const filtered = filterHobbiesByQuery(HOBBIES, query);

  return (
    <div className="min-h-screen bg-white">
      <TopBar activeCategory={null} />
      <main>
        <HeroSection
          title="당신에게 맞는 취미를 찾아보세요"
          subtitle="운동형, 지능형, 예술형으로 나뉜 18가지 취미를 한눈에 살펴보고, 상단에서 카테고리를 골라 좁혀 보세요."
          align="center"
          fadeInOnMount
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
