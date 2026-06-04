import type { Project } from '../types';
import { RadarChart } from './RadarChart';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  /** 강조할 기술명 목록 (기술 스택 섹션 연동) — 없으면 강조 없음 */
  selectedTechs?: string[];
  /** 기술 태그 클릭 핸들러 — 없으면 태그를 클릭 불가(span)로 렌더 */
  onSelectTech?: (name: string) => void;
  /** true면 프로젝트명을 상세 페이지 링크로 렌더 (status 2 전용) */
  linkToDetail?: boolean;
}

/** 참여 프로젝트 카드 — 메인 슬라이더와 상세 페이지에서 공용 사용 */
export function ProjectCard({ project, selectedTechs = [], onSelectTech, linkToDetail = false }: ProjectCardProps) {
  return (
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

        {/* 프로젝트명: linkToDetail이면 상세 페이지로 이동 */}
        {linkToDetail ? (
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

        {/* 기술 태그: 핸들러가 있으면 클릭 시 전체 기술 스택 칩과 선택/해제 연동 */}
        <div className="slide-tags">
          {project.techStack.map((tech) =>
            onSelectTech ? (
              <button
                key={tech.name}
                type="button"
                className={`slide-tag${selectedTechs.includes(tech.name) ? ' is-highlighted' : ''}`}
                aria-pressed={selectedTechs.includes(tech.name)}
                onClick={() => onSelectTech(tech.name)}
              >
                {tech.name}
              </button>
            ) : (
              <span key={tech.name} className="slide-tag">
                {tech.name}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="slide-chart">
        <RadarChart skills={project.techStack} highlightedSkills={selectedTechs} />
      </div>
    </div>
  );
}
