import { useState } from 'react';

export default function Settings() {
  const [subject, setSubject] = useState<'ent'|'sat'>('ent');
  const [goal,    setGoal]    = useState(30);
  const [notif,   setNotif]   = useState(true);
  const [support, setSupport] = useState(50);

  return (
    <div className="page">
      <div className="sett-hero">
        <div className="sett-ava">АС</div>
        <div>
          <div className="sett-name">Алия Сейткали</div>
          <div className="sett-role">Ученик · 12 класс</div>
        </div>
      </div>

      <div className="sett-section">
        <div className="sec-label">Предмет подготовки</div>
        <div className="subj-toggle">
          <button className={`subj-btn${subject==='ent'?' on':''}`} onClick={() => setSubject('ent')}>
            <div className="subj-code">ЕНТ</div><div className="subj-name">Казахстан</div>
          </button>
          <button className={`subj-btn${subject==='sat'?' on':''}`} onClick={() => setSubject('sat')}>
            <div className="subj-code">SAT</div><div className="subj-name">Международный</div>
          </button>
        </div>
      </div>

      <div className="sett-section">
        <div className="sec-label">Уровень поддержки тьютора</div>
        <div className="slider-wrap">
          <div className="slider-lbls"><span>Много подсказок</span><span>Сократовский</span></div>
          <input type="range" min={0} max={100} value={support}
            onChange={e => setSupport(Number(e.target.value))}
            style={{ '--rv': `${support}%` } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="sett-section">
        <div className="sec-label">Обучение</div>
        <div className="sett-list">
          <div className="sett-row">
            <div className="sett-row-l">
              <div className="sett-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div><div className="sett-lbl">Цель на день</div><div className="sett-sub">Время занятий</div></div>
            </div>
            <div className="stepper">
              <button className="step-btn" onClick={() => setGoal(g => Math.max(5, g-5))}>−</button>
              <span className="step-val">{goal} мин</span>
              <button className="step-btn" onClick={() => setGoal(g => Math.min(120, g+5))}>+</button>
            </div>
          </div>
          <div className="sett-row">
            <div className="sett-row-l">
              <div className="sett-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
              <div><div className="sett-lbl">Напоминания</div><div className="sett-sub">Ежедневно в 19:00</div></div>
            </div>
            <label className="tgl">
              <input type="checkbox" checked={notif} onChange={e => setNotif(e.target.checked)}/>
              <div className="tgl-track"/><div className="tgl-thumb"/>
            </label>
          </div>
        </div>
      </div>

      <div className="app-ver">UNTesco v0.1 MVP · © 2026</div>
      <div style={{ height:'16px' }}/>
    </div>
  );
}
