'use client';

import { HeroSection } from '@/features/hobbyfind/components/hero-section';
import { HobbyGrid } from '@/features/hobbyfind/components/hobby-grid';
import { TopBar } from '@/features/hobbyfind/components/top-bar';
import { HOBBIES } from '@/features/hobbyfind/constants/hobbies';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar activeCategory={null} />
      <main>
        <HeroSection
          title="당신에게 맞는 취미를 찾아보세요"
          subtitle="운동형, 지능형, 예술형으로 나뉜 18가지 취미를 한눈에 살펴보고, 상단에서 카테고리를 골라 좁혀 보세요."
          align="center"
          fadeInOnMount
        />
        <HobbyGrid hobbies={HOBBIES} />
      </main>
    </div>
  );
}
