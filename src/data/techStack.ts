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
    items: ['Vue3', 'TypeScript', 'Nuxt.js', 'Jsp', 'Javascript', 'Jquery'],
  },
  {
    id: 'backend',
    label: 'Backend',
    description: '서버 · API · INTERFACE · BATCH',
    items: ['JAVA', 'Spring', 'WebSocket', 'Socket', 'RestApi', 'Batch', 'Api/Interface', 'Library'],
  },
  {
    id: 'database',
    label: 'Database',
    description: 'RDBMS',
    items: ['MySQL', 'Oracle', 'MsSQL', 'MariaDB', 'Tibero', 'Redis'],
  },
  {
    id: 'ai',
    label: 'AI',
    description: 'LLM/CLI',
    items: ['Claude code'],
  },
];
