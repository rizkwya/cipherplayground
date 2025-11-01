function MethodDropdown({ method, setMethod }) {
  return (
    <div>
      <label className="text-slate-600 text-sm mb-1 block">Metode</label>
      <div className="relative">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full appearance-none rounded-xl px-3 py-2 pr-10 text-sm
                     bg-white/70 backdrop-blur border border-white/60 ring-1 ring-white/50
                     shadow-[inset_0_2px_8px_rgba(0,0,0,0.06),0_8px_20px_rgba(139,92,246,0.12)]
                     focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-300
                     transition cursor-pointer"
        >
          <option value="atbash" title="Atbash: A↔Z, B↔Y (involutory)">
            Atbash (reverse alphabet)
          </option>
          <option value="rot13" title="ROT13: Caesar shift by 13 (involutory)">
            ROT13 (shift 13)
          </option>
          <option value="caesar" title="Caesar: Shift letters by a custom amount">
            Caesar Cipher
          </option>
          <option value="columnar" title="Columnar Transposition: Rearrange by columns">
            Columnar Transposition & Diagonal Transposition
          </option>
          <option value="railfence" title="Rail Fence: Zigzag diagonal pattern">
            Rail Fence Cipher
          </option>
          <option value="random" title="Random Transposition: Shuffle by seed">
            Random Transposition
          </option>
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-violet-500">
          <svg width="16" height="16" viewBox="0_0_20_20" fill="currentColor" aria-hidden="true">
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default MethodDropdown
