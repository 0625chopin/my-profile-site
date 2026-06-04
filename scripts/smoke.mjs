// 개발 서버 스모크 테스트 — 시스템 Chrome(headless)으로 페이지를 열어
// 렌더링·테마 토글·슬라이더·레이더 차트·방문자 카운터를 확인하고 스크린샷 저장
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = 'http://localhost:5173';
const OUT = 'scripts/shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await page.goto(URL, { waitUntil: 'networkidle' });

// 1) 기본 렌더링 (다크 모드)
await page.waitForSelector('.hero-name');
console.log('[1] 히어로 이름:', await page.textContent('.hero-name'));
console.log('[1] 초기 테마:', await page.getAttribute('html', 'data-theme'));
await page.screenshot({ path: `${OUT}/01-dark-full.png`, fullPage: true });

// 2) 방문자 카운터
console.log('[2] 방문자 카운터:', (await page.textContent('.visitor-stats')).trim());

// 3) 레이더 차트 (첫 슬라이드)
const radarCount = await page.locator('.radar svg').count();
const firstLabels = await page.locator('.slider-track .slide').first().locator('.radar-label').allTextContents();
console.log('[3] 레이더 차트 개수:', radarCount, '| 첫 슬라이드 축:', firstLabels.join(', '));

// 4) 슬라이더 — 다음 버튼 클릭 후 카운터/타이틀 변화 확인
console.log('[4] 슬라이드 카운터(이동 전):', (await page.textContent('.slider-counter')).trim());
await page.click('button[aria-label="다음 프로젝트"]');
await page.waitForTimeout(600); // 트랙 transition 대기
console.log('[4] 슬라이드 카운터(이동 후):', (await page.textContent('.slider-counter')).trim());
const visibleTitle = await page.locator('.slide').nth(1).locator('.slide-title').textContent();
console.log('[4] 2번째 슬라이드 타이틀:', visibleTitle);
await page.screenshot({ path: `${OUT}/02-slide2.png` });

// 5) 테마 토글 → 라이트 모드
await page.click('.theme-toggle');
await page.waitForTimeout(400);
console.log('[5] 토글 후 테마:', await page.getAttribute('html', 'data-theme'));
console.log('[5] localStorage pf:theme:', await page.evaluate(() => localStorage.getItem('pf:theme')));
await page.screenshot({ path: `${OUT}/03-light-full.png`, fullPage: true });

// 6) 새로고침 — 테마 유지 + 방문자 카운트 미증가(같은 세션) 확인
const before = await page.textContent('.visitor-stats');
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('.hero-name');
console.log('[6] 새로고침 후 테마 유지:', await page.getAttribute('html', 'data-theme'));
const after = await page.textContent('.visitor-stats');
console.log('[6] 카운터 변화 없음(세션 유지):', before.trim() === after.trim(), '|', after.trim());

console.log('[console errors]', consoleErrors.length ? consoleErrors : '없음');
await browser.close();
