import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CategoryPageView } from '@/features/hobbyfind/components/category-page';
import {
  CATEGORY_META,
  CATEGORY_NAV,
  isCategorySlug,
} from '@/features/hobbyfind/constants/hobbies';

export async function generateStaticParams() {
  return CATEGORY_NAV.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategorySlug(slug)) {
    notFound();
  }
  const meta = CATEGORY_META[slug];
  return {
    title: `${meta.title} 취미 — HobbyFind`,
    description: meta.summary,
  };
}

export default async function CategoryRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isCategorySlug(slug)) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 text-neutral-600 md:px-10 lg:px-20 xl:px-24">
            불러오는 중...
          </div>
        </div>
      }
    >
      <CategoryPageView category={slug} />
    </Suspense>
  );
}
