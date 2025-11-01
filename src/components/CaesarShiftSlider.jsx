import { useState, useEffect } from 'react'

function CaesarShiftSlider({ shift, setShift }) {
  const [inputValue, setInputValue] = useState(shift.toString());
  const percentage = ((shift - 1) * 100) / (25 - 1);

  useEffect(() => {
    setInputValue(shift.toString());
  }, [shift]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    let num = parseInt(inputValue, 10);
    if (isNaN(num) || num < 1) {
      num = 1;
    } else if (num > 25) {
      num = 25;
    }
    setShift(num); // Perbarui state utama
    setInputValue(num.toString()); // Sinkronkan kembali input dengan nilai yang valid
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-slate-600 text-sm font-medium">Shift Amount</label>
        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.target.blur(); // Terapkan nilai saat menekan Enter
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
          min="1"
          max="25"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value, 10))}
          className="w-full h-full bg-transparent appearance-none cursor-pointer slider-custom absolute inset-0"
        />
      </div>
    </div>
  );
}

export default CaesarShiftSlider
