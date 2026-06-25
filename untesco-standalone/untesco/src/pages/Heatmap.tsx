import { useEffect, useRef } from 'react';
import { Link } from 'wouter';

const TOPICS = [
  { name: 'Алгебра',              pct: 82 },
  { name: 'Геометрия',            pct: 71 },
  { name: 'Тригонометрия',        pct: 45 },
  { name: 'Квадратные уравнения', pct: 78 },
  { name: 'Логарифмы',            pct: 23 },
  { name: 'Функции',              pct: 58 },
  { name: 'Статистика',           pct: 67 },
  { name: 'Производная',          pct: 34 },
  { name: 'Интегралы',            pct: 41 },
  { name: 'Векторы',              pct: 89 },
];

const OVERALL = 67;
const R       = 37;
const CIRCUM  = 2 * Math.PI * R;

function barCls(pct: number) {
  if (pct >= 75) return { bar: 'pbar-green', clr: 'clr-green' };
  if (pct >= 40) return { bar: 'pbar-amber', clr: 'clr-amber' };
  return { bar: 'pbar-red', clr: 'clr-red' };
}

export default function Heatmap() {
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;
    el.style.strokeDashoffset = String(CIRCUM);
    const id = setTimeout(() => {
      el.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)';
      el.style.strokeDashoffset = String(CIRCUM * (1 - OVERALL / 100));
    }, 120);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="page">
      <div className="heat-header">
        <div className="heat-title">Карта знаний</div>
        <div className="heat-sub">ЕНТ · Математика · 10 тем</div>
      </div>

      {/* Ring card */}
      <div className="ring-card card">
        <div className="ring-wrap">
          <svg className="ring-svg" width="90" height="90" viewBox="0 0 90 90">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#6690F9" />
                <stop offset="100%" stopColor="#1D3DBF" />
              </linearGradient>
            </defs>
            <circle className="ring-track" cx="45" cy="45" r={R} />
            <circle
              ref={ringRef}
              className="ring-fill"
              cx="45" cy="45" r={R}
              strokeDasharray={CIRCUM}
              strokeDashoffset={CIRCUM}
            />
          </svg>
          <div className="ring-center">
            <div className="ring-pct">{OVERALL}%</div>
            <div className="ring-lbl">Прогресс</div>
          </div>
        </div>
        <div className="ring-info">
          <div className="ring-info-title">Общий прогресс</div>
          <div className="ring-info-sub">Осталось проработать {100 - OVERALL}% материала</div>
          <div className="ring-stats">
            <div><div className="ring-stat-val clr-green">4</div><div className="ring-stat-key">Сильных</div></div>
            <div><div className="ring-stat-val clr-amber">4</div><div className="ring-stat-key">Средних</div></div>
            <div><div className="ring-stat-val clr-red">2</div><div className="ring-stat-key">Слабых</div></div>
          </div>
        </div>
      </div>

      {/* Achilles */}
      <div className="achilles-card">
        <div className="achilles-ico">⚡</div>
        <div>
          <div className="achilles-ttl">Ахиллесова пята</div>
          <div className="achilles-name">Логарифмы</div>
          <div className="achilles-desc">23% усвоения · Требует внимания</div>
        </div>
        <Link href="/chat">
          <button className="achilles-btn">Учить</button>
        </Link>
      </div>

      {/* Topics */}
      <div className="topics-list">
        {TOPICS.map((t, i) => {
          const { bar, clr } = barCls(t.pct);
          return (
            <div key={t.name} className="heat-row">
              <div className="heat-row-top">
                <span className="heat-row-name">{t.name}</span>
                <span className={`heat-row-pct ${clr}`}>{t.pct}%</span>
              </div>
              <div className="pbar-wrap">
                <div
                  className={`pbar-fill ${bar}`}
                  style={{ width: 0, transition: `width 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms` }}
                  ref={(el) => { if (el) requestAnimationFrame(() => { el.style.width = `${t.pct}%`; }); }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height:'16px' }} />
    </div>
  );
}
