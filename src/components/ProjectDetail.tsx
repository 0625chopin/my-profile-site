import type { Project } from '../types';
import { RadarChart } from './RadarChart';
import './ProjectDetail.css';

interface ProjectDetailProps {
  /** 표시할 프로젝트 (status 2만 진입 가능 — 라우팅은 App에서 처리) */
  project: Project;
}

/** 참여 프로젝트 상세 페이지: 기간 · 역할 · 회사명 · 프로젝트명 · 사용기술 · 설명 · 성과 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <section className="project-detail section">
      <div className="container">
        {/* 목록(슬라이더)으로 돌아가기 */}
        <a href="#projects" className="detail-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          프로젝트 목록으로
        </a>

        <header className="detail-head">
          <span className="detail-company">{project.company}</span>
          <h1 className="detail-title">{project.title}</h1>
          <div className="detail-meta">
            <span className="detail-period">{project.period}</span>
            {project.roles.map((role) => (
              <span key={role} className="detail-role">
                {role}
              </span>
            ))}
          </div>
        </header>

        <div className="detail-body">
          <div className="detail-info">
            <section className="detail-block">
              <h2 className="detail-block-title">프로젝트 설명</h2>
              <p className="detail-summary">{project.summary}</p>
            </section>

            <section className="detail-block">
              <h2 className="detail-block-title">성과</h2>
              <ul className="detail-highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="detail-block">
              <h2 className="detail-block-title">사용 기술</h2>
              <div className="detail-tags">
                {project.techStack.map((tech) => (
                  <span key={tech.name} className="detail-tag">
                    {tech.name}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="detail-chart">
            <RadarChart skills={project.techStack} />
          </div>
        </div>
      </div>
    </section>
  );
}
