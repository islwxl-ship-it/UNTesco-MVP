import { Link } from 'wouter';

const DAYS = [
  { label: 'Пн', state: 'done'  },
  { label: 'Вт', state: 'done'  },
  { label: 'Ср', state: 'done'  },
  { label: 'Чт', state: 'done'  },
  { label: 'Пт', state: 'done'  },
  { label: 'Сб', state: 'today' },
  { label: 'Вс', state: 'empty' },
];

const TOPICS = [
  { name: 'Квадратные уравнения', pct: 78 },
  { name: 'Тригонометрия',         pct: 45 },
];

function getToday() {
  const d = new Date();
  const days   = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
}

export default function Dashboard() {
  return (
    <div className="page">
      {/* Header */}
      <div className="dash-header">
        <div>
          <div className="dash-greeting">Привет, Алия!</div>
          <div className="dash-date">{getToday()}</div>
        </div>
        <div className="dash-logo">
          <img src="/logo.jpeg" alt="UNTesco" />
        </div>
      </div>

      {/* Streak */}
      <div className="streak-card card">
        <div className="streak-top">
          <div>
            <div className="streak-count">🔥 12 дней подряд</div>
            <div className="streak-sub">Отличный темп, продолжай!</div>
          </div>
          <div className="streak-badge">Рекорд</div>
        </div>
        <div className="streak-days">
          {DAYS.map((d) => (
            <div key={d.label} className="streak-day">
              <div className={`streak-circle ${d.state}`}>
                {d.state !== 'empty' ? '✓' : '–'}
              </div>
              <div className="streak-lbl">{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Session */}
      <div className="session-area">
        <div className="session-meta">
          <span className="session-lbl">Текущий курс</span>
          <div className="chip-blue">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4"/></svg>
            ЕНТ · Математика
          </div>
        </div>
        <Link href="/chat">
          <button className="btn-primary">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Начать сессию
          </button>
        </Link>
      </div>

      {/* Recent topics */}
      <div className="topics-section">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
          <div className="sec-title" style={{ margin:0 }}>Недавние темы</div>
          <Link href="/heatmap" style={{ fontSize:'13px', fontWeight:600, color:'var(--brand-500)', display:'flex', alignItems:'center', gap:'2px' }}>
            Все
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>

        {TOPICS.map((t) => {
          const isGreen = t.pct >= 75;
          return (
            <Link key={t.name} href="/chat">
              <div className="topic-card">
                <div className="topic-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="3" y1="12" x2="11" y2="12"/><line x1="7" y1="8" x2="7" y2="16"/>
                  </svg>
                </div>
                <div className="topic-name" style={{ flex:1, minWidth:0 }}>
                  {t.name}
                  <div className="topic-meta">
                    <span className="topic-pct">{t.pct}%</span>
                    <div className="topic-bar">
                      <div className="pbar-wrap">
                        <div className={`pbar-fill ${isGreen ? 'pbar-green' : 'pbar-amber'}`} style={{ width:`${t.pct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="topic-chev">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}

        <Link href="/heatmap">
          <div className="topic-card">
            <div className="topic-icon" style={{ background:'var(--gray-100)', color:'var(--gray-400)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div style={{ flex:1 }}>
              <div className="topic-name">Смотреть все темы</div>
              <div className="topic-meta">
                <span className="topic-pct" style={{ color:'var(--brand-500)' }}>10 тем →</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quote */}
      <div className="quote-card">
        <div className="quote-text">«Образование — это не заполнение ведра, а разжигание огня.»</div>
        <div className="quote-author">— Уильям Батлер Йейтс</div>
      </div>

      <div style={{ height:'16px' }} />
    </div>
  );
}
