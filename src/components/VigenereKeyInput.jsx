function VigenereKeyInput({ vigenereKey, setVigenereKey }) {
  const handleKeyChange = (e) => {
    let value = e.target.value;
    value = value.toUpperCase().replace(/[^A-Z]/g, '');
    setVigenereKey(value);
  };
  
  return (
    <div>
      <label className="text-slate-600 text-sm mb-1 block">Vigenère Key</label>
      <input
        type="text"
        value={vigenereKey}
        onChange={handleKeyChange}
        placeholder="e.g., ADEL"
        className="w-full rounded-xl px-3 py-2 text-sm font-mono
                   bg-white/70 backdrop-blur border border-white/60 ring-1 ring-white/50
                   focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-300
                   shadow-inner shadow-black/5"
      />
      <div className="text-xs text-slate-500 mt-1">
        Masukkan kata kunci (hanya huruf). Key akan diulang untuk panjang teks.
      </div>
    </div>
  );
}

export default VigenereKeyInput