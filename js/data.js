/**
 * data.js — Semua data statik aplikasi
 * Seperti "database" lokal. Tidak punya dependensi apapun.
 *
 * Berisi:
 * - MENU_DATA: 16 menu lengkap dengan deskripsi, sejarah, bahan
 * - PAYMENT_METHODS: 8 opsi pembayaran
 * - TABLE_DEFS: 12 definisi meja cafe
 * - existingReservations: data reservasi yang sudah ada (simulasi)
 */

const MENU_DATA = {
  kopi: [
    {
      name: 'Espresso Gayo', price: 28000,
      img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=70',
      desc: 'Single origin biji kopi Arabika dari dataran tinggi Gayo, Aceh. Diseduh dengan teknik espresso menghasilkan rasa earthy, kuat, dengan aftertaste manis.',
      history: 'Kopi Gayo berasal dari Kabupaten Aceh Tengah dan Bener Meriah, tumbuh di ketinggian 1.200–1.700 mdpl. Sejak abad ke-19, petani Gayo menanam kopi dengan metode wet-hulled yang khas, menghasilkan profil rasa bold dan kompleks. Pada 2010, Kopi Gayo mendapatkan sertifikasi Indikasi Geografis pertama untuk kopi di Indonesia.',
      ingredients: ['Biji kopi Arabika Gayo', 'Air mineral 96°C']
    },
    {
      name: 'Kopi Tubruk', price: 18000,
      img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=70',
      desc: 'Kopi tradisional Indonesia diseduh langsung dengan air panas. Ampas kopi dibiarkan mengendap, menghasilkan rasa pekat dan autentik.',
      history: 'Kopi tubruk adalah metode penyeduhan tertua di Indonesia, diperkenalkan era kolonial Belanda abad ke-17. Kata "tubruk" dari bahasa Jawa berarti "menabrak" — biji kopi langsung disiram air mendidih tanpa disaring. Metode ini masih populer di warung kopi tradisional seluruh Indonesia.',
      ingredients: ['Biji kopi Robusta Lampung', 'Gula pasir', 'Air mendidih 100°C']
    },
    {
      name: 'Cappuccino', price: 35000,
      img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=70',
      desc: 'Perpaduan espresso double shot, susu panas steam, dan microfoam lembut. Disajikan dalam cangkir keramik 150ml.',
      history: 'Cappuccino lahir di Italia awal abad ke-20, namanya dari warna jubah biarawan Capuchin. Versi modern populer pasca-PD II seiring mesin espresso bertekanan tinggi. Di Indonesia populer sejak 1990-an bersama masuknya coffee shop modern.',
      ingredients: ['Espresso double shot', 'Susu full cream', 'Microfoam susu']
    },
    {
      name: 'Kopi Susu Aren', price: 32000,
      img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=70',
      desc: 'Cold brew robusta dicampur susu segar dan gula aren pilihan dari Jawa Tengah. Manis alami, creamy, menyegarkan.',
      history: 'Kopi susu aren adalah evolusi kopi susu tradisional Indonesia. Gula aren dari pohon Arenga pinnata telah digunakan berabad-abad di Nusantara. Tren cold brew + gula aren muncul 2015–2017, viral dari Bandung ke seluruh Indonesia, kini bahkan diekspor ke luar negeri.',
      ingredients: ['Cold brew Robusta 12 jam', 'Susu segar', 'Gula aren Jawa Tengah', 'Es batu']
    }
  ],
  minuman: [
    {
      name: 'Es Teh Tarik', price: 22000,
      img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=70',
      desc: 'Teh hitam premium diseduh kuat, dicampur susu kental manis, di-"tarik" berkali-kali menciptakan busa lembut. Disajikan dingin.',
      history: 'Teh tarik berasal dari komunitas India Muslim (Mamak) di Semenanjung Malaya awal abad ke-20. Teknik menarik dari ketinggian mendinginkan minuman sekaligus menciptakan busa. Menyebar ke Asia Tenggara lewat jalur dagang, kini ikonik di Malaysia, Singapura, dan Sumatera.',
      ingredients: ['Teh hitam Ceylon grade A', 'Susu kental manis', 'Es batu']
    },
    {
      name: 'Jus Alpukat', price: 30000,
      img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=70',
      desc: 'Alpukat Ijo Mentega segar dari Wonosobo, diblender dengan susu full cream, gula aren cair, dan es. Kental dan creamy.',
      history: 'Jus alpukat unik untuk Indonesia — di banyak negara alpukat dimakan gurih. Di Indonesia dinikmati sebagai minuman manis sejak 1950-an, khususnya Jawa dan Bali. Alpukat sendiri dibawa ke Nusantara oleh kolonial Belanda abad ke-18 dari Amerika Tengah.',
      ingredients: ['Alpukat Ijo Mentega Wonosobo', 'Susu full cream', 'Gula aren cair', 'Es batu']
    },
    {
      name: 'Lemon Squash', price: 25000,
      img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=70',
      desc: 'Perasan lemon segar, air soda, sirup madu, dan daun mint. Menyegarkan untuk sesi ngobrol panjang.',
      history: 'Lemon squash lahir dari tradisi minuman soda Eropa abad ke-19. Di Indonesia populer sejak 1970-an di warung pantai dan pegunungan. Varian modern dengan mint dan madu berkembang seiring tren "healthy drink" café era 2010-an.',
      ingredients: ['Lemon segar', 'Air soda', 'Sirup madu', 'Daun mint segar', 'Es batu']
    },
    {
      name: 'Matcha Latte', price: 38000,
      img: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=70',
      desc: 'Matcha ceremonial grade dari Uji, Kyoto, dikocok dengan chasen bambu, dituangkan ke atas oat milk steamed. Earthy, creamy, sedikit pahit.',
      history: 'Matcha berasal dari tradisi chado Jepang abad ke-12–14. Teh Camellia sinensis ditanam di tempat teduh 3 minggu lalu digiling batu granit. Matcha latte modern muncul di Barat awal 2000-an dan meledak di Indonesia sekitar 2015–2018.',
      ingredients: ['Matcha ceremonial grade Uji', 'Oat milk', 'Madu', 'Air 80°C']
    }
  ],
  makanan: [
    {
      name: 'Nasi Goreng Kampung', price: 45000,
      img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=70',
      desc: 'Nasi digoreng dengan bumbu rempah tradisional, kecap manis, ayam suwir, telur mata sapi, kerupuk udang, dan acar mentimun.',
      history: 'Nasi goreng dipengaruhi masakan Tionghoa yang dibawa pedagang berabad-abad, berpadu rempah lokal seperti terasi dan cabai rawit. CNN Travel 2017 menempatkannya di posisi #2 makanan terenak dunia. Versi "kampung" merujuk pada bumbu sederhana bawang merah, bawang putih, cabai, dan kecap.',
      ingredients: ['Nasi putih', 'Bawang merah', 'Bawang putih', 'Cabai rawit', 'Kecap manis', 'Terasi', 'Ayam suwir', 'Telur ayam', 'Kerupuk udang', 'Acar mentimun']
    },
    {
      name: 'Roti Bakar Selai', price: 28000,
      img: 'https://images.unsplash.com/photo-1536816579748-4ecb3f03d72a?w=600&q=70',
      desc: 'Roti tawar tebal dibakar bara arang hingga garing keemasan, dioleskan mentega dan pilihan selai: cokelat meses, srikaya homemade, atau blueberry.',
      history: 'Roti bakar berakar dari budaya kopi darat Tionghoa-Melayu di Batavia sejak era kolonial. Warung roti bakar arang pertama dikenal di Glodok dan Kota Tua Jakarta era 1940–1950. Selai srikaya berasal dari tradisi Peranakan dengan pandan, telur, santan, dan gula.',
      ingredients: ['Roti tawar', 'Mentega', 'Selai cokelat / srikaya / blueberry']
    },
    {
      name: 'Pasta Aglio Olio', price: 55000,
      img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=70',
      desc: 'Spaghetti al dente dengan minyak zaitun extra virgin, bawang putih iris, cabai kering, peterseli segar, dan parmesan Parmigiano-Reggiano.',
      history: 'Aglio e Olio ("bawang putih dan minyak" dalam bahasa Italia) adalah pasta paling sederhana dari Napoli, lahir dari cucina povera — masakan rakyat dengan bahan paling dasar. Di Indonesia populer sejak 1990-an seiring masuknya restoran Italia dan café modern.',
      ingredients: ['Spaghetti', 'Minyak zaitun extra virgin', 'Bawang putih', 'Cabai kering', 'Peterseli segar', 'Parmesan Parmigiano-Reggiano', 'Garam laut']
    },
    {
      name: 'Avocado Toast', price: 52000,
      img: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600&q=70',
      desc: 'Sourdough panggang tebal, pasta alpukat muscat dengan lemon dan fleur de sel, telur poach sempurna, dan micro herb segar.',
      history: 'Avocado toast dipopulerkan chef Australia Bill Granger di Sydney 1993. Meledak global era 2010-an bersama gerakan healthy eating dan Instagram. Di Indonesia masuk lewat kafe Bali sekitar 2012–2014, lalu menyebar ke Jakarta, Bandung, Yogyakarta sebagai simbol gaya hidup millennial.',
      ingredients: ['Roti sourdough', 'Alpukat muscat', 'Lemon', 'Fleur de sel', 'Telur ayam', 'Micro herb', 'Lada hitam']
    }
  ],
  dessert: [
    {
      name: 'Lava Cake', price: 42000,
      img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=70',
      desc: 'Kue cokelat Belgia 70% cacao — luar set, dalam cair meleleh. Disajikan hangat dengan vanilla ice cream dan raspberry.',
      history: 'Chocolate lava cake (moelleux au chocolat) diklaim diciptakan Jean-Georges Vongerichten di New York 1987. Menjadi ikon dessert fine dining global 1990-an. Masuk ke Indonesia melalui hotel bintang lima, lalu menyebar ke kafe-kafe modern era 2005–2010.',
      ingredients: ['Cokelat Belgia 70% cacao', 'Mentega', 'Telur ayam', 'Gula kastor', 'Tepung terigu', 'Vanilla ice cream', 'Raspberry segar']
    },
    {
      name: 'Klepon Modern', price: 25000,
      img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=70',
      desc: 'Bola ketan hijau kenyal berisi gula aren Jawa yang lumer, dibalur parutan kelapa muda segar. Tradisional dengan presentasi modern.',
      history: 'Klepon adalah kue tradisional Jawa berkaitan erat dengan ritual adat. Warna hijau dari perasan pandan. Masuk "50 Best Asian Desserts" berbagai media kuliner. Pada 2020 viral nasional akibat debat "klepon tidak islami" yang justru meningkatkan kecintaan masyarakat pada jajanan tradisional.',
      ingredients: ['Tepung ketan', 'Gula aren Jawa', 'Kelapa muda parut', 'Air pandan', 'Garam']
    },
    {
      name: 'Tiramisu', price: 45000,
      img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=70',
      desc: 'Ladyfinger dicelup espresso double shot, krim mascarpone dengan kuning telur dan marsala, ditaburi cocoa Valrhona.',
      history: 'Tiramisu lahir di Treviso, Veneto, Italia sekitar 1960-70-an. Namanya berarti "angkat aku ke atas" — merujuk efek kafein dan gula. Chef Roberto Linguanotto dari Le Beccherie sering dikreditkan sebagai pencipta. Menyebar ke seluruh dunia 1980-an.',
      ingredients: ['Ladyfinger', 'Mascarpone', 'Kuning telur', 'Gula', 'Espresso double shot', 'Marsala wine', 'Cocoa Valrhona']
    },
    {
      name: 'Es Krim Ubi Ungu', price: 28000,
      img: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=70',
      desc: 'Ice cream artisan homemade dari ubi ungu organik Jawa, susu segar, dan sedikit vanilla. Warna ungu alami, manis lembut.',
      history: 'Ubi ungu dibudidayakan di Amerika Selatan ~8.000 tahun lalu, dibawa ke Asia Tenggara oleh pelaut Spanyol-Portugis abad ke-16. Di Jawa dan Bali lama diolah menjadi kudapan tradisional. Tren es krim ubi ungu meledak 2008–2010 seiring minat pada produk lokal dan natural food coloring.',
      ingredients: ['Ubi ungu organik Jawa', 'Susu segar full cream', 'Gula', 'Vanilla', 'Krim kental']
    }
  ]
};

const PAYMENT_METHODS = [
  { id: 'cash',      icon: '💵', label: 'Cash',        desc: 'Bayar tunai saat tiba / pesanan datang.', priority: true },
  { id: 'qris',      icon: '📲', label: 'QRIS',         desc: 'Scan QR — semua e-wallet & m-banking.', priority: true },
  { id: 'gopay',     icon: '🟢', label: 'GoPay',        desc: 'Bayar via aplikasi Gojek.' },
  { id: 'ovo',       icon: '🟣', label: 'OVO',          desc: 'Bayar via aplikasi OVO.' },
  { id: 'dana',      icon: '🔵', label: 'DANA',         desc: 'Bayar via aplikasi DANA.' },
  { id: 'shopeepay', icon: '🟠', label: 'ShopeePay',    desc: 'Bayar via Shopee.' },
  { id: 'transfer',  icon: '🏦', label: 'Transfer Bank', desc: 'BCA · BRI · Mandiri · BNI.' },
  { id: 'bca',       icon: '🏧', label: 'BCA Mobile',   desc: 'KlikBCA / BCA Mobile.' }
];

const TABLE_DEFS = [
  { id: 'T1',  cap: 2, top: 105, leftPct: 33, shape: 'round', w: 58, h: 58 },
  { id: 'T2',  cap: 2, top: 105, leftPct: 50, shape: 'round', w: 58, h: 58 },
  { id: 'T3',  cap: 4, top: 105, leftPct: 67, shape: 'rect',  w: 72, h: 52 },
  { id: 'T4',  cap: 4, top: 185, leftPct: 33, shape: 'rect',  w: 72, h: 52 },
  { id: 'T5',  cap: 2, top: 185, leftPct: 50, shape: 'round', w: 58, h: 58 },
  { id: 'T6',  cap: 4, top: 185, leftPct: 67, shape: 'rect',  w: 72, h: 52 },
  { id: 'T7',  cap: 6, top: 270, leftPct: 30, shape: 'rect',  w: 105, h: 56 },
  { id: 'T8',  cap: 4, top: 270, leftPct: 52, shape: 'rect',  w: 72, h: 52 },
  { id: 'T9',  cap: 2, top: 270, leftPct: 69, shape: 'round', w: 58, h: 58 },
  { id: 'T10', cap: 4, top: 350, leftPct: 33, shape: 'rect',  w: 72, h: 52 },
  { id: 'T11', cap: 4, top: 350, leftPct: 52, shape: 'rect',  w: 72, h: 52 },
  { id: 'T12', cap: 2, top: 350, leftPct: 69, shape: 'round', w: 58, h: 58 }
];

// Simulasi reservasi yang sudah ada (tanggal di-set ke hari ini saat init)
const existingReservations = [
  { tableId: 'T3',  date: '', time: '10:00', duration: 2 },
  { tableId: 'T6',  date: '', time: '12:00', duration: 2 },
  { tableId: 'T9',  date: '', time: '09:00', duration: 3 },
  { tableId: 'T3',  date: '', time: '14:00', duration: 2 },
  { tableId: 'T7',  date: '', time: '15:00', duration: 2 },
  { tableId: 'T11', date: '', time: '11:00', duration: 1 }
];

// Set tanggal ke hari ini
(function () {
  const today = new Date().toISOString().split('T')[0];
  existingReservations.forEach(r => { if (!r.date) r.date = today; });
})();