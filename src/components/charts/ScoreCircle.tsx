'use client';

interface ScoreCircleProps {
  score: number;
  size?: number;
  label?: string;
}

export default function ScoreCircle({ score, size = 140, label = 'ATS Score' }: ScoreCircleProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#F97316';
    return '#EF4444';
  };

  const getGrade = () => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100" className="score-circle">
        <circle cx="50" cy="50" r={radius} className="score-circle-bg" />
        <circle
          cx="50" cy="50" r={radius}
          className="score-circle-fill"
          style={{
            stroke: getColor(),
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
        <text
          x="50" y="45" textAnchor="middle" dominantBaseline="central"
          style={{ fill: getColor(), fontSize: '22px', fontWeight: 'bold', transform: 'rotate(90deg)', transformOrigin: '50% 50%' }}
        >
          {score}
        </text>
        <text
          x="50" y="62" textAnchor="middle"
          style={{ fill: 'var(--text-secondary)', fontSize: '8px', transform: 'rotate(90deg)', transformOrigin: '50% 50%' }}
        >
          {getGrade()}
        </text>
      </svg>
      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
}
