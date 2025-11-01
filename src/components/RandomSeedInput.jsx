function RandomSeedInput({ blockSize, setBlockSize, pattern, setPattern }) {
  const handleBlockSizeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBlockSize(value);
    }
  };

  const handlePatternChange = (e) => {
    const value = e.target.value;
    if (/^[\d,]*$/.test(value)) {
      setPattern(value);
    }
  };

  const generateRandomPattern = () => {
    const size = parseInt(blockSize, 10);
    if (isNaN(size) || size < 2) return;
    
    const numbers = Array.from({ length: size }, (_, i) => i + 1);
    
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    setPattern(numbers.join(','));
  };

  return (
    <div className="min-w-0 space-y-3">
      <div>
        <label className="text-slate-600 text-sm font-medium mb-2 block">Block Size</label>
        <div className="w-full">
          <input
            type="text"
            inputMode="numeric"
            value={blockSize}
            onChange={handleBlockSizeChange}
            placeholder="e.g., 4"
            style={{ minWidth: 0 }}
            className="w-full rounded-xl px-3 py-2 text-sm font-mono
                       bg-white/70 backdrop-blur border border-white/60 ring-1 ring-white/50
                       focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-300
                       shadow-inner shadow-black/5"
          />
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Jumlah karakter per blok (misal: 4)
        </div>
      </div>

      <div>
        <label className="text-slate-600 text-sm font-medium mb-2 block">Transposition Pattern</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={pattern}
            onChange={handlePatternChange}
            placeholder="e.g., 4,1,3,2"
            style={{ minWidth: 0 }}
            className="flex-1 rounded-xl px-3 py-2 text-sm font-mono
                       bg-white/70 backdrop-blur border border-white/60 ring-1 ring-white/50
                       focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-300
                       shadow-inner shadow-black/5"
          />
          <button
            onClick={generateRandomPattern}
            className="px-3 py-2 rounded-lg text-xs font-medium bg-violet-500 text-white hover:bg-violet-600 transition-colors whitespace-nowrap"
          >
            🎲 Acak
          </button>
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Pola transposisi (misal: 4,1,3,2 berarti baca posisi 4→1→3→2)
        </div>
      </div>
    </div>
  );
}

export default RandomSeedInput
