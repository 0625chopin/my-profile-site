/** 기술 숙련도: 1 낮음 · 2 약간 낮음 · 3 중간 · 4 약간 높음 · 5 높음 */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

/** 프로젝트에서 사용한 기술과 숙련도 */
export interface TechSkill {
  name: string;
  level: SkillLevel;
}

/** 참여 프로젝트 */
export interface Project {
  id: string;
  title: string;
  period: string;
  role: string;
  summary: string;
  /** 주요 성과·담당 업무 */
  highlights: string[];
  /** 레이더 차트에 표시할 기술 스택 (3~6개 권장) */
  techStack: TechSkill[];
}

/** 전체 기술 스택 카테고리 (카테고리명 + 기술 이름 목록) */
export interface TechCategory {
  id: string;
  /** 카테고리 라벨 (예: Frontend) */
  label: string;
  /** 카테고리 한 줄 설명 (선택) */
  description?: string;
  /** 기술 이름 목록 — 프로젝트 강조 연동을 위해 projects.ts의 기술명과 표기를 맞춘다 */
  items: string[];
}

/** 프로필 정보 */
export interface Profile {
  name: string;
  title: string;
  greeting: string;
  intro: string;
  email: string;
  github: string;
  stats: { label: string; value: string }[];
}
