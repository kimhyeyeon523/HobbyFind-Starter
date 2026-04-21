import { FavoritesPage } from '@/features/favorites/components/favorites-page';
import { Suspense } from 'react';

type FavoritesRouteProps = {
  params: Promise<Record<string, never>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ params, searchParams }: FavoritesRouteProps) {
  await params;
  await searchParams;
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
      <FavoritesPage />
    </Suspense>
  );
}

