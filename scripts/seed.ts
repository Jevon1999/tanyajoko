import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Real Jogja destinations with complete data
const destinations = [
  {
    name: 'Candi Prambanan',
    location: 'Sleman, Yogyakarta',
    lat: -7.752019,
    lng: 110.491467,
    category: 'budaya',
    description: 'Kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9. Terdiri dari 240 candi dengan arsitektur megah dan relief yang menceritakan kisah Ramayana.',
    price_range: '50k-100k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07',
    pros: ['Arsitektur megah', 'Pemandangan sunset indah', 'Nilai sejarah tinggi', 'Terawat dengan baik'],
    cons: ['Ramai saat weekend', 'Panas siang hari', 'Tiket cukup mahal'],
    recommendation_for: ['Pecinta sejarah', 'Fotografer', 'Wisatawan budaya', 'Keluarga'],
    map_link: 'https://maps.google.com/?q=-7.752019,110.491467'
  },
  {
    name: 'Tebing Breksi',
    location: 'Sleman, Yogyakarta',
    lat: -7.813889,
    lng: 110.507778,
    category: 'alam',
    description: 'Bekas area pertambangan batu kapur yang kini menjadi spot foto aesthetic dengan tebing-tebing batu hasil pahat. Tempat favorit anak muda untuk hunting foto.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    pros: ['Tiket murah', 'Spot foto unik', 'Sunset view bagus', 'Lokasi tidak terlalu jauh'],
    cons: ['Tidak ada teduhan', 'Panas di siang hari', 'Tangga cukup tinggi'],
    recommendation_for: ['Fotografer', 'Anak muda', 'Solo traveler', 'Pecinta sunset'],
    map_link: 'https://maps.google.com/?q=-7.813889,110.507778'
  },
  {
    name: 'Malioboro',
    location: 'Kota Yogyakarta',
    lat: -7.792926,
    lng: 110.365349,
    category: 'modern',
    description: 'Jalan legendaris di jantung kota Jogja yang menjadi pusat wisata belanja dan kuliner. Ramai pengunjung dari pagi hingga malam dengan berbagai pedagang kaki lima.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1555400038-63f526b491e0?w=800&auto=format&fit=crop',
    pros: ['Pusat kota', 'Banyak kuliner', 'Belanja murah', 'Akses mudah', '24 jam'],
    cons: ['Sangat ramai', 'Rawan copet', 'Macet', 'Harga turis'],
    recommendation_for: ['Belanja', 'Wisatawan pertama kali', 'Pencari kuliner', 'Backpacker'],
    map_link: 'https://maps.google.com/?q=-7.792926,110.365349'
  },
  {
    name: 'Pantai Parangtritis',
    location: 'Bantul, Yogyakarta',
    lat: -8.024926,
    lng: 110.329674,
    category: 'alam',
    description: 'Pantai selatan terkenal dengan ombak besar dan legenda Nyi Roro Kidul. Menawarkan pemandangan sunset spektakuler dan aktivitas naik ATV atau delman.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    pros: ['Sunset indah', 'Pantai luas', 'Banyak aktivitas', 'Pemandangan eksotis'],
    cons: ['Ombak berbahaya', 'Tidak bisa berenang', 'Jauh dari kota', 'Angin kencang'],
    recommendation_for: ['Pecinta pantai', 'Fotografer', 'Keluarga', 'Adventure seeker'],
    map_link: 'https://maps.google.com/?q=-8.024926,110.329674'
  },
  {
    name: 'Keraton Yogyakarta',
    location: 'Kota Yogyakarta',
    lat: -7.805373,
    lng: 110.364343,
    category: 'budaya',
    description: 'Istana resmi Sultan Yogyakarta yang masih berfungsi hingga kini. Pengunjung dapat melihat arsitektur Jawa klasik dan koleksi pusaka keraton.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1548013146-72479768bada',
    pros: ['Nilai sejarah', 'Arsitektur unik', 'Pertunjukan budaya', 'Di tengah kota'],
    cons: ['Jam buka terbatas', 'Tidak boleh foto di area tertentu', 'Ramai hari libur'],
    recommendation_for: ['Pecinta sejarah', 'Wisatawan budaya', 'Pelajar', 'Keluarga'],
    map_link: 'https://maps.google.com/?q=-7.805373,110.364343'
  },
  {
    name: 'Taman Sari',
    location: 'Kota Yogyakarta',
    lat: -7.810226,
    lng: 110.359139,
    category: 'sejarah',
    description: 'Bekas taman dan kolam pemandian keluarga Sultan dengan arsitektur unik perpaduan Jawa-Portugis-Eropa. Terkenal dengan lorong-lorong bawah tanah yang misterius.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24',
    pros: ['Arsitektur unik', 'Spot foto bagus', 'Nilai sejarah', 'Tiket murah'],
    cons: ['Kurang terawat', 'Lorong gelap', 'Bau tidak sedap di beberapa area'],
    recommendation_for: ['Fotografer', 'Pecinta sejarah', 'Backpacker', 'Anak muda'],
    map_link: 'https://maps.google.com/?q=-7.810226,110.359139'
  },
  {
    name: 'Candi Borobudur',
    location: 'Magelang, Jawa Tengah',
    lat: -7.607396,
    lng: 110.203751,
    category: 'budaya',
    description: 'Candi Buddha terbesar di dunia dan situs warisan dunia UNESCO. Dibangun abad ke-8 dengan 2.672 panel relief dan 504 arca Buddha.',
    price_range: '>200k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1555217851-8c6836abb0c7',
    pros: ['Warisan dunia', 'Pemandangan luar biasa', 'Sunrise hunting', 'Nilai spiritual'],
    cons: ['Tiket mahal', 'Jauh dari Jogja', 'Ramai sekali', 'Panas terik'],
    recommendation_for: ['Pecinta sejarah', 'Spiritual seeker', 'Fotografer', 'Wisatawan asing'],
    map_link: 'https://maps.google.com/?q=-7.607396,110.203751'
  },
  {
    name: 'Goa Pindul',
    location: 'Gunungkidul, Yogyakarta',
    lat: -7.963611,
    lng: 110.641111,
    category: 'alam',
    description: 'Wisata cave tubing dengan menyusuri sungai bawah tanah menggunakan ban. Pengalaman unik menjelajahi goa dengan pemandangan stalaktit dan stalakmit.',
    price_range: '50k-100k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    pros: ['Pengalaman unik', 'Seru dan menantang', 'Alam masih asri', 'Tour guide ramah'],
    cons: ['Basah kuyup', 'Jauh dari kota', 'Harus booking', 'Tidak bisa solo'],
    recommendation_for: ['Adventure seeker', 'Keluarga', 'Anak muda', 'Pecinta alam'],
    map_link: 'https://maps.google.com/?q=-7.963611,110.641111'
  },
  {
    name: 'Hutan Pinus Mangunan',
    location: 'Bantul, Yogyakarta',
    lat: -7.933333,
    lng: 110.416667,
    category: 'alam',
    description: 'Hutan pinus dengan spot foto instagramable dan berbagai wahana seperti gardu pandang dan jembatan kayu. Udara sejuk dengan pemandangan perbukitan.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    pros: ['Udara sejuk', 'Spot foto aesthetic', 'Sunrise/sunset bagus', 'Wahana lengkap'],
    cons: ['Jauh dari kota', 'Jalan menanjak', 'Ramai weekend', 'Parkir sempit'],
    recommendation_for: ['Fotografer', 'Anak muda', 'Pecinta alam', 'Couple'],
    map_link: 'https://maps.google.com/?q=-7.933333,110.416667'
  },
  {
    name: 'Alun-Alun Kidul',
    location: 'Kota Yogyakarta',
    lat: -7.812972,
    lng: 110.364333,
    category: 'modern',
    description: 'Alun-alun dengan lampu warna-warni dan berbagai wahana seperti becak hias dan odong-odong. Terkenal dengan tradisi Masangin untuk melewati 2 pohon beringin dengan mata tertutup.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
    pros: ['Gratis masuk', 'Banyak wahana', 'Ramai hingga malam', 'Kuliner murah'],
    cons: ['Sangat ramai malam minggu', 'Wahana berbayar', 'Parkir jauh'],
    recommendation_for: ['Keluarga', 'Anak-anak', 'Backpacker', 'Pencari kuliner'],
    map_link: 'https://maps.google.com/?q=-7.812972,110.364333'
  },
  {
    name: 'Bukit Bintang',
    location: 'Gunungkidul, Yogyakarta',
    lat: -7.954444,
    lng: 110.573056,
    category: 'alam',
    description: 'Spot melihat bintang dan milky way terbaik di Jogja. Pemandangan langit malam yang spektakuler jauh dari polusi cahaya kota.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78',
    pros: ['Langit malam jernih', 'Cocok stargazing', 'Sunset indah', 'Tidak terlalu ramai'],
    cons: ['Sangat jauh', 'Jalan sulit', 'Minim fasilitas', 'Dingin malam hari'],
    recommendation_for: ['Fotografer astronomi', 'Adventure seeker', 'Couple', 'Pecinta alam'],
    map_link: 'https://maps.google.com/?q=-7.954444,110.573056'
  },
  {
    name: 'Pantai Indrayanti',
    location: 'Gunungkidul, Yogyakarta',
    lat: -8.153889,
    lng: 110.614167,
    category: 'alam',
    description: 'Pantai dengan pasir putih dan air laut biru jernih. Terdapat banyak gazebo dan resto tepi pantai dengan view laut yang indah.',
    price_range: '50k-100k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    pros: ['Pantai bersih', 'Air jernih', 'Fasilitas lengkap', 'Resto view laut'],
    cons: ['Jauh dari kota', 'Tiket masuk + parkir', 'Ramai weekend', 'Ombak kadang besar'],
    recommendation_for: ['Pecinta pantai', 'Keluarga', 'Couple', 'Fotografer'],
    map_link: 'https://maps.google.com/?q=-8.153889,110.614167'
  },
  {
    name: 'Museum Ullen Sentalu',
    location: 'Sleman, Yogyakarta',
    lat: -7.616667,
    lng: 110.433333,
    category: 'budaya',
    description: 'Museum berkelas internasional yang menyimpan koleksi kebudayaan dan sejarah dinasti Mataram. Dikelola dengan sangat profesional dan artistik.',
    price_range: '50k-100k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e1d8',
    pros: ['Koleksi berkelas', 'Pengelolaan profesional', 'Tour guide bagus', 'Suasana tenang'],
    cons: ['Tiket relatif mahal', 'Tidak boleh foto', 'Jauh dari kota', 'Jam buka terbatas'],
    recommendation_for: ['Pecinta sejarah', 'Wisatawan budaya', 'Dewasa', 'Pecinta seni'],
    map_link: 'https://maps.google.com/?q=-7.616667,110.433333'
  },
  {
    name: 'Heha Sky View',
    location: 'Gunungkidul, Yogyakarta',
    lat: -7.893333,
    lng: 110.553889,
    category: 'modern',
    description: 'Spot foto dengan berbagai wahana instagramable dan view pegunungan karst. Tempat hits untuk hunting foto dengan berbagai properti unik.',
    price_range: '50k-100k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    pros: ['Spot foto keren', 'View pegunungan', 'Wahana banyak', 'Kafe bagus'],
    cons: ['Tiket mahal', 'Ramai sekali', 'Jauh dari kota', 'Antri foto lama'],
    recommendation_for: ['Fotografer', 'Anak muda', 'Instagrammer', 'Couple'],
    map_link: 'https://maps.google.com/?q=-7.893333,110.553889'
  },
  {
    name: 'Tugu Jogja',
    location: 'Kota Yogyakarta',
    lat: -7.782926,
    lng: 110.367349,
    category: 'modern',
    description: 'Ikon kota Yogyakarta yang terletak di perempatan jalan utama. Monumen berbentuk tugu dengan ornamen pusaka pal yang menjadi simbol Jogja.',
    price_range: 'gratis',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1548013146-72479768bada',
    pros: ['Gratis', 'Ikon Jogja', 'Akses mudah', 'Ramai 24 jam'],
    cons: ['Tidak ada fasilitas', 'Ramai kendaraan', 'Hanya spot foto', 'Siang panas'],
    recommendation_for: ['Wisatawan pertama kali', 'Fotografer', 'Transit'],
    map_link: 'https://maps.google.com/?q=-7.782926,110.367349'
  },
  {
    name: 'Kali Biru',
    location: 'Sleman, Yogyakarta',
    lat: -7.742222,
    lng: 110.443056,
    category: 'alam',
    description: 'Kolam mata air dengan warna biru jernih yang berasal dari mata air pegunungan Merapi. Air sangat dingin dan jernih dengan kedalaman hingga 4 meter.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    pros: ['Air jernih', 'Sejuk', 'Tiket murah', 'Spot foto unik'],
    cons: ['Tidak boleh berenang', 'Area kecil', 'Ramai weekend', 'Parkir terbatas'],
    recommendation_for: ['Fotografer', 'Keluarga', 'Anak muda', 'Wisata singkat'],
    map_link: 'https://maps.google.com/?q=-7.742222,110.443056'
  },
  {
    name: 'Ratu Boko',
    location: 'Sleman, Yogyakarta',
    lat: -7.771111,
    lng: 110.491111,
    category: 'sejarah',
    description: 'Kompleks situs purbakala di atas bukit dengan pemandangan Candi Prambanan dan sunset spektakuler. Bekas istana atau padepokan zaman Mataram Kuno.',
    price_range: '50k-100k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07',
    pros: ['Sunset terbaik', 'View Prambanan', 'Nilai sejarah', 'Luas dan tenang'],
    cons: ['Tiket gabung Prambanan mahal', 'Jalan menanjak', 'Minim teduhan'],
    recommendation_for: ['Fotografer', 'Pecinta sejarah', 'Sunset hunter', 'Couple'],
    map_link: 'https://maps.google.com/?q=-7.771111,110.491111'
  },
  {
    name: 'Masjid Syuhada',
    location: 'Kota Yogyakarta',
    lat: -7.800556,
    lng: 110.363889,
    category: 'religi',
    description: 'Masjid bersejarah dengan arsitektur perpaduan Jawa dan Islam. Terletak di dalam kompleks Keraton Yogyakarta dan masih digunakan untuk ibadah.',
    price_range: 'gratis',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769',
    pros: ['Gratis', 'Nilai sejarah', 'Arsitektur unik', 'Suasana tenang'],
    cons: ['Jam buka terbatas', 'Harus sopan berpakaian', 'Tidak boleh ramai'],
    recommendation_for: ['Wisata religi', 'Pecinta sejarah', 'Muslim', 'Arsitektur lover'],
    map_link: 'https://maps.google.com/?q=-7.800556,110.363889'
  },
  {
    name: 'Pantai Timang',
    location: 'Gunungkidul, Yogyakarta',
    lat: -8.145,
    lng: 110.545,
    category: 'alam',
    description: 'Pantai dengan wahana gondola ekstrim menuju pulau karang di tengah laut. Pengalaman adrenalin menyeberang dengan tali baja di atas ombak besar.',
    price_range: '50k-100k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0',
    pros: ['Pengalaman unik', 'Adrenalin tinggi', 'View laut spektakuler', 'Lobster segar'],
    cons: ['Berbahaya', 'Tidak untuk anak-anak', 'Sangat jauh', 'Wahana mahal'],
    recommendation_for: ['Adventure seeker', 'Adrenalin junkie', 'Dewasa', 'Berani tinggi'],
    map_link: 'https://maps.google.com/?q=-8.145,110.545'
  },
  {
    name: 'Jogja Bay Waterpark',
    location: 'Sleman, Yogyakarta',
    lat: -7.752778,
    lng: 110.396944,
    category: 'modern',
    description: 'Taman rekreasi air terbesar di Jogja dengan berbagai wahana air modern. Cocok untuk keluarga dengan anak-anak.',
    price_range: '100k-200k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    pros: ['Wahana lengkap', 'Bersih terawat', 'Aman untuk anak', 'Fasilitas bagus'],
    cons: ['Tiket mahal', 'Ramai weekend', 'Makanan mahal', 'Parkir jauh'],
    recommendation_for: ['Keluarga', 'Anak-anak', 'Rombongan', 'Liburan sekolah'],
    map_link: 'https://maps.google.com/?q=-7.752778,110.396944'
  },
  {
    name: 'Pasar Beringharjo',
    location: 'Kota Yogyakarta',
    lat: -7.798611,
    lng: 110.365833,
    category: 'kuliner',
    description: 'Pasar tradisional tertua di Jogja sejak 1758. Pusat oleh-oleh khas Jogja seperti batik, gudeg kaleng, dan aneka jajanan tradisional.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1555400082-5f91de609df3',
    pros: ['Oleh-oleh lengkap', 'Harga bisa tawar', 'Dekat Malioboro', 'Batik murah'],
    cons: ['Panas dan pengap', 'Ramai sekali', 'Pembeli agresif', 'Parkir sulit'],
    recommendation_for: ['Belanja oleh-oleh', 'Pecinta batik', 'Wisatawan', 'Budget traveler'],
    map_link: 'https://maps.google.com/?q=-7.798611,110.365833'
  },
  {
    name: 'Kebun Binatang Gembira Loka',
    location: 'Kota Yogyakarta',
    lat: -7.806111,
    lng: 110.403333,
    category: 'modern',
    description: 'Kebun binatang dengan koleksi satwa lengkap dan konsep modern. Terdapat wahana perahu, kereta keliling, dan berbagai atraksi hewan.',
    price_range: '50k-100k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44',
    pros: ['Koleksi lengkap', 'Terawat baik', 'Wahana banyak', 'Edukatif'],
    cons: ['Luas dan melelahkan', 'Panas siang', 'Weekend ramai', 'Wahana berbayar terpisah'],
    recommendation_for: ['Keluarga', 'Anak-anak', 'Edukasi', 'Weekend'],
    map_link: 'https://maps.google.com/?q=-7.806111,110.403333'
  },
  {
    name: 'Gudeg Yu Djum',
    location: 'Kota Yogyakarta',
    lat: -7.801111,
    lng: 110.364722,
    category: 'kuliner',
    description: 'Warung gudeg legendaris yang buka 24 jam. Gudeg Yu Djum menjadi ikon kuliner Jogja yang wajib dicoba dengan cita rasa autentik.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    pros: ['Buka 24 jam', 'Rasa otentik', 'Harga terjangkau', 'Porsi banyak'],
    cons: ['Antri panjang', 'Tempat sempit', 'Parkir sulit', 'Cepat habis'],
    recommendation_for: ['Pecinta kuliner', 'Wisatawan', 'Pencari gudeg', 'Midnight snack'],
    map_link: 'https://maps.google.com/?q=-7.801111,110.364722'
  },
  {
    name: 'Candi Ijo',
    location: 'Sleman, Yogyakarta',
    lat: -7.778333,
    lng: 110.475,
    category: 'sejarah',
    description: 'Candi tertinggi di Jogja dengan ketinggian 410 mdpl. Menawarkan pemandangan 360 derajat kota Jogja, sawah, dan pegunungan.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24',
    pros: ['View terbaik Jogja', 'Sunrise/sunset indah', 'Tiket murah', 'Tidak terlalu ramai'],
    cons: ['Jalan menanjak', 'Minim fasilitas', 'Akses sulit', 'Panas siang'],
    recommendation_for: ['Sunrise/sunset hunter', 'Fotografer', 'Adventure seeker', 'Pecinta sejarah'],
    map_link: 'https://maps.google.com/?q=-7.778333,110.475'
  },
  {
    name: 'Obelix Hills',
    location: 'Sleman, Yogyakarta',
    lat: -7.738056,
    lng: 110.468056,
    category: 'alam',
    description: 'Bukit dengan spot foto kekinian dan view pegunungan Merapi. Terdapat banyak spot instagramable dengan background alam yang indah.',
    price_range: '<50k',
    rating: 0,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    pros: ['Spot foto aesthetic', 'View Merapi', 'Udara sejukdalam', 'Tidak terlalu jauh'],
    cons: ['Ramai weekend', 'Antri spot foto', 'Jalan menanjak', 'Minim teduhan'],
    recommendation_for: ['Fotografer', 'Anak muda', 'Couple', 'Instagrammer'],
    map_link: 'https://maps.google.com/?q=-7.738056,110.468056'
  }
]

async function seedDestinations() {
  console.log('🌍 Seeding destinations...')
  
  const { data, error } = await supabase
    .from('destinations')
    .insert(destinations)
    .select()

  if (error) {
    console.error('❌ Error seeding destinations:', error.message)
    throw error
  }

  console.log(`✅ Seeded ${data.length} destinations`)
  return data
}

async function seedUsers() {
  console.log('👥 Seeding users...')
  
  const users = [
    { email: 'demo@tanyajoko.com', password: 'demo123', full_name: 'Demo User', has_discount: true },
    { email: 'budi@example.com', password: 'budi123', full_name: 'Budi Santoso', has_discount: true },
    { email: 'siti@example.com', password: 'siti123', full_name: 'Siti Nurhaliza', has_discount: false },
    { email: 'andi@example.com', password: 'andi123', full_name: 'Andi Wijaya', has_discount: true },
    { email: 'dewi@example.com', password: 'dewi123', full_name: 'Dewi Lestari', has_discount: false },
    { email: 'rudi@example.com', password: 'rudi123', full_name: 'Rudi Hartono', has_discount: true },
    { email: 'maya@example.com', password: 'maya123', full_name: 'Maya Sari', has_discount: false },
    { email: 'joko@example.com', password: 'joko123', full_name: 'Joko Widodo', has_discount: true },
    { email: 'rina@example.com', password: 'rina123', full_name: 'Rina Wati', has_discount: false },
    { email: 'guest@tanyajoko.com', password: 'guest123', full_name: 'Guest User', has_discount: false }
  ]

  const createdUsers = []
  
  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: {
        full_name: user.full_name
      }
    })

    if (error) {
      console.log(`⚠️ User ${user.email} might already exist:`, error.message)
      // Try to get existing user
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', user.email)
        .single()
      
      if (existingUser) {
        createdUsers.push(existingUser)
        // Update has_discount
        await supabase
          .from('profiles')
          .update({ has_discount: user.has_discount })
          .eq('id', existingUser.id)
      }
    } else {
      // Update profile with has_discount
      const { data: profile } = await supabase
        .from('profiles')
        .update({ has_discount: user.has_discount })
        .eq('id', data.user.id)
        .select()
        .single()
      
      createdUsers.push(profile)
    }
  }

  console.log(`✅ Seeded/updated ${createdUsers.length} users`)
  return createdUsers
}

async function seedReviews(destinationsList: any[], usersList: any[]) {
  console.log('⭐ Seeding reviews...')
  
  const reviewTemplates = {
    positive: [
      'Tempatnya sangat indah dan instagramable! Recommended banget buat foto-foto.',
      'Pengalaman yang luar biasa! Worth it banget buat dikunjungi.',
      'Fasilitasnya lengkap dan bersih. Staff juga ramah-ramah.',
      'Pemandangannya spektakuler! Perfect spot untuk sunset.',
      'Tiket masuknya worth it dengan apa yang ditawarkan.',
      'Suasananya sangat nyaman dan tenang, cocok untuk relaksasi.',
      'Tempat wisata yang wajib dikunjungi kalau ke Jogja!'
    ],
    neutral: [
      'Tempatnya bagus tapi lumayan ramai pas weekend.',
      'Overall oke, tapi bisa lebih ditingkatkan fasilitasnya.',
      'Standar sih, cukup untuk wisata keluarga.',
      'Biasa aja, nothing special tapi lumayan lah.',
      'Cukup menarik, tapi mungkin tidak akan datang lagi.'
    ],
    negative: [
      'Terlalu ramai dan tidak nyaman. Harga juga kemahalan.',
      'Fasilitasnya kurang terawat dan banyak yang rusak.',
      'Mengecewakan, tidak sesuai ekspektasi dari foto-foto.',
      'Akses menuju lokasi sulit dan jalannya rusak.',
      'Harganya tidak sebanding dengan apa yang ditawarkan.'
    ]
  }

  const conditions = ['ramai', 'sedang', 'sepi', 'panas', 'sejuk', 'hujan', 'berawan']
  const reviews: any[] = []

  // Generate 4-6 reviews per destination
  destinationsList.forEach((dest, destIndex) => {
    const numReviews = Math.floor(Math.random() * 3) + 4 // 4-6 reviews
    
    for (let i = 0; i < numReviews; i++) {
      const user = usersList[Math.floor(Math.random() * usersList.length)]
      const sentimentRoll = Math.random()
      let sentiment: 'positive' | 'neutral' | 'negative'
      let rating: number
      let reviewText: string

      if (sentimentRoll < 0.7) {
        sentiment = 'positive'
        rating = Math.floor(Math.random() * 2) + 4 // 4-5
        reviewText = reviewTemplates.positive[Math.floor(Math.random() * reviewTemplates.positive.length)]
      } else if (sentimentRoll < 0.9) {
        sentiment = 'neutral'
        rating = 3
        reviewText = reviewTemplates.neutral[Math.floor(Math.random() * reviewTemplates.neutral.length)]
      } else {
        sentiment = 'negative'
        rating = Math.floor(Math.random() * 2) + 1 // 1-2
        reviewText = reviewTemplates.negative[Math.floor(Math.random() * reviewTemplates.negative.length)]
      }

      reviews.push({
        destination_id: dest.id,
        user_id: user?.id || null,
        rating,
        review_text: reviewText,
        sentiment,
        keywords: sentiment === 'positive' ? ['bagus', 'recommended', 'indah'] : 
                  sentiment === 'neutral' ? ['biasa', 'standar', 'oke'] : 
                  ['mengecewakan', 'mahal', 'kurang'],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        photos: []
      })
    }
  })

  const { data, error } = await supabase
    .from('reviews')
    .insert(reviews)
    .select()

  if (error) {
    console.error('❌ Error seeding reviews:', error.message)
    throw error
  }

  console.log(`✅ Seeded ${data.length} reviews`)
  return data
}

async function main() {
  console.log('🚀 Starting database seeding...\n')

  try {
    // Test connection
    const { error: connectionError } = await supabase.from('destinations').select('count').limit(1)
    if (connectionError) {
      console.error('❌ Cannot connect to Supabase:', connectionError.message)
      process.exit(1)
    }

    console.log('✅ Connected to Supabase\n')

    // Check if data already exists
    const { count } = await supabase
      .from('destinations')
      .select('*', { count: 'exact', head: true })

    if (count && count > 0) {
      console.log(`⚠️ Database already has ${count} destinations`)
      console.log('Run npm run db:reset to clear and re-seed\n')
      
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })

      const answer = await new Promise<string>((resolve) => {
        readline.question('Continue anyway? (yes/no): ', resolve)
      })
      
      readline.close()

      if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
        console.log('Seeding cancelled')
        process.exit(0)
      }
    }

    // Seed data
    const seededDestinations = await seedDestinations()
    const seededUsers = await seedUsers()
    await seedReviews(seededDestinations, seededUsers)

    console.log('\n🎉 Database seeded successfully!')
    console.log('\nTest accounts:')
    console.log('  demo@tanyajoko.com / demo123 (with discount)')
    console.log('  guest@tanyajoko.com / guest123 (no discount)')

  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  }
}

main()
