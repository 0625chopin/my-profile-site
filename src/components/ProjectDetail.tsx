import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import './ProjectDetail.css';

/** 정규식 특수문자 이스케이프 (기술명에 '/', '.', '#' 등이 포함될 수 있음) */
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 텍스트에서 선택된 기술명과 일치하는 부분을 강조(<mark>) — 대소문자 무시 (Jwt/JWT 등) */
function highlightTechs(text: string, selectedTechs: string[]) {
  if (selectedTechs.length === 0) return text;
  const pattern = new RegExp(`(${selectedTechs.map(escapeRegExp).join('|')})`, 'gi');
  // 캡처 그룹으로 split → 홀수 인덱스가 일치한 기술명
  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="detail-tech-highlight">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

interface ProjectDetailProps {
  /** 표시할 프로젝트 (status 1만 진입 가능 — 라우팅은 App에서 처리) */
  project: Project;
  /** 메인에서 선택된 기술명 목록 — 일치하는 태그·차트 라벨을 강조 */
  selectedTechs: string[];
  /** 기술 태그 클릭 핸들러 — 전체 기술 스택 칩 선택과 양방향 연동 */
  onSelectTech: (name: string) => void;
}

/** 참여 프로젝트 상세 페이지: 메인과 동일한 카드 + 하단 상세 내용 + 성과 */
export function ProjectDetail({ project, selectedTechs, onSelectTech }: ProjectDetailProps) {
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

        {/* 메인 페이지 슬라이더와 완전히 동일한 프로젝트 카드 — 선택된 기술 강조 유지 */}
        <ProjectCard project={project} selectedTechs={selectedTechs} onSelectTech={onSelectTech} />

        {/* 하단: 상세 내용 → 성과 순서로 표시 */}
        {project.detail && (
          <section className="detail-block">
            <h2 className="detail-block-title">상세 내용</h2>
            {/* 선택된 기술명과 일치하는 부분을 초록색으로 강조 */}
            <p className="detail-text">{highlightTechs(project.detail, selectedTechs)}</p>
          </section>
        )}

        {/* 성과란: 카드의 highlights와 분리된 상세 전용 achievements 사용 */}
        {project.achievements && (
          <section className="detail-block">
            <h2 className="detail-block-title">성과</h2>
            <ul className="detail-highlights">
              {project.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
}
