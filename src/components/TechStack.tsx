import { techCategories } from '../data/techStack';
import './TechStack.css';

interface TechStackProps {
  /** 현재 선택된 기술명 목록 (최대 5개) */
  selectedTechs: string[];
  /** 칩 클릭 핸들러 — 토글·한도 처리는 App에서 담당 */
  onSelectTech: (name: string) => void;
}

/** 전체 기술 스택을 카테고리별 카드로 보여주는 섹션 (가로 네이티브 스크롤) */
export function TechStack({ selectedTechs, onSelectTech }: TechStackProps) {
  return (
    <section id="skills" className="tech-stack section">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">Tech Stack</span>
          <h2>
            전체 기술 스택 <span className="tech-limit-note">(최대 5개 선택)</span>
          </h2>
        </div>

        {/* 가로 스크롤 트랙: 카드가 많아지면 overflow-x로 이동 */}
        <div className="tech-track" role="list" aria-label="기술 스택 카테고리">
          {techCategories.map((category) => (
            <article key={category.id} role="listitem" className="tech-card">
              <header className="tech-card-head">
                <h3 className="tech-card-title">{category.label}</h3>
                {category.description && (
                  <p className="tech-card-desc">{category.description}</p>
                )}
              </header>

              {/* 기술 칩: 클릭 시 참여 프로젝트의 일치 태그·차트 라벨 강조 (재클릭으로 해제) */}
              <ul className="tech-card-list">
                {category.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className={`tech-chip${selectedTechs.includes(item) ? ' is-selected' : ''}`}
                      aria-pressed={selectedTechs.includes(item)}
                      onClick={() => onSelectTech(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
