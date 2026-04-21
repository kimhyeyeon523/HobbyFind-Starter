import type { Hobby, HobbyCategory } from '@/features/hobbyfind/constants/hobbies';

const CATEGORY_LABELS: Record<HobbyCategory, string> = {
  exercise: '운동형',
  intellectual: '지능형',
  art: '예술형',
};

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase();
}

export function filterHobbiesByQuery(hobbies: Hobby[], query: string): Hobby[] {
  const q = normalizeSearchText(query);
  if (q.length === 0) return hobbies;

  return hobbies.filter((hobby) => {
    const haystack = normalizeSearchText(
      [
        hobby.name,
        hobby.description,
        hobby.category,
        CATEGORY_LABELS[hobby.category],
      ]
        .filter(Boolean)
        .join(' '),
    );
    return haystack.includes(q);
  });
}

