'use client';

import { HeroSection } from '@/features/hobbyfind/components/hero-section';
import { HobbyGrid } from '@/features/hobbyfind/components/hobby-grid';
import { TopBar } from '@/features/hobbyfind/components/top-bar';
import {
  CATEGORY_META,
  getHobbiesByCategory,
  type HobbyCategory,
} from '@/features/hobbyfind/constants/hobbies';

type CategoryPageProps = {
  category: HobbyCategory;
};

export function CategoryPageView({ category }: CategoryPageProps) {
  const meta = CATEGORY_META[category];
  const hobbies = getHobbiesByCategory(category);

  return (
    <div className="min-h-screen bg-white">
      <TopBar activeCategory={category} />
      <main className="animate-in fade-in duration-500">
        <HeroSection
          title={meta.title}
          subtitle={meta.summary}
          align="left"
        />
        <HobbyGrid hobbies={hobbies} />
      </main>
    </div>
  );
}
