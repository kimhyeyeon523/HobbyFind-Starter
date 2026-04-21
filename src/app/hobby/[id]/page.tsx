import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { TopBar } from '@/features/hobbyfind/components/top-bar';
import { FavoriteCtaButton } from '@/features/favorites/components/favorite-cta-button';
import { cn } from '@/lib/utils';
import {
  CATEGORY_META,
  CATEGORY_NAV,
  HOBBIES,
  hobbyImageUrl,
} from '@/features/hobbyfind/constants/hobbies';

export async function generateStaticParams() {
  return HOBBIES.map((hobby) => ({ id: hobby.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const hobby = HOBBIES.find((item) => item.id === id);
  if (!hobby) notFound();

  const categoryMeta = CATEGORY_META[hobby.category];
  return {
    title: `${hobby.name} — HobbyFind`,
    description: hobby.description ?? categoryMeta.summary,
  };
}

export default async function HobbyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hobby = HOBBIES.find((item) => item.id === id);

  if (!hobby) {
    notFound();
  }

  const src = hobbyImageUrl(hobby.id);
  const categoryMeta = CATEGORY_META[hobby.category];

  return (
    <div className="min-h-screen bg-white">
      <Suspense
        fallback={
          <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white px-6 transition-shadow md:px-10">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-4">
              <Link
                href="/"
                className="shrink-0 text-2xl font-bold tracking-tighter text-brand transition-transform active:scale-95"
              >
                HobbyFind
              </Link>
              <div className="flex min-w-0 flex-1 justify-end overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-2 pr-1">
                  {CATEGORY_NAV.map((item) => {
                    const isActive = hobby.category === item.slug;
                    return (
                      <Link
                        key={item.slug}
                        href={`/category/${item.slug}`}
                        className={cn(
                          'flex min-h-11 flex-col items-center justify-center gap-1 whitespace-nowrap rounded-md border-b-2 px-3 pb-2 pt-2 text-sm font-semibold tracking-tight transition-all',
                          isActive
                            ? 'border-brand bg-brand/5 text-brand'
                            : 'border-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="min-h-11 w-[124px]" aria-hidden />
            </div>
          </nav>
        }
      >
        <TopBar activeCategory={hobby.category} />
      </Suspense>
      <main className="animate-in fade-in duration-500">
        <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-10 md:px-10 md:py-14 lg:px-20 xl:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-600">
                  {categoryMeta.title}
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900">
                  {hobby.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-neutral-600 md:text-lg">
                  {hobby.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <FavoriteCtaButton hobbyId={hobby.id} />
                <Link
                  href={`/category/${hobby.category}`}
                  className={cn(
                    'inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                  )}
                >
                  {categoryMeta.title} 취미 더 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:px-10 lg:px-20 xl:px-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-200 shadow-sm">
              <Image
                src={src}
                alt={hobby.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-900">
                  취미 소개
                </h2>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  {hobby.description}
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-900">
                  시작 팁
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-neutral-700">
                  <li>처음엔 10분만 가볍게 시작해서 루틴을 만들어 보세요.</li>
                  <li>기본 장비(신발/도구/앱)만 갖추고, 과한 지출은 천천히.</li>
                  <li>기록(사진/메모/타이머)을 남기면 꾸준함에 도움이 돼요.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

