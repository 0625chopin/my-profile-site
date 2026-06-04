import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { ProjectSlider } from './components/ProjectSlider';
import { Footer } from './components/Footer';

/** 동시에 선택할 수 있는 기술 최대 개수 */
const MAX_SELECTED_TECH = 5;

/** 페이지 조립: 헤더 → 히어로 → 기술 스택 → 프로젝트 슬라이더 → 푸터 */
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

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <TechStack selectedTechs={selectedTechs} onSelectTech={toggleTech} />
        <ProjectSlider selectedTechs={selectedTechs} />
      </main>
      <Footer />
    </>
  );
}

export default App;
