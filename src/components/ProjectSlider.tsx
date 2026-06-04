import { useState } from 'react';
import { projects } from '../data/projects';
import { RadarChart } from './RadarChart';
import './ProjectSlider.css';

interface ProjectSliderProps {
  /** 기술 스택 섹션에서 선택된 기술명 목록 — 일치하는 태그·차트 라벨을 강조 */
  selectedTechs: string[];
  /** 기술 태그 클릭 핸들러 — 전체 기술 스택 칩 선택과 양방향 연동 */
  onSelectTech: (name: string) => void;
}

/** 노출 대상 프로젝트 (status 1: 목록, 2: 목록 + 상세) */
const visibleProjects = projects.filter((project) => project.status !== 0);

/** 참여 프로젝트를 한 장씩 보여주는 슬라이더 (이전/다음 + 도트 + 카운터) */
export function ProjectSlider({ selectedTechs, onSelectTech }: ProjectSliderProps) {
  const [index, setIndex] = useState(0);
  const count = visibleProjects.length;

  // 순환 이동: 마지막에서 다음 → 처음, 처음에서 이전 → 마지막
  const goPrev = () => setIndex((i) => (i - 1 + count) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">Portfolio</span>
          <h2>참여 프로젝트</h2>
        </div>

        <div className="slider">
          {/* 트랙: index에 따라 가로로 이동 */}
          <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {visibleProjects.map((project) => (
              <article key={project.id} className="slide">
                <div className="slide-card">
                  <div className="slide-info">
                    <div className="slide-meta">
                      <span className="slide-period">{project.period}</span>
                      {project.roles.map((role) => (
                        <span key={role} className="slide-role">
                          {role}
                        </span>
                      ))}
                    </div>

                    {/* 프로젝트명: status 2면 상세 페이지로 이동 */}
                    {project.status === 2 ? (
                      <h3 className="slide-title">
                        <a href={`#project/${project.id}`} className="slide-title-link">
                          {project.title}
                        </a>
                      </h3>
                    ) : (
                      <h3 className="slide-title">{project.title}</h3>
                    )}
                    <p className="slide-summary">{project.summary}</p>

                    <ul className="slide-highlights">
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    {/* 기술 태그: 클릭 시 전체 기술 스택 칩과 함께 선택/해제 */}
                    <div className="slide-tags">
                      {project.techStack.map((tech) => (
                        <button
                          key={tech.name}
                          type="button"
                          className={`slide-tag${selectedTechs.includes(tech.name) ? ' is-highlighted' : ''}`}
                          aria-pressed={selectedTechs.includes(tech.name)}
                          onClick={() => onSelectTech(tech.name)}
                        >
                          {tech.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="slide-chart">
                    <RadarChart skills={project.techStack} highlightedSkills={selectedTechs} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 내비게이션: 이전/다음 + 카운터 + 도트 */}
          <div className="slider-nav">
            <button type="button" className="slider-arrow" onClick={goPrev} aria-label="이전 프로젝트">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="slider-dots" role="tablist" aria-label="프로젝트 선택">
              {visibleProjects.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${project.title} 보기`}
                  className={`slider-dot${i === index ? ' is-active' : ''}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>

            <span className="slider-counter">
              <strong>{index + 1}</strong> / {count}
            </span>

            <button type="button" className="slider-arrow" onClick={goNext} aria-label="다음 프로젝트">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
