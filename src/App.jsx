import { useMemo, useState } from 'react'
import MethodDropdown from './components/MethodDropdown'
import CaesarShiftSlider from './components/CaesarShiftSlider'
import RailsSlider from './components/RailsSlider'
import ColumnarKeyInput from './components/ColumnarKeyInput'
import RandomSeedInput from './components/RandomSeedInput'
import ModeSwitcher from './components/ModeSwitcher'
import { MonoBox, Card, Button } from './components/UIComponents'
import TextAreaCard from './components/TextAreaCard'
import LyricFooter from './components/LyricFooter'
import ExampleDropdown from './components/ExampleDropdown'
import Toast from './components/Toast'
import { ALPHA_LOWER, transform, ciphertextAlphabet } from './utils/cipherFunctions'
import { detectBestPatterns } from './utils/patternDetector'

export default function App() {
  const [mode, setMode] = useState('encode');
  const [text, setText] = useState('');
  const [method, setMethod] = useState('atbash');
  const [caesarShift, setCaesarShift] = useState(3);
  const [rails, setRails] = useState(3);
  const [columnarKey, setColumnarKey] = useState('MULIA');
  const [columnarKeyType, setColumnarKeyType] = useState('text');
  const [randomBlockSize, setRandomBlockSize] = useState('4');
  const [randomPattern, setRandomPattern] = useState('4,1,3,2');
  const [caseStrategy, setCaseStrategy] = useState('maintain');
  const [foreignMode, setForeignMode] = useState('include');
  const [toastInfo, setToastInfo] = useState({ show: false, message: '' });
  const [gridText, setGridText] = useState('');
  const [paddingEnabled, setPaddingEnabled] = useState(false);
  const [randomPaddingEnabled, setRandomPaddingEnabled] = useState(false);
  const [showPatternFinder, setShowPatternFinder] = useState(false);
  const [patternSearch, setPatternSearch] = useState('');
  const [autoDetectResults, setAutoDetectResults] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [modalToast, setModalToast] = useState({ show: false, message: '', type: 'success' });

  const result = useMemo(
    () => {
        const shiftAmount = mode === 'decode' && method === 'caesar' ? 26 - caesarShift : caesarShift;
        const activePadding = mode === 'encode' ? paddingEnabled : false;
        const activeRandomPadding = mode === 'encode' ? randomPaddingEnabled : false;
        return transform(text, method, caseStrategy, foreignMode, shiftAmount, rails, columnarKey, mode, activePadding, columnarKeyType, randomBlockSize, randomPattern, activeRandomPadding);
    },
    [text, method, caseStrategy, foreignMode, caesarShift, rails, columnarKey, mode, paddingEnabled, columnarKeyType, randomBlockSize, randomPattern, randomPaddingEnabled]
  );
  
  const handleModeChange = (newMode) => {
    if (mode === newMode) return;
    
    const currentResult = result;
    
    if (newMode === 'encode') {
      setGridText(currentResult);
    } else {
      setGridText(text);
    }
    
    setText(currentResult);
    setMode(newMode);
  };
  
  const handleTextChange = (e) => {
    setText(e.target.value);
    if (mode === 'encode') {
      setGridText(e.target.value);
    }
  };

  const handleSelectExample = ({ method, text, shift, rails, columnarKey, randomBlockSize, randomPattern }) => {
    setMethod(method);
    setText(text);
    if (mode === 'encode') {
      setGridText(text);
    }
    if (shift !== null) {
      setCaesarShift(shift);
    }
    if (rails) {
      setRails(rails);
    }
    if (columnarKey) {
      setColumnarKey(columnarKey);
    }
    if (randomBlockSize) {
      setRandomBlockSize(randomBlockSize);
    }
    if (randomPattern) {
      setRandomPattern(randomPattern);
    }
  };

  const ctAlpha = ciphertextAlphabet(method, caesarShift);
  
  const handleClear = () => {
    setText('');
  };
  
  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
        setToastInfo({ show: true, message: 'Output disalin!' });
    }).catch(() => {
        setToastInfo({ show: true, message: 'Gagal menyalin.' });
    });
  };

  // Generate all permutations for pattern finder
  const generatePermutations = (n) => {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    const result = [];
    
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
        }
      }
    };
    
    permute(arr);
    return result;
  };

  const handleFindPatterns = () => {
    setShowPatternFinder(true);
    setAutoDetectResults(null); // Reset auto-detect results
  };

  const handleAutoDetect = () => {
    if (!text || !randomBlockSize) return;
    
    setIsDetecting(true);
    setModalToast({ show: false, message: '', type: 'success' }); // Reset toast
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const results = detectBestPatterns(text, randomBlockSize, 10);
      setAutoDetectResults(results);
      setIsDetecting(false);
      
      if (results.length > 0 && results[0].score > 0) {
        setModalToast({ 
          show: true, 
          message: `🎯 Found ${results.length} potential patterns!`, 
          type: 'success' 
        });
      } else {
        setModalToast({ 
          show: true, 
          message: '⚠️ No confident patterns detected', 
          type: 'warning' 
        });
      }
      
      // Auto-hide toast after 2 seconds (same as Toast.jsx)
      setTimeout(() => {
        setModalToast({ show: false, message: '', type: 'success' });
      }, 2000);
    }, 100);
  };

  const handleUsePattern = (pattern) => {
    setRandomPattern(pattern);
    setShowPatternFinder(false);
    setToastInfo({ show: true, message: 'Pattern diterapkan!' });
  };

  const handleQuickAutoDetect = async () => {
    if (!text || !randomBlockSize) return;
    
    setIsDetecting(true);
    setShowPatternFinder(true); // Open modal
    setAutoDetectResults([]); // Set empty array to prevent permutation generation!
    
    // Give UI time to render modal
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Process in chunks to prevent freeze
    const processAsync = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const results = detectBestPatterns(text, randomBlockSize, 10);
          resolve(results);
        }, 50);
      });
    };
    
    try {
      const results = await processAsync();
      setAutoDetectResults(results);
      setIsDetecting(false);
      
      if (results.length > 0 && results[0].score > 0) {
        setModalToast({ 
          show: true, 
          message: `🎯 Found ${results.length} potential patterns!`, 
          type: 'success' 
        });
      } else {
        setModalToast({ 
          show: true, 
          message: '⚠️ No confident patterns detected', 
          type: 'warning' 
        });
      }
      
      // Auto-hide toast after 2 seconds
      setTimeout(() => {
        setModalToast({ show: false, message: '', type: 'success' });
      }, 2000);
    } catch {
      setIsDetecting(false);
      setModalToast({ 
        show: true, 
        message: '❌ Error detecting patterns', 
        type: 'warning' 
      });
    }
  };

  return (
    <div
      className="min-h-screen text-slate-800 flex flex-col
                 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.20),transparent_35%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.20),transparent_35%)] 
                 from-violet-200 via-pink-100 to-rose-100
                 bg-linear-to-br"
    >
      <Toast message={toastInfo.message} show={toastInfo.show} onDismiss={() => setToastInfo({ show: false, message: '' })} />
      
      {/* CSS untuk animasi dan slider */}
      <style>{`
        .char-hidden {
          opacity: 0;
          visibility: hidden;
        }
        .char-visible {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.3s ease-in-out;
        }
        /* Custom styles for the range slider */
        .slider-custom {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          background-color: transparent;
        }
        .slider-custom::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -7px;
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          border-radius: 50%;
          border: 3px solid white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
          transition: transform 0.1s ease-in-out;
        }
        .slider-custom::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .slider-custom::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          border-radius: 50%;
          border: 3px solid white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
        }
        /* Style horizontal scrollbar for grid */
        .grid-scroll::-webkit-scrollbar {
          height: 8px;
          -webkit-appearance: none;
        }
        .grid-scroll::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.08);
          border-radius: 4px;
        }
        .grid-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4));
          border-radius: 4px;
          min-width: 40px;
        }
        .grid-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6));
        }
        .grid-scroll::-webkit-scrollbar-thumb:active {
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8));
        }
        .grid-scroll {
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.4) rgba(139, 92, 246, 0.08);
          /* Prevent page scroll on mobile */
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }
        /* Hide default horizontal scrollbar on other elements */
        .overflow-x-auto::-webkit-scrollbar {
          height: 0px;
          display: none;
        }
        .overflow-x-auto {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        /* Style vertical scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <header className="sticky top-0 z-10 backdrop-blur bg-white/40 border-b border-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 
              className="m-0 text-lg sm:text-xl font-extrabold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent cursor-pointer transition-opacity truncate"
              onClick={() => window.location.reload()}
            >
              Cipher Playground
            </h1>
            <p className="text-sm text-slate-600"></p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ExampleDropdown onSelectExample={handleSelectExample} />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-start">
          {/* Left View (Input) */}
          <div className="w-full lg:w-[340px] shrink-0">
            <TextAreaCard
                label={mode === 'encode' ? 'Plaintext' : 'Ciphertext'}
                value={text}
                onChange={handleTextChange}
                readOnly={false}
                placeholder={mode === 'encode' ? "Tulis teks di sini..." : "Tulis ciphertext di sini..."}
            />
          </div>

          {/* Center Controls */}
          <div className="w-full lg:flex-1 lg:min-w-[320px]">
            <Card>
              <ModeSwitcher mode={mode} setMode={handleModeChange} />

              {/* Alphabet panel */}
              <div className="mb-4">
                {method === 'railfence' ? (
                  <div className="space-y-2">
                    <div className="text-xs text-slate-600 bg-blue-50/50 p-2 rounded-lg border border-blue-200/50">
                      💡 <strong>Cara kerja Rail Fence ({rails} Rel):</strong> Teks ditulis secara zigzag (naik-turun) pada {rails} baris, 
                      lalu dibaca per baris dari atas ke bawah untuk menghasilkan ciphertext.
                    </div>
                  </div>
                ) : method === 'random' ? (
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm mb-1 block">
                      Random Transposition Grid
                    </label>
                    <div className="text-xs text-slate-600 mb-2 bg-blue-50/50 p-2 rounded-lg border border-blue-200/50">
                      💡 <strong>Cara kerja:</strong> Teks dibagi per blok {randomBlockSize} karakter, 
                      lalu setiap blok di-transpose.
                    </div>
                    <MonoBox className="min-h-[200px]">
                      <div className="text-xs leading-relaxed font-mono">
                        {(() => {
                          const size = parseInt(randomBlockSize, 10);
                          if (isNaN(size) || size < 2 || !randomPattern) {
                            return 
                          }
                          
                          const pattern = randomPattern.split(',').map(n => parseInt(n.trim(), 10));
                          if (pattern.length !== size || pattern.some(isNaN)) {
                            return 
                          }
                          
                          const patternArray = pattern.map(n => n - 1); // 0-based
                          
                          // Tentukan text untuk grid
                          let demoText;
                          if (text) {
                            // Ada input: pakai text langsung
                            demoText = text.replace(/\s/g, '');
                          } else {
                            // Tidak ada input: pakai demo
                            const demoPlaintext = 'informatika';
                            if (mode === 'encode') {
                              // Mode encode: tampilkan plaintext
                              demoText = demoPlaintext;
                            } else {
                              // Mode decode: encode dulu plaintext jadi ciphertext untuk demo
                              let encoded = '';
                              for (let i = 0; i < demoPlaintext.length; i += size) {
                                const block = demoPlaintext.slice(i, i + size);
                                if (block.length === size) {
                                  for (let j = 0; j < patternArray.length; j++) {
                                    encoded += block[patternArray[j]];
                                  }
                                } else {
                                  encoded += block;
                                }
                              }
                              demoText = encoded;
                            }
                          }
                          
                          if (demoText.length === 0) {
                            return 
                          }
                          
                          const blocks = [];
                          for (let i = 0; i < demoText.length; i += size) {
                            blocks.push(demoText.slice(i, i + size));
                          }                          return (
                            <div className="max-h-[220px] overflow-y-auto overscroll-contain">
                              <div className="grid-scroll overflow-x-auto overscroll-contain">
                                <div className="space-y-4">
                              {blocks.map((block, blockIdx) => {
                                let transposed = '';
                                
                                if (mode === 'encode') {
                                  // Encode: apply pattern directly
                                  if (block.length === size) {
                                    for (let j = 0; j < patternArray.length; j++) {
                                      const sourceIndex = patternArray[j];
                                      transposed += block[sourceIndex];
                                    }
                                  } else {
                                    // Incomplete block: no transposition
                                    transposed = block;
                                  }
                                } else {
                                  // Decode: reverse the pattern
                                  if (block.length === size) {
                                    const decodedBlock = new Array(block.length);
                                    for (let j = 0; j < patternArray.length; j++) {
                                      const originalPosition = patternArray[j];
                                      decodedBlock[originalPosition] = block[j];
                                    }
                                    transposed = decodedBlock.join('');
                                  } else {
                                    // Incomplete block: no transposition
                                    transposed = block;
                                  }
                                }
                                
                                return (
                                  <div key={blockIdx} className="border-l-2 border-violet-400 pl-3 mb-4">
                                    <div className="text-xs font-semibold text-violet-600 mb-1">Blok {blockIdx + 1}:</div>
                                    <div className="grid-scroll max-w-[280px]">
                                      {/* Original */}
                                      <div className="flex gap-2 items-center mb-1 whitespace-nowrap">
                                        <span className="text-slate-500 w-16 shrink-0">{mode === 'encode' ? 'Original:' : 'Cipher:'}</span>
                                        <div className="flex gap-1">
                                          {Array.from(block).map((char, idx) => (
                                            <div key={idx} className="flex flex-col items-center shrink-0">
                                              <span className="text-[9px] text-slate-400">{idx + 1}</span>
                                              <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-slate-800 font-semibold">
                                                {char}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      {/* Pattern */}
                                      <div className="flex gap-2 items-center mb-1 whitespace-nowrap">
                                        <span className="text-slate-500 w-16 shrink-0">Pola:</span>
                                        <div className="flex gap-1">
                                          {pattern.slice(0, block.length).map((pos, idx) => (
                                            <div key={idx} className="w-6 h-6 flex items-center justify-center bg-violet-100 rounded text-violet-700 text-xs font-bold shrink-0">
                                              {pos}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      {/* Result */}
                                      <div className="flex gap-2 items-center whitespace-nowrap">
                                        <span className="text-slate-500 w-16 shrink-0">Hasil:</span>
                                        <div className="flex gap-1">
                                          {Array.from(transposed).map((char, idx) => (
                                            <span key={idx} className="w-6 h-6 flex items-center justify-center bg-fuchsia-100 rounded text-fuchsia-800 font-semibold shrink-0">
                                              {char}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </MonoBox>
                  </div>
                ) : method === 'columnar' ? (
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm mb-1 block">
                      Columnar Grid
                    </label>
                    <div className="text-xs text-slate-600 mb-2 bg-blue-50/50 p-2 rounded-lg border border-blue-200/50">
                      💡 <strong>Cara kerja:</strong> Teks (tanpa spasi) ditulis per baris, 
                      lalu dibaca per kolom sesuai urutan alfabetis huruf di kunci.
                    </div>
                    <MonoBox>
                      <div className="text-xs leading-relaxed font-mono">
                        {(() => {
                          const key = (columnarKey || 'MULIA').toUpperCase();
                          // Gunakan gridText (plaintext asli) untuk grid, bukan text yang berubah per mode
                          const displayText = mode === 'encode' ? text : (gridText || text);
                          const demoText = (displayText || 'informatikauniversitasmulia').replace(/\s/g, '');
                          
                          let numCols;
                          // Cek keyType untuk menentukan apakah ini Number Key atau Text Key
                          const isNumberKeyMode = columnarKeyType === 'number' && /^\d+$/.test(key);
                          
                          if (isNumberKeyMode) {
                            // Simple number key
                            numCols = parseInt(key, 10);
                          } else if (/^\d+(,\d+)+$/.test(key)) {
                            // Comma-separated number key
                            numCols = key.split(',').length;
                          } else {
                            // Text key
                            numCols = key.length;
                          }
                          
                          const numRows = Math.ceil(demoText.length / numCols);
                          
                          // Untuk Simple Number Key, tampilkan format berbeda
                          if (isNumberKeyMode) {
                            return (
                              <>
                                {/* Header untuk Number Key */}
                                <div className="mb-3 text-center">
                                  <div className="text-violet-600 font-semibold text-sm mb-2">
                                    Key = {key}
                                  </div>
                                  <div className="border-t border-slate-300"></div>
                                </div>
                                
                                {/* Grid */}
                                <div className="max-h-[140px] overflow-y-auto overscroll-contain">
                                  <div className="grid-scroll max-w-[280px]">
                                    <div className="space-y-0.5">
                                      {Array.from({ length: numRows }, (_, r) => (
                                        <div key={r} className="flex gap-3 whitespace-nowrap">
                                          {Array.from({ length: numCols }, (_, c) => {
                                            const idx = r * numCols + c;
                                            return (
                                              <span key={c} className={`inline-block w-5 text-center text-xs ${
                                                idx < demoText.length ? 'text-slate-800' : 'text-slate-300'
                                              }`}>
                                                {idx < demoText.length ? demoText[idx] : '·'}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Reading order hint untuk Number Key */}
                                <div className="mt-3 pt-3 border-t border-slate-300">
                                  <div className="text-xs text-slate-600">
                                    <strong>Urutan baca kolom:</strong> {mode === 'encode' ? 'Secara vertikal' : 'Secara horizontal'}
                                  </div>
                                </div>
                              </>
                            );
                          }
                          
                          // Untuk Text Key, tampilkan dengan ranking
                          const keyChars = [...key];
                          const keyWithRank = keyChars
                            .map((char, idx) => ({ char, idx }))
                            .sort((a, b) => a.char.localeCompare(b.char))
                            .map((item, rank) => ({ ...item, rank: rank + 1 }))
                            .sort((a, b) => a.idx - b.idx);
                          
                          return (
                            <>
                              {/* Key header with numbers */}
                              <div className="mb-3 overflow-x-auto max-h-[120px] overflow-y-auto overscroll-contain">
                                {(() => {
                                  const chunks = [];
                                  for (let i = 0; i < numCols; i += 10) {
                                    chunks.push(keyWithRank.slice(i, i + 10));
                                  }
                                  
                                  return chunks.map((chunk, chunkIdx) => (
                                    <div key={chunkIdx} className={`whitespace-nowrap ${chunkIdx > 0 ? 'mt-3' : ''}`}>
                                      <div className="flex gap-3 text-violet-600 font-semibold mb-1 text-[10px]">
                                        {chunk.map((item, i) => (
                                          <span key={i} className="inline-block w-5 text-center">
                                            {item.rank}
                                          </span>
                                        ))}
                                      </div>
                                      <div className="flex gap-3 text-violet-600 font-bold text-sm mb-2">
                                        {chunk.map((item, i) => (
                                          <span key={i} className="inline-block w-5 text-center">
                                            {item.char}
                                          </span>
                                        ))}
                                      </div>
                                      {chunkIdx === chunks.length - 1 && (
                                        <div className="border-t border-slate-300"></div>
                                      )}
                                    </div>
                                  ));
                                })()}
                              </div>
                              
                              {/* Grid */}
                              <div className="max-h-[140px] overflow-y-auto overscroll-contain">
                                <div className="grid-scroll max-w-[280px]">
                                  <div className="space-y-0.5">
                                    {Array.from({ length: numRows }, (_, r) => (
                                      <div key={r} className="flex gap-3 whitespace-nowrap">
                                        {Array.from({ length: numCols }, (_, c) => {
                                          const idx = r * numCols + c;
                                          return (
                                            <span key={c} className={`inline-block w-5 text-center text-xs ${
                                              idx < demoText.length ? 'text-slate-800' : 'text-slate-300'
                                            }`}>
                                              {idx < demoText.length ? demoText[idx] : '·'}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Reading order hint */}
                              <div className="mt-3 pt-3 border-t border-slate-300">
                                <div className="text-xs text-slate-600">
                                  <strong>{mode === 'encode' ? 'Urutan baca kolom:' : 'Urutan taruh kolom:'}</strong>
                                  <div className="max-h-18 overflow-y-auto mt-1 overscroll-contain">
                                    <div className="space-y-0.5">
                                      {(() => {
                                        const sortedItems = keyWithRank
                                          .map((item, idx) => ({ ...item, originalIdx: idx }))
                                          .sort((a, b) => a.rank - b.rank);
                                        
                                        const rows = [];
                                        for (let i = 0; i < sortedItems.length; i += 3) {
                                          rows.push(sortedItems.slice(i, i + 3));
                                        }
                                        
                                        return rows.map((row, rowIdx) => (
                                          <div key={rowIdx} className="leading-relaxed">
                                            {row.map((item, i) => (
                                              <span key={i}>
                                                <span className="text-violet-600 font-semibold">{item.char}</span>
                                                <span className="text-slate-400"> (kolom {item.originalIdx + 1})</span>
                                                {(rowIdx * 3 + i) < sortedItems.length - 1 ? ' → ' : ''}
                                              </span>
                                            ))}
                                          </div>
                                        ));
                                      })()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </MonoBox>
                  </div>
                ) : method === 'rot13' ? (
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm mb-1 block">Ciphertext alphabet (ROT13)</label>
                    <MonoBox>{ctAlpha.slice(13)}</MonoBox>
                    <MonoBox>{ctAlpha.slice(0, 13)}</MonoBox>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm mb-1 block">Plaintext alphabet</label>
                    <MonoBox>{ALPHA_LOWER}</MonoBox>
                    <label className="text-slate-600 text-sm mb-1 block">Ciphertext alphabet</label>
                    <MonoBox>{ctAlpha}</MonoBox>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <MethodDropdown method={method} setMethod={setMethod} />
                
                {method === 'caesar' && (
                  <CaesarShiftSlider shift={caesarShift} setShift={setCaesarShift} />
                )}
                
                {method === 'railfence' && (
                  <RailsSlider rails={rails} setRails={setRails} />
                )}
                
                {method === 'random' && (
                  <>
                    <RandomSeedInput 
                      blockSize={randomBlockSize} 
                      setBlockSize={setRandomBlockSize}
                      pattern={randomPattern}
                      setPattern={setRandomPattern}
                    />
                    
                    {/* Pattern Finder Button - Only show in decode mode */}
                    {mode === 'decode' && (
                      <div>
                        <div className="flex gap-2">
                          {/* Find All Patterns - Only for block size 2-6 */}
                          {parseInt(randomBlockSize) >= 2 && parseInt(randomBlockSize) <= 6 && (
                            <Button 
                              variant="secondary" 
                              onClick={handleFindPatterns}
                              disabled={!text || !randomBlockSize}
                            >
                              🔍 Find All Patterns
                            </Button>
                          )}
                          
                          {/* Auto-detect Best Pattern - Only show for block size 7-26 */}
                          {parseInt(randomBlockSize) >= 7 && parseInt(randomBlockSize) <= 26 && (
                            <Button 
                              variant="primary" 
                              onClick={handleQuickAutoDetect}
                              disabled={!text || !randomBlockSize || isDetecting}
                            >
                              {isDetecting ? '🔄 Detecting...' : '⚡ Auto-detect Best'}
                            </Button>
                          )}
                        </div>
                        {(!text || !randomBlockSize) && (
                          <div className="text-amber-600 text-xs mt-2">
                            💡 Masukkan ciphertext dan block size untuk mencari pattern
                          </div>
                        )}
                        {text && randomBlockSize && parseInt(randomBlockSize) >= 2 && parseInt(randomBlockSize) <= 6 && (
                          <div className="text-slate-600 text-xs mt-2">
                            🔍 Block size {randomBlockSize}: Bisa cari semua {(() => {
                              const n = parseInt(randomBlockSize);
                              let factorial = 1;
                              for (let i = 2; i <= n; i++) factorial *= i;
                              return factorial.toLocaleString();
                            })()} patterns secara manual
                          </div>
                        )}
                        {text && randomBlockSize && parseInt(randomBlockSize) >= 7 && parseInt(randomBlockSize) <= 26 && (
                          <div className="text-amber-600 text-xs mt-2">
                            ⚡ Block size {randomBlockSize} terlalu besar untuk cari manual. Gunakan Auto-detect untuk menemukan pattern terbaik!
                          </div>
                        )}
                        {text && randomBlockSize && parseInt(randomBlockSize) > 26 && (
                          <div className="text-red-600 text-xs mt-2">
                            🚫 Block size maksimal adalah 26 (jumlah huruf alfabet)
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Padding Settings for Random - Only show in encode mode */}
                    {mode === 'encode' && (
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <label htmlFor="randomPaddingToggle" className="text-slate-600 text-sm cursor-pointer flex-1">
                            Add random padding to fill grid
                          </label>
                          
                          {/* Toggle Switch */}
                          <button
                            id="randomPaddingToggle"
                            onClick={() => setRandomPaddingEnabled(!randomPaddingEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none  ${
                              randomPaddingEnabled ? 'bg-violet-600' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${
                                randomPaddingEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        {randomPaddingEnabled && (
                          <div className="text-amber-600 text-xs mt-2">
                            💡 Karakter acak (a-z) akan ditambahkan di akhir pesan untuk mengisi blok.
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                
                {method === 'columnar' && (
                  <>
                    <ColumnarKeyInput 
                      columnarKey={columnarKey} 
                      setColumnarKey={setColumnarKey}
                      columnarKeyType={columnarKeyType}
                      setColumnarKeyType={setColumnarKeyType}
                    />
                    
                    {/* Padding Settings - Only show in encode mode */}
                    {mode === 'encode' && (
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <label htmlFor="paddingToggle" className="text-slate-600 text-sm cursor-pointer flex-1">
                            Add random padding to fill grid
                          </label>
                          
                          {/* Toggle Switch */}
                          <button
                            id="paddingToggle"
                            onClick={() => setPaddingEnabled(!paddingEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none  ${
                              paddingEnabled ? 'bg-violet-600' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${
                                paddingEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        {paddingEnabled && (
                          <div className="text-amber-600 text-xs mt-2">
                            💡 Karakter acak (a-z) akan ditambahkan di akhir pesan untuk mengisi grid. Decode akan menyertakan padding ini.
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {(method === 'atbash' || method === 'rot13' || method === 'caesar') && (
                  <div>
                    <label className="text-slate-600 text-sm mb-1 block">Foreign chars</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: 'include', label: 'Include' },
                        { val: 'ignore', label: 'Ignore' },
                      ].map((f) => (
                        <button
                          key={f.val}
                          onClick={() => setForeignMode(f.val)}
                          className={`px-3 py-2 rounded-xl text-sm transition cursor-pointer
                            ${foreignMode === f.val
                              ? 'text-white bg-linear-to-r from-violet-500 to-fuchsia-500 shadow-[0_8px_20px_rgba(139,92,246,0.35)]'
                              : 'text-violet-700 bg-white/80 border border-white/60 ring-1 ring-white/50 hover:bg-white shadow-[0_6px_16px_rgba(0,0,0,0.06)]'}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                    <div className="text-amber-600 text-xs mt-2">
                      {foreignMode === 'ignore'
                        ? 'Catatan: Karakter non‑alfabet akan dihapus dari output.'
                        : 'Catatan: Karakter non‑alfabet akan disertakan apa adanya.'}
                    </div>
                  </div>
                )}

                {(method === 'atbash' || method === 'caesar') && (
                  <div>
                    <label className="text-slate-600 text-sm mb-1 block">Case strategy</label>
                    <div className="flex flex-wrap items-center gap-3">
                      {[
                        {value: 'maintain', label: 'Maintain case'},
                        {value: 'ignore', label: 'Ignore case (lowercase)'},
                        {value: 'strict', label: 'Strict (A ≠ a)'}
                      ].map((item) => (
                        <label key={item.value} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            name="case"
                            value={item.value}
                            checked={caseStrategy === item.value}
                            onChange={() => setCaseStrategy(item.value)}
                            className="appearance-none w-4 h-4 rounded-full border border-white/60 bg-white/80
                                      checked:bg-linear-to-r checked:from-violet-500 checked:to-fuchsia-500
                                      shadow-inner shadow-black/10"
                          />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" onClick={handleCopy}>
                    Copy output
                  </Button>
                  <Button variant="ghost" onClick={handleClear}>Clear</Button>
                </div>
                
                <div className="text-slate-500 text-xs pt-2 border-t border-white/60">
                  Metode: {method.toUpperCase()}
                  {method === 'caesar' && ` • Shift: ${caesarShift}`}
                  {method === 'railfence' && ` • Rails: ${rails}`}
                  {method === 'columnar' && ``}
                  {(method === 'atbash' || method === 'caesar') && ` • Case: ${caseStrategy}`}
                  {(method === 'atbash' || method === 'rot13' || method === 'caesar') && ` • Foreign: ${foreignMode}`}
                </div>
              </div>
            </Card>
          </div>

          {/* Right View (Output) */}
          <div className="w-full lg:w-[340px] shrink-0">
             <TextAreaCard
                label={mode === 'encode' ? 'Ciphertext' : 'Plaintext'}
                value={result}
                onChange={undefined}
                readOnly={true}
                placeholder={mode === 'encode' ? "Hasil enkripsi..." : "Hasil dekripsi..."}
            />
          </div>
        </div>
      </main>

      <LyricFooter />

      {/* Pattern Finder Modal */}
      {showPatternFinder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 md:p-6">
          {/* Modal Toast Notification - Glass theme style */}
          <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-60 px-5 py-3 rounded-2xl text-sm font-medium
                          bg-violet-500/20 backdrop-blur-xl border border-violet-300/30 text-white
                          shadow-2xl shadow-violet-500/30
                          transition-all duration-300 ease-in-out whitespace-nowrap
                          ${modalToast.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
            {modalToast.message}
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-linear-to-r from-violet-600 to-fuchsia-600 p-3 sm:p-4 md:p-5 text-white shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold">🔍 Pattern Finder</h2>
                  <p className="text-violet-100 text-[10px] sm:text-xs mt-0.5 sm:mt-1 truncate">
                    Block Size: {randomBlockSize} • Total Patterns: {(() => {
                      const n = parseInt(randomBlockSize);
                      let factorial = 1;
                      for (let i = 2; i <= n; i++) factorial *= i;
                      return factorial.toLocaleString();
                    })()}
                  </p>
                  {parseInt(randomBlockSize) >= 8 && (
                    <p className="text-yellow-200 text-[10px] sm:text-xs mt-1">
                      ⚡ Large block size detected. Generating patterns...
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowPatternFinder(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition shrink-0"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Box & Auto-detect Button */}
            <div className="px-3 sm:px-4 md:px-5 pt-2 sm:pt-3 pb-2 shrink-0">
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleAutoDetect}
                  disabled={isDetecting || !text || !randomBlockSize}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition shrink-0 ${
                    isDetecting || !text || !randomBlockSize
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-linear-to-r from-fuchsia-500 to-violet-500 text-white hover:shadow-lg'
                  }`}
                >
                  {isDetecting ? '🔄 Detecting...' : '🎯 Auto-detect'}
                </button>
                {autoDetectResults && (
                  <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm font-medium flex items-center">
                    ✓ {autoDetectResults.length} patterns found
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={patternSearch}
                  onChange={(e) => setPatternSearch(e.target.value)}
                  placeholder="Search pattern (e.g., 2,5) or text..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-lg border-2 border-slate-200 focus:border-violet-400 focus:outline-none text-xs sm:text-sm"
                />
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {patternSearch && (
                  <button
                    onClick={() => setPatternSearch('')}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 overscroll-contain">
              <div className="space-y-2">
                {(() => {
                  const size = parseInt(randomBlockSize);
                  if (isNaN(size) || size < 2) return <p className="text-slate-500">Invalid block size</p>;
                  
                  // Show loading state while detecting
                  if (isDetecting) {
                    return (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mb-4"></div>
                        <p className="text-sm font-medium">🔍 Detecting best patterns...</p>
                        <p className="text-xs mt-2">This may take a moment for large block sizes</p>
                      </div>
                    );
                  }
                  
                  // If auto-detect results exist, show them instead of all permutations
                  if (autoDetectResults && autoDetectResults.length > 0) {
                    return autoDetectResults.map((result, idx) => (
                      <div
                        key={idx}
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-2.5 sm:p-3 rounded-lg border-2 border-slate-200 hover:border-violet-400 hover:bg-violet-50/50 transition cursor-pointer gap-2"
                        onClick={() => handleUsePattern(result.pattern)}
                      >
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-mono font-bold text-violet-600 text-xs sm:text-sm">
                              {result.pattern}
                            </span>
                            <span className="text-[10px] sm:text-xs text-slate-400">
                              #{idx + 1}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              result.score >= 80 ? 'bg-green-100 text-green-700' :
                              result.score >= 60 ? 'bg-blue-100 text-blue-700' :
                              result.score >= 40 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {result.score}% • {result.confidence}
                            </span>
                          </div>
                          <div className="font-mono text-xs sm:text-sm text-slate-700 break-all leading-relaxed">
                            {result.decoded}
                          </div>
                        </div>
                        <button
                          className="px-2.5 sm:px-3 py-1.5 bg-linear-to-r from-violet-500 to-fuchsia-500 text-white rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium sm:opacity-0 sm:group-hover:opacity-100 transition whitespace-nowrap self-end sm:self-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUsePattern(result.pattern);
                          }}
                        >
                          Use This
                        </button>
                      </div>
                    ));
                  }
                  
                  // Normal view: show all permutations
                  const permutations = generatePermutations(size);
                  const ciphertext = text.replace(/\s/g, '');
                  
                  // Filter berdasarkan search
                  const searchLower = patternSearch.toLowerCase().trim();
                  
                  const filteredResults = permutations
                    .map((perm, idx) => {
                      const patternStr = perm.join(',');
                      
                      // Decode dengan pattern ini
                      let decoded = '';
                      const patternArray = perm.map(n => n - 1); // 0-based
                      
                      for (let i = 0; i < ciphertext.length; i += size) {
                        const block = ciphertext.slice(i, i + size);
                        
                        if (block.length === size) {
                          const decodedBlock = new Array(block.length);
                          for (let j = 0; j < patternArray.length; j++) {
                            const originalPosition = patternArray[j];
                            decodedBlock[originalPosition] = block[j];
                          }
                          decoded += decodedBlock.join('');
                        } else {
                          decoded += block;
                        }
                      }
                      
                      return { perm, idx, patternStr, decoded };
                    })
                    .filter(({ patternStr, decoded }) => {
                      if (!searchLower) return true; // Tampilkan semua jika tidak ada search
                      
                      // Cek apakah search adalah pattern angka (e.g. "1,2" atau "1" atau "2,5")
                      const isPatternSearch = /^[\d,\s]+$/.test(searchLower);
                      
                      if (isPatternSearch) {
                        // Untuk pattern angka: gunakan startsWith (dimulai dengan)
                        const cleanSearch = searchLower.replace(/\s/g, ''); // hapus spasi
                        return patternStr.startsWith(cleanSearch);
                      } else {
                        // Untuk text: gunakan includes (mengandung)
                        return decoded.toLowerCase().includes(searchLower);
                      }
                    });
                  
                  if (filteredResults.length === 0) {
                    return (
                      <div className="text-center py-6 sm:py-8 text-slate-500">
                        <p className="text-base sm:text-lg mb-1 sm:mb-2">🔍 No results found</p>
                        <p className="text-xs sm:text-sm">Try a different search term</p>
                      </div>
                    );
                  }
                  
                  return filteredResults.map(({ idx, patternStr, decoded }) => (
                      <div
                        key={idx}
                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-2.5 sm:p-3 rounded-lg border-2 border-slate-200 hover:border-violet-400 hover:bg-violet-50/50 transition cursor-pointer gap-2"
                        onClick={() => handleUsePattern(patternStr)}
                      >
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-violet-600 text-xs sm:text-sm">
                              {patternStr}
                            </span>
                            <span className="text-[10px] sm:text-xs text-slate-400">
                              #{idx + 1}
                            </span>
                          </div>
                          <div className="font-mono text-xs sm:text-sm text-slate-700 break-all leading-relaxed">
                            {decoded}
                          </div>
                        </div>
                        <button
                          className="px-2.5 sm:px-3 py-1.5 bg-linear-to-r from-violet-500 to-fuchsia-500 text-white rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium sm:opacity-0 sm:group-hover:opacity-100 transition whitespace-nowrap self-end sm:self-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUsePattern(patternStr);
                          }}
                        >
                          Use This
                        </button>
                      </div>
                  ));
                })()}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-2.5 sm:p-3 md:p-4 bg-slate-50 shrink-0">
              <p className="text-[10px] sm:text-xs text-slate-600 text-center">
                💡 Click pada pattern untuk menerapkannya
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
