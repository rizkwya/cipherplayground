import { useMemo, useState, useEffect } from 'react'

function LyricFooter() {
    const lyrics = useMemo(() => [

        { text: "Agar file otomatis terbaca oleh sistem, unggah file yang mengikuti struktur export CipherPlayground", speed: 750 },

        { text: "-- 🎶 bergema sampai selamanya 🎶 -- ", speed: 80 },
        { text: "Aku ingin jadi teman nyamanmu", speed: 100 },
        { text: "Tempat kau hilangkan keluh kesahmu", speed: 100 },
        { text: "Kita berbincang tak karuan, tanpa beban", speed: 100 },
        { text: "Dan juga khayalan tentang masa depan", speed: 155 },
        { text: "Ku tak ingin cepat berlalu (berlalu)", speed: 120 },
        { text: "Waktu yang kupunya denganmu", speed: 100 },
        { text: "Kita berdansa dan tertawa, gandeng tangan", speed: 115 },
        { text: "Semoga bergema sampai selamanya", speed: 160 },
        { text: "Dunia pasti ada akhirnya", speed: 160 },
        { text: "Bintang-bintang pun ada umurnya", speed: 160 },
        { text: "Maka tenang saja, kita di sini berdua", speed: 110 },
        { text: "🎶 oHhh ~~ OhHh 🎶", speed: 85 },
        { text: "Nikmati sementara yang ada", speed: 95 },
        { text: "🎶 iNtro ~~~~~~~~~~~~~~ InTro 🎶", speed: 250 },
        { text: "Bersandar padaku, taruh di bahuku", speed: 150 },
        { text: "Relakan semua, bebas semaumu", speed: 140 },
        { text: "Percayalah, ini sayang terlewatkan", speed: 120 },
        { text: "Kusampaikan dalam nyanyian, bergema sampai selamanya", speed: 110 },
    ], []);

    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(0);

    const currentLine = useMemo(() => lyrics[currentLineIndex].text, [lyrics, currentLineIndex]);
    const chars = useMemo(() => currentLine.split(''), [currentLine]);

    useEffect(() => {
        const typeSpeed = lyrics[currentLineIndex].speed;
        const pauseDuration = 1500; // Jeda antar baris
        let timeout;

        if (visibleCount < chars.length) {
            timeout = setTimeout(() => {
                setVisibleCount(visibleCount + 1);
            }, typeSpeed);
        } else {
            timeout = setTimeout(() => {
                setVisibleCount(0);
                setCurrentLineIndex(prevIndex => (prevIndex + 1) % lyrics.length);
            }, pauseDuration);
        }

        return () => clearTimeout(timeout);
    }, [visibleCount, currentLineIndex, chars, lyrics]);

    return (
        <footer className="mt-4 sm:mt-6 pb-4 sm:pb-6 pointer-events-none">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                                <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center bg-white/40 border border-white/60 ring-1 ring-white/50 backdrop-blur shadow-[8px_8px_20px_rgba(0,0,0,0.08),-8px_-8px_20px_rgba(255,255,255,0.5)]">
                                        <div className="mx-auto max-w-full sm:max-w-3xl">
                                            <div className="mx-auto max-w-full">
                                                {currentLineIndex === 0 ? (
                                                    <div
                                                        className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100 to-white text-amber-900 text-sm font-medium border border-amber-200/60 shadow-[0_8px_24px_rgba(15,23,42,0.12)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.16)] transform-gpu transition-all duration-200"
                                                        role="status"
                                                        aria-live="polite"
                                                        style={{ boxShadow: '0 10px 30px rgba(15,23,42,0.12), inset 0 -2px 12px rgba(255,255,255,0.6)' }}
                                                    >
                                                        <svg className="w-4 h-4 text-amber-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.681-1.36 3.446 0l6.518 11.59A1.75 1.75 0 0 1 17.618 17H2.382a1.75 1.75 0 0 1-1.603-2.311L7.652 3.1zM10 8a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75s.75-.336.75-.75v-2.5A.75.75 0 0 0 10 8zm0 6a.875.875 0 1 0 0 1.75A.875.875 0 0 0 10 14z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="whitespace-normal break-words">{lyrics[0].text}</span>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs sm:text-sm text-slate-600 font-mono whitespace-normal break-words overflow-hidden leading-snug">
                                                        {chars.map((char, index) => (
                                                            <span key={index} className={index < visibleCount ? 'char-visible' : 'char-hidden'}>
                                                                {char}
                                                            </span>
                                                        ))}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                </div>
            </div>
        </footer>
    );
}

export default LyricFooter
