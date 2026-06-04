import type { Theme } from '../hooks/useTheme';
import { profile } from '../data/profile';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const NAV_ITEMS = [
  { href: '#about', label: '소개' },
  { href: '#skills', label: '기술 스택' },
  { href: '#projects', label: '프로젝트' },
  { href: '#contact', label: '연락처' },
];

/** 고정 헤더: 로고 + 섹션 앵커 네비게이션 + 테마 토글 */
export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#about" className="header-logo">
          {profile.name}
          <span className="header-logo-dot">.</span>
        </a>

        <nav className="header-nav" aria-label="주요 섹션">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
