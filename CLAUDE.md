# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 기본 언어

- 모든 응답은 **한국어**로 작성한다.
- 코드 주석, 커밋 메시지, 문서는 한국어로 작성한다.
- 변수명, 함수명, 타입명 등 식별자는 영어를 사용한다.

## 플랜

- plan mode 에서 요청한 prompt에 대한 작업은 완료 후 plan내용을 출력 한다.

## 프로젝트 개요

photofolio는 Vite 8, React 19, TypeScript로 만든 사진 포트폴리오 싱글 페이지 앱(SPA)이다.

## 명령어

```bash
npm run dev      # Vite 개발 서버 실행 (HMR)
npm run build    # 타입체크(tsc -b) 후 dist/로 번들링(vite build)
npm run lint     # ESLint 실행 (flat config, eslint.config.js)
npm run preview  # 프로덕션 빌드를 로컬에서 서빙
```

테스트 프레임워크는 설정되어 있지 않다.

## 아키텍처

- **진입 흐름**: `index.html` → `src/main.tsx` (React 루트, `index.css` 임포트) → `src/App.tsx`
- **TypeScript project references**: 루트 `tsconfig.json`은 `tsconfig.app.json`(`src/`의 앱 코드)과 `tsconfig.node.json`(`vite.config.ts`)만 참조한다. `npm run build`는 `tsc -b`로 두 프로젝트를 모두 타입체크하므로, 빌드 실패는 둘 중 어느 쪽에서도 발생할 수 있다.
- **정적 자산**: `public/`의 파일은 `/` 경로에서 그대로 서빙되고, `src/assets/`의 파일은 컴포넌트에서 임포트되어 번들러가 처리한다.
- **스타일링**: 일반 CSS — 전역은 `src/index.css`, 컴포넌트별 CSS 파일(예: `src/App.css`)을 사용한다.
