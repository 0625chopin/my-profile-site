import { useEffect, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { ProjectSlider } from './components/ProjectSlider';
import { ProjectDetail } from './components/ProjectDetail';
import { Footer } from './components/Footer';
import { projects } from './data/projects';

/** 동시에 선택할 수 있는 기술 최대 개수 */
const MAX_SELECTED_TECH = 5;

/** 해시에서 상세 페이지 프로젝트 id 추출 (#project/<id> 형식이 아니면 null) */
function getDetailIdFromHash(): string | null {
  const match = window.location.hash.match(/^#project\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

/** 페이지 조립: 헤더 → (메인 섹션 | 프로젝트 상세) → 푸터 */
function App() {
  const { theme, toggleTheme } = useTheme();

  // 선택된 기술 목록: 재클릭 시 해제, 최대 5개 초과 선택은 무시
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const toggleTech = (name: string) =>
    setSelectedTechs((prev) => {
      if (prev.includes(name)) return prev.filter((t) => t !== name);
      if (prev.length >= MAX_SELECTED_TECH) return prev; // 한도 초과 → 무시
      return [...prev, name];
    });

  // 해시 라우팅: #project/<id>면 상세 페이지, 그 외에는 메인 페이지
  const [detailId, setDetailId] = useState<string | null>(getDetailIdFromHash);
  useEffect(() => {
    const onHashChange = () => setDetailId(getDetailIdFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // 상세 페이지는 노출 상태(status 1)인 프로젝트만 진입 허용
  const detailProject =
    detailId !== null
      ? projects.find((p) => p.id === detailId && p.status === 1) ?? null
      : null;

  // 상세 진입 시 맨 위로, 목록 복귀 시 해당 섹션 앵커로 스크롤
  useEffect(() => {
    if (detailProject) {
      window.scrollTo({ top: 0 });
    } else {
      const sectionId = window.location.hash.slice(1);
      if (sectionId) document.getElementById(sectionId)?.scrollIntoView();
    }
  }, [detailProject]);

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        {detailProject ? (
          <ProjectDetail project={detailProject} />
        ) : (
          <>
            <Hero />
            <TechStack selectedTechs={selectedTechs} onSelectTech={toggleTech} />
            <ProjectSlider selectedTechs={selectedTechs} onSelectTech={toggleTech} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
