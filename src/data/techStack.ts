import type { TechCategory } from '../types';

/**
 * 전체 기술 스택 샘플 데이터 — 실제 기술로 교체해서 사용
 * 기술명은 projects.ts의 techStack 표기와 일치해야 클릭 강조 연동이 동작한다.
 */
export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: '사용자 인터페이스 · 클라이언트',
    items: ['React', 'TypeScript', 'Next.js', 'Redux', 'GraphQL', 'Vite'],
  },
  {
    id: 'backend',
    label: 'Backend',
    description: '서버 · API',
    items: ['Node.js', 'Python', 'FastAPI', 'WebSocket', 'REST API'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    description: '크로스플랫폼 앱',
    items: ['React Native', 'Expo', 'Security'],
  },
  {
    id: 'devops',
    label: 'DevOps / Infra',
    description: '배포 · 인프라 · 운영',
    items: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions'],
  },
  {
    id: 'data-ai',
    label: 'AI / Data',
    description: '데이터 · 머신러닝',
    items: ['PostgreSQL', 'Redis', 'LLM/RAG', 'Testing'],
  },
];
