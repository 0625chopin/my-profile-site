import type { Project } from '../types';

/**
 * 참여 프로젝트 샘플 데이터 — 실제 프로젝트로 교체해서 사용
 * status: 0 숨김 · 1 노출(목록 + 상세) · 2 보관(작성 중, 노출 안 함)
 */
export const projects: Project[] = [
  {
    id: 'commerce-platform',
    title: 'Surplus global e-commerce platform',
    period: '2024.03 ~ 2025.01',
    roles: ['풀스택 개발', 'API/Interface', 'Batch'],
    company: '서플러스글로벌',
    status: 1,
    summary:
      '반도체, 디스플레이제조용기계 B2C, B2B 커머스 웹사이트 신규 개발 프로젝트에서 Front office 의 회원 파트 및 API/Interface, Batch 개발을 담당 후 성공적으로 프로젝트 오픈 했습니다. ',
    detail:
      '글로벌 B2C·B2B 커머스 플랫폼 신규 구축 프로젝트로, Front office 회원 파트 전반(가입·로그인·권한, 마이페이지 등)과 외부 시스템 설계 보조 및 연동 API/Interface, 정기 Batch 작업을 담당했습니다. JWT 기반 인증 체계를 설계하고 Redis를 활용한 토큰 저장·캐싱으로 인증 성능을 확보했으며, 다수의 외부 Library 연동을 포함한 다양한 Interface 요구사항을 일정 내에 구현해 프로젝트를 성공적으로 오픈했습니다. 추가로 BO(Admin) 메뉴관리(추가, 삭제, 변경) node 방식으로 개발 완료 했습니다.',
    highlights: [
      'Jwt 토큰 인증 및 권한 관리',
      'Redis 토큰 저장 및 캐싱',
      'Api/Interface, Batch 개발',
      '외부 Library 연동 및 활용'
    ],
    // achievements: [
    //   '다른 Sub Domain 간의 Jwt 토큰 공유',
    //   'Redis에 Refresh Token 저장 및 토큰 재발급',
    //   '회원 상태값 변경에 따른 Api/Interface 송수신',
    //   '외부 Library 연동 및 활용',
    // ],
    techStack: [
      { name: 'Vue3', level: 3 },
      { name: 'TypeScript', level: 4 },
      { name: 'Spring', level: 4 },
      { name: 'Api/Interface', level: 5 },
      { name: 'Batch', level: 5 },
      { name: 'MsSQL', level: 4 },
      { name: 'Library', level: 5 },
    ],
  },
  {
    id: 'ai-chatbot',
    title: 'AI 고객상담 챗봇',
    period: '2025.02 ~ 진행 중',
    roles: ['백엔드 개발'],
    company: '샘플에이아이',
    status: 1,
    summary:
      'LLM 기반 고객상담 챗봇 서비스의 백엔드를 개발하고 있습니다. RAG 파이프라인 설계와 응답 품질 평가 체계를 담당합니다.',
    detail:
      'LLM 기반 고객상담 챗봇 서비스의 백엔드 개발을 담당하고 있습니다. RAG 파이프라인을 설계해 답변 정확도를 35% 개선했고, 스트리밍 응답 API를 구현해 평균 첫 토큰 응답 시간 0.8초를 달성했습니다. 프롬프트 변경에 따른 품질 회귀를 막기 위한 자동화 테스트 체계도 구축해 운영 안정성을 높였습니다.',
    highlights: [
      'RAG 파이프라인 설계로 답변 정확도 35% 개선',
      '스트리밍 응답 API 구현 (평균 첫 토큰 0.8초)',
      '프롬프트 회귀 테스트 자동화 구축',
    ],
    achievements: [
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
