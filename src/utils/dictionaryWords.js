// Common Indonesian and English words for pattern detection scoring
export const INDONESIAN_WORDS = [
  // Very common words (pronouns, conjunctions, prepositions)
  'dan', 'yang', 'di', 'ke', 'dari', 'ini', 'itu', 'dengan', 'untuk', 'pada',
  'adalah', 'ada', 'akan', 'atau', 'oleh', 'dalam', 'juga', 'tidak', 'dapat',
  'saya', 'kami', 'kita', 'anda', 'mereka', 'dia', 'ia', 'kamu', 'aku', 'nya',
  'kalian', 'beliau', 'engkau', 'gue', 'gua', 'elu', 'loe', 'lo', 'lu',
  
  // Common verbs
  'pergi', 'datang', 'pulang', 'balik', 'kembali', 'berangkat', 'tiba', 'sampai',
  'makan', 'minum', 'tidur', 'bangun', 'duduk', 'berdiri', 'jalan', 'lari',
  'baca', 'tulis', 'belajar', 'kerja', 'main', 'bermain', 'lihat', 'dengar',
  'bicara', 'kata', 'bilang', 'cerita', 'tanya', 'jawab', 'pikir', 'ingat',
  'lupa', 'tahu', 'kenal', 'cari', 'temukan', 'ambil', 'bawa', 'taruh',
  'buka', 'tutup', 'masuk', 'keluar', 'naik', 'turun', 'lewat', 'jadi',
  
  // Common adjectives
  'baik', 'buruk', 'bagus', 'jelek', 'cantik', 'ganteng', 'indah', 'kotor',
  'bersih', 'rapi', 'berantakan', 'besar', 'kecil', 'tinggi', 'rendah',
  'panjang', 'pendek', 'lebar', 'sempit', 'tebal', 'tipis', 'berat', 'ringan',
  'cepat', 'lambat', 'lama', 'sebentar', 'jauh', 'dekat', 'panas', 'dingin',
  'hangat', 'sejuk', 'basah', 'kering', 'banyak', 'sedikit', 'penuh', 'kosong',
  'mudah', 'sulit', 'susah', 'gampang', 'senang', 'sedih', 'marah', 'takut',
  
  // Common nouns (places)
  'rumah', 'sekolah', 'kampus', 'kantor', 'toko', 'pasar', 'mall', 'hotel',
  'jalan', 'gang', 'lorong', 'gedung', 'ruang', 'kamar', 'kelas', 'pintu',
  'jendela', 'dinding', 'lantai', 'atap', 'tangga', 'halaman', 'taman', 'kebun',
  'kota', 'desa', 'negara', 'pulau', 'laut', 'sungai', 'gunung', 'pantai',
  
  // Common nouns (people & family)
  'orang', 'manusia', 'anak', 'bayi', 'ibu', 'bapak', 'ayah', 'mama', 'papa',
  'kakak', 'adik', 'saudara', 'keluarga', 'teman', 'sahabat', 'tetangga',
  'guru', 'dosen', 'murid', 'siswa', 'mahasiswa', 'pelajar', 'dokter', 'suster',
  
  // Common nouns (things)
  'buku', 'pulpen', 'pensil', 'kertas', 'meja', 'kursi', 'lemari', 'kasur',
  'bantal', 'selimut', 'baju', 'celana', 'sepatu', 'topi', 'tas', 'dompet',
  'uang', 'rupiah', 'harga', 'mobil', 'motor', 'sepeda', 'bis', 'kereta',
  'pesawat', 'kapal', 'makanan', 'minuman', 'nasi', 'roti', 'kopi', 'teh',
  'air', 'susu', 'gula', 'garam', 'buah', 'sayur', 'daging', 'ikan', 'ayam',
  
  // Common nouns (time)
  'waktu', 'hari', 'minggu', 'bulan', 'tahun', 'jam', 'menit', 'detik',
  'pagi', 'siang', 'sore', 'malam', 'kemarin', 'sekarang', 'besok', 'lusa',
  'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu',
  
  // Common nouns (abstract)
  'nama', 'umur', 'alamat', 'nomor', 'telepon', 'email', 'pesan', 'surat',
  'berita', 'cerita', 'informasi', 'data', 'fakta', 'masalah', 'solusi',
  'pertanyaan', 'jawaban', 'alasan', 'sebab', 'akibat', 'tujuan', 'harapan',
  'mimpi', 'rencana', 'ide', 'pikiran', 'perasaan', 'hati', 'jiwa',
  
  // University/tech related
  'informatika', 'universitas', 'mulia', 'komputer', 'sistem', 'program',
  'kuliah', 'tugas', 'ujian', 'semester', 'nilai', 'ipk', 'skripsi',
  'ilmu', 'teknologi', 'digital', 'internet', 'aplikasi', 'software', 'hardware',
  'database', 'website', 'coding', 'programming', 'algoritma', 'jaringan',
  
  // Common verbs with prefixes (ber-, me-, ter-)
  'bermain', 'berjalan', 'berlari', 'berbicara', 'berkata', 'bercerita',
  'bekerja', 'belajar', 'membaca', 'menulis', 'mendengar', 'melihat',
  'membuat', 'membawa', 'mengambil', 'menaruh', 'menemukan', 'mencari',
  'terjadi', 'terbuka', 'tertutup', 'terlihat', 'terdengar', 'terdapat',
  
  // Conversational words
  'dong', 'kok', 'sih', 'deh', 'kan', 'lah', 'yuk', 'ayo', 'mari',
  'gimana', 'bagaimana', 'kenapa', 'mengapa', 'kapan', 'dimana', 'kemana',
  'siapa', 'apa', 'berapa', 'mana', 'mau', 'bisa', 'boleh', 'harus',
  
  // Extra common words
  'sepi', 'ramai', 'ribut', 'tenang', 'sunyi', 'berisik', 'hening',
  'mumpung', 'sambil', 'sewaktu', 'ketika', 'saat', 'waktu', 'sesudah',
  'sebelum', 'selama', 'sampai', 'hingga', 'sejak', 'mulai', 'akhir',
  
  // Slang & colloquial words (very common in messages!)
  'banget', 'abis', 'udah', 'belum', 'udeh', 'kayak', 'kaya', 'gini', 'gitu',
  'tapi', 'soalnya', 'makanya', 'jadinya', 'terus', 'trus', 'langsung',
  'emang', 'memang', 'aja', 'saja', 'doang', 'kok', 'sih', 'dong',
  'punya', 'milik', 'sama', 'beda', 'lain', 'jangan', 'jadi', 'biar',
  'agar', 'supaya', 'karena', 'sebab', 'kalau', 'kalo', 'bila', 'andai',
  'soal', 'pasti', 'mesti', 'pernah', 'selalu', 'sering', 'jarang', 'kadang',
  
  // More everyday words
  'penting', 'butuh', 'perlu', 'harus', 'wajib', 'boleh', 'bisa', 'bole',
  'mau', 'ingin', 'pengen', 'pengin', 'suka', 'cinta', 'sayang', 'rindu',
  'maaf', 'sorry', 'terima', 'kasih', 'thanks', 'tolong', 'bantuan',
  'coba', 'cuba', 'usaha', 'kerja', 'kerjaan', 'tugas', 'pekerjaan',
  'masalah', 'problem', 'susah', 'sulit', 'gampang', 'mudah', 'simpel',
  'cepat', 'lambat', 'pelan', 'lama', 'bentar', 'sebentar', 'sejenak',
  
  // Actions & states
  'mulai', 'akhir', 'selesai', 'beres', 'jalan', 'jalanan', 'lewat', 'via',
  'pakai', 'gunakan', 'ambil', 'kasih', 'beri', 'berikan', 'kirim', 'antar',
  'terima', 'dapat', 'dapet', 'dapat', 'peroleh', 'raih', 'capai',
  'simpan', 'taruh', 'letakkan', 'buang', 'hapus', 'hilang', 'lupa',
  
  // Quantifiers & modifiers
  'semua', 'seluruh', 'banyak', 'sedikit', 'beberapa', 'sebagian', 'separuh',
  'lebih', 'kurang', 'paling', 'sangat', 'amat', 'sekali', 'banget',
  'agak', 'rada', 'lumayan', 'cukup', 'hampir', 'nyaris', 'sekitar',
  
  // More common 3-4 letter words (CRITICAL for short texts!)
  'apa', 'siapa', 'mana', 'dimana', 'kemana', 'kapan', 'nanti', 'lalu', 'dulu',
  'baru', 'lagi', 'masih', 'sudah', 'telah', 'sedang', 'tengah', 'lagi',
  'itu', 'ini', 'apa', 'yang', 'mana', 'bila', 'jika', 'saat', 'kala',
  'sini', 'situ', 'sana', 'mari', 'ayo', 'yuk', 'hayuk', 'ayuk',
  'gak', 'nggak', 'ngga', 'enggak', 'nope', 'yap', 'yep', 'oke', 'okay',
  
  // Common verbs (everyday usage)
  'lihat', 'dengar', 'rasa', 'pikir', 'ingat', 'lupa', 'tahu', 'kenal', 'paham', 'mengerti',
  'buat', 'bikin', 'cipta', 'kerjakan', 'lakukan', 'jalankan', 'selesaikan',
  'minta', 'mohon', 'harap', 'mau', 'ingin', 'hendak', 'suka', 'senang', 'gembira',
  'sedih', 'kecewa', 'marah', 'kesal', 'jengkel', 'takut', 'khawatir', 'cemas',
  
  // ===== COMPREHENSIVE DAILY LIFE VOCABULARY =====
  
  // Morning/Evening Routines
  'sarapan', 'mandi', 'sikat', 'gigi', 'gosok', 'keramas', 'handuk', 'sabun', 'shampo', 'pasta', 'sisir',
  'bedak', 'parfum', 'wangi', 'harum', 'deodoran', 'lotion', 'pelembab',
  
  // Clothing
  'pakaian', 'kemeja', 'kaos', 'celana', 'rok', 'gaun', 'jaket', 'sweater', 'batik', 'sarung',
  'sepatu', 'sandal', 'sendal', 'boots', 'sneakers', 'topi', 'jilbab', 'hijab',
  'jam', 'tangan', 'gelang', 'kalung', 'cincin', 'anting', 'kacamata',
  
  // Household Items
  'kompor', 'kulkas', 'mesin', 'cuci', 'setrika', 'blender', 'mixer', 'dispenser',
  'panci', 'wajan', 'sendok', 'garpu', 'pisau', 'piring', 'mangkuk', 'gelas',
  'sapu', 'pel', 'sikat', 'pembersih', 'detergen', 'pewangi', 'sabun', 'cuci',
  'ember', 'gayung', 'baskom', 'serok', 'sampah', 'tempat', 'plastik',
  'sofa', 'dipan', 'ranjang', 'guling', 'selimut', 'sprei', 'lampu', 'tirai',
  'karpet', 'tikar', 'keset', 'televisi', 'remote', 'kipas', 'angin',
  
  // Kitchen & Food
  'dapur', 'talenan', 'parut', 'ulekan', 'cerek', 'toples', 'wadah',
  'masak', 'goreng', 'rebus', 'bakar', 'panggang', 'kukus', 'tumis',
  'resep', 'bumbu', 'rempah', 'garam', 'gula', 'merica', 'cabe', 'bawang',
  
  // Sports & Hobbies
  'olahraga', 'sepakbola', 'futsal', 'basket', 'voli', 'badminton', 'tenis', 'renang',
  'lari', 'jogging', 'gym', 'fitness', 'yoga', 'senam', 'angkat', 'beban',
  'musik', 'gitar', 'piano', 'drum', 'biola', 'suling', 'nyanyi', 'karaoke',
  'gaming', 'game', 'console', 'playstation', 'nintendo', 'komputer', 'laptop',
  'keyboard', 'mouse', 'monitor', 'headset', 'smartphone', 'gadget',
  'lukis', 'gambar', 'sketsa', 'cat', 'kuas', 'kanvas', 'mewarnai',
  'jahit', 'rajut', 'kerajinan', 'origami', 'craft',
  
  // Reading & Entertainment
  'novel', 'komik', 'manga', 'majalah', 'koran', 'artikel', 'puisi', 'cerpen',
  'blog', 'vlog', 'diary', 'jurnal', 'notes', 'catatan',
  
  // Outdoor Activities
  'jalan-jalan', 'traveling', 'wisata', 'liburan', 'piknik', 'camping',
  'mendaki', 'hiking', 'gunung', 'bukit', 'memancing', 'pancing',
  'pantai', 'pasir', 'ombak', 'selancar', 'diving', 'snorkeling',
  'berkebun', 'kebun', 'tanaman', 'bunga', 'pohon', 'daun', 'menanam', 'menyiram', 'pupuk',
  
  // Body Parts
  'kepala', 'rambut', 'wajah', 'muka', 'dahi', 'alis', 'mata', 'hidung', 'pipi',
  'telinga', 'mulut', 'bibir', 'gigi', 'lidah', 'leher', 'tengkuk',
  'bahu', 'pundak', 'lengan', 'siku', 'tangan', 'jari', 'kuku', 'telapak',
  'dada', 'perut', 'pusar', 'pinggang', 'punggung', 'pinggul', 'pantat',
  'paha', 'lutut', 'betis', 'kaki', 'tumit', 'jempol',
  
  // Physical Appearance
  'tampan', 'ganteng', 'cakep', 'keren', 'cantik', 'manis', 'imut', 'cute',
  'jelek', 'buruk', 'tinggi', 'pendek', 'besar', 'kecil', 'gemuk', 'gendut', 'kurus', 'langsing',
  'berotot', 'kekar', 'atletis', 'sixpack', 'putih', 'hitam', 'coklat', 'kuning', 'sawo',
  'botak', 'gundul', 'gondrong', 'keriting', 'ikal', 'lurus', 'rebonding',
  
  // Health
  'sehat', 'bugar', 'fit', 'segar', 'kuat', 'sakit', 'penyakit', 'lemah', 'lemas',
  'demam', 'panas', 'batuk', 'pilek', 'flu', 'bersin', 'ingus',
  'sakit', 'kepala', 'pusing', 'migrain', 'sakit', 'perut', 'mual', 'muntah', 'diare',
  'luka', 'gores', 'lecet', 'memar', 'bengkak', 'alergi', 'asma', 'diabetes',
  
  // Colors - Warna
  'merah', 'biru', 'hijau', 'kuning', 'orange', 'ungu', 'pink', 'coklat', 'hitam', 'putih',
  'abu-abu', 'silver', 'emas', 'gold', 'warna', 'colour', 'terang', 'gelap',
  
  // Animals - Hewan
  'kucing', 'anjing', 'burung', 'ikan', 'ayam', 'bebek', 'kambing', 'sapi', 'kerbau',
  'kuda', 'kelinci', 'hamster', 'tikus', 'ular', 'kadal', 'cicak', 'tokek',
  'monyet', 'gajah', 'harimau', 'singa', 'beruang', 'panda', 'zebra', 'jerapah',
  
  // Food - Makanan
  'nasi', 'roti', 'mie', 'soto', 'bakso', 'sate', 'gado-gado', 'rendang', 'sop',
  'lauk', 'sayur', 'buah', 'daging', 'telur', 'tahu', 'tempe', 'teri', 'udang',
  'apel', 'jeruk', 'pisang', 'mangga', 'anggur', 'semangka', 'melon', 'durian',
  
  // Drinks - Minuman
  'kopi', 'teh', 'susu', 'jus', 'juice', 'sirup', 'soda', 'cola', 'sprite',
  'es', 'campur', 'cendol', 'dawet', 'jahe', 'wedang',
  
  // Emotions - Emosi
  'bahagia', 'senang', 'gembira', 'suka', 'cinta', 'sayang', 'rindu', 'kangen',
  'sedih', 'murung', 'galau', 'bete', 'bosan', 'jenuh', 'capek', 'lelah',
  'marah', 'kesal', 'jengkel', 'dongkol', 'sebel', 'ngambek', 'ngamuk',
  'takut', 'cemas', 'khawatir', 'panik', 'gugup', 'nervous', 'deg-degan',
  'malu', 'sungkan', 'kaget', 'terkejut', 'heran', 'bingung', 'pusing',
  
  // Social Media & Internet
  'instagram', 'facebook', 'twitter', 'tiktok', 'youtube', 'whatsapp', 'line',
  'story', 'post', 'upload', 'download', 'share', 'like', 'comment', 'follow',
  'followers', 'viral', 'trending', 'hashtag', 'tag', 'mention', 'dm', 'chat',
  'status', 'profile', 'feed', 'timeline', 'reels', 'shorts', 'live', 'stream',
  
  // Money & Shopping
  'uang', 'duit', 'rupiah', 'dollar', 'harga', 'mahal', 'murah', 'diskon', 'promo',
  'bayar', 'cash', 'transfer', 'debit', 'kredit', 'gopay', 'ovo', 'dana', 'shopeepay',
  'belanja', 'shopping', 'beli', 'jual', 'pasar', 'supermarket', 'minimarket', 'indomaret',
  
  // Transportation
  'mobil', 'motor', 'sepeda', 'kereta', 'bus', 'angkot', 'ojek', 'gojek', 'grab',
  'taksi', 'taxi', 'pesawat', 'kapal', 'perahu', 'becak', 'delman', 'bajaj',
  'macet', 'jalanan', 'traffic', 'lampu', 'merah', 'zebra', 'cross', 'trotoar',
  
  // Location words
  'atas', 'bawah', 'depan', 'belakang', 'samping', 'kiri', 'kanan', 'tengah',
  'dalam', 'luar', 'antara', 'sekitar', 'sepanjang', 'seluruh', 'sekeliling',
  
  // Time expressions
  'tadi', 'barusan', 'nanti', 'straks', 'besok', 'kemarin', 'dahulu', 'lampau',
  'sekarang', 'kini', 'masa', 'zaman', 'era', 'periode', 'musim', 'cuaca',
  
  // Numbers & counting
  'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh',
  'pertama', 'kedua', 'ketiga', 'keempat', 'kelima', 'terakhir', 'akhir',
  
  // Conjunctions & connectors
  'tetapi', 'namun', 'akan', 'melainkan', 'bahkan', 'meskipun', 'walaupun',
  'sedangkan', 'sementara', 'padahal', 'yakni', 'yaitu', 'ialah',
  
  // Common nouns (body parts, nature, etc)
  'kepala', 'mata', 'hidung', 'mulut', 'telinga', 'tangan', 'kaki', 'badan', 'tubuh',
  'langit', 'bumi', 'matahari', 'bulan', 'bintang', 'awan', 'hujan', 'angin',
  'pohon', 'bunga', 'daun', 'akar', 'batang', 'buah', 'biji', 'tanaman',
  'hewan', 'binatang', 'kucing', 'anjing', 'burung', 'ikan', 'kambing', 'sapi',
  
  // Abstract concepts
  'hidup', 'mati', 'lahir', 'tumbuh', 'kembang', 'besar', 'dewasa', 'tua',
  'cinta', 'kasih', 'sayang', 'benci', 'marah', 'senang', 'sedih', 'bahagia',
  'harapan', 'impian', 'mimpi', 'kenyataan', 'fakta', 'kebenaran', 'kebohongan',
  'masalah', 'solusi', 'jawaban', 'pertanyaan', 'alasan', 'sebab', 'akibat',
  
  // Communication
  'bicara', 'omong', 'ngomong', 'ngobrol', 'cerita', 'curhat', 'ceritakan',
  'tanya', 'tanyakan', 'jawab', 'respon', 'balas', 'reply', 'chat', 'pesan',
  'telepon', 'telpon', 'hubungi', 'kontak', 'sambung', 'sambungan',
  
  // Technology (modern usage)
  'internet', 'online', 'offline', 'wifi', 'website', 'aplikasi', 'apps',
  'download', 'upload', 'install', 'update', 'delete', 'hapus', 'save', 'simpan',
  'foto', 'gambar', 'video', 'musik', 'lagu', 'suara', 'audio', 'file',
  
  // Food & drinks (very common!)
  'nasi', 'roti', 'mie', 'bakso', 'soto', 'sate', 'gado', 'rendang', 'sambal',
  'kopi', 'teh', 'susu', 'jus', 'air', 'minum', 'minuman', 'makan', 'makanan',
  'lapar', 'kenyang', 'haus', 'enak', 'lezat', 'gurih', 'manis', 'asin', 'pahit',
  
  // Common adjectives
  'baru', 'lama', 'tua', 'muda', 'kuno', 'modern', 'klasik', 'kontemporer',
  'bagus', 'jelek', 'cantik', 'tampan', 'ganteng', 'cakep', 'keren', 'mantap',
  'hebat', 'luar', 'biasa', 'istimewa', 'spesial', 'khusus', 'umum', 'publik',
  'ramai', 'sepi', 'sunyi', 'hening', 'ribut', 'berisik', 'bising', 'gaduh',
  'terang', 'gelap', 'redup', 'remang', 'cahaya', 'sinar', 'bayangan',
  
  // Emotions & states
  'sakit', 'sehat', 'capek', 'lelah', 'letih', 'kuat', 'lemah', 'lemas',
  'segar', 'bugar', 'fit', 'sabar', 'malas', 'rajin', 'tekun', 'gigih',
  'berani', 'takut', 'malu', 'bangga', 'sombong', 'rendah', 'hati'
];

export const ENGLISH_WORDS = [
  // Common English words
  'the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for',
  'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but',
  'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an',
  'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
  'computer', 'science', 'university', 'student', 'learn', 'study', 'test',
  'hello', 'world', 'good', 'bad', 'great', 'nice', 'love', 'like', 'want',
  'informatics', 'system', 'data', 'program', 'application', 'software'
];

// Common bigrams (2-letter combinations) in Indonesian
export const INDONESIAN_BIGRAMS = [
  'an', 'ng', 'ar', 'at', 'en', 'er', 'in', 'it', 'ka', 'ke',
  'la', 'ma', 'me', 'na', 'ng', 'pa', 'pe', 'ra', 'sa', 'ta',
  'te', 'ti', 'un', 'ut', 'ya', 'ng', 'ah', 'ai', 'ak', 'au',
  'da', 'di', 'ga', 'gi', 'ha', 'ia', 'ik', 'ku', 'mu', 'ni',
  'om', 'on', 'se', 'si', 'uk', 'um', 'us', 'ba', 'de'
];

// Common bigrams in English
export const ENGLISH_BIGRAMS = [
  'th', 'he', 'in', 'er', 'an', 're', 'on', 'at', 'en', 'nd',
  'ti', 'es', 'or', 'te', 'of', 'ed', 'is', 'it', 'al', 'ar',
  'st', 'to', 'nt', 'ng', 'se', 've', 'ha', 'as', 'ou', 'io'
];

// Common trigrams (3-letter combinations) in Indonesian
export const INDONESIAN_TRIGRAMS = [
  // Most common trigrams (prefixes/suffixes)
  'ang', 'ing', 'kan', 'dan', 'ter', 'yan', 'ber', 'per', 'men', 'pen',
  'nga', 'nya', 'ata', 'aka', 'ama', 'ena', 'ara', 'ani', 'ung', 'ari',
  'nda', 'tan', 'man', 'ran', 'ada', 'ini', 'itu', 'ngg', 'ong', 'ung',
  'ala', 'ali', 'ama', 'ani', 'apa', 'asi', 'awa', 'ela', 'elu', 'eru',
  'ika', 'iko', 'iku', 'ila', 'isa', 'ita', 'ker', 'kum', 'mah', 'mum',
  'pun', 'rum', 'sep', 'tas', 'uan', 'ung', 'uku',
  
  // Additional common trigrams
  'aha', 'ahu', 'ain', 'aka', 'aku', 'ala', 'ama', 'amp', 'amu', 'ana',
  'ang', 'ant', 'apa', 'ara', 'arg', 'ari', 'aru', 'asa', 'asi', 'ata',
  'ati', 'atu', 'awa', 'ayu', 'bag', 'bah', 'bai', 'bak', 'bal', 'ban',
  'bar', 'bas', 'bat', 'baw', 'bay', 'bel', 'ber', 'bes', 'bik', 'bil',
  'bis', 'bon', 'buk', 'bul', 'bun', 'bur', 'but', 'car', 'cat', 'cep',
  'cip', 'cob', 'cuk', 'cul', 'dah', 'dal', 'dam', 'dan', 'dap', 'dar',
  'dat', 'dek', 'den', 'dep', 'des', 'dia', 'dig', 'dik', 'dim', 'din',
  'dit', 'dog', 'dol', 'dom', 'don', 'dos', 'dua', 'dud', 'duk', 'dum',
  'dun', 'dup', 'dur', 'emp', 'gan', 'gap', 'gar', 'gat', 'gem', 'gen',
  'ger', 'gig', 'gim', 'gun', 'gup', 'gur', 'hab', 'had', 'hak', 'hal',
  'ham', 'han', 'hap', 'har', 'has', 'hat', 'hem', 'hen', 'hil', 'hin',
  'hub', 'huk', 'hum', 'hun', 'hup', 'ial', 'ian', 'iap', 'iar', 'iat',
  'iba', 'ibu', 'ida', 'iga', 'ika', 'iki', 'iku', 'ila', 'ilm', 'ima',
  'ina', 'ind', 'inf', 'ing', 'ini', 'ink', 'int', 'ipa', 'ira', 'iri',
  'isa', 'isi', 'ita', 'itu', 'jab', 'jad', 'jag', 'jah', 'jak', 'jal',
  'jam', 'jan', 'jar', 'jas', 'jaw', 'jen', 'jua', 'jud', 'jug', 'juj',
  'juk', 'jul', 'jum', 'jun', 'jur', 'jut', 'kah', 'kai', 'kaj', 'kak',
  'kal', 'kam', 'kan', 'kap', 'kar', 'kas', 'kat', 'kau', 'kaw', 'kay',
  'keb', 'kec', 'ked', 'keg', 'kej', 'kek', 'kel', 'kem', 'ken', 'kep',
  'ker', 'kes', 'ket', 'kir', 'kit', 'kob', 'kok', 'kol', 'kom', 'kon',
  'kop', 'kor', 'kot', 'kua', 'kub', 'kul', 'kum', 'kun', 'kup', 'kur',
  'kus', 'kut', 'lab', 'lah', 'lai', 'lak', 'lal', 'lam', 'lan', 'lap',
  'lar', 'las', 'lat', 'lau', 'law', 'leb', 'leh', 'lek', 'lem', 'len',
  'lep', 'les', 'let', 'lew', 'lia', 'lih', 'lim', 'lin', 'lip', 'lis',
  'lit', 'lom', 'lon', 'lor', 'luh', 'luk', 'lum', 'lun', 'lup', 'lur',
  'lus', 'lut', 'mah', 'mai', 'maj', 'mak', 'mal', 'mam', 'man', 'map',
  'mar', 'mas', 'mat', 'mau', 'may', 'mba', 'mbe', 'mbi', 'mbu', 'mel',
  'mem', 'men', 'mer', 'mes', 'mil', 'min', 'mir', 'mis', 'moh', 'mon',
  'mor', 'mud', 'muj', 'muk', 'mul', 'mum', 'mun', 'mup', 'mur', 'mus',
  'mut', 'nah', 'nak', 'nal', 'nam', 'nan', 'nap', 'nar', 'nas', 'nat',
  'nda', 'nde', 'ndi', 'ndo', 'ndu', 'neg', 'nek', 'nen', 'ner', 'nga',
  'nge', 'ngg', 'ngi', 'ngo', 'ngu', 'nia', 'nih', 'nik', 'nil', 'nim',
  'nin', 'nip', 'nis', 'nit', 'nom', 'non', 'nor', 'nya', 'nyi', 'nyo',
  'oho', 'oja', 'oke', 'ola', 'ole', 'olh', 'oma', 'omb', 'ome', 'omp',
  'ona', 'ond', 'one', 'ong', 'oni', 'ont', 'opa', 'ope', 'ora', 'ord',
  'ore', 'org', 'ori', 'orn', 'ors', 'osa', 'osi', 'ota', 'oti', 'pak',
  'pal', 'pam', 'pan', 'pap', 'par', 'pas', 'pat', 'paw', 'pay', 'pel',
  'pem', 'pen', 'pep', 'per', 'pet', 'pik', 'pil', 'pin', 'pip', 'pir',
  'pis', 'pit', 'poh', 'pol', 'pom', 'pon', 'pop', 'por', 'pos', 'pot',
  'puh', 'puk', 'pul', 'pun', 'pup', 'pur', 'pus', 'put', 'rab', 'rad',
  'rah', 'rai', 'raj', 'rak', 'ram', 'ran', 'rap', 'rar', 'ras', 'rat',
  'raw', 'ray', 'reb', 'reg', 'rek', 'rel', 'rem', 'ren', 'rep', 'res',
  'ret', 'rib', 'rih', 'rik', 'rim', 'rin', 'rip', 'ris', 'rit', 'rob',
  'rok', 'rom', 'ron', 'rop', 'rot', 'rua', 'rub', 'ruh', 'ruk', 'rum',
  'run', 'rup', 'rus', 'rut', 'saa', 'sab', 'sah', 'sai', 'saj', 'sak',
  'sal', 'sam', 'san', 'sap', 'sar', 'sat', 'sau', 'saw', 'say', 'seb',
  'sed', 'sej', 'sek', 'sel', 'sem', 'sen', 'sep', 'ser', 'ses', 'set',
  'seu', 'sew', 'sih', 'sik', 'sil', 'sim', 'sin', 'sip', 'sir', 'sis',
  'sit', 'soa', 'sob', 'sod', 'soh', 'sok', 'sol', 'som', 'son', 'sop',
  'sor', 'sot', 'sua', 'sub', 'sud', 'suh', 'sui', 'suk', 'sul', 'sum',
  'sun', 'sup', 'sur', 'sus', 'sut', 'tab', 'tad', 'tah', 'tai', 'taj',
  'tak', 'tal', 'tam', 'tan', 'tap', 'tar', 'tas', 'tat', 'tau', 'taw',
  'tay', 'teb', 'ted', 'teg', 'teh', 'tek', 'tel', 'tem', 'ten', 'tep',
  'ter', 'tes', 'tet', 'tia', 'tid', 'tig', 'tik', 'til', 'tim', 'tin',
  'tip', 'tir', 'tis', 'tit', 'tua', 'tub', 'tuh', 'tuj', 'tuk', 'tul',
  'tum', 'tun', 'tup', 'tur', 'tus', 'tut', 'uan', 'uar', 'uat', 'uba',
  'ubi', 'ubu', 'uca', 'ucu', 'uda', 'ude', 'udi', 'udo', 'uga', 'ugi',
  'uha', 'uhu', 'uji', 'uju', 'uka', 'uke', 'uki', 'uku', 'ula', 'uli',
  'ulu', 'uma', 'umb', 'ume', 'umi', 'ump', 'umu', 'una', 'und', 'une',
  'ung', 'uni', 'unk', 'unt', 'upa', 'upu', 'ura', 'urb', 'ure', 'urg',
  'uri', 'urn', 'uro', 'urs', 'uru', 'usa', 'use', 'usi', 'uso', 'usu',
  'uta', 'ute', 'uti', 'uto', 'utu', 'wal', 'wan', 'war', 'was', 'wat',
  'wak', 'yah', 'yai', 'yak', 'yan', 'yar', 'yas', 'yat', 'yuk', 'yun'
];

// Common trigrams in English
export const ENGLISH_TRIGRAMS = [
  'the', 'and', 'ing', 'her', 'hat', 'his', 'tha', 'ere', 'for', 'ent',
  'ion', 'ter', 'was', 'you', 'ith', 'ver', 'all', 'wit', 'thi', 'tio'
];

// Common 4-grams in Indonesian (MOST POWERFUL for pattern detection!)
export const INDONESIAN_QUADGRAMS = [
  // Ultra-common 4-letter sequences (frequency-based)
  'yang', 'ukan', 'akan', 'tkan', 'atan', 'anya', 'alam', 'anga', 'anta',
  'arat', 'arta', 'asan', 'atas', 'awan', 'bagi', 'baha', 'baru', 'bawa',
  'beda', 'bela', 'beli', 'belu', 'bene', 'bera', 'beri', 'besa', 'biar',
  'bisa', 'buka', 'buku', 'cari', 'coba', 'dala', 'dapa', 'dara', 'dari',
  'deng', 'deri', 'dong', 'gian', 'guru', 'hadi', 'hany', 'hara', 'hari',
  'hasi', 'hata', 'hati', 'ingg', 'jadi', 'jala', 'jang', 'jara', 'juga',
  
  // Action patterns (verbs)
  'meng', 'meny', 'mela', 'meli', 'mema', 'memi', 'menu', 'mena', 'mene',
  'ber', 'bera', 'berb', 'berc', 'berd', 'berg', 'berh', 'berj', 'berk',
  'berl', 'berm', 'bern', 'berp', 'berr', 'bers', 'bert', 'berw',
  'dila', 'dike', 'dita', 'ditu', 'dibe', 'dica', 'dide', 'dija', 'diki',
  
  // Common endings
  'ikan', 'nkan', 'rkan', 'lkan', 'pkan', 'tkan', 'skan', 'mkan',
  'nnya', 'anya', 'inya', 'uny', 'enya', 'knya', 'tnya', 'snya',
  'lagi', 'lalu', 'lama', 'lain', 'laku', 'laut', 'lama', 'lagi',
  
  // Time & location
  'kali', 'kami', 'kamu', 'kana', 'kapa', 'kara', 'kasi', 'kata', 'kawa',
  'kemu', 'kena', 'kepa', 'kera', 'keta', 'kini', 'kita', 'kota', 'kudu',
  'saat', 'saba', 'saha', 'saja', 'saka', 'sala', 'sama', 'samp', 'sang',
  'sapa', 'sara', 'sari', 'sasa', 'satu', 'sawa', 'saya', 'seba', 'sebe',
  'sede', 'sega', 'seja', 'seka', 'seki', 'seko', 'seku', 'sela', 'sele',
  'selu', 'sema', 'seme', 'semo', 'semu', 'sena', 'send', 'seng', 'seni',
  'seor', 'sepa', 'sepe', 'sepi', 'sepu', 'sera', 'sere', 'seri', 'sero',
  'sert', 'seru', 'sesa', 'sese', 'sesi', 'seta', 'sete', 'seti', 'setu',
  'sewa', 'sial', 'sian', 'siap', 'siar', 'siat', 'sibu', 'sida', 'siga',
  'sigu', 'sika', 'siku', 'sila', 'sili', 'sima', 'simo', 'sina', 'sing',
  'sini', 'sino', 'sipa', 'sira', 'siri', 'sisa', 'sisi', 'sist', 'sita',
  'situ', 'suar', 'suda', 'suka', 'suku', 'sula', 'sulu', 'suma', 'sume',
  'sumu', 'suna', 'sung', 'supe', 'sura', 'sure', 'suri', 'suru', 'susa',
  'susu', 'suta', 'sutu',
  
  // Objects & concepts
  'maha', 'mahi', 'main', 'mair', 'maja', 'maju', 'maka', 'maki', 'mako',
  'maku', 'mala', 'mali', 'malu', 'mama', 'mami', 'mana', 'mand', 'mane',
  'mang', 'mani', 'mans', 'mant', 'manu', 'mara', 'marg', 'mari', 'mark',
  'mars', 'masa', 'mase', 'masi', 'mask', 'maso', 'masu', 'mata', 'mate',
  'mati', 'mato', 'matu', 'maut', 'maya', 'mayu', 'meli', 'mema', 'mena',
  'muda', 'muji', 'muka', 'mula', 'mulu', 'mumi', 'mump', 'mung', 'munt',
  'mura', 'muri', 'muru', 'musa', 'muse', 'musi', 'musk', 'must', 'musu',
  'muta', 'mute', 'muti', 'mutu',
  
  // People & relations
  'naga', 'nahi', 'naka', 'nala', 'nama', 'namu', 'nana', 'nand', 'nang',
  'nant', 'napa', 'nara', 'nari', 'nasa', 'nasi', 'nata', 'nawa', 'neka',
  'nema', 'neng', 'nera', 'ngan', 'ngap', 'ngar', 'ngat', 'ngau', 'ngga',
  'ngge', 'nggi', 'nggo', 'nggu', 'ngin', 'ngka', 'ngki', 'ngko', 'ngku',
  'ngom', 'ngor', 'ohra', 'olah', 'oleh', 'oles', 'ompa', 'onal', 'onde',
  'oper', 'opos', 'oran', 'orat', 'orga', 'orke', 'orma', 'orna', 'oros',
  
  // Prepositions & connectors
  'pada', 'paga', 'pagi', 'paha', 'pait', 'paka', 'paki', 'paku', 'pala',
  'pali', 'palu', 'pama', 'pami', 'pana', 'pand', 'pang', 'pani', 'panj',
  'pant', 'papa', 'papi', 'para', 'pari', 'park', 'paro', 'part', 'paru',
  'pasa', 'pase', 'pasi', 'paso', 'past', 'pasu', 'pata', 'pate', 'pati',
  'pato', 'patu', 'pawa', 'peng', 'pera', 'perd', 'pere', 'perg', 'perh',
  'peri', 'perk', 'perl', 'perm', 'pern', 'pero', 'perp', 'pers', 'pert',
  'peru', 'perw', 'peta', 'peti', 'petu', 'piki', 'pila', 'pili', 'pilu',
  'pind', 'ping', 'pini', 'pint', 'pipi', 'pira', 'piri', 'pisa', 'pisi',
  'pist', 'pita', 'piti', 'pitu',
  
  // More patterns
  'raga', 'ragi', 'ragu', 'raha', 'rahi', 'raja', 'raji', 'raju', 'raka',
  'raki', 'raku', 'rama', 'rami', 'ramp', 'ramu', 'rana', 'rand', 'rang',
  'rani', 'rank', 'rans', 'rant', 'ranu', 'rapa', 'rapi', 'rapu', 'rara',
  'rari', 'raru', 'rasa', 'rase', 'rasi', 'raso', 'rasu', 'rata', 'rate',
  'rati', 'rato', 'ratu', 'rawa', 'raya', 'rayu', 'reba', 'rebu', 'reda',
  'redi', 'redu', 'reka', 'reko', 'rela', 'reli', 'relo', 'rema', 'remi',
  'remo', 'remu', 'rena', 'renc', 'rend', 'reng', 'reni', 'renj', 'renk',
  'rens', 'rent', 'repa', 'repo', 'repu', 'resa', 'rese', 'resi', 'reso',
  'resp', 'rest', 'resu', 'reta', 'rete', 'reti', 'reto', 'retu', 'rewa',
  'rewo', 'riah', 'riak', 'rial', 'riam', 'rian', 'riau', 'riba', 'ribu',
  'rida', 'ridu', 'riha', 'riji', 'riku', 'rima', 'rimi', 'rimu', 'rina',
  'rind', 'ring', 'rini', 'rink', 'rins', 'rint', 'rinu', 'riot', 'ripa',
  'ripu', 'risa', 'risi', 'riso', 'rist', 'rita', 'riti', 'ritu', 'riwa',
  'riwo', 'roba', 'robo', 'roda', 'rodi', 'roga', 'roha', 'rohi', 'roja',
  'roka', 'roku', 'roma', 'romo', 'rona', 'rong', 'ront', 'ropa', 'ropi',
  'roro', 'rosa', 'rose', 'rosi', 'roso', 'rost', 'rota', 'roti', 'roto',
  'rotu', 'ruba', 'rubi', 'rubu', 'ruda', 'ruga', 'rugi', 'ruhu', 'ruja',
  'ruku', 'ruma', 'rumi', 'rumu', 'runa', 'rund', 'rung', 'runi', 'runs',
  'runt', 'rupa', 'rupi', 'rusa', 'rusi', 'rusu', 'ruta', 'ruti', 'rutu',
  'ruwa',
  
  // More common patterns
  'taba', 'tabi', 'tabu', 'taci', 'tada', 'tadi', 'tadu', 'taha', 'tahi',
  'tahu', 'tahu', 'taja', 'taji', 'taka', 'taki', 'taku', 'tala', 'tali',
  'talu', 'tama', 'tami', 'tamu', 'tana', 'tand', 'tang', 'tani', 'tanj',
  'tank', 'tans', 'tant', 'tanu', 'tapa', 'tapi', 'tapu', 'tara', 'tari',
  'taro', 'taru', 'tasa', 'tata', 'tate', 'tati', 'tato', 'tatu', 'tawa',
  'tawi', 'tawo', 'tayu', 'teba', 'tebe', 'tebi', 'tebo', 'tebu', 'tega',
  'teka', 'teki', 'teko', 'tela', 'tele', 'teli', 'telo', 'telu', 'tema',
  'teme', 'temi', 'temp', 'temu', 'tena', 'tend', 'teng', 'teng', 'teng',
  'teni', 'tens', 'tent', 'tenu', 'tepa', 'tepe', 'tepi', 'tepo', 'tepu',
  'tera', 'terb', 'terc', 'terd', 'tere', 'terg', 'terh', 'teri', 'terj',
  'terk', 'terl', 'term', 'tern', 'tero', 'terp', 'terr', 'ters', 'tert',
  'teru', 'terw', 'teta', 'teti', 'teto', 'tetu', 'tiba', 'tibi', 'tibu',
  'tida', 'tiga', 'tigl', 'tigi', 'tiha', 'tihi', 'tika', 'tiki', 'tiku',
  'tila', 'tili', 'tilu', 'tima', 'timi', 'timo', 'timu', 'tina', 'tind',
  'ting', 'tini', 'tink', 'tins', 'tint', 'tinu', 'tipa', 'tipi', 'tipu',
  'tira', 'tiri', 'tiru', 'tisa', 'tisi', 'titi', 'titu', 'tiwa', 'toha',
  'toka', 'toki', 'toko', 'tola', 'tole', 'toli', 'tolo', 'tolu', 'toma',
  'tomi', 'tomu', 'tona', 'tong', 'toni', 'tons', 'topa', 'tope', 'topi',
  'topo', 'topu', 'tora', 'tore', 'tori', 'toro', 'tors', 'tort', 'toru',
  'tota', 'toto', 'towe', 'tuah', 'tuba', 'tube', 'tubi', 'tubo', 'tubu',
  'tuda', 'tuga', 'tuha', 'tuhu', 'tuju', 'tuka', 'tuki', 'tuku', 'tula',
  'tuli', 'tulo', 'tulu', 'tuma', 'tumb', 'tumi', 'tumo', 'tumu', 'tuna',
  'tund', 'tung', 'tuni', 'tunj', 'tuns', 'tunt', 'tunu', 'tupa', 'tupi',
  'tupu', 'tura', 'turi', 'turn', 'turo', 'turu', 'tusa', 'tusi', 'tusu',
  'tuta', 'tute', 'tuti', 'tuto', 'tutu', 'tuwa',
  
  // Final batch
  'untu', 'wakt', 'wang', 'wara', 'wari', 'warn', 'waru', 'wasa', 'wasi',
  'wata', 'wati', 'watu', 'wawa', 'wawo', 'waya', 'yait', 'yaki', 'yaku',
  'yang', 'yani', 'yayi', 'yuda', 'yudi', 'yuga', 'yuhu', 'yuki', 'yuku',
  'yuna', 'yuni', 'yuno', 'yupe', 'yura', 'yuri', 'yuru', 'yusa', 'yusi',
  'yuta', 'yuti', 'yutu'
];

// Common 4-grams in English
export const ENGLISH_QUADGRAMS = [
  'that', 'ther', 'with', 'tion', 'here', 'ould', 'ight', 'have', 'hich',
  'whic', 'this', 'thin', 'they', 'atio', 'ever', 'from', 'ough', 'were',
  'hing', 'ment'
];

// Common 5-grams in Indonesian (ULTIMATE ACCURACY!)
export const INDONESIAN_PENTAGRAMS = [
  // Super common 5-letter sequences
  'tidak', 'untuk', 'dengan', 'adalah', 'dalam', 'dapat', 'akan', 'sudah',
  'jangan', 'sering', 'kadang', 'selalu', 'juga', 'bahwa', 'salah', 'benar',
  'banyak', 'sedikit', 'semua', 'harus', 'boleh', 'bisa', 'jadi',
  'masih', 'belum', 'telah', 'sedang', 'lagi', 'pernah', 'akan',
  'kembali', 'pergi', 'datang', 'pulang', 'balik', 'tiba', 'sampai',
  'mulai', 'akhir', 'awal', 'tengah', 'antara', 'selama', 'hingga',
  'rumah', 'sekolah', 'kantor', 'pasar', 'taman', 'jalan', 'kota',
  'kalau', 'karena', 'sebab', 'makanya', 'soalnya', 'jadinya', 'terus',
  'tapi', 'namun', 'tetapi', 'atau', 'serta', 'bahkan', 'hanya',
  'saja', 'doang', 'banget', 'sangat', 'amat', 'sekali', 'paling',
  'lebih', 'kurang', 'cukup', 'agak', 'rada', 'lumayan', 'hampir',
  'gimana', 'kenapa', 'kapan', 'dimana', 'kemana', 'siapa', 'berapa',
  'sekarang', 'nanti', 'besok', 'kemarin', 'tadi', 'barusan', 'lusa',
  'orang', 'anak', 'bapak', 'mama', 'papa', 'kakak', 'adik', 'teman',
  'makan', 'minum', 'tidur', 'bangun', 'jalan', 'lari', 'duduk', 'berdiri',
  'baca', 'tulis', 'lihat', 'dengar', 'bicara', 'kata', 'cerita', 'tanya',
  'besar', 'kecil', 'tinggi', 'rendah', 'panjang', 'pendek', 'lebar', 'sempit',
  'baik', 'buruk', 'bagus', 'jelek', 'cantik', 'ganteng', 'indah', 'kotor',
  'cepat', 'lambat', 'lama', 'sebentar', 'jauh', 'dekat', 'panas', 'dingin'
];

// Common word pairs in Indonesian (words that frequently appear together)
export const INDONESIAN_WORD_PAIRS = [
  'tidak bisa', 'tidak boleh', 'tidak akan', 'tidak ada', 'tidak mau',
  'sudah tidak', 'belum bisa', 'belum ada', 'masih ada', 'masih bisa',
  'yang baik', 'yang bagus', 'yang lain', 'yang baru', 'yang lama',
  'di rumah', 'di sekolah', 'di kantor', 'di jalan', 'di sini', 'di situ',
  'ke rumah', 'ke sekolah', 'ke kantor', 'ke sana', 'ke sini',
  'dari rumah', 'dari sekolah', 'dari sana', 'dari sini',
  'akan pergi', 'akan datang', 'akan pulang', 'akan balik',
  'sudah pergi', 'sudah datang', 'sudah pulang', 'sudah selesai',
  'bisa bisa', 'bisa saja', 'boleh boleh', 'mau mau',
  'apa apa', 'siapa siapa', 'gimana gimana', 'kenapa kenapa',
  'sama sama', 'beda beda', 'lain lain',
  'banyak sekali', 'sangat banyak', 'terlalu banyak',
  'sangat baik', 'sangat bagus', 'sangat senang',
  // New additions - daily conversation pairs
  'udah makan', 'udah belum', 'gimana dong', 'gitu deh', 'gitu sih',
  'kayak gini', 'kayak gitu', 'kaya gimana', 'kok bisa', 'kok gitu',
  'soalnya itu', 'makanya jangan', 'terus gimana', 'terus apa',
  'aja deh', 'aja lah', 'dong ya', 'sih kan', 'lah ya',
  'main game', 'nonton film', 'dengerin musik', 'baca buku',
  'jalan-jalan', 'makan siang', 'makan malam', 'minum kopi',
  'lagi ngapain', 'lagi kerja', 'lagi belajar', 'lagi istirahat',
  'capek banget', 'bosan banget', 'seneng banget', 'lucu banget'
];

// HEXAGRAMS (6-letter sequences) - ULTRA RARE, ULTRA POWERFUL!
export const INDONESIAN_HEXAGRAMS = [
  // Super specific Indonesian patterns (6+ letter words)
  'sekolah', 'dengan', 'adalah', 'karena', 'kenapa', 'kapan',
  'dimana', 'kemana', 'gimana', 'berapa', 'belum', 'sudah',
  'masih', 'sedang', 'pernah', 'sering', 'kadang', 'selalu',
  'jangan', 'harus', 'boleh', 'rumah', 'kantor', 'pasar',
  'jalan', 'teman', 'orang', 'makan', 'minum', 'tidur',
  'bangun', 'kerja', 'besar', 'kecil', 'bagus', 'jelek',
  'cantik', 'ganteng', 'cepat', 'lambat', 'panas', 'dingin',
  'senang', 'sedih', 'marah', 'takut', 'bahagia', 'sayang',
  // Modern/tech
  'kompor', 'kulkas', 'laptop', 'gaming', 'whatsapp', 'instagram',
  'youtube', 'facebook', 'google', 'gojek', 'spotify', 'twitter',
  // Conversational
  'nonton', 'dengerin', 'ngobrol', 'ngomong', 'curhat', 'banget',
  'doang', 'soalnya', 'makanya', 'jadinya', 'terus',
  // Cities
  'indonesia', 'jakarta', 'bandung', 'surabaya', 'yogyakarta', 'medan',
  // Longer meaningful words
  'penting', 'banyak', 'sedikit', 'semua', 'kembali', 'sampai',
  'hingga', 'antara', 'selama', 'selain', 'sendiri', 'bersama',
  'bareng', 'langsung', 'sekitar', 'sekarang', 'kemarin', 'besok',
  // Actions
  'membaca', 'menulis', 'bekerja', 'bermain', 'belajar', 'melihat',
  'mendengar', 'berbicara', 'berjalan', 'berlari', 'mengirim',
  // Common phrases
  'terima', 'kasih', 'maaf', 'please', 'tolong', 'bantuan',
  'selamat', 'pagi', 'siang', 'sore', 'malam',
  // Objects
  'komputer', 'telepon', 'handphone', 'sepeda', 'motor', 'mobil',
  'pesawat', 'kereta', 'pakaian', 'celana', 'sepatu', 'tangan'
];

// Letter frequency in Indonesian (percentage)
export const INDONESIAN_LETTER_FREQ = {
  'a': 19.0, 'n': 10.5, 'i': 9.8, 'e': 8.9, 'r': 6.9,
  't': 6.3, 'u': 6.2, 's': 5.3, 'k': 4.8, 'd': 4.5,
  'l': 4.0, 'm': 3.8, 'g': 3.5, 'p': 3.2, 'b': 2.8,
  'o': 2.5, 'h': 2.3, 'y': 2.0, 'j': 1.8, 'w': 1.5,
  'c': 1.2, 'f': 0.8, 'v': 0.5, 'z': 0.3, 'q': 0.1, 'x': 0.1
};

// Letter frequency in English (percentage)
export const ENGLISH_LETTER_FREQ = {
  'e': 12.7, 't': 9.1, 'a': 8.2, 'o': 7.5, 'i': 7.0,
  'n': 6.7, 's': 6.3, 'h': 6.1, 'r': 6.0, 'd': 4.3,
  'l': 4.0, 'c': 2.8, 'u': 2.8, 'm': 2.4, 'w': 2.4,
  'f': 2.2, 'g': 2.0, 'y': 2.0, 'p': 1.9, 'b': 1.5,
  'v': 1.0, 'k': 0.8, 'j': 0.2, 'x': 0.2, 'q': 0.1, 'z': 0.1
};
