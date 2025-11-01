function ModeSwitcher({ mode, setMode }) {
  return (
    <div className="flex items-center gap-2 mb-4 p-1 rounded-full bg-white/60 backdrop-blur border border-white/60 ring-1 ring-white/50 shadow-inner shadow-black/5">
      <button
        onClick={() => setMode('encode')}
        className={`w-1/2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer
          ${mode === 'encode'
            ? 'text-white bg-linear-to-r from-fuchsia-500 to-rose-500 shadow-md shadow-fuchsia-500/30'
            : 'text-slate-600 hover:bg-white/70'}`}
      >
        Encode
      </button>
      <button
        onClick={() => setMode('decode')}
        className={`w-1/2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer
          ${mode === 'decode'
            ? 'text-white bg-linear-to-r from-fuchsia-500 to-rose-500 shadow-md shadow-fuchsia-500/30'
            : 'text-slate-600 hover:bg-white/70'}`}
      >
        Decode
      </button>
    </div>
  )
}

export default ModeSwitcher
