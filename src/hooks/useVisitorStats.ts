import { useState } from 'react';

const TOTAL_KEY = 'pf:visit:total';
const TODAY_KEY = 'pf:visit:today';
const DATE_KEY = 'pf:visit:date';
/** 세션당 1회만 집계하기 위한 플래그 (새로고침 중복 방지) */
const SESSION_KEY = 'pf:visit:counted';

interface VisitorStats {
  today: number;
  total: number;
}

/** 오늘 날짜를 YYYY-MM-DD(로컬 기준)로 반환 */
function getTodayString(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

/** 페이지 로드당 1회만 집계하기 위한 모듈 캐시 (StrictMode 중복 실행 방지) */
let cachedStats: VisitorStats | null = null;

/** 방문 기록을 읽고, 이 세션에서 처음이면 1회 증가시킨 뒤 통계 반환 */
function readAndCountVisit(): VisitorStats {
  if (cachedStats) return cachedStats;

  const todayString = getTodayString();
  let total = Number(localStorage.getItem(TOTAL_KEY)) || 0;
  let today =
    localStorage.getItem(DATE_KEY) === todayString
      ? Number(localStorage.getItem(TODAY_KEY)) || 0
      : 0; // 날짜가 바뀌면 일일 카운트 리셋

  // 이 세션에서 아직 집계하지 않았다면 1회 증가
  if (!sessionStorage.getItem(SESSION_KEY)) {
    total += 1;
    today += 1;
    sessionStorage.setItem(SESSION_KEY, '1');
  }

  localStorage.setItem(TOTAL_KEY, String(total));
  localStorage.setItem(TODAY_KEY, String(today));
  localStorage.setItem(DATE_KEY, todayString);

  cachedStats = { today, total };
  return cachedStats;
}

/** localStorage 기반 일일/토탈 방문자 집계 훅 (브라우저별 집계) */
export function useVisitorStats(): VisitorStats {
  const [stats] = useState(readAndCountVisit);
  return stats;
}
