/**
 * Authentic Tokopedia Store (Toko) Database
 * Includes stores matching Tokopedia's search result dataset (e.g. cukiita, Minerva Meja Biliarz, etc.)
 */

export const stores = [
  {
    id: 'store-01',
    name: 'cukiita',
    slug: 'cukiita',
    description: 'Toko perlengkapan meja belajar anak, meja lipat portable edukasi, meja gambar kayu dan kebutuhan belajar anak berkualitas.',
    location: 'Bandung',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.8,
    transactions: 12500,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#03AC0E',
    products: [
      { id: 'p-cuk-1', title: 'Meja Lipat Anak Karakter', price: 120000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-cuk-2', title: 'Meja Belajar Kayu Minimalis', price: 354000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-cuk-3', title: 'Meja Gaming Anak Ergonomis', price: 909990, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-02',
    name: 'Minerva Meja Biliarz',
    slug: 'minerva-meja-biliarz',
    description: 'Pabrik dan distributor resmi meja biliar standar internasional turnamen, meja biliar lipat portable dan stik biliar berkualitas.',
    location: 'Kab. Semarang',
    province: 'Jawa Tengah',
    type: 'pm-pro',
    rating: 4.9,
    transactions: 3400,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#4F3582',
    products: [
      { id: 'p-min-1', title: 'Meja Biliar Turnamen 9 Feet', price: 21800000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-min-2', title: 'Meja Biliar Lipat Red Velvet', price: 15000000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-min-3', title: 'Meja Biliar Mini Blue Cloth', price: 15900000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-03',
    name: 'Meja kursi Cafe Mbel shop',
    slug: 'meja-kursi-cafe-mbel-shop',
    description: 'Spesialis pembuatan meja cafe industrial, meja makan resto, kursi barstool dan furniture pesanan khusus proyek.',
    location: 'Kab. Bandung',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.7,
    transactions: 890,
    avatar: '',
    avatarBg: '#6D7588',
    products: []
  },
  {
    id: 'store-04',
    name: 'kllk mejacuci DANsekit...',
    slug: 'kllk-mejacuci-dansekit',
    description: 'Penyedia perlengkapan meja wastafel cuci piring stainless, meja dapur kompor gas dan rak cuci piring serbaguna.',
    location: 'Bandung',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.6,
    transactions: 2100,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#03AC0E',
    products: [
      { id: 'p-klk-1', title: 'Meja Wastafel Cuci Portable', price: 750000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-klk-2', title: 'Spons Busa Meja Dapur', price: 16000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-klk-3', title: 'Meja Cuci Piring Stainless 2 Lubang', price: 3250000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-05',
    name: 'MEJA PASIR Store',
    slug: 'meja-pasir-store',
    description: 'Menjual aneka meja sensori pasir kinetik anak, meja bermain montessori, dan meja aktivitas kreatif anak.',
    location: 'Bandar Lampung',
    province: 'Lampung',
    type: 'power-shop',
    rating: 4.8,
    transactions: 540,
    avatar: '',
    avatarBg: '#E11D48',
    products: []
  },
  {
    id: 'store-06',
    name: 'Meja kapten',
    slug: 'meja-kapten',
    description: 'Custom furniture meja kerja direktur kayu jati solid grade A, meja kantor mewah dan meja rapat boardroom.',
    location: 'Kab. Tangerang',
    province: 'Banten',
    type: 'pm-pro',
    rating: 5.0,
    transactions: 480,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#D97706',
    products: [
      { id: 'p-kpt-1', title: 'Meja Direktur Jati Grade A', price: 20150000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-kpt-2', title: 'Meja Rapat Konferensi Luxury', price: 30150000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-07',
    name: 'mejadirumah',
    slug: 'mejadirumah',
    description: 'Solusi perabot meja rumah tangga praktis, meja makan lipat hemat ruang, meja belajar dinding dan coffee table aesthetic.',
    location: 'Jakarta Barat',
    province: 'DKI Jakarta',
    type: 'power-shop',
    rating: 4.7,
    transactions: 1100,
    avatar: '',
    avatarBg: '#2563EB',
    products: []
  },
  {
    id: 'store-08',
    name: 'toko meja_NEW',
    slug: 'toko-meja-new',
    description: 'Toko furniture online menyediakan meja belajar anak, meja komputer PC minimalis dan meja rias lampu LED.',
    location: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    type: 'power-shop',
    rating: 4.6,
    transactions: 760,
    avatar: '',
    avatarBg: '#059669',
    products: []
  },
  {
    id: 'store-09',
    name: 'Mejaqu_NEW',
    slug: 'mejaqu-new',
    description: 'Desain meja minimalis kekinian untuk kamar tidur, ruang kerja WFH, dan meja samping sofa.',
    location: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    type: 'power-shop',
    rating: 4.8,
    transactions: 920,
    avatar: '',
    avatarBg: '#7C3AED',
    products: []
  },
  {
    id: 'store-10',
    name: 'jual meja gambar',
    slug: 'jual-meja-gambar',
    description: 'Spesialis meja gambar arsitek, drafting table kemiringan fleksibel, meja desain grafis dengan lampu tracing LED.',
    location: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    type: 'pm-pro',
    rating: 4.9,
    transactions: 4300,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#0891B2',
    products: [
      { id: 'p-jmg-1', title: 'Meja Gambar Arsitek A1 Kemiringan', price: 400000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-jmg-2', title: 'Meja Tracing LED Light Pad A2', price: 400000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-jmg-3', title: 'Meja Gambar Portable Lipat Kayu', price: 400000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-11',
    name: 'Rikjonas',
    slug: 'rikjonas',
    description: 'Pusat perabot kayu palet meja unik, meja teras taman santai tahan air dan rak meja tanaman.',
    location: 'Kab. Pringsewu',
    province: 'Lampung',
    type: 'power-shop',
    rating: 4.7,
    transactions: 630,
    avatar: '',
    avatarBg: '#6D7588',
    products: []
  },
  {
    id: 'store-12',
    name: 'meja sekolah_NEW',
    slug: 'meja-sekolah-new',
    description: 'Pabrik meja kursi sekolah SD, SMP, SMA rangka besi hollow tebal dan meja lab komputer tahan rayap.',
    location: 'Surabaya',
    province: 'Jawa Timur',
    type: 'power-shop',
    rating: 4.8,
    transactions: 3800,
    avatar: '',
    avatarBg: '#EA580C',
    products: []
  },
  {
    id: 'store-13',
    name: 'Meja Carourie Depok',
    slug: 'meja-carourie-depok',
    description: 'Workshop custom meja rias selebgram cermin lampu LED, meja nakas kamar tidur dan drawer meja kerja.',
    location: 'Kab. Bogor',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.9,
    transactions: 1400,
    avatar: '',
    avatarBg: '#DB2777',
    products: []
  },
  {
    id: 'store-14',
    name: 'Mejastero37',
    slug: 'mejastero37',
    description: 'Produsen meja lipat bazar koper serbaguna, meja cafe bulat kayu pinus, meja angkringan dan bangku kayu.',
    location: 'Kab. Ponorogo',
    province: 'Jawa Timur',
    type: 'pm-pro',
    rating: 4.9,
    transactions: 2900,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#65A30D',
    products: [
      { id: 'p-mst-1', title: 'Meja Lipat Kaki Silang Portable', price: 230000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-mst-2', title: 'Meja Cafe Set 2 Kursi Kayu', price: 600000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-mst-3', title: 'Meja Makan Bulat Minimalis 90cm', price: 600000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-15',
    name: 'Pusat meja',
    slug: 'pusat-meja',
    description: 'Pusat grosir meja kantor, meja tulis resepsionis, meja belajar anak dan sekat partisi meja kerja.',
    location: 'Jakarta Timur',
    province: 'DKI Jakarta',
    type: 'pm-pro',
    rating: 4.8,
    transactions: 8400,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#DC2626',
    products: [
      { id: 'p-pms-1', title: 'Meja Kantor Manager Laci 3', price: 804000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-pms-2', title: 'Meja Kerja Staff Besi Hollow', price: 181000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-pms-3', title: 'Meja Belajar Anak Serbaguna', price: 132000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-16',
    name: 'MEJA LIPAT MAKASSAR',
    slug: 'meja-lipat-makassar',
    description: 'Distributor utama meja lipat laptop dan meja santai kasur wilayah Makassar dan Indonesia Timur.',
    location: 'Makassar',
    province: 'Sulawesi Selatan',
    type: 'power-shop',
    rating: 4.8,
    transactions: 3100,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#0284C7',
    products: [
      { id: 'p-mlm-1', title: 'Meja Lipat Laptop Kayu Halus', price: 78000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-mlm-2', title: 'Meja Belajar Lipat Karakter Anak', price: 75000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-17',
    name: 'Hiasan Meja_NEW',
    slug: 'hiasan-meja-new',
    description: 'Dekorasi aesthetic meja kerja, vas bunga meja, lampu meja belajar dan pernak-pernik meja kantor.',
    location: 'Kab. Lombok Timur',
    province: 'Nusa Tenggara Barat',
    type: 'power-shop',
    rating: 4.7,
    transactions: 1500,
    avatar: '',
    avatarBg: '#059669',
    products: [
      { id: 'p-hmn-1', title: 'Pot Bunga Mini Hiasan Meja', price: 15000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-hmn-2', title: 'Ornamen Bonsai Hiasan Meja Kerja', price: 15000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-18',
    name: 'mejakushop',
    slug: 'mejakushop',
    description: 'Penyedia perlengkapan meja makan cafe, meja resto kayu jati belanda, dan furniture minimalis.',
    location: 'Kab. Grobogan',
    province: 'Jawa Tengah',
    type: 'power-shop',
    rating: 4.8,
    transactions: 2200,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#B45309',
    products: [
      { id: 'p-mks-1', title: 'Bantalan Kaki Meja Anti Gores', price: 1500, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-mks-2', title: 'Meja Makan Resto Kayu Solid 4 Kursi', price: 3508000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-19',
    name: 'Enyong Mejagong',
    slug: 'enyong-mejagong',
    description: 'Pusat oleh-oleh dan furniture pengrajin meja bambu serta meja kayu khas Pemalang.',
    location: 'Kab. Pemalang',
    province: 'Jawa Tengah',
    type: 'power-shop',
    rating: 4.6,
    transactions: 490,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#475569',
    products: [
      { id: 'p-eym-1', title: 'Taplak Meja Tradisional Tenun', price: 14850, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-20',
    name: 'Yesis Meja',
    slug: 'yesis-meja',
    description: 'Pabrik pembuat taplak meja pesta, cover meja prasmanan wedding, dan sarung kursi hotel.',
    location: 'Depok',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.9,
    transactions: 5700,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#EAB308',
    products: [
      { id: 'p-ysm-1', title: 'Cover Meja Prasmanan Pesta Rempel', price: 900000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-21',
    name: 'jual etalase meja untuk j...',
    slug: 'jual-etalase-meja',
    description: 'Produsen meja etalase kaca aluminium jualan pulsa, etalase warung makan, dan meja counter konter.',
    location: 'Banjarmasin',
    province: 'Kalimantan Selatan',
    type: 'power-shop',
    rating: 4.7,
    transactions: 810,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#0D9488',
    products: [
      { id: 'p-jem-1', title: 'Meja Etalase Kaca Aluminium 1.5M', price: 1000000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-22',
    name: 'distributor meja lipat',
    slug: 'distributor-meja-lipat',
    description: 'Grosir tangan pertama meja belajar lipat anak, meja laptop lesehan, dan meja lipat camping murah.',
    location: 'Bandung',
    province: 'Jawa Barat',
    type: 'pm-pro',
    rating: 4.9,
    transactions: 18900,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#059669',
    products: [
      { id: 'p-dml-1', title: 'Meja Lipat Kayu Solid Lesehan 60x40', price: 200000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-23',
    name: 'Sura Meja',
    slug: 'sura-meja',
    description: 'Custom meja makan kayu trembesi alami tepi hidup (live edge) dan meja tamu kayu utuh tanpa sambungan.',
    location: 'Bandung',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.8,
    transactions: 340,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#B45309',
    products: []
  },
  {
    id: 'store-24',
    name: 'yasin meja lipat komputer',
    slug: 'yasin-meja-lipat-komputer',
    description: 'Spesialis meja komputer lesehan lipat, meja kerja samping ranjang kasur beroda dan meja laptop portable.',
    location: 'Kab. Bandung Barat',
    province: 'Jawa Barat',
    type: 'pm-pro',
    rating: 4.8,
    transactions: 4200,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#374151',
    products: [
      { id: 'p-ymk-1', title: 'Meja Lipat Komputer Rangka Baja', price: 500000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-ymk-2', title: 'Meja Kerja Laptop Kaki Besi 80cm', price: 400000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-ymk-3', title: 'Meja Belajar Lesehan Laci Kayu', price: 380000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-25',
    name: 'olshop meja',
    slug: 'olshop-meja',
    description: 'Pusat furniture meja rias modern, meja konsol pintu masuk, dan meja marmer luxury.',
    location: 'Kab. Bandung',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.7,
    transactions: 1200,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#059669',
    products: [
      { id: 'p-osm-1', title: 'Meja Rias Cermin Oval Modern', price: 400000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-osm-2', title: 'Meja Makan Marmer Carrara 6 Kursi', price: 18000000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-26',
    name: 'MEJA PRODUCTION',
    slug: 'meja-production',
    description: 'Pabrikasi meja lipat event, meja display pameran, booth meja portable dan perlengkapan pameran.',
    location: 'Kab. Sumedang',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.8,
    transactions: 2400,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#2563EB',
    products: [
      { id: 'p-mpr-1', title: 'Meja Display Event Koper Portable', price: 95000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-27',
    name: 'meja makan produsen',
    slug: 'meja-makan-produsen',
    description: 'Langsung dari pengrajin mebel meja makan kayu jati belanda, meja makan bulat, dan meja cafe tahan panas.',
    location: 'Kab. Bandung Barat',
    province: 'Jawa Barat',
    type: 'pm-pro',
    rating: 4.9,
    transactions: 5100,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#DC2626',
    products: [
      { id: 'p-mmp-1', title: 'Meja Makan Minimalis Kayu Pinus 4K', price: 500000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-mmp-2', title: 'Meja Cafe Kotak Rangka Besi', price: 400000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-mmp-3', title: 'Meja Makan Set 2 Kursi Santai', price: 380000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-28',
    name: 'surkila meja lipat restore',
    slug: 'surkila-meja-lipat-restore',
    description: 'Toko spesialis meja lipat camping, meja bazar outdoor aluminium, dan meja belajar lipat anak.',
    location: 'Kab. Bandung Barat',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.8,
    transactions: 3700,
    avatar: '',
    avatarBg: '#475569',
    products: [
      { id: 'p-sml-1', title: 'Meja Lipat Aluminium Koper 120cm', price: 830000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-sml-2', title: 'Meja Lipat Taman Outdoor Kayu', price: 700000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-sml-3', title: 'Meja Belajar Lipat Karakter Kartun', price: 400000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-29',
    name: 'Meja Kursipedia',
    slug: 'meja-kursipedia',
    description: 'Kamus furniture meja dan kursi kantor terlengkap, meja kerja ergonomis, meja gaming dan kursi staff.',
    location: 'Kota Bandung',
    province: 'Jawa Barat',
    type: 'pm-pro',
    rating: 4.9,
    transactions: 9300,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#4F3582',
    products: [
      { id: 'p-mkp-1', title: 'Meja Kerja Ergonomis Rangka Besi', price: 450000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-mkp-2', title: 'Meja Komputer Minimalis Laci Keyboard', price: 400000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-mkp-3', title: 'Meja Belajar Mahasiswa Simple Wood', price: 380000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-30',
    name: 'LAMPU DINDING LAMPU MEJA',
    slug: 'lampu-dinding-lampu-meja',
    description: 'Pusat lampu meja belajar LED pelindung mata, lampu tidur meja minimalis dan kap lampu aesthetic.',
    location: 'Kab. Bandung',
    province: 'Jawa Barat',
    type: 'power-shop',
    rating: 4.8,
    transactions: 6200,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#D97706',
    products: [
      { id: 'p-ldm-1', title: 'Lampu Meja Belajar LED Warm Light', price: 80000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-ldm-2', title: 'Lampu Meja Aesthetic Kap Bambu', price: 88000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-ldm-3', title: 'Lampu Meja Vintage Retro Edison', price: 88000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-31',
    name: 'Informa Official Store',
    slug: 'informa-official',
    description: 'Official Store Informa Furnishings. Menyediakan aneka furniture rumah, meja kerja, meja rias, meja makan mewah dan dekorasi modern.',
    location: 'Kota Tangerang Selatan',
    province: 'Banten',
    type: 'official',
    rating: 4.9,
    transactions: 45000,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#03AC0E',
    products: [
      { id: 'p-inf-1', title: 'Informa Meja Belajar Lipat Portabel', price: 45000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-inf-2', title: 'Informa Meja Rias LED Touchscreen', price: 575000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-inf-3', title: 'Informa Meja Makan Kaca 6 Kursi', price: 3499000, image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-32',
    name: 'Pira Home Living',
    slug: 'pira-home-living',
    description: 'Pusat perabot rumah minimalis siap rakit. Meja kerja kantor, meja komputer modern 120cm, rak meja buku dan coffee table.',
    location: 'Kota Surabaya',
    province: 'Jawa Timur',
    type: 'official',
    rating: 4.9,
    transactions: 32000,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#03AC0E',
    products: [
      { id: 'p-pir-1', title: 'Pira Meja Kerja Minimalis 120cm', price: 349000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-pir-2', title: 'Pira Meja Komputer L-Shape Corner', price: 685000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-pir-3', title: 'Pira Meja Tamu Persegi Kayu Oak', price: 265000, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'store-33',
    name: 'Dekoruma Official Store',
    slug: 'dekoruma-official',
    description: 'Furniture Japandi (Japanese-Scandinavian) aesthetic. Meja lipat dinding, meja samping sofa C-shape, dan meja belajar multifungsi.',
    location: 'Kota Jakarta Barat',
    province: 'DKI Jakarta',
    type: 'official',
    rating: 4.9,
    transactions: 28000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    avatarBg: '#03AC0E',
    products: [
      { id: 'p-dkr-1', title: 'Dekoruma Meja Lipat Dinding', price: 129000, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&auto=format&fit=crop&q=80' },
      { id: 'p-dkr-2', title: 'Dekoruma Meja Samping Sofa C-Shape', price: 95000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&auto=format&fit=crop&q=80' }
    ]
  }
];
