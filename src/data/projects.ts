import type { Project } from '../types';

/**
 * 참여 프로젝트 샘플 데이터 — 실제 프로젝트로 교체해서 사용
 * status: 0 숨김 · 1 목록 노출 · 2 목록 + 상세 페이지 노출
 */
export const projects: Project[] = [
  {
    id: 'commerce-platform',
    title: 'Surplus global e-commerce platform',
    period: '2024.03 ~ 2025.01',
    roles: ['풀스택 개발', 'API/Interface', 'Batch'],
    company: '서플러스글로벌',
    status: 2,
    summary:
      '반도체, 디스플레이제조용기계 B2C, B2B 커머스 웹사이트 신규 개발 프로젝트에서 Front office 에서 회원 파트 및 API/Interface, Batch 개발을 담당  성공적으로 프로젝트 오픈 했습니다. ',
    highlights: [
      'Jwt 토큰 인증 및 권한 관리',
      'Redis 토큰 저장 및 캐싱',
      'Api/Interface, Batch 개발',
      '외부 Library 연동 및 활용'
    ],
    techStack: [
      { name: 'Vue3', level: 3 },
      { name: 'Spring', level: 4 },
      { name: 'Api/Interface', level: 5 },
      { name: 'Batch', level: 5 },
      { name: 'MsSQL', level: 4 },
    ],
  },
  {
    id: 'admin-dashboard',
    title: '실시간 관리자 대시보드',
    period: '2023.06 ~ 2024.02',
    roles: ['풀스택 개발'],
    company: '샘플컴퍼니',
    status: 2,
    summary:
      '운영 지표를 실시간으로 모니터링하는 사내 대시보드를 개발했습니다. WebSocket 기반 실시간 갱신과 대용량 차트 렌더링을 담당했습니다.',
    highlights: [
      'WebSocket 기반 실시간 지표 파이프라인 구축',
      '10만 행 데이터 가상 스크롤 테이블 구현',
      'Docker 기반 배포 자동화로 릴리스 주기 단축',
    ],
    techStack: [
      { name: 'React', level: 4 },
      { name: 'Node.js', level: 4 },
      { name: 'WebSocket', level: 3 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'Docker', level: 2 },
    ],
  },
  {
    id: 'mobile-banking',
    title: '모바일 뱅킹 앱',
    period: '2022.04 ~ 2023.05',
    roles: ['프론트엔드 개발'],
    company: '샘플뱅크',
    status: 1,
    summary:
      'React Native 기반 모바일 뱅킹 앱의 계좌 조회·이체 모듈을 개발했습니다. 보안 요구사항을 준수하면서 네이티브 수준의 UX를 구현했습니다.',
    highlights: [
      '생체 인증 연동 및 보안 키패드 모듈 개발',
      '이체 플로우 리팩토링으로 이탈률 8% 감소',
      '공통 폼 검증 라이브러리 사내 배포',
    ],
    techStack: [
      { name: 'React Native', level: 4 },
      { name: 'TypeScript', level: 4 },
      { name: 'Redux', level: 3 },
      { name: 'Security', level: 3 },
      { name: 'CI/CD', level: 2 },
    ],
  },
  {
    id: 'ai-chatbot',
    title: 'AI 고객상담 챗봇',
    period: '2025.02 ~ 진행 중',
    roles: ['백엔드 개발'],
    company: '샘플에이아이',
    status: 2,
    summary:
      'LLM 기반 고객상담 챗봇 서비스의 백엔드를 개발하고 있습니다. RAG 파이프라인 설계와 응답 품질 평가 체계를 담당합니다.',
    highlights: [
      'RAG 파이프라인 설계로 답변 정확도 35% 개선',
      '스트리밍 응답 API 구현 (평균 첫 토큰 0.8초)',
      '프롬프트 회귀 테스트 자동화 구축',
    ],
    techStack: [
      { name: 'Python', level: 4 },
      { name: 'FastAPI', level: 4 },
      { name: 'LLM/RAG', level: 3 },
      { name: 'Redis', level: 3 },
      { name: 'AWS', level: 3 },
    ],
  },
];
