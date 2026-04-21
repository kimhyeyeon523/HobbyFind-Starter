Airbnb의 디자인 철학인 **'신뢰, 깨끗함, 직관성'**을 핵심으로 하는 **HobbyFind 디자인 가이드**입니다. 이 가이드는 TailwindCSS를 기반으로 하며, 개발자와 디자이너가 즉시 UI를 구성할 수 있도록 구체적인 수치와 클래스를 포함합니다.

---

## 1. 디자인 시스템 개요 (Design System Overview)

* **브랜드 아이덴티티**: "누구나 쉽게 새로운 삶의 즐거움을 발견하는 곳"
* **톤앤매너**:
    * **Minimalism**: 불필요한 장식을 배제하고 콘텐츠(취미 이미지와 텍스트)에 집중.
    * **Softness**: 날카로운 모서리 대신 둥근 모서리(Rounded)를 사용하여 친근감 부여.
    * **Typography Focus**: 읽기 쉬운 산세리프 서체를 사용하며, 정보의 위계에 따라 굵기를 대조적으로 활용.
* **UI 키 비주얼**: 흰색 배경, 아주 가느다란 경계선(1px), 부드러운 그림자(Soft Shadow).

---

## 2. TailwindCSS 색상 팔레트 (Color Palette)

Airbnb 특유의 깨끗한 느낌을 주기 위해 무채색의 비중을 높이고, 포인트 컬러를 전략적으로 사용합니다.

| 구분 | 변수명 (Config) | Hex Code | 사용처 |
| :--- | :--- | :--- | :--- |
| **Primary** | `brand` | `#FF385C` | 로고, 활성화된 필터 아이콘, 강조 텍스트 |
| **Black** | `neutral-900` | `#222222` | 기본 본문 및 제목 텍스트 |
| **Gray (Dark)** | `neutral-600` | `#717171` | 보조 설명 텍스트, 비활성 필터 |
| **Gray (Light)** | `neutral-200` | `#DDDDDD` | 카드 경계선, 구분선 |
| **Background** | `white` | `#FFFFFF` | 페이지 전체 배경, 카드 배경 |
| **Surface** | `neutral-50` | `#F7F7F7` | 버튼 호버 시 배경, Hero 섹션 배경 |

---

## 3. 페이지 구현 가이드 (Page Implementations)

### **3.1. 루트 페이지 (Root Page)**
* **Header**: 상단 고정(Sticky). 스크롤 시 하단에 아주 미세한 그림자(`shadow-sm`) 발생.
* **Hero 섹션**: 좌측 정렬 혹은 중앙 정렬의 굵은 타이틀 적용. 
    * *Class*: `text-4xl font-bold tracking-tight text-neutral-900`
* **Grid Layout**: 취미 카드들이 일정한 간격(`gap-6`)으로 나열.

### **3.2. 카테고리별 페이지 (Category Page)**
* **Category Header**: 선택된 카테고리의 특징을 나타내는 타이틀과 요약 문구 노출.
* **Filtering**: 현재 페이지에 해당하는 카테고리 아이콘은 `brand` 컬러와 `border-b-2`가 적용되어 '활성화' 상태임을 명시.

---

## 4. 레이아웃 컴포넌트 (Layout Components)

### **4.1. 상단 바 (Top Bar)**
Airbnb의 카테고리 탭 스타일을 차용하여 텍스트와 아이콘의 조합으로 구성합니다.

```html
<nav class="sticky top-0 z-50 bg-white border-b border-neutral-200 px-10 py-4">
  <div class="flex items-center justify-between max-w-7xl mx-auto">
    <div class="text-brand font-bold text-2xl tracking-tighter">HobbyFind</div>
    <div class="flex space-x-8">
      <button class="flex flex-col items-center gap-1 border-b-2 border-black pb-2">
        <span class="text-xs font-semibold">운동형</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-neutral-600 hover:text-black border-b-2 border-transparent pb-2 transition-all">
        <span class="text-xs font-semibold">지능형</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-neutral-600 hover:text-black border-b-2 border-transparent pb-2 transition-all">
        <span class="text-xs font-semibold">예술형</span>
      </button>
    </div>
  </div>
</nav>
```

### **4.2. 취미 카드 (Hobby Card)**
이미지 영역을 크게 강조하고 텍스트는 간결하게 배치합니다.

* **Image**: `aspect-square`, `rounded-xl`, `object-cover`
* **Title**: `text-base font-medium text-neutral-900`
* **Category Tag**: `text-sm text-neutral-600`

---

## 5. 상호작용 패턴 (Interaction Patterns)

| 요소 | 인터랙션 스타일 | 효과 (Tailwind Class) |
| :--- | :--- | :--- |
| **취미 카드** | 호버 시 이미지 미세 확대 | `hover:scale-105 transition duration-300` |
| **필터 메뉴** | 호버 시 텍스트 진해짐 | `hover:text-black transition-colors` |
| **페이지 전환** | 페이드 인 효과 | `animate-in fade-in duration-500` |
| **로고/홈 버튼** | 클릭 시 즉시 이동 | `active:scale-95 transition-transform` |

---

## 6. 반응형 브레이크포인트 (Breakpoints)

그리드 레이아웃은 화면 크기에 따라 카드 개수를 유동적으로 조절합니다.

| Breakpoint | 해상도 | 그리드 열(Columns) | 여백 (Padding) |
| :--- | :--- | :--- | :--- |
| **sm** | 640px | 1 Column | `px-6` |
| **md** | 768px | 2 Columns | `px-10` |
| **lg** | 1024px | 3 Columns | `px-20` |
| **xl** | 1280px | 4 Columns | `px-24` |
| **2xl** | 1536px | 6 Columns | `max-w-7xl mx-auto` |

---

### **정리: 디자인 핵심 규칙**
1.  **여백(Spacing)**: 요소 간의 간격은 항상 `4의 배수`(`p-4`, `m-8`, `gap-12`)를 사용하여 질서를 부여합니다.
2.  **경계선(Border)**: 명확한 선보다는 `border-neutral-200` 정도의 아주 연한 색상을 사용하여 구획만 나눕니다.
3.  **이미지(Media)**: 모든 취미 카드의 이미지는 고화질을 지향하며, 로딩 시 스켈레톤 UI를 활용하여 시각적 안정감을 유지합니다.