import { useMemo, useState, useEffect } from 'react'

function LyricFooter() {
    const lyrics = useMemo(() => [
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
                    <p className="text-xs sm:text-sm text-slate-600 h-4 sm:h-5 font-mono">
                        {chars.map((char, index) => (
                            <span key={index} className={index < visibleCount ? 'char-visible' : 'char-hidden'}>
                                {char}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default LyricFooter
