import { profile } from '../data/profile';
import { VisitorStats } from './VisitorStats';
import './Footer.css';

/** 푸터: 연락처 + 방문자 통계 + 카피라이트 */
export function Footer() {
  return (
    <footer id="contact" className="footer section">
      <div className="container footer-inner">
        <h2 className="footer-title">함께 일하고 싶으시다면</h2>
        <p className="footer-desc">새로운 프로젝트, 협업 제안 모두 환영합니다.</p>

        <div className="footer-links">
          <a href={`mailto:${profile.email}`} className="footer-link">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="footer-link">
            GitHub
          </a>
        </div>

        <VisitorStats />

        <p className="footer-copy">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
