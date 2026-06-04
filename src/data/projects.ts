import type { Project } from '../types';

/** 참여 프로젝트 샘플 데이터 — 실제 프로젝트로 교체해서 사용 */
export const projects: Project[] = [
  {
    id: 'commerce-platform',
    title: '커머스 플랫폼 리뉴얼',
    period: '2024.03 ~ 2025.01',
    role: '프론트엔드 리드',
    summary:
      '월 100만 방문자 규모의 커머스 웹을 React + TypeScript 기반으로 전면 리뉴얼했습니다. 디자인 시스템을 구축하고 핵심 페이지 성능을 개선했습니다.',
    highlights: [
      'LCP 4.2초 → 1.8초로 개선 (이미지 최적화, 코드 스플리팅)',
      '공통 컴포넌트 40여 종의 디자인 시스템 구축',
      '주문·결제 플로우 A/B 테스트로 전환율 12% 향상',
    ],
    techStack: [
      { name: 'React', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'Next.js', level: 4 },
      { name: 'GraphQL', level: 3 },
      { name: 'Testing', level: 4 },
    ],
  },
  {
    id: 'admin-dashboard',
    title: '실시간 관리자 대시보드',
    period: '2023.06 ~ 2024.02',
    role: '풀스택 개발',
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
    role: '프론트엔드 개발',
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
    role: '백엔드 개발',
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
