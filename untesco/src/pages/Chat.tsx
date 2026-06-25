import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';

interface Message {
  role: 'ai' | 'user';
  text?: string;
  time: string;
  isAnalogy?: boolean;
  analogyText?: string;
}

const ts = () => { const d = new Date(); return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`; };

const INITIAL: Message[] = [
  { role:'ai',   text:'Привет! Сегодня разберём квадратные уравнения. Для начала скажи: что, по-твоему, означает слово «квадратный» в названии этого уравнения?', time:'14:05' },
  { role:'user', text:'Наверное, потому что там квадрат числа, x²?', time:'14:06' },
  { role:'ai',   text:'Хорошее наблюдение! А теперь подумай: если в уравнении есть x², что можно сказать о количестве решений?', time:'14:06' },
  { role:'user', text:'Потому что квадратный корень из числа даёт плюс и минус?', time:'14:07' },
  { role:'ai',   text:'Отлично! Проверим: x² − 5x + 6 = 0 — можешь догадаться, какие два числа дают в сумме 5 и в произведении 6?', time:'14:08' },
  { role:'user', text:'Хм... может 2 и 3? 2+3=5 и 2×3=6', time:'14:09' },
  { role:'ai',   text:'Именно! Ты только что решил уравнение методом разложения. Что происходит с уравнением, когда мы записываем его как (x−2)(x−3)=0?', time:'14:09' },
];

const ANALOGY = 'Представь квадратное уравнение как траекторию брошенного мяча. Корни уравнения — точки, где мяч касается земли. Если бросить слишком высоко — касаний нет (нет корней). Едва касается — один корень. Пролетает насквозь — два корня.';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput]       = useState('');
  const [analogyUsed, setUsed]  = useState(false);
  const endRef   = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  function send() {
    const text = input.trim(); if (!text) return;
    setMessages(prev => [...prev, { role:'user', text, time:ts() }]);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
  }

  function addAnalogy() {
    if (analogyUsed) return;
    setUsed(true);
    setMessages(prev => [...prev, { role:'ai', isAnalogy:true, analogyText:ANALOGY, time:ts() }]);
  }

  return (
    <div className="chat-wrap">
      <div className="chat-topbar">
        <Link href="/"><button className="chat-back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button></Link>
        <div style={{ flex:1 }}>
          <div className="chat-ttl">Тьютор UNTesco</div>
          <div className="chat-sub">Квадратные уравнения · ЕНТ</div>
        </div>
        <div className="chat-status"><div className="chat-dot"/><span className="chat-dot-lbl">Онлайн</span></div>
      </div>

      <div className="chat-msgs">
        {messages.map((msg, i) => (
          <div key={i} className={`msg-wrap ${msg.role}`}>
            {msg.role === 'ai'
              ? <div className="msg-ava msg-ava-ai"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 1 3 3v1a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></div>
              : <div className="msg-ava msg-ava-user">АС</div>
            }
            <div className="msg-col">
              {msg.isAnalogy
                ? <div className="analogy-block"><div className="analogy-lbl">💡 Аналогия</div><div className="analogy-txt">{msg.analogyText}</div></div>
                : <div className="msg-bubble">{msg.text}</div>
              }
              <div className="msg-time">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef}/>
      </div>

      <button className="chat-analogy-btn" onClick={addAnalogy} disabled={analogyUsed}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {analogyUsed ? 'Аналогия отправлена' : 'Попросить аналогию'}
      </button>

      <div className="chat-inputbar">
        <div className="chat-field">
          <textarea ref={inputRef} rows={1} value={input}
            onChange={e => { setInput(e.target.value); e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,100)+'px'; }}
            onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Напишите ответ…"
          />
        </div>
        <button className="chat-send" onClick={send}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
}
