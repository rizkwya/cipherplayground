import { useState, useEffect } from 'react'
import { Button } from './UIComponents'

function ExampleDropdown({ onSelectExample }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.example-dropdown-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const examples = [
    { name: 'Atbash', method: 'atbash', text: 'satu BotoL Jameson', shift: null, rails: 3, columnarKey: 'DAMN', randomBlockSize: null, randomPattern: null },
    { name: 'ROT13', method: 'rot13', text: 'never stop flying!', shift: 13, rails: 3, columnarKey: 'DAMN', randomBlockSize: null, randomPattern: null },
    { name: 'Caesar', method: 'caesar', text: 'jangan lupa jam dua pagi nanti', shift: 5, rails: 3, columnarKey: 'DAMN', randomBlockSize: null, randomPattern: null },
    { name: 'Columnar', method: 'columnar', text: 'informatika universitas mulia', shift: null, rails: 3, columnarKey: 'DAMN', randomBlockSize: null, randomPattern: null },
    { name: 'Rail Fence', method: 'railfence', text: 'HELLO WORLD', shift: null, rails: 3, columnarKey: 'DAMN', randomBlockSize: null, randomPattern: null },
    { name: 'Random Transposition', method: 'random', text: 'kerumah dong mumpung sepi nichh', shift: null, rails: 3, columnarKey: 'DAMN', randomBlockSize: '3', randomPattern: '3,1,2' },
  ];

  const handleSelect = (example) => {
    onSelectExample(example);
    setIsOpen(false);
  };

  return (
    <div className="relative example-dropdown-container">
      <Button variant="secondary" onClick={() => setIsOpen(!isOpen)} className="hidden sm:flex items-center">
        Contoh
        <svg className="inline-block w-4 h-4 ml-1 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </Button>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden px-3 py-2 rounded-xl text-violet-700 bg-white/80 border border-white/60 ring-1 ring-white/50 hover:bg-white shadow-[0_6px_16px_rgba(0,0,0,0.06)] transition-all active:translate-y-px"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white/90 border border-white/60 ring-1 ring-white/50 z-20">
          <div className="py-1">
            {examples.map((ex) => (
              <a
                key={ex.name}
                href="#"
                onClick={(e) => { e.preventDefault(); handleSelect(ex); }}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-violet-100/50 transition-colors"
              >
                Contoh {ex.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExampleDropdown
