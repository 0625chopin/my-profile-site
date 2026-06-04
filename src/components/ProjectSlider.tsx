import { useState } from 'react';
import { projects } from '../data/projects';
import { RadarChart } from './RadarChart';
import './ProjectSlider.css';

interface ProjectSliderProps {
  /** 기술 스택 섹션에서 선택된 기술명 목록 — 일치하는 태그·차트 라벨을 강조 */
  selectedTechs: string[];
}

/** 참여 프로젝트를 한 장씩 보여주는 슬라이더 (이전/다음 + 도트 + 카운터) */
export function ProjectSlider({ selectedTechs }: ProjectSliderProps) {
  const [index, setIndex] = useState(0);
  const count = projects.length;

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
            {projects.map((project) => (
              <article key={project.id} className="slide">
                <div className="slide-card">
                  <div className="slide-info">
                    <div className="slide-meta">
                      <span className="slide-period">{project.period}</span>
                      <span className="slide-role">{project.role}</span>
                    </div>
                    <h3 className="slide-title">{project.title}</h3>
                    <p className="slide-summary">{project.summary}</p>

                    <ul className="slide-highlights">
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    {/* 기술 태그: 기술 스택 섹션에서 선택한 기술과 일치하면 강조 */}
                    <div className="slide-tags">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className={`slide-tag${selectedTechs.includes(tech.name) ? ' is-highlighted' : ''}`}
                        >
                          {tech.name}
                        </span>
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
              {projects.map((project, i) => (
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
