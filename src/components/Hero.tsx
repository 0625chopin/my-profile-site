import { profile } from '../data/profile';
import './Hero.css';

/** 히어로 섹션: 인사말 + 이름 + 직함 + 소개 + CTA + 통계 배지 */
export function Hero() {
  return (
    <section id="about" className="hero section">
      <div className="container hero-inner">
        <p className="hero-greeting">{profile.greeting}</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-intro">{profile.intro}</p>

        <div className="hero-actions">
          <a href="#projects" className="hero-cta">
            프로젝트 보기
          </a>
          <a href={`mailto:${profile.email}`} className="hero-cta hero-cta--ghost">
            연락하기
          </a>
        </div>

        <div className="hero-stats">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
