# photofolio 프로젝트 — 프롬프트 & 플랜 기록

> 이 문서는 Claude Code 세션에서 진행된 요청(프롬프트), 의사결정, 승인된 구현 플랜을 기록한 것이다.
> 작성일: 2026-06-04

---

## 1. 세션 진행 요약

| 단계 | 요청(프롬프트) | 결과 |
|---|---|---|
| 1 | 프로젝트 분석 후 CLAUDE.md 생성 (`/init`) | 빈 폴더 확인 → 새 프로젝트 생성으로 방향 결정 |
| 2 | Next.js + TypeScript로 생성 | 생성 후 사용자 요청으로 **전체 되돌림** |
| 3 | 새 프로젝트 재생성 (`/init` 재실행) | **Vite + React + TypeScript** 선택, 스캐폴딩 + CLAUDE.md 작성 |
| 4 | CLAUDE.md에 "기본 언어" 섹션 추가 | 한국어 응답·주석·문서 / 영어 식별자 규칙 추가 |
| 5 | CLAUDE.md 한국어로 재작성 | 본문 전체 한국어 번역 (상단 안내 문구는 영문 유지) |
| 6 | 모던 포트폴리오 UI 구현 (상세 요구 7개) | 플랜 수립 → 승인 → 구현 → 브라우저 검증 완료 |
| 7 | 전체 기술 스택 섹션 추가 + 칩 클릭 → 프로젝트 태그 강조 | 플랜 수립 → 승인 → 구현 → build/lint 통과 |
| 8 | 기술 칩 다중 선택(최대 5개) + 레이더 차트 라벨 강조 | 플랜 수립 → 승인 → 구현 → build/lint 통과 |

---

## 2. 주요 의사결정 (Q&A)

### 프로젝트 셋업
- **기술 스택**: Vite + React + TypeScript (가벼운 SPA, 빠른 개발 서버)

### 포트폴리오 UI 구현
- **레이더 차트**: ~~recharts 라이브러리~~ → **직접 SVG 구현** (의존성 없음, 테마·디자인 커스텀 자유)
- **방문자 집계**: ~~외부 카운터 API~~ → **localStorage 기반** (백엔드 없는 정적 SPA, 브라우저별 집계 한계 인지)
- **콘텐츠**: ~~실제 정보 입력~~ → **샘플 데이터로 구성** (`src/data/`로 분리, 추후 교체 용이)

### 전체 기술 스택 섹션
- **표시 형태**: **카테고리별 카드** (Frontend / Backend / Mobile / DevOps·Infra / AI·Data)
- **스크롤 방식**: ~~화살표 버튼~~ → **네이티브 가로 스크롤만** (`overflow-x: auto` + scroll-snap)
- **데이터**: `src/data/techStack.ts` **신규 파일에 직접 정의** (기존 `data/` 패턴 일치, 자동 집계 안 함)
- **클릭 연동 범위**: ~~슬라이드 자동 이동~~ → **강조만** — 현재 슬라이드에서 강조되고, 슬라이드를 넘겨도 해당 기술이 있으면 강조 유지
- **강조 해제**: 같은 칩 **재클릭으로 토글**
- **다중 선택 한도 초과(6번째 클릭)**: **무시** + 제목에 "(최대 5개 선택)" 문구로 안내

---

## 3. 포트폴리오 UI 요구사항 (원본 프롬프트)

> 전체적인 디자인을 모던하고 세련된 디자인으로 해줘
> 1. 다크모드/일반모드 토글버튼으로 변경
> 2. 전체적인 레이아웃 및 간격 일관성
> 3. 모던하고 세련된 스타일
> 4. 각각의 참여 프로젝트에 대한 포트폴리오는 슬라이드 형식으로 1개씩 보여줘
> 5. 4번의 프로젝트의 기술에 대한 스펙의 숙련도는 레이더 차트로 할거야 (1: 낮음, 2: 약간 낮음, 3: 중간, 4: 약간 높음, 5: 높음)
> 6. 일일 방문자, 토탈 방문자 수도 카운트 해줘
> 7. 이미지 참고: `img/IMG_PP.png` (다크 배경 + 그린 액센트 개발자 포트폴리오)

---

## 4. 승인된 구현 플랜

### Context

create-vite 기본 템플릿(카운터 데모)을 레퍼런스 이미지(`img/IMG_PP.png`)를 참고한 모던 포트폴리오 SPA로 전면 재작성한다.

### 파일 구조

```
index.html                      # lang="ko", 타이틀, Pretendard 폰트 CDN
src/
  index.css                     # 디자인 토큰 + 전역 스타일
  App.tsx                       # 페이지 조립: Header → Hero → Projects → Footer
  types.ts                      # Project, TechSkill(level: 1~5) 타입
  data/profile.ts               # 이름·직함·소개·통계 샘플
  data/projects.ts              # 샘플 프로젝트 4개 (techStack 포함)
  hooks/useTheme.ts             # 테마 상태, localStorage 영속, html[data-theme] 적용
  hooks/useVisitorStats.ts      # 일일/토탈 방문자 집계
  components/
    Header.tsx/.css             # 고정 헤더: 로고, 앵커 네비, 테마 토글
    ThemeToggle.tsx             # 해/달 아이콘 버튼
    Hero.tsx/.css               # 인사말, 이름, 직함, 소개, CTA, 통계 배지
    ProjectSlider.tsx/.css      # 슬라이더: 이전/다음, 도트, "n / N" 카운터
    RadarChart.tsx/.css         # 순수 SVG 레이더 차트
    VisitorStats.tsx/.css       # Today / Total 카운터
    Footer.tsx/.css             # 연락처 + VisitorStats
```

### 핵심 설계

1. **디자인 토큰** (`index.css`)
   - `:root[data-theme='dark'|'light']`에 CSS 변수: `--bg`, `--surface`, `--text`, `--accent`(그린), `--border` 등
   - 간격 스케일 `--space-1..8` (4px 기반), `--radius`, 공통 `.container`/`.section`
   - Pretendard 폰트(CDN), 테마 전환 transition

2. **테마 토글** — localStorage `pf:theme` → 없으면 `prefers-color-scheme`, `html[data-theme]` 갱신

3. **프로젝트 슬라이더** — `useState` 인덱스 + `translateX(-index * 100%)` transition, 라이브러리 불필요. 좌측 정보 / 우측 레이더 차트, 모바일 세로 스택

4. **레이더 차트** (순수 SVG) — 축 각도 `-90° + i·360°/n`, 반지름 `level/5 · maxR`, 1~5 동심 그리드 + 데이터 폴리곤, CSS 변수로 테마 자동 대응, 범례(1 낮음 ~ 5 높음)

5. **방문자 카운트** — localStorage(`pf:visit:total/today/date`) + sessionStorage 플래그로 **세션당 1회만** 집계, 날짜 변경 시 일일 카운트 리셋

### 검증 계획

1. `npm run build`(tsc 포함) + `npm run lint` 통과
2. dev 서버 실행 후: 테마 토글·영속, 슬라이더 이동, 레이더 차트 렌더, 방문자 카운트(새로고침 미증가 / 새 세션 +1) 확인

---

## 5. 구현 결과

### 검증 결과 (headless Chrome 실측)

- ✅ 렌더링 정상, 콘솔 에러 없음 (다크/라이트 스크린샷 확인)
- ✅ 테마 토글 → `data-theme` 전환 + 새로고침 후 유지
- ✅ 슬라이더: `1 / 4` → `2 / 4` 이동, 타이틀 전환 확인
- ✅ 레이더 차트 4개, 축 라벨·레벨 정상
- ✅ 방문자 카운터: 동일 세션 새로고침 시 증가 없음
- ✅ `npm run build` + `npm run lint` 통과

### 구현 중 수정 사항

| 문제 | 해결 |
|---|---|
| `react-hooks/set-state-in-effect` 린트 에러 (`useVisitorStats`) | effect 내 setState → **lazy initializer + 모듈 캐시** 방식으로 변경 |
| 레이더 차트 좌우 라벨이 SVG 경계에서 잘림 ("TypeScript" → "Type") | `.radar svg { overflow: visible }` 추가 |

### 남은 작업 (선택)

- `src/data/profile.ts`, `src/data/projects.ts`의 샘플 데이터를 실제 정보로 교체
- 브라우저 스모크 테스트: `node scripts/smoke.mjs` (dev 서버 실행 상태에서)

---

## 6. 전체 기술 스택 섹션 — 승인된 플랜

### 요구사항 (원본 프롬프트)

> 전체적인 기술 스텍에 대한 영역이 필요해 추가 필요. 내용이 길어지면 좌우 스크롤로 이동. 위치는 참여프로젝트 위에 작성할거야.
>
> (플랜 검토 중 추가) 슬라이드 형태의 기술 스펙에 대한 각각의 기술을 클릭할 경우, 참여 프로젝트에 명시되어 있는 기술 스펙 강조 처리 필요

### Context

Hero(#about) → ProjectSlider(#projects) → Footer(#contact) 구조에 보유 기술 전체를 한눈에 보여주는 영역이 없어, **"전체 기술 스택" 섹션(#skills)을 참여 프로젝트 위에 신설**한다.

확정 사항:
- 표시 형태: **카테고리별 카드** (카드가 가로로 나열)
- 내용이 길어지면 **가로 스크롤(overflow-x: auto)** — 화살표 없음
- 데이터: `src/data/techStack.ts` 신규 파일
- **클릭 연동**: 칩 클릭 시 참여 프로젝트 슬라이드의 일치 기술 태그 강조. 슬라이더는 이동하지 않고, 슬라이드를 넘겨도 강조 유지. 재클릭으로 토글 해제

### 변경 파일

| 파일 | 변경 |
|---|---|
| `src/types.ts` | `TechCategory { id, label, description?, items: string[] }` 추가 — 숙련도 미표시이므로 `TechSkill` 재사용 대신 `string[]` |
| `src/data/techStack.ts` (신규) | 카테고리 5개 샘플. 기술명은 `projects.ts` techStack 표기와 **정확 일치** (강조 연동 조건) |
| `src/components/TechStack.tsx` (신규) | `#skills` 섹션, 기존 섹션 공통 패턴(`.section` > `.container` > `.section-title`). 칩은 접근성 위해 `<button>` + `aria-pressed` |
| `src/components/TechStack.css` (신규) | 가로 스크롤 트랙 + 테마 변수 기반 스크롤바 + 모바일 대응 |
| `src/App.tsx` | `selectedTech` 상태 + 토글 핸들러, `<Hero /> → <TechStack /> → <ProjectSlider />` 배치 |
| `src/components/ProjectSlider.tsx` | `selectedTech` prop, 일치 태그에 `is-highlighted` 클래스 |
| `src/components/ProjectSlider.css` | `.slide-tag.is-highlighted` — accent 강조 + 글로우 |
| `src/components/Header.tsx` | NAV에 `기술 스택(#skills)` 추가 (`#about`과 `#projects` 사이) |

### 핵심 설계 — 가로 스크롤 트랙 (`TechStack.css`)

```css
.tech-track {
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  /* 컨테이너 좌우 패딩을 상쇄하고 트랙에 동일 패딩 →
     스크롤 양끝이 컨테이너 정렬선에 맞게 시작/끝 */
  margin-inline: calc(-1 * var(--space-5));
  padding-inline: var(--space-5);
  scroll-snap-type: x proximity;
  scroll-padding-inline: var(--space-5);
}
.tech-card {
  flex: 0 0 clamp(240px, 70vw, 300px); /* flex-shrink: 0이 핵심 — 줄어들지 않아야 overflow 발동 */
  scroll-snap-align: start;
}
```

- 모바일(≤820px): 카드 폭을 뷰포트보다 작게(80vw) → 다음 카드가 살짝 보여 스크롤 가능함을 암시
- 모든 색상은 기존 CSS 변수만 사용 → 다크/라이트 테마 자동 대응

### 구현 결과

- ✅ `npm run build`(tsc -b + vite) / `npm run lint` 통과

---

## 7. 기술 칩 다중 선택 + 레이더 차트 라벨 강조 — 승인된 플랜

### 요구사항 (원본 프롬프트)

> 한 가지 기능을 더 추가 할거야
> 1. 전체 기술 스택은 다중 선택 가능(최대 5개)
> 2. 전체 기술 스택에서 선택된 스킬들은 참여프로젝트의 레이더 차트에도 강조 필요. 해당 스킬에 대한 문자를 그래프 선과 동일한 색으로 변경

### Context

6번 작업의 단일 선택을 **다중 선택(최대 5개)** 으로 확장하고, 강조 범위를 프로젝트 태그에서 **레이더 차트 축 라벨**까지 넓힌다. 차트 라벨 색은 그래프 선과 동일한 `var(--accent)`(`.radar-area`의 stroke 색)를 사용해 테마 전환 시에도 항상 일치.

### 변경 파일

| 파일 | 변경 |
|---|---|
| `src/App.tsx` | `selectedTech: string \| null` → `selectedTechs: string[]`. `MAX_SELECTED_TECH = 5`, 재클릭 시 개별 해제, 한도 초과 클릭은 무시 |
| `src/components/TechStack.tsx` | props 배열화, `includes()` 판정, 제목에 "(최대 5개 선택)" 문구 |
| `src/components/TechStack.css` | `.tech-limit-note` (작은 크기 + muted 색) |
| `src/components/ProjectSlider.tsx` | props 배열화, 태그 `includes()` 판정, RadarChart에 `highlightedSkills` 전달 |
| `src/components/RadarChart.tsx` | `highlightedSkills?: string[]` prop (기본값 `[]`로 기존 호환), 일치 라벨에 `is-highlighted` 클래스 |
| `src/components/RadarChart.css` | `.radar-label.is-highlighted { fill: var(--accent) }` + `transition: fill 0.2s` |

### 핵심 설계 — 토글 로직 (`App.tsx`)

```tsx
const MAX_SELECTED_TECH = 5;

const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
const toggleTech = (name: string) =>
  setSelectedTechs((prev) => {
    if (prev.includes(name)) return prev.filter((t) => t !== name);
    if (prev.length >= MAX_SELECTED_TECH) return prev; // 한도 초과 → 무시
    return [...prev, name];
  });
```

### 구현 결과

- ✅ `npm run build`(tsc -b + vite) / `npm run lint` 통과
- 동작: 칩 5개까지 다중 선택 → 프로젝트 태그 + 레이더 차트 축 라벨 양쪽 accent 강조, 슬라이드 이동 후에도 일치 스킬 강조 유지, 6번째 클릭 무시
