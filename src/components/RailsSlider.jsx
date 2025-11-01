import { useState, useEffect } from 'react'

function RailsSlider({ rails, setRails }) {
  const [inputValue, setInputValue] = useState(rails.toString());
  const percentage = ((rails - 2) * 100) / (98 - 2);

  useEffect(() => {
    setInputValue(rails.toString());
  }, [rails]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    let num = parseInt(inputValue, 10);
    if (isNaN(num) || num < 2) {
      num = 2;
    } else if (num > 98) {
      num = 98;
    }
    setRails(num);
    setInputValue(num.toString());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-slate-600 text-sm font-medium">Jumlah Rel (Rails)</label>
        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.target.blur();
            }
          }}
          className="font-mono text-sm rounded-md bg-white/70 px-2 py-0.5 border border-white/60 w-16 text-center focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
        />
      </div>
      <div className="relative flex items-center h-2">
        <div className="absolute h-full w-full rounded-full bg-slate-200/70 border border-white/60 shadow-inner"></div>
        <div
          className="absolute h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500"
          style={{ width: `${percentage}%` }}
        ></div>
        <input
          type="range"
          min="2"
          max="98"
          value={rails}
          onChange={(e) => setRails(parseInt(e.target.value, 10))}
          className="w-full h-full bg-transparent appearance-none cursor-pointer slider-custom absolute inset-0"
        />
      </div>
      <div className="text-xs text-slate-500 mt-1">
        Rel adalah jumlah baris zigzag. Semakin banyak rel, semakin kompleks enkripsinya.
      </div>
    </div>
  );
}

export default RailsSlider
