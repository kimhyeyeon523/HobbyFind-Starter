import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

  return <CategoryPageView category={slug} />;
}
