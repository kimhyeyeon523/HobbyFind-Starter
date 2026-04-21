import { HomePage } from '@/features/hobbyfind/components/home-page';

type RootPageProps = {
  params: Promise<Record<string, never>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ params, searchParams }: RootPageProps) {
  await params;
  await searchParams;
  return <HomePage />;
}
