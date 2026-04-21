'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  hobbyImageUrl,
  type Hobby,
  type HobbyCategory,
} from '@/features/hobbyfind/constants/hobbies';
import { FavoriteIconButton } from '@/features/favorites/components/favorite-icon-button';

const TAG_STYLES: Record<
  HobbyCategory,
  { label: string; className: string }
> = {
  exercise: {
    label: '운동형',
    className:
      'border-brand/40 bg-brand/10 text-brand ring-1 ring-inset ring-brand/20',
  },
  intellectual: {
    label: '지능형',
    className:
      'border-blue-200 bg-blue-50 text-blue-950 ring-1 ring-inset ring-blue-100',
  },
  art: {
    label: '예술형',
    className:
      'border-violet-200 bg-violet-50 text-violet-950 ring-1 ring-inset ring-violet-100',
  },
};

type HobbyCardProps = {
  hobby: Hobby;
};

export function HobbyCard({ hobby }: HobbyCardProps) {
  const [loaded, setLoaded] = useState(false);
  const tag = TAG_STYLES[hobby.category];
  const src = hobbyImageUrl(hobby.id);

  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/hobby/${hobby.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        aria-label={`${hobby.name} 상세 보기`}
      >
        <div className="relative aspect-square overflow-hidden bg-neutral-200">
          {!loaded && (
            <div
              className="absolute inset-0 animate-pulse bg-neutral-200"
              aria-hidden
            />
          )}
          <div className="absolute right-3 top-3 z-10">
            <FavoriteIconButton hobbyId={hobby.id} stopNavigation />
          </div>
          <Image
            src={src}
            alt={hobby.name}
            fill
            sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={cn(
              'object-cover transition duration-300 group-hover:scale-105',
              !loaded && 'opacity-0',
            )}
            onLoadingComplete={() => setLoaded(true)}
            priority={false}
          />
        </div>
        <div className="space-y-2 p-4">
          <h2 className="text-base font-medium text-neutral-900">{hobby.name}</h2>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Link
          href={`/category/${hobby.category}`}
          className={cn(
            'inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
            tag.className,
          )}
        >
          {tag.label}
        </Link>
      </div>
    </article>
  );
}
