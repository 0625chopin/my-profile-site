import type { TechSkill } from '../types';
import './RadarChart.css';

interface RadarChartProps {
  skills: TechSkill[];
  /** SVG 한 변 크기 (px) */
  size?: number;
  /** 강조할 기술명 목록 — 축 라벨을 그래프 선 색으로 표시 */
  highlightedSkills?: string[];
}

const MAX_LEVEL = 5;
/** 숙련도 범례 라벨 */
const LEVEL_LABELS = ['낮음', '약간 낮음', '중간', '약간 높음', '높음'];

/** 축 인덱스와 반지름으로 SVG 좌표 계산 (12시 방향부터 시계 방향) */
function polarToPoint(center: number, radius: number, index: number, count: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
}

/** 기술 숙련도(1~5)를 표시하는 순수 SVG 레이더 차트 */
export function RadarChart({ skills, size = 320, highlightedSkills = [] }: RadarChartProps) {
  const center = size / 2;
  // 라벨이 들어갈 여백을 확보한 최대 반지름
  const maxRadius = center - 48;
  const count = skills.length;

  /** 주어진 반지름의 정다각형 points 문자열 생성 */
  const ringPoints = (radius: number) =>
    skills
      .map((_, i) => {
        const { x, y } = polarToPoint(center, radius, i, count);
        return `${x},${y}`;
      })
      .join(' ');

  // 데이터 폴리곤: 각 축의 level에 비례한 반지름
  const dataPoints = skills
    .map((skill, i) => {
      const { x, y } = polarToPoint(center, (skill.level / MAX_LEVEL) * maxRadius, i, count);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <figure className="radar">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={`기술 숙련도 레이더 차트: ${skills.map((s) => `${s.name} ${s.level}/5`).join(', ')}`}
      >
        {/* 1~5 동심 그리드 */}
        {Array.from({ length: MAX_LEVEL }, (_, ring) => (
          <polygon
            key={ring}
            className="radar-grid"
            points={ringPoints(((ring + 1) / MAX_LEVEL) * maxRadius)}
          />
        ))}

        {/* 중심 → 각 꼭짓점 축선 */}
        {skills.map((skill, i) => {
          const { x, y } = polarToPoint(center, maxRadius, i, count);
          return <line key={skill.name} className="radar-axis" x1={center} y1={center} x2={x} y2={y} />;
        })}

        {/* 데이터 영역 */}
        <polygon className="radar-area" points={dataPoints} />

        {/* 데이터 꼭짓점 */}
        {skills.map((skill, i) => {
          const { x, y } = polarToPoint(center, (skill.level / MAX_LEVEL) * maxRadius, i, count);
          return <circle key={skill.name} className="radar-dot" cx={x} cy={y} r="4" />;
        })}

        {/* 축 라벨 (기술명 + 레벨) — 선택된 스킬은 그래프 선 색으로 강조 */}
        {skills.map((skill, i) => {
          const { x, y } = polarToPoint(center, maxRadius + 24, i, count);
          // 좌/우/중앙 위치에 따라 텍스트 정렬 조정
          const anchor = Math.abs(x - center) < 8 ? 'middle' : x > center ? 'start' : 'end';
          return (
            <text
              key={skill.name}
              className={`radar-label${highlightedSkills.includes(skill.name) ? ' is-highlighted' : ''}`}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
            >
              {skill.name}
              <tspan className="radar-label-level"> {skill.level}</tspan>
            </text>
          );
        })}
      </svg>

      <figcaption className="radar-legend">
        {LEVEL_LABELS.map((label, i) => (
          <span key={label}>
            <strong>{i + 1}</strong> {label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
