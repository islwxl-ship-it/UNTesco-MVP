export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={`w-8 h-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B8AF8" />
          <stop offset="100%" stopColor="#1D3DBF" />
        </linearGradient>
      </defs>
      
      {/* Shield Body */}
      <path d="M10 30 C 10 30, 50 10, 90 30 C 90 70, 70 100, 50 115 C 30 100, 10 70, 10 30 Z" fill="url(#shieldGrad)" />
      
      {/* Top Left Circle */}
      <circle cx="25" cy="15" r="12" fill="url(#shieldGrad)" stroke="white" strokeWidth="3" />
      
      {/* Top Right Circle */}
      <circle cx="75" cy="15" r="12" fill="url(#shieldGrad)" stroke="white" strokeWidth="3" />
      
      {/* Inside M Shape */}
      <path d="M30 75 L 30 50 L 50 65 L 70 50 L 70 75" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Bottom Diamond */}
      <path d="M50 95 L 56 103 L 50 111 L 44 103 Z" fill="white" />
    </svg>
  );
}
