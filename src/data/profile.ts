import type { Profile } from '../types';

/** 프로필 샘플 데이터 — 실제 정보로 교체해서 사용 */
export const profile: Profile = {
  name: '홍길동',
  title: '풀스택 개발자',
  greeting: '안녕하세요, 저는',
  intro:
    '사용자 경험을 최우선으로 생각하는 풀스택 개발자입니다. React와 TypeScript 기반의 프론트엔드부터 Node.js 백엔드까지, 아이디어를 완성도 높은 제품으로 만드는 일을 좋아합니다.',
  email: 'hong@example.com',
  github: 'https://github.com/example',
  stats: [
    { label: '년+ 경력', value: '6' },
    { label: '개+ 프로젝트', value: '20' },
  ],
};
