export const categories = [
  { id: 'all', name: 'Untuk Anda', slug: 'untuk-anda' },
  { id: 'special', name: 'Spesial Hari Ini', slug: 'spesial-hari-ini' },
  { id: 'best-seller', name: 'Paling Laris', slug: 'paling-laris' },
  { id: 'home', name: 'Kebutuhan Rumah', slug: 'kebutuhan-rumah' },
  { id: 'food', name: 'Makanan & Minuman', slug: 'makanan-minuman' },
  { id: 'electronic', name: 'Elektronik', slug: 'elektronik' },
  { id: 'men-fashion', name: 'Fashion Pria', slug: 'fashion-pria' },
  { id: 'women-fashion', name: 'Fashion Wanita', slug: 'fashion-wanita' }
];

export const products = [
  {
    id: 'prod-001',
    title: 'Meja Belajar Lipat Portabel Kayu Multifungsi Anti Air Laptop Desk',
    slug: 'meja-belajar-lipat-portabel-kayu',
    price: 45000,
    originalPrice: 90000,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 1420,
    soldCount: '1.2rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Informa Wood',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126'
    ],
    shop: {
      name: 'HomeLiving Official Store',
      location: 'Kota Jakarta Barat',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 240,
    description: 'Meja lipat portabel serbaguna terbuat dari kayu MDF premium dengan rangka baja kokoh. Cocok untuk bekerja dari rumah, meja laptop, meja gambar anak, hingga meja santai sambil menonton di tempat tidur. Dilengkapi slot khusus untuk tablet dan tempat cangkir minum anti tumpah.',
    specs: [
      { label: 'Dimensi', value: '60 x 40 x 28 cm' },
      { label: 'Material', value: 'MDF Wood Grade A + Steel Leg' },
      { label: 'Berat Bersih', value: '2.1 kg' },
      { label: 'Beban Maksimum', value: '25 kg' }
    ],
    variants: [
      { id: 'v1', name: 'Warna', options: ['Natural Wood', 'Dark Walnut', 'White Minimalist', 'Pink Sakura'] }
    ]
  },
  {
    id: 'prod-002',
    title: 'Kaos Distro Pria Casual Katun Combed 30s Oversize Cool Tech Anti Gerah',
    slug: 'kaos-distro-pria-casual-katun-30s',
    price: 59900,
    originalPrice: 120000,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 3840,
    soldCount: '5rb+',
    category: 'men-fashion',
    categoryName: 'Fashion Pria',
    brand: 'Erigo District',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a'
    ],
    shop: {
      name: 'Erigo Apparel Store',
      location: 'Kota Bandung',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 10,
    stock: 580,
    description: 'Kaos casual berbahan 100% Cotton Combed 30s premium. Sangat lembut di kulit, menyerap keringat dengan baik dan berpotongan modern fit. Jahitan rantai standar distro internasional menjamin keawetan saat dicuci berkali-kali.',
    specs: [
      { label: 'Bahan', value: '100% Cotton Combed 30s Reaktif' },
      { label: 'Gramasi', value: '150-160 GSM' },
      { label: 'Model Leher', value: 'Round Neck Rib Elastis' }
    ],
    variants: [
      { id: 'v1', name: 'Ukuran', options: ['M', 'L', 'XL', 'XXL'] },
      { id: 'v2', name: 'Warna', options: ['Hitam Solid', 'Putih Bersih', 'Navy Blue', 'Sage Green'] }
    ]
  },
  {
    id: 'prod-003',
    title: 'Headset Gaming RGB 7.1 Surround Sound Noise Cancelling Mic Deep Bass',
    slug: 'headset-gaming-rgb-71-surround',
    price: 149000,
    originalPrice: 299000,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 890,
    soldCount: '750+',
    category: 'electronic',
    categoryName: 'Elektronik',
    brand: 'Fantech Pro',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b'
    ],
    shop: {
      name: 'Fantech Authorized Store',
      location: 'Kota Surabaya',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.8,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: false,
    cashbackPercent: 0,
    stock: 120,
    description: 'Nikmati audio permainan yang imersif dengan driver 50mm dynamic audio dan efek surround virtual 7.1. Dilengkapi microphone fleksibel omnidirectional dengan active noise-cancelling untuk komunikasi suara yang sangat jernih.',
    specs: [
      { label: 'Driver Unit', value: '50mm Neodymium' },
      { label: 'Frekuensi', value: '20Hz - 20kHz' },
      { label: 'Konektivitas', value: 'USB 2.0 Gold Plated' },
      { label: 'Pencahayaan', value: 'RGB Dynamic Breathing' }
    ],
    variants: [
      { id: 'v1', name: 'Warna', options: ['Matte Black RGB', 'Arctic White RGB'] }
    ]
  },
  {
    id: 'prod-004',
    title: 'Smart Watch Ultra Amoled Display Waterproof Heart Rate SpO2 Tracker',
    slug: 'smart-watch-ultra-amoled-waterproof',
    price: 199000,
    originalPrice: 399000,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 2100,
    soldCount: '2rb+',
    category: 'electronic',
    categoryName: 'Elektronik',
    brand: 'Aolon Tech',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a'
    ],
    shop: {
      name: 'Aolon Flagship Store',
      location: 'Kota Jakarta Utara',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 310,
    description: 'Smartwatch generasi terbaru dengan layar sentuh Super AMOLED 1.96 inci yang tajam dan responsif. Mendukung pemantauan detak jantung 24/7, kadar oksigen SpO2, sleep tracker, lebih dari 100 mode olahraga, dan sertifikasi tahan air IP68.',
    specs: [
      { label: 'Layar', value: '1.96 inci AMOLED 410x502 px' },
      { label: 'Baterai', value: '380 mAh (Standby s.d. 14 hari)' },
      { label: 'Sertifikasi Tahan Air', value: 'IP68 Waterproof' }
    ],
    variants: [
      { id: 'v1', name: 'Warna Strap', options: ['Midnight Black', 'Titanium Orange', 'Starlight Silver'] }
    ]
  },
  {
    id: 'prod-005',
    title: 'Mesin Kopi Espresso Portable Coffee Maker 15 Bar Electric & Capsule',
    slug: 'mesin-kopi-espresso-portable',
    price: 289000,
    originalPrice: 500000,
    discountPercent: 42,
    rating: 4.9,
    reviewsCount: 620,
    soldCount: '500+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Cafelffe Home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd'
    ],
    shop: {
      name: 'Barista Corner Id',
      location: 'Kota Tangerang',
      isOfficial: false,
      isPowerMerchant: true,
      rating: 4.9,
      badge: 'Power Merchant Pro'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 3,
    stock: 85,
    description: 'Pembuat kopi espresso mini portabel dengan pompa tekanan tinggi 15 Bar untuk ekstraksi crema tebal nan harum layaknya kafe profesional. Bisa menggunakan bubuk kopi favorit maupun kapsul espresso standar.',
    specs: [
      { label: 'Tekanan Pompa', value: '15 Bar High Extraction' },
      { label: 'Kapasitas Air', value: '80 ml' },
      { label: 'Daya', value: 'Baterai Isi Ulang USB Type-C' }
    ],
    variants: [
      { id: 'v1', name: 'Warna', options: ['Matte Black', 'Stainless Silver'] }
    ]
  },
  {
    id: 'prod-006',
    title: 'Tripod HP Kamera Bluetooth Shutter 2.1 Meter Kokoh Anti Goyang Universal',
    slug: 'tripod-hp-kamera-bluetooth-shutter',
    price: 38500,
    originalPrice: 80000,
    discountPercent: 52,
    rating: 4.7,
    reviewsCount: 9400,
    soldCount: '10rb+',
    category: 'electronic',
    categoryName: 'Elektronik',
    brand: 'Yunteng Studio',
    image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c',
    images: [
      'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c'
    ],
    shop: {
      name: 'GadgetZone Indonesia',
      location: 'Kota Semarang',
      isOfficial: false,
      isPowerMerchant: true,
      rating: 4.7,
      badge: 'Power Merchant Pro'
    },
    hasFreeShipping: true,
    hasCashback: false,
    cashbackPercent: 0,
    stock: 450,
    description: 'Tripod multifungsi tinggi maksimal 2.1 meter dengan material alumunium alloy ringan namun kuat menopang smartphone maupun kamera DSLR. Dilengkapi remote wireless Bluetooth shutter untuk foto dan video jarak jauh.',
    specs: [
      { label: 'Tinggi Maksimal', value: '210 cm' },
      { label: 'Tinggi Terlipat', value: '68 cm' },
      { label: 'Daya Dukung', value: 'Hingga 2.5 kg' }
    ],
    variants: [
      { id: 'v1', name: 'Paket', options: ['Tripod Standar + Remote', 'Tripod + Ring Light 26cm', 'Tripod Complete Set'] }
    ]
  },
  {
    id: 'prod-007',
    title: 'Kursi Kerja Kantor Ergonomis Jaring Breathable Lumbar Support Hidrolik',
    slug: 'kursi-kerja-kantor-ergonomis-jaring',
    price: 320000,
    originalPrice: 650000,
    discountPercent: 51,
    rating: 4.8,
    reviewsCount: 780,
    soldCount: '800+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'PEXIO Ergonomic',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'
    ],
    shop: {
      name: 'Pexio Furniture Store',
      location: 'Kab. Tangerang',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.8,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 7,
    stock: 65,
    description: 'Didesain khusus untuk kenyamanan duduk seharian saat bekerja maupun belajar. Sandaran jaring mesh elastis sirkulasi udara maksimal mencegah gerah di punggung, dilengkapi lumbar support penyangga tulang belakang dan tuas hidrolik gaslift kelas 3.',
    specs: [
      { label: 'Bahan Sandaran', value: 'High Density Breathable Mesh' },
      { label: 'Busa Dudukan', value: 'Molded Foam 50kg/m3' },
      { label: 'Kaki', value: 'Nylon Castor 360 Putar Halus' }
    ],
    variants: [
      { id: 'v1', name: 'Warna Rangka', options: ['Hitam Elegan', 'Abu Minimalis'] }
    ]
  },
  {
    id: 'prod-008',
    title: 'Massage Gun Deep Tissue Muscle Massager 6 Speed Alat Pijat Terapi Otot',
    slug: 'massage-gun-deep-tissue-muscle',
    price: 89000,
    originalPrice: 180000,
    discountPercent: 51,
    rating: 4.8,
    reviewsCount: 3100,
    soldCount: '3rb+',
    category: 'electronic',
    categoryName: 'Elektronik',
    brand: 'Kica Fit',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'],
    shop: {
      name: 'Kica Wellness Store',
      location: 'Kota Jakarta Barat',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.8,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 190,
    description: 'Pistol pijat elektrik frekuensi getaran tinggi untuk meredakan pegal linu otot setelah berolahraga maupun lelah bekerja seharian. Dilengkapi 4 kepala pijat berbeda bentuk untuk seluruh bagian tubuh.',
    specs: [
      { label: 'Tingkat Kecepatan', value: '6 Level Adjustable Speed' },
      { label: 'Baterai', value: '2000 mAh Li-ion' },
      { label: 'Suara Mesin', value: '< 45 dB Ultra Quiet' }
    ],
    variants: [
      { id: 'v1', name: 'Warna', options: ['Carbon Black', 'Metallic Silver', 'Ruby Red'] }
    ]
  },
  {
    id: 'prod-009',
    title: 'Soundbar Bluetooth Speaker Home Theater Bass Boost Cinema Surround',
    slug: 'soundbar-bluetooth-speaker-home-theater',
    price: 165000,
    originalPrice: 350000,
    discountPercent: 53,
    rating: 4.9,
    reviewsCount: 1620,
    soldCount: '1.5rb+',
    category: 'electronic',
    categoryName: 'Elektronik',
    brand: 'Redmi Sound',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d'],
    shop: {
      name: 'Mi Authorized Dealer',
      location: 'Kota Jakarta Pusat',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 95,
    description: 'Tingkatkan kualitas audio TV, PC, maupun laptop Anda ke level bioskop. Dua driver audio full-range menghasilkan suara vokal jernih dan dentuman bass yang bertenaga dengan koneksi Bluetooth 5.0 atau kabel AUX.',
    specs: [
      { label: 'Output Daya', value: '30W RMS Sound Output' },
      { label: 'Koneksi', value: 'Bluetooth 5.0 + AUX 3.5mm + S/PDIF' },
      { label: 'Panjang Unit', value: '78 cm Slim Minimalist' }
    ],
    variants: [
      { id: 'v1', name: 'Varian', options: ['Standard Bluetooth', 'Bluetooth + Subwoofer Kit'] }
    ]
  },
  {
    id: 'prod-010',
    title: 'Kacamata Hitam Polarized UV400 Anti Silau Pria Wanita Aviator Classic',
    slug: 'kacamata-hitam-polarized-uv400',
    price: 35000,
    originalPrice: 70000,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 4200,
    soldCount: '4rb+',
    category: 'men-fashion',
    categoryName: 'Fashion Pria',
    brand: 'Veithdia Optical',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083'],
    shop: {
      name: 'Eyewear Direct Bandung',
      location: 'Kota Bandung',
      isOfficial: false,
      isPowerMerchant: true,
      rating: 4.8,
      badge: 'Power Merchant Pro'
    },
    hasFreeShipping: true,
    hasCashback: false,
    cashbackPercent: 0,
    stock: 400,
    description: 'Kacamata polarized premium dengan proteksi UV400 memblokir 100% radiasi sinar UVA/UVB dan silau matahari saat berkendara maupun liburan pantai. Bingkai alloy ultra ringan tidak menekan hidung.',
    specs: [
      { label: 'Lensa', value: 'Polarized TAC Lens UV400 Protection' },
      { label: 'Frame', value: 'Magnesium Aluminum Alloy' }
    ],
    variants: [
      { id: 'v1', name: 'Warna Lensa', options: ['Black Polarized', 'Night Vision Yellow', 'Mirror Blue'] }
    ]
  },
  {
    id: 'prod-011',
    title: 'Kaos Kaki Katun Pria Semata Kaki 5 Pasang Breathable Anti Bau Lembut',
    slug: 'kaos-kaki-katun-pria-5-pasang',
    price: 22500,
    originalPrice: 45000,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 5900,
    soldCount: '6rb+',
    category: 'men-fashion',
    categoryName: 'Fashion Pria',
    brand: 'Mondor Cotton',
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558',
    images: ['https://images.unsplash.com/photo-1582966772680-860e372bb558'],
    shop: {
      name: 'Hosiery Center Solo',
      location: 'Kota Surakarta (Solo)',
      isOfficial: false,
      isPowerMerchant: true,
      rating: 4.8,
      badge: 'Power Merchant Pro'
    },
    hasFreeShipping: true,
    hasCashback: false,
    cashbackPercent: 0,
    stock: 800,
    description: 'Set 5 pasang kaos kaki katun model mata kaki (ankle socks) dengan serat anti-bakteri pencegah bau kaki. Sangat elastis dan pas di kaki untuk sepatu sneakers, olahraga, maupun santai.',
    specs: [
      { label: 'Bahan', value: '80% Katun Sisir + 15% Spandex + 5% Elastan' },
      { label: 'Ukuran', value: 'All Size Pria Dewasa (39 - 44)' }
    ],
    variants: [
      { id: 'v1', name: 'Paket Warna', options: ['Mix Warna (Hitam, Abu, Putih, Navy)', 'Full Hitam 5 Pcs'] }
    ]
  },
  {
    id: 'prod-012',
    title: 'Celana Chino Panjang Pria Slim Fit Stretch Twill Katun Premium',
    slug: 'celana-chino-panjang-pria-slim-fit',
    price: 89000,
    originalPrice: 160000,
    discountPercent: 44,
    rating: 4.9,
    reviewsCount: 4300,
    soldCount: '4.2rb+',
    category: 'men-fashion',
    categoryName: 'Fashion Pria',
    brand: 'Malmo Denim',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80'],
    shop: {
      name: 'Chino Factory ID',
      location: 'Kota Pekalongan',
      isOfficial: false,
      isPowerMerchant: true,
      rating: 4.9,
      badge: 'Power Merchant Pro'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 350,
    description: 'Celana chino panjang bermodel slim fit dengan material twill katun stretch melar elastis yang sangat nyaman saat duduk maupun berjalan bebas. Cocok dipakai kerja kantor, kuliah, hingga hangout.',
    specs: [
      { label: 'Bahan', value: 'Cotton Twill Stretch Diamond Grade A' },
      { label: 'Ritsleting', value: 'YKK Auto Lock Zipper' }
    ],
    variants: [
      { id: 'v1', name: 'Ukuran', options: ['28', '30', '32', '34', '36'] },
      { id: 'v2', name: 'Warna', options: ['Hitam Pekat', 'Mocca Cream', 'Abu Tua', 'Khaki Pasir'] }
    ]
  },
  {
    id: 'prod-013',
    title: 'Tool Set Kotak Perkakas Kunci Pas Socket Ratchet 46 in 1 Chrome Vanadium',
    slug: 'tool-set-kotak-perkakas-kunci-pas-46in1',
    price: 65000,
    originalPrice: 130000,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 2300,
    soldCount: '2.3rb+',
    category: 'electronic',
    categoryName: 'Elektronik & Alat',
    brand: 'Kenmaster Pro',
    image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c',
    images: ['https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c'],
    shop: {
      name: 'Teknik Perkakas Utama',
      location: 'Kota Jakarta Barat',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.8,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: false,
    cashbackPercent: 0,
    stock: 210,
    description: 'Perkakas lengkap 46 pcs dalam koper box ringkas anti karat. Cocok untuk servis motor, mobil, sepeda, hingga perbaikan perabot rumah tangga.',
    specs: [
      { label: 'Material', value: 'Chrome Vanadium Steel Cr-V' },
      { label: 'Kelengkapan', value: '21 Mata Obeng, 13 Kunci Pas Socket, Kunci Ratchet' }
    ],
    variants: [
      { id: 'v1', name: 'Warna Kotak', options: ['Kotak Hijau Presisi', 'Kotak Merah Presisi'] }
    ]
  },
  {
    id: 'prod-014',
    title: 'Kasur Busa Lipat Rebonded Orthopedic Anti Kempes Kain Jacquard Mewah',
    slug: 'kasur-busa-lipat-rebonded-orthopedic',
    price: 245000,
    originalPrice: 490000,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 960,
    soldCount: '950+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Inoac Foam',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304'],
    shop: {
      name: 'Inoac Mattress Official',
      location: 'Kota Bogor',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 140,
    description: 'Kasur busa rebonded density tinggi menopang postur tubuh dengan sempurna, meredakan sakit pinggang. Model lipat 3 hemat ruang penyimpanan dan mudah dibawa bepergian.',
    specs: [
      { label: 'Ukuran', value: '90 x 200 x 10 cm' },
      { label: 'Bahan Sarung', value: 'Kain Katun Microtex Ritsleting' }
    ],
    variants: [
      { id: 'v1', name: 'Ukuran Tebal', options: ['Tebal 10cm', 'Tebal 15cm'] }
    ]
  },
  {
    id: 'prod-015',
    title: 'Shockbreaker Belakang Tabung Motor Matic Beat Vario Scoopy Mio 310mm',
    slug: 'shockbreaker-belakang-tabung-motor-matic',
    price: 175000,
    originalPrice: 350000,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 610,
    soldCount: '600+',
    category: 'electronic',
    categoryName: 'Otomotif & Parts',
    brand: 'RCB Racing',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc'],
    shop: {
      name: 'SpeedShop Jakarta Motor',
      location: 'Kota Jakarta Timur',
      isOfficial: false,
      isPowerMerchant: true,
      rating: 4.7,
      badge: 'Power Merchant Pro'
    },
    hasFreeShipping: true,
    hasCashback: false,
    cashbackPercent: 0,
    stock: 70,
    description: 'Suspensi belakang model tabung dengan nitrogen gas damper untuk redaman empuk dan stabil saat bermanuver maupun melibas jalan berlubang.',
    specs: [
      { label: 'Ukuran Panjang', value: '310mm dan 330mm' },
      { label: 'Fitur', value: 'Preload Spring Adjustable' }
    ],
    variants: [
      { id: 'v1', name: 'Warna Per', options: ['Merah Racing', 'Kuning Ohlins', 'Hitam Titanium'] }
    ]
  },
  {
    id: 'prod-016',
    title: 'Dompet Kulit Pria Asli RFID Blocking Slim Bifold Dompet Kartu Minimalis',
    slug: 'dompet-kulit-pria-asli-rfid-blocking',
    price: 55000,
    originalPrice: 110000,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 3900,
    soldCount: '3.8rb+',
    category: 'men-fashion',
    categoryName: 'Fashion Pria',
    brand: 'Bostanten Leather',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93'],
    shop: {
      name: 'Bostanten Flagship Store',
      location: 'Kab. Garut',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 500,
    description: 'Terbuat dari 100% Genuine Cowhide Leather (Kulit Sapi Asli) bermotif mewah dengan lapisan pelindung anti pencurian sinyal kartu kredit RFID Shield.',
    specs: [
      { label: 'Kapasitas', value: '8 Slot Kartu + 2 Slot Uang Kertas + 1 Slot Foto' },
      { label: 'Dimensi', value: '11 x 9.5 x 1.5 cm' }
    ],
    variants: [
      { id: 'v1', name: 'Warna', options: ['Coffee Brown', 'Classic Black', 'Tan Vintage'] }
    ]
  },
  {
    id: 'prod-017',
    title: 'Grill Pan Panggangan BBQ Anti Lengket Bulat Korean Barbeque 32cm',
    slug: 'grill-pan-panggangan-bbq-anti-lengket',
    price: 48000,
    originalPrice: 95000,
    discountPercent: 49,
    rating: 4.8,
    reviewsCount: 5100,
    soldCount: '5rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Maspion Cookware',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1'],
    shop: {
      name: 'Kitchen Star Surabaya',
      location: 'Kota Surabaya',
      isOfficial: false,
      isPowerMerchant: true,
      rating: 4.8,
      badge: 'Power Merchant Pro'
    },
    hasFreeShipping: true,
    hasCashback: false,
    cashbackPercent: 0,
    stock: 280,
    description: 'Wajan panggangan BBQ khas Korea dengan lapisan teflon marble anti-lengket dan lubang tirisan minyak berlebih di bagian tengah agar hasil bakar lebih sehat.',
    specs: [
      { label: 'Diameter', value: '32 cm Round Pan' },
      { label: 'Kompatibilitas', value: 'Kompor Gas Portable & Standar' }
    ],
    variants: [
      { id: 'v1', name: 'Model', options: ['Bulat 32cm Tirisan', 'Kotak 34cm Gagang Kayu'] }
    ]
  },
  {
    id: 'prod-018',
    title: 'Kemeja Polos Pria Lengan Pendek Formal Kasual Katun Oxford Adem Halus',
    slug: 'kemeja-polos-pria-lengan-pendek',
    price: 62000,
    originalPrice: 125000,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 2950,
    soldCount: '2.9rb+',
    category: 'men-fashion',
    categoryName: 'Fashion Pria',
    brand: 'Broodis Shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c'],
    shop: {
      name: 'Broodis Official Store',
      location: 'Kota Tangerang',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.8,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 420,
    description: 'Kemeja pria casual berbahan kain katun Oxford premium yang berpori halus dan dingin di badan. Tidak mudah kusut dan berpotongan slim-fit maskulin.',
    tags: ['kemeja', 'baju', 'pakaian', 'fashion-pria', 'atasan', 'kasual'],
    specs: [
      { label: 'Bahan', value: 'Katun Oxford Import' },
      { label: 'Kancing', value: 'Embossed Resin Pearl' }
    ],
    variants: [
      { id: 'v1', name: 'Ukuran', options: ['M', 'L', 'XL'] },
      { id: 'v2', name: 'Warna', options: ['Putih Bersih', 'Biru Muda Oxford', 'Abu-Abu', 'Hitam'] }
    ]
  },
  {
    id: 'prod-019',
    title: 'Meja Kerja Minimalis Modern 120cm Rangka Besi Meja Komputer Laptop Kantor',
    slug: 'meja-kerja-minimalis-modern-120cm',
    price: 349000,
    originalPrice: 699000,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 1820,
    soldCount: '3.4rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Pira Home',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'],
    shop: {
      name: 'Pira Official Store',
      location: 'Kota Surabaya',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 190,
    description: 'Meja kerja modern minimalis dengan top table kayu tebal bermotif serat kayu alami tahan gores dan rangka kaki besi hollow kokoh dilapisi powder coating anti-karat.',
    tags: ['meja', 'meja-kerja', 'meja-kantor', 'meja-komputer', 'furniture'],
    specs: [
      { label: 'Dimensi', value: '120 x 60 x 75 cm' },
      { label: 'Material', value: 'PB Grade A + Powder Coated Steel' }
    ],
    variants: [
      { id: 'v1', name: 'Warna', options: ['Sonoma Oak', 'White Glossy', 'Walnut Dark'] }
    ]
  },
  {
    id: 'prod-020',
    title: 'Meja Gaming Ergonomis RGB Carbon Fiber Z-Shape Meja Komputer PC Studio',
    slug: 'meja-gaming-ergonomis-rgb-carbon-z-shape',
    price: 899000,
    originalPrice: 1500000,
    discountPercent: 40,
    rating: 4.8,
    reviewsCount: 740,
    soldCount: '950+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Fantech Living',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e',
    images: ['https://images.unsplash.com/photo-1544457070-4cd773b4d71e'],
    shop: {
      name: 'Fantech Official Store',
      location: 'Kota Jakarta Utara',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 10,
    stock: 85,
    description: 'Meja gaming berdesain futuristik dengan permukaan carbon fiber anti-slip dan lampu LED RGB dinamis. Rangka Z-shape baja tebal memberikan kestabilan maksimal untuk setup multi-monitor.',
    tags: ['meja', 'meja-gaming', 'meja-komputer', 'gaming-desk', 'rgb'],
    specs: [
      { label: 'Dimensi', value: '120 x 60 x 75 cm' },
      { label: 'Fitur', value: 'RGB Lighting, Headphone Hook, Cup Holder' }
    ],
    variants: [
      { id: 'v1', name: 'Warna', options: ['Black Carbon RGB', 'White Carbon RGB'] }
    ]
  },
  {
    id: 'prod-021',
    title: 'Meja Rias Minimalis Kaca Lampu LED Touchscreen Meja Make Up Kayu Solid',
    slug: 'meja-rias-minimalis-kaca-lampu-led',
    price: 575000,
    originalPrice: 1150000,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 1120,
    soldCount: '1.8rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Informa Wood',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126',
    images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126'],
    shop: {
      name: 'Informa Home Living',
      location: 'Kota Tangerang Selatan',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 140,
    description: 'Meja rias cantik dengan cermin bundar berlampu LED 3 mode pencahayaan (Warm, Cool, Natural) dengan tombol sentuh. Dilengkapi laci penyimpanan kosmetik dan kursi empuk senada.',
    tags: ['meja', 'meja-rias', 'meja-makeup', 'dresser', 'furniture'],
    specs: [
      { label: 'Dimensi', value: '80 x 40 x 128 cm' },
      { label: 'Cermin', value: 'LED Touch Sensor 3 Warna' }
    ],
    variants: [
      { id: 'v1', name: 'Warna', options: ['Putih Bersih', 'Creamy Beige', 'Pink Pastel'] }
    ]
  },
  {
    id: 'prod-022',
    title: 'Meja Makan Minimalis Kayu Jati Belanda 4 Kursi Set Meja Cafe Resto',
    slug: 'meja-makan-minimalis-kayu-jati-belanda-set',
    price: 1250000,
    originalPrice: 2500000,
    discountPercent: 50,
    rating: 5.0,
    reviewsCount: 390,
    soldCount: '620+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Jepara Living',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf',
    images: ['https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf'],
    shop: {
      name: 'Jepara Furniture Official',
      location: 'Kab. Jepara',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 5.0,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 60,
    description: 'Satu set meja makan 4 kursi berbahan kayu pinus jati belanda oven solid. Finishing natural gloss tahan tumpahan air dan panas, sangat kokoh untuk ruang makan keluarga maupun cafe.',
    tags: ['meja', 'meja-makan', 'set-meja', 'dining-table', 'kayu-jati'],
    specs: [
      { label: 'Dimensi Meja', value: '120 x 70 x 75 cm' },
      { label: 'Jumlah Kursi', value: '4 Kursi Sandaran Solid' }
    ],
    variants: [
      { id: 'v1', name: 'Finishing', options: ['Natural Gloss', 'Dark Mahogany', 'Rustic Brown'] }
    ]
  },
  {
    id: 'prod-023',
    title: 'Meja Lipat Dinding Minimalis Wall Folding Desk Meja Belajar Laptop Kayu Solid',
    slug: 'meja-lipat-dinding-minimalis-wall-folding',
    price: 129000,
    originalPrice: 260000,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 940,
    soldCount: '2.1rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Dekoruma Living',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e',
    images: ['https://images.unsplash.com/photo-1544457070-4cd773b4d71e'],
    shop: {
      name: 'Dekoruma Official',
      location: 'Kota Jakarta Barat',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 220,
    description: 'Meja lipat tempel dinding hemat ruang, saat tidak digunakan dapat dilipat rata dengan dinding. Sangat cocok untuk apartemen dan kamar minimalis.',
    tags: ['meja', 'meja-lipat', 'meja-dinding', 'furniture', 'hemat-ruang'],
    specs: [{ label: 'Dimensi', value: '80 x 40 cm' }],
    variants: [{ id: 'v1', name: 'Warna', options: ['Putih Solid', 'Serat Kayu Oak', 'Hitam Doff'] }]
  },
  {
    id: 'prod-024',
    title: 'Meja Laptop Portable Roda Ketinggian Fleksibel Meja Kerja Samping Kasur',
    slug: 'meja-laptop-portable-roda-ketinggian-fleksibel',
    price: 89000,
    originalPrice: 199000,
    discountPercent: 55,
    rating: 4.8,
    reviewsCount: 2400,
    soldCount: '4.6rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Olymplast',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'],
    shop: {
      name: 'Olymplast Mega Store',
      location: 'Kota Tangerang',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.8,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 310,
    description: 'Meja laptop beroda dengan ketinggian yang dapat diatur fleksibel 68-85 cm. Roda dilengkapi pengunci anti selip.',
    tags: ['meja', 'meja-laptop', 'meja-roda', 'meja-portabel'],
    specs: [{ label: 'Dimensi', value: '60 x 40 x 70-90 cm' }],
    variants: [{ id: 'v1', name: 'Warna', options: ['Maple White', 'Dark Wood', 'All Black'] }]
  },
  {
    id: 'prod-025',
    title: 'Meja Kopi Coffee Table Minimalis Bulat Scandinavian Meja Tamu Kayu Solid',
    slug: 'meja-kopi-coffee-table-minimalis-bulat',
    price: 175000,
    originalPrice: 350000,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 1650,
    soldCount: '3.1rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'IKEA Style',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126',
    images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126'],
    shop: {
      name: 'Nordic Home Living',
      location: 'Kota Jakarta Selatan',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 175,
    description: 'Coffee table bundar bergaya Scandinavian dengan kaki kayu solid natural yang kokoh dan estetis untuk ruang tamu.',
    tags: ['meja', 'meja-kopi', 'coffee-table', 'meja-tamu', 'scandinavian'],
    specs: [{ label: 'Diameter', value: '50 cm, Tinggi 48 cm' }],
    variants: [{ id: 'v1', name: 'Warna', options: ['Putih Bersih', 'Kayu Alami', 'Hitam Pekat'] }]
  },
  {
    id: 'prod-026',
    title: 'Meja Komputer L-Shape Corner Desk Meja Kerja Sudut Ruangan Rangka Besi',
    slug: 'meja-komputer-l-shape-corner-desk',
    price: 685000,
    originalPrice: 1370000,
    discountPercent: 50,
    rating: 4.8,
    reviewsCount: 520,
    soldCount: '870+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Pira Home',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'],
    shop: {
      name: 'Pira Official Store',
      location: 'Kota Surabaya',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 10,
    stock: 95,
    description: 'Meja komputer bentuk L memaksimalkan sudut ruang kerja. Luas untuk menempatkan 2-3 monitor sekaligus.',
    tags: ['meja', 'meja-komputer', 'meja-kerja', 'corner-desk', 'l-shape'],
    specs: [{ label: 'Dimensi', value: '130 x 130 x 75 cm' }],
    variants: [{ id: 'v1', name: 'Warna', options: ['Oak Black', 'Full White', 'Walnut Brown'] }]
  },
  {
    id: 'prod-027',
    title: 'Meja Belajar Anak Ergonomis Anti Bungkuk Ketinggian Bisa Diatur + Kursi Set',
    slug: 'meja-belajar-anak-ergonomis-set',
    price: 425000,
    originalPrice: 850000,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 880,
    soldCount: '1.5rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'KidsLiving',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e',
    images: ['https://images.unsplash.com/photo-1544457070-4cd773b4d71e'],
    shop: {
      name: 'KidsLiving Official',
      location: 'Kota Bandung',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 140,
    description: 'Satu set meja belajar dan kursi anak dengan sudut kemiringan meja dan ketinggian yang dapat diatur untuk menjaga postur tulang belakang.',
    tags: ['meja', 'meja-belajar', 'meja-anak', 'ergonomis'],
    specs: [{ label: 'Fitur', value: 'Adjustable Height & Tilt Table' }],
    variants: [{ id: 'v1', name: 'Warna', options: ['Biru Pastel', 'Pink Pastel', 'Abu Minimalis'] }]
  },
  {
    id: 'prod-028',
    title: 'Meja Bar Cafe Minimalis Tinggi Kaki Besi Hollow Meja Makan Dapur Barstool',
    slug: 'meja-bar-cafe-minimalis-tinggi-besi',
    price: 389000,
    originalPrice: 799000,
    discountPercent: 51,
    rating: 4.9,
    reviewsCount: 650,
    soldCount: '1.1rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Jepara Living',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf',
    images: ['https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf'],
    shop: {
      name: 'Jepara Furniture Official',
      location: 'Kab. Jepara',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 5.0,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 80,
    description: 'Meja bar tinggi gaya industrial modern untuk dapur pantry maupun usaha cafe. Rangka besi hollow tebal anti karat.',
    tags: ['meja', 'meja-bar', 'meja-cafe', 'meja-tinggi', 'barstool'],
    specs: [{ label: 'Dimensi', value: '120 x 40 x 100 cm' }],
    variants: [{ id: 'v1', name: 'Warna Kayu', options: ['Natural Wood', 'Dark Brown', 'Vintage Pine'] }]
  },
  {
    id: 'prod-029',
    title: 'Meja Lipat Koper Camping Outdoor Aluminium Portable Piknik Meja Bazar',
    slug: 'meja-lipat-koper-camping-outdoor-aluminium',
    price: 219000,
    originalPrice: 450000,
    discountPercent: 51,
    rating: 4.8,
    reviewsCount: 3100,
    soldCount: '5.2rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Naturehike Gear',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'],
    shop: {
      name: 'Adventure Outdoor Store',
      location: 'Kota Jakarta Pusat',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.8,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 350,
    description: 'Meja lipat model koper mudah dibawa kemana-mana untuk kegiatan camping, piknik keluarga, maupun bazar jualan.',
    tags: ['meja', 'meja-lipat', 'meja-camping', 'meja-koper', 'outdoor'],
    specs: [{ label: 'Dimensi', value: '120 x 60 x 70 cm' }],
    variants: [{ id: 'v1', name: 'Warna', options: ['Silver Metal', 'Blue Navy', 'Wood Grain'] }]
  },
  {
    id: 'prod-030',
    title: 'Meja Belajar Aesthetic Putih Minimalis Laci Kayu Rak Buku Meja Tulis Modern',
    slug: 'meja-belajar-aesthetic-putih-minimalis',
    price: 315000,
    originalPrice: 630000,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 1420,
    soldCount: '2.8rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Informa Wood',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126',
    images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126'],
    shop: {
      name: 'Informa Home Living',
      location: 'Kota Tangerang Selatan',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 160,
    description: 'Meja belajar bergaya Korea aesthetic serba putih dengan laci penyimpanan tertutup dan rak buku minimalis.',
    tags: ['meja', 'meja-belajar', 'meja-tulis', 'aesthetic', 'meja-putih'],
    specs: [{ label: 'Dimensi', value: '100 x 50 x 75 cm' }],
    variants: [{ id: 'v1', name: 'Model', options: ['1 Laci 1 Rak', '2 Laci Minimalis'] }]
  },
  {
    id: 'prod-031',
    title: 'Meja Kerja Stand Desk Adjustable Motorized Dual Motor Electric Height Desk',
    slug: 'meja-kerja-stand-desk-adjustable-motorized',
    price: 2450000,
    originalPrice: 4900000,
    discountPercent: 50,
    rating: 5.0,
    reviewsCount: 290,
    soldCount: '410+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'ErgonomicID',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'],
    shop: {
      name: 'Ergonomic Official Store',
      location: 'Kota Jakarta Barat',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 5.0,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 10,
    stock: 45,
    description: 'Meja kerja elektrik standing desk dengan dual motor hening dan 4 memori ketinggian digital. Bekerja duduk maupun berdiri dengan satu sentuhan tombol.',
    tags: ['meja', 'meja-kerja', 'standing-desk', 'motorized', 'ergonomic'],
    specs: [{ label: 'Rentang Tinggi', value: '71 - 120 cm' }],
    variants: [{ id: 'v1', name: 'Warna Rangka', options: ['Black Frame + Walnut', 'White Frame + Oak'] }]
  },
  {
    id: 'prod-032',
    title: 'Meja Tamu Persegi Kayu Oak Industrial Rangka Besi Meja Ruang Tamu Coffeetable',
    slug: 'meja-tamu-persegi-kayu-oak-industrial',
    price: 265000,
    originalPrice: 530000,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 980,
    soldCount: '1.9rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Pira Home',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e',
    images: ['https://images.unsplash.com/photo-1544457070-4cd773b4d71e'],
    shop: {
      name: 'Pira Official Store',
      location: 'Kota Surabaya',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 130,
    description: 'Meja tamu persegi panjang dengan rak bawah tambahan untuk koran atau buku. Desain perpaduan kayu serat oak dan besi hitam kokoh.',
    tags: ['meja', 'meja-tamu', 'coffee-table', 'meja-kopi', 'industrial'],
    specs: [{ label: 'Dimensi', value: '100 x 50 x 45 cm' }],
    variants: [{ id: 'v1', name: 'Warna', options: ['Oak Natural', 'Walnut Dark'] }]
  },
  {
    id: 'prod-033',
    title: 'Meja Samping Sofa C-Shape Slide Under Meja Kopi Santai Kasur Minimalis',
    slug: 'meja-samping-sofa-c-shape-slide-under',
    price: 95000,
    originalPrice: 199000,
    discountPercent: 52,
    rating: 4.8,
    reviewsCount: 1890,
    soldCount: '3.7rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Dekoruma Living',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'],
    shop: {
      name: 'Dekoruma Official',
      location: 'Kota Jakarta Barat',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 240,
    description: 'Meja samping bentuk huruf C yang kakinya dapat diselipkan ke bawah sofa atau ranjang kasur untuk meletakkan camilan, kopi, atau laptop.',
    tags: ['meja', 'meja-samping', 'side-table', 'c-shape', 'meja-sofa'],
    specs: [{ label: 'Dimensi', value: '45 x 30 x 62 cm' }],
    variants: [{ id: 'v1', name: 'Warna', options: ['Vintage Brown', 'White Oak', 'Black Carbon'] }]
  },
  {
    id: 'prod-034',
    title: 'Meja Setrika Lipat Berdiri Busa Tebal Anti Panas Meja Gosok Baju Laundry',
    slug: 'meja-setrika-lipat-berdiri-busa-tebal',
    price: 115000,
    originalPrice: 230000,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 1250,
    soldCount: '2.4rb+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Olymplast',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e',
    images: ['https://images.unsplash.com/photo-1544457070-4cd773b4d71e'],
    shop: {
      name: 'Olymplast Mega Store',
      location: 'Kota Tangerang',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.8,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 190,
    description: 'Meja setrika pakaian dengan papan busa tebal lapis katun tahan panas dan tatakan khusus besi setrika anti gosong.',
    tags: ['meja', 'meja-setrika', 'meja-gosok', 'laundry'],
    specs: [{ label: 'Dimensi', value: '95 x 30 x 70 cm' }],
    variants: [{ id: 'v1', name: 'Motif', options: ['Floral Grey', 'Geometric Blue', 'Minimalist Stripe'] }]
  },
  {
    id: 'prod-035',
    title: 'Meja Makan Kaca Tempered Modern 6 Kursi Set Meja Ruang Makan Mewah Gold',
    slug: 'meja-makan-kaca-tempered-modern-6-kursi',
    price: 3499000,
    originalPrice: 6999000,
    discountPercent: 50,
    rating: 5.0,
    reviewsCount: 120,
    soldCount: '180+',
    category: 'home',
    categoryName: 'Kebutuhan Rumah',
    brand: 'Informa Wood',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf',
    images: ['https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf'],
    shop: {
      name: 'Informa Home Living',
      location: 'Kota Tangerang Selatan',
      isOfficial: true,
      isPowerMerchant: false,
      rating: 4.9,
      badge: 'Official Store'
    },
    hasFreeShipping: true,
    hasCashback: true,
    cashbackPercent: 5,
    stock: 25,
    description: 'Satu set meja makan 6 kursi dengan permukaan kaca tempered tebal 10mm anti gores dan rangka stainless steel gold mewah.',
    tags: ['meja', 'meja-makan', 'dining-table', 'tempered-glass', 'meja-mewah'],
    specs: [{ label: 'Dimensi', value: '150 x 90 x 75 cm' }],
    variants: [{ id: 'v1', name: 'Warna Kursi', options: ['Velvet Grey', 'Emerald Green', 'Royal Navy'] }]
  }
];

export const quickBillOptions = [
  { id: 'pulsa', label: 'Pulsa' },
  { id: 'paket-data', label: 'Paket Data' },
  { id: 'pln', label: 'Listrik PLN' },
  { id: 'roaming', label: 'Roaming' }
];

export const nominalList = [
  { value: '15000', label: 'Rp15.000', price: 15200 },
  { value: '25000', label: 'Rp25.000', price: 25150 },
  { value: '50000', label: 'Rp50.000', price: 49800 },
  { value: '100000', label: 'Rp100.000', price: 98500 },
  { value: '200000', label: 'Rp200.000', price: 197000 }
];
