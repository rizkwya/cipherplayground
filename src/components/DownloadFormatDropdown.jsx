import React, { useState, useEffect } from 'react';
// Pastikan path ini benar, menunjuk ke file UIComponents.js
import { Button } from './UIComponents'; 

const formatOptions = [
  { label: 'Download TXT', value: 'txt' },
  { label: 'Download Excel', value: 'xlsx' },
  { label: 'Download JSON', value: 'json' },
  { label: 'Download PDF', value: 'pdf' },
  { label: 'Download DOCX', value: 'docx' },
];

/**
 * Dropdown kustom untuk memilih format download, dengan gaya seperti ExampleDropdown.
 * Prop 'onSelectFormat' akan dipanggil dengan nilai format (misal: 'txt') saat diklik.
 */
export default function DownloadFormatDropdown({ onSelectFormat }) {
  const [isOpen, setIsOpen] = useState(false);

  // Efek untuk menutup dropdown saat mengklik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.download-dropdown-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (formatValue) => {
    onSelectFormat(formatValue);
    setIsOpen(false);
  };

  return (
    <div className="relative download-dropdown-container">
      {/* Tombol ini meniru gaya ExampleDropdown */}
      <Button variant="secondary" onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        Download
        <svg 
          className="inline-block w-4 h-4 ml-1 transition-transform duration-200" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </Button>
      
      {/* Menu dropdown yang muncul */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white/90 border border-white/60 ring-1 ring-white/50 z-20">
          <div className="py-1">
            {formatOptions.map((opt) => (
              <a
                key={opt.value}
                href="#"
                onClick={(e) => { e.preventDefault(); handleSelect(opt.value); }}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-violet-100/50 transition-colors"
              >
                {opt.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}