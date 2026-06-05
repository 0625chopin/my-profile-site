/** 기술 숙련도: 1 낮음 · 2 약간 낮음 · 3 중간 · 4 약간 높음 · 5 높음 */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

/** 프로젝트에서 사용한 기술과 숙련도 */
export interface TechSkill {
  name: string;
  level: SkillLevel;
}

/** 프로젝트 노출 상태: 0 숨김 · 1 노출(목록 + 상세 페이지) · 2 보관(작성 중, 어디에도 노출 안 함) */
export type ProjectStatus = 0 | 1 | 2;

/** 참여 프로젝트 */
export interface Project {
  id: string;
  title: string;
  period: string;
  /** 수행 역할 목록 (예: ['풀스택 개발', 'Batch 개발']) */
  roles: string[];
  /** 수행 회사명 */
  company: string;
  /** 노출 상태 (0: 숨김, 1: 목록 + 상세, 2: 보관) */
  status: ProjectStatus;
  summary: string;
  /** 상세 페이지 하단 '상세'란에 표시할 긴 설명 — 있으면 목록에서 프로젝트명이 상세 링크가 됨 */
  detail?: string;
  /** 메인 카드에 표시할 요약 성과·담당 업무 */
  highlights: string[];
  /** 상세 페이지 '성과'란 전용 목록 — 없으면 상세 페이지에서 성과란을 표시하지 않음 */
  achievements?: string[];
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
