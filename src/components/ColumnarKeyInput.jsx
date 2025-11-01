import { useState } from 'react'

function ColumnarKeyInput({ columnarKey, setColumnarKey, columnarKeyType, setColumnarKeyType }) {
  const [keyType, setKeyType] = useState(columnarKeyType || 'text');
  const [numColumns, setNumColumns] = useState(5);
  
  const handleKeyChange = (e) => {
    let value = e.target.value;
    value = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setColumnarKey(value);
  };
  
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setNumColumns(value);
    setColumnarKey(value.toString());
  };
  
  const handleTypeChange = (newType) => {
    setKeyType(newType);
    if (setColumnarKeyType) {
      setColumnarKeyType(newType);
    }
    if (newType === 'text') {
      setColumnarKey('');
    } else {
      setColumnarKey(numColumns.toString());
    }
  };
  
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between mb-2">
        <label className="text-slate-600 text-sm font-medium">Transposition Key</label>
        <select
          value={keyType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="text-xs rounded-lg px-2 py-1 bg-white/70 border border-white/60 ring-1 ring-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
        >
          <option value="text">Text Key</option>
          <option value="number">Number Key</option>
        </select>
      </div>
      
      {keyType === 'text' ? (
        <>
          <div className="w-full">
            <input
              type="text"
              value={columnarKey}
              onChange={handleKeyChange}
              placeholder="e.g., MULIA or KEY123"
              style={{ minWidth: 0 }}
              className="w-full rounded-xl px-3 py-2 text-sm font-mono
                         bg-white/70 backdrop-blur border border-white/60 ring-1 ring-white/50
                         focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-300
                         shadow-inner shadow-black/5"
            />
          </div>
          
          <div className="text-xs text-slate-500 mt-1">
            Masukkan kata kunci (huruf or angka). Untuk angka murni besar, gunakan <strong>Number Key</strong> mode.
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="flex justify-between items-center gap-3 mb-2">
              <label className="text-slate-600 text-sm font-medium shrink-0">Columns</label>
              <input
                type="number"
                min="2"
                max="99"
                value={numColumns}
                onChange={handleSliderChange}
                className="font-mono text-sm rounded-md bg-white/70 px-2 py-0.5 border border-white/60 w-14 text-center focus:outline-none focus:ring-2 focus:ring-violet-400 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="relative flex items-center h-2">
              <div className="absolute h-full w-full rounded-full bg-slate-200/70 border border-white/60 shadow-inner"></div>
              <div
                className="absolute h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500"
                style={{ width: `${((numColumns - 2) * 100) / (99 - 2)}%` }}
              ></div>
              <input
                type="range"
                min="2"
                max="99"
                value={numColumns}
                onChange={handleSliderChange}
                className="w-full h-full bg-transparent appearance-none cursor-pointer slider-custom absolute inset-0"
              />
            </div>
          </div>
          
          <div className="text-xs text-slate-500 mt-1">
            Jumlah kolom untuk transposisi: {columnarKey} kolom
          </div>
        </>
      )}
    </div>
  );
}

export default ColumnarKeyInput
