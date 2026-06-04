import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import './ProjectDetail.css';

interface ProjectDetailProps {
  /** 표시할 프로젝트 (status 1만 진입 가능 — 라우팅은 App에서 처리) */
  project: Project;
}

/** 참여 프로젝트 상세 페이지: 메인과 동일한 카드 + 하단 상세 내용 + 성과 */
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

        {/* 카드에는 없는 수행 회사명만 카드 위에 표시 */}
        <span className="detail-company">{project.company}</span>

        {/* 메인 페이지 슬라이더와 완전히 동일한 프로젝트 카드 */}
        <ProjectCard project={project} />

        {/* 하단: 상세 내용 → 성과 순서로 표시 */}
        {project.detail && (
          <section className="detail-block">
            <h2 className="detail-block-title">상세 내용</h2>
            <p className="detail-text">{project.detail}</p>
          </section>
        )}

        <section className="detail-block">
          <h2 className="detail-block-title">성과</h2>
          <ul className="detail-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
