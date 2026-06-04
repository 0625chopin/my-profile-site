import { useVisitorStats } from '../hooks/useVisitorStats';
import './VisitorStats.css';

/** 일일/토탈 방문자 카운터 표시 */
export function VisitorStats() {
  const { today, total } = useVisitorStats();

  return (
    <div className="visitor-stats" aria-label="방문자 통계">
      <span className="visitor-stat">
        <span className="visitor-label">Today</span>
        <strong>{today.toLocaleString()}</strong>
      </span>
      <span className="visitor-divider" aria-hidden="true" />
      <span className="visitor-stat">
        <span className="visitor-label">Total</span>
        <strong>{total.toLocaleString()}</strong>
      </span>
    </div>
  );
}
