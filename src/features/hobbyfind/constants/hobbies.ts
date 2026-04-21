export type HobbyCategory = 'exercise' | 'intellectual' | 'art';

export type Hobby = {
  id: string;
  name: string;
  category: HobbyCategory;
  description: string;
};

export const CATEGORY_NAV: { slug: HobbyCategory; label: string }[] = [
  { slug: 'exercise', label: '운동형' },
  { slug: 'intellectual', label: '지능형' },
  { slug: 'art', label: '예술형' },
];

export const CATEGORY_META: Record<
  HobbyCategory,
  { title: string; summary: string }
> = {
  exercise: {
    title: '운동형',
    summary: '몸을 움직이며 리듬과 활력을 되찾는 취미를 모았어요.',
  },
  intellectual: {
    title: '지능형',
    summary: '사고와 집중으로 성장하는 취미를 한곳에서 살펴보세요.',
  },
  art: {
    title: '예술형',
    summary: '감각과 표현으로 일상에 색을 더하는 취미를 만나보세요.',
  },
};

export const HOBBIES: Hobby[] = [
  {
    id: 'running',
    name: '조깅/러닝',
    category: 'exercise',
    description: '가볍게 시작해 루틴으로 이어가기 좋은 유산소 활동이에요.',
  },
  {
    id: 'yoga',
    name: '요가',
    category: 'exercise',
    description: '호흡과 스트레칭으로 몸과 마음의 균형을 맞춰 보세요.',
  },
  {
    id: 'swimming',
    name: '수영',
    category: 'exercise',
    description: '관절 부담은 줄이고 전신을 고르게 쓰는 운동이에요.',
  },
  {
    id: 'cycling',
    name: '자전거',
    category: 'exercise',
    description: '이동과 운동을 동시에 즐길 수 있는 야외 활동이에요.',
  },
  {
    id: 'climbing',
    name: '클라이밍',
    category: 'exercise',
    description: '문제 풀이와 근력을 함께 요구하는 몰입형 스포츠예요.',
  },
  {
    id: 'dance',
    name: '댄스',
    category: 'exercise',
    description: '리듬에 맞춰 표현하며 유연성과 카르디오를 챙겨요.',
  },
  {
    id: 'reading',
    name: '독서',
    category: 'intellectual',
    description: '짧은 시간이라도 집중해 사고의 폭을 넓히기 좋아요.',
  },
  {
    id: 'puzzle',
    name: '퍼즐',
    category: 'intellectual',
    description: '패턴을 맞추며 논리력과 인내심을 함께 기를 수 있어요.',
  },
  {
    id: 'chess',
    name: '체스',
    category: 'intellectual',
    description: '수 읽기와 전략을 다듬는 두뇌 스포츠에 가깝습니다.',
  },
  {
    id: 'programming',
    name: '프로그래밍',
    category: 'intellectual',
    description: '문제를 코드로 풀며 만들고 배우는 과정이 매력적이에요.',
  },
  {
    id: 'language-learning',
    name: '외국어 학습',
    category: 'intellectual',
    description: '매일 조금씩 쌓아 실생활에 바로 쓸 수 있는 기술이에요.',
  },
  {
    id: 'photography',
    name: '사진 촬영',
    category: 'intellectual',
    description: '구도와 빛을 읽으며 관찰력과 표현력을 키울 수 있어요.',
  },
  {
    id: 'drawing',
    name: '그림 그리기',
    category: 'art',
    description: '선과 색으로 생각을 시각화하는 가장 직관적인 표현이에요.',
  },
  {
    id: 'instrument',
    name: '악기 연주',
    category: 'art',
    description: '손과 귀를 함께 쓰며 감성과 리듬 감각을 익혀요.',
  },
  {
    id: 'cooking',
    name: '요리',
    category: 'art',
    description: '재료와 레시피로 창의력과 생활 밀착 취미를 동시에 챙겨요.',
  },
  {
    id: 'calligraphy',
    name: '서예',
    category: 'art',
    description: '획의 속도와 힘을 조절하며 집중과 여백의 미를 느껴요.',
  },
  {
    id: 'pottery',
    name: '도자기 만들기',
    category: 'art',
    description: '촉감과 형태를 다루며 천천히 완성감을 쌓는 공예예요.',
  },
  {
    id: 'gardening',
    name: '정원 가꾸기',
    category: 'art',
    description: '식물과 계절을 돌보며 작은 변화의 즐거움을 만나요.',
  },
];

export function isCategorySlug(value: string): value is HobbyCategory {
  return value === 'exercise' || value === 'intellectual' || value === 'art';
}

export function getHobbiesByCategory(category: HobbyCategory): Hobby[] {
  return HOBBIES.filter((hobby) => hobby.category === category);
}

/** `public/thumbnails` 파일명과 취미 id가 다른 경우만 명시 */
const HOBBY_THUMBNAIL_BASE: Record<string, string> = {
  'language-learning': 'foreign_language_learning',
  instrument: 'instrument_playing',
};

export function hobbyImageUrl(id: string): string {
  const base = HOBBY_THUMBNAIL_BASE[id] ?? id;
  return `/thumbnails/${base}.jpg`;
}
