function MonoBox({ children, className = '' }) {
  return (
    <div className={`font-mono text-xs sm:text-sm overflow-x-auto whitespace-nowrap rounded-lg sm:rounded-xl p-2 sm:p-3
                    bg-white/60 backdrop-blur border border-white/60
                    shadow-inner shadow-black/5 ring-1 ring-white/50 ${className}`}>
      {children}
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-5
                    bg-linear-to-br from-white/80 to-white/60
                    border border-white/60 ring-1 ring-white/50
                    shadow-[8px_8px_20px_rgba(0,0,0,0.08),-8px_-8px_20px_rgba(255,255,255,0.5)]
                    hover:shadow-[12px_12px_28px_rgba(0,0,0,0.10),-10px_-10px_24px_rgba(255,255,255,0.55)]
                    transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  )
}

function Button({ children, className = '', onClick, variant = 'primary', disabled = false }) {
  const base = 'px-3 py-2 rounded-xl text-sm font-semibold transition-all'
  const variants = {
    primary:
      'text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 ' +
      'shadow-[0_8px_20px_rgba(139,92,246,0.35)] hover:shadow-[0_12px_28px_rgba(139,92,246,0.45)]',
    secondary:
      'text-violet-700 bg-white/80 border border-white/60 ring-1 ring-white/50 ' +
      'hover:bg-white shadow-[0_6px_16px_rgba(0,0,0,0.06)]',
    ghost:
      'text-violet-700 bg-transparent border border-white/50 hover:bg-white/50'
  }
  
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer active:translate-y-[1px]';
  
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };
  
  return (
    <button 
      onClick={handleClick} 
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  )
}

export { MonoBox, Card, Button }
