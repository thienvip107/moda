import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { newsList as initialNews } from '../data/news';
import { productsList as initialProducts } from '../data/products';
import { optimizeCloudinaryUrl } from './cloudinary';

const isUuid = (val) => typeof val === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

export const defaultBanners = [
  {
    id: 'b1',
    title: '(1) KHÔNG CHỈ LÀ ĐÁ TỰ NHIÊN',
    title_en: '(01) TIMELESS STONE. TIMELESS ARCHITECTURE',
    subtitle: 'Là vật liệu được kiến tạo qua hàng triệu năm, tuyển chọn từ những mỏ đá Lai Châu và hoàn thiện để trở thành một phần của những công trình mang giá trị vượt thời gian.',
    subtitle_en: 'Shaped over millions of years and carefully quarried from Lai Chau, our natural Slate is crafted to become part of architecture that endures across generations.',
    image_url: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_1920,f_auto,q_auto/v1785832466/znz0urwu8jp8fu54bz5k.png',
    link_url: '/about',
    order_index: 1,
    is_active: true
  },
  {
    id: 'b2',
    title: '(2) CHẾ TÁC & THI CÔNG ĐÁ ĐỘC BẢN',
    title_en: '(02) BESPOKE STONE CRAFTSMANSHIP',
    subtitle: 'Không có hai phiến đá nào giống nhau. Mỗi sản phẩm là dấu ấn độc bản của thiên nhiên, được chẻ tay thủ công để lưu giữ trọn vẹn những đường vân nguyên bản, tạo nên vẻ đẹp mộc mạc, tinh tế và sang trọng.',
    subtitle_en: 'No two pieces of Slate are ever the same. Each stone is a unique expression of nature, carefully hand-split to preserve its authentic texture and distinctive character, creating architectural spaces defined by timeless elegance and individuality.',
    image_url: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_1920,f_auto,q_auto/v1786936942/o31d4gsbiblvqwxvbkx2.png',
    link_url: '/projects',
    order_index: 2,
    is_active: true
  },
  {
    id: 'b3',
    title: '(3) ĐÁ SLATE LAI CHÂU TỰ NHIÊN',
    title_en: '(03) LAI CHAU NATURAL SLATE',
    subtitle: 'Giải pháp ốp lát & lợp mái cao cấp trường tồn theo thời gian. Trực tiếp từ mỏ khai thác Lai Châu.',
    subtitle_en: 'Premium roofing, cladding, and paving solutions crafted directly from Lai Chau natural stone quarries.',
    image_url: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_1920,f_auto,q_auto/v1786937020/j4rexyaqfdvqejovgaxx.jpg',
    link_url: '/products',
    order_index: 3,
    is_active: true
  }
];

const TEST_BANNER_KEYWORDS = [
  'xhcldvnhsangyaor75uz',
  'gfdazhqzcrw0asamtbnw',
  'vfdzgkygfdtwfp2eeoj8',
  'đá slate lai châu tự nhiên high-end'
];

export function isTestBanner(banner) {
  if (!banner) return false;
  const img = String(banner.image_url || banner.img || '').toLowerCase();
  const title = String(banner.title || '').toLowerCase();
  return TEST_BANNER_KEYWORDS.some(kw => img.includes(kw) || title.includes(kw));
}

const defaultPolicies = {
  sales_policy: {
    id: 'p1',
    key: 'sales_policy',
    title: 'Chính Sách Bán Hàng & Giao Nhận',
    content: '<h3>1. Cam kết chất lượng</h3><p>Tất cả sản phẩm đá tự nhiên Slate Lai Châu đều được khai thác và chọn lọc tiêu chuẩn xuất khẩu. Cam kết 1 đổi 1 nếu đá bị nứt vỡ do vận chuyển.</p><h3>2. Quy trình giao nhận</h3><p>Giao hàng toàn quốc tận chân công trình bằng xe cẩu chuyên dụng. Thời gian giao hàng từ 2-5 ngày làm việc.</p><h3>3. Thanh toán</h3><p>Tạm ứng 30% khi đặt hàng, 70% còn lại thanh toán ngay khi nghiệm thu hạ hàng tại công trình.</p>'
  },
  company_profile: {
    id: 'p2',
    key: 'company_profile',
    title: 'Hồ Sơ Năng Lực Công Ty',
    content: '<p>Công ty HT STONE là đơn vị hàng đầu tại Việt Nam trong lĩnh vực khai thác, chế tác và thi công đá Slate Lai Châu tự nhiên.</p><p>Vốn kinh nghiệm trên 15 năm cùng đội ngũ kỹ sư mỏ, thợ chế tác đá lành nghề, chúng tôi đã cung cấp vật liệu cho hàng nghìn công trình biệt thự, resort cao cấp trên toàn quốc.</p>'
  }
};

const defaultProjects = [
  {
    id: 'nha-hat-lon-ha-noi',
    title: 'Nhà Hát Lớn Hà Nội',
    title_en: 'Hanoi Opera House',
    slug: 'nha-hat-lon-ha-noi',
    category: 'iconic',
    desc: 'Kiến trúc biểu tượng - Hạng mục lợp mái ngói đá tự nhiên nguyên bản.',
    desc_en: 'Iconic heritage architecture – Roofing with authentic natural Slate stone tiles.',
    location: 'Hoàn Kiếm, Hà Nội',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694428/adpht1zwuubd1lddxbtq.jpg',
    year: '2024',
    scale: 'Mái ngói đá Slate'
  },
  {
    id: 'waldorf-astoria-hanoi',
    title: 'Waldorf Astoria Hanoi',
    title_en: 'Waldorf Astoria Hanoi',
    slug: 'waldorf-astoria-hanoi',
    category: 'hotel',
    desc: 'Khách sạn sang trọng - Ốp vách nghệ thuật và lát đá tự nhiên đẳng cấp thượng lưu.',
    desc_en: 'Luxury hotel – Feature art cladding and ultra-premium natural stone paving.',
    location: 'Hà Nội',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694425/p3mrfgfx1g0v5vihwj5i.jpg',
    year: '2024',
    scale: 'Đá ốp lát cao cấp'
  },
  {
    id: 'pacific-place-hanoi',
    title: 'Pacific Place Hanoi',
    title_en: 'Pacific Place Hanoi',
    slug: 'pacific-place-hanoi',
    category: 'urban',
    desc: 'Kiến trúc đô thị hiện đại - Hạng mục đá lát sảnh và cảnh quan thương mại.',
    desc_en: 'Modern urban architecture – Lobby stone paving and commercial landscape.',
    location: 'Hà Nội',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694423/kcnmsxbnasrbezglaqmy.jpg',
    year: '2023',
    scale: 'Đá ốp mặt tiền & cảnh quan'
  },
  {
    id: 'alluvia-city',
    title: 'Alluvia City (Văn Giang, Hưng Yên)',
    title_en: 'Alluvia City (Van Giang, Hung Yen)',
    slug: 'alluvia-city',
    category: 'urban',
    desc: 'Kiến trúc đô thị hiện đại - Cung cấp và thi công đá đường dạo sân vườn khu đô thị.',
    desc_en: 'Modern urban complex – Supply and installation of natural stone garden walkways.',
    location: 'Văn Giang, Hưng Yên',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694459/cbxamzsfpfvto5g5hi4q.jpg',
    year: '2024',
    scale: 'Đá lát cảnh quan'
  },
  {
    id: 'dai-su-quan-anh',
    title: 'Đại sứ quán Vương quốc Anh tại Hà Nội',
    title_en: 'British Embassy Hanoi',
    slug: 'dai-su-quan-anh',
    category: 'public',
    desc: 'Công trình công cộng - Cung cấp đá tự nhiên bảo đảm tiêu chuẩn kiến trúc ngoại giao.',
    desc_en: 'Public landmark – Premium natural slate fulfilling strict diplomatic architectural standards.',
    location: 'Hà Nội',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694419/khg9fw7wkqnqssrksraj.jpg',
    year: '2023',
    scale: 'Đá ốp tường & lợp mái'
  },
  {
    id: 'sun-spa-resort',
    title: 'Sun Spa Resort (Quảng Bình)',
    title_en: 'Sun Spa Resort (Quang Binh)',
    slug: 'sun-spa-resort',
    category: 'resort',
    desc: 'Nghỉ dưỡng ven biển - Lát hồ bơi vô cực và đường dạo bungalow bằng đá Slate chống trơn.',
    desc_en: 'Coastal luxury resort – Infinity pool paving and bungalow paths with slip-resistant slate.',
    location: 'Quảng Bình',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694425/p3mrfgfx1g0v5vihwj5i.jpg',
    year: '2023',
    scale: 'Đá lát hồ bơi 3.000m²'
  },
  {
    id: 'lake-view-hotel',
    title: 'Lake View Hotel Hà Nội',
    title_en: 'Lake View Hotel Hanoi',
    slug: 'lake-view-hotel',
    category: 'hotel',
    desc: 'Khách sạn sang trọng - Hệ thống đá đen ốp sảnh đón khách và vách sảnh thang máy.',
    desc_en: 'Luxury boutique hotel – Black slate reception lobby cladding and elevator lobbies.',
    location: 'Hà Nội',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694413/eacdckyeft9xsvbfszpb.jpg',
    year: '2023',
    scale: 'Đá ốp vách 1.200m²'
  },
  {
    id: 'biethu-vuon-dao-ciputra',
    title: 'Khu biệt thự Vườn Đào – Ciputra Hà Nội',
    title_en: 'Vuon Dao Villas - Ciputra Hanoi',
    slug: 'biethu-vuon-dao-ciputra',
    category: 'villa',
    desc: 'Biệt thự cao cấp - Lợp mái đá vảy cá đen tuyền kết hợp đá chẻ ốp tường rào biệt thự.',
    desc_en: 'Luxury residential villas – Solid fish scale black slate roofing and split stone fencing.',
    location: 'Tây Hồ, Hà Nội',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694423/kcnmsxbnasrbezglaqmy.jpg',
    year: '2024',
    scale: 'Đá lợp mái & ốp rào'
  },
  {
    id: 'eco-retreat-long-an',
    title: 'Eco Retreat (Long An)',
    title_en: 'Eco Retreat (Long An)',
    slug: 'eco-retreat-long-an',
    category: 'resort',
    desc: 'Không gian resort sinh thái - Cung cấp đá chẻ tự nhiên hòa quyện cảnh quan thiên nhiên.',
    desc_en: 'Eco-resort sanctuary – Natural split slate harmoniously integrated into tropical landscape.',
    location: 'Long An',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694444/cap5xlp4lzlzh5ca8zv2.jpg',
    year: '2024',
    scale: 'Đá cảnh quan sinh thái'
  }
];

const defaultEvents = [
  {
    id: 'e1',
    title: 'Triển lãm Vietbuild 2026 - Gian hàng Đá Slate Lai Châu',
    slug: 'trien-lam-vietbuild-2026',
    summary: 'HT STONE tham gia triển lãm quốc tế Vietbuild với bộ sưu tập ngói đá & đá ốp tường độc bản.',
    content: 'Sự kiện quy tụ hàng nghìn kiến trúc sư và nhà thầu hàng đầu. Gian hàng của HT STONE trưng bày các sản phẩm ngói đá Slate đen, đá đa sắc lợp mái biệt thự.',
    cover_image: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694444/cap5xlp4lzlzh5ca8zv2.jpg',
    event_date: '2026-08-15',
    location: 'Trung tâm Triển lãm SECC, Quận 7, TP.HCM',
    status: 'upcoming'
  }
];

// Helper lưu LocalStorage nếu không dùng Supabase
const getLocalData = (key, fallback) => {
  const saved = localStorage.getItem(`sailor_${key}`);
  return saved ? JSON.parse(saved) : fallback;
};

const setLocalData = (key, data) => {
  localStorage.setItem(`sailor_${key}`, JSON.stringify(data));
};

// ==========================================
// 1. BANNER API
export async function getBanners() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('order_index', { ascending: true });
      if (!error && data?.length) {
        const cleanList = data.filter(b => !isTestBanner(b) && b.is_active !== false);
        if (cleanList.length > 0) {
          return cleanList.map(b => ({
            ...b,
            image_url: optimizeCloudinaryUrl(b.image_url, 1920)
          }));
        }
      }
    } catch (e) {
      console.warn('Supabase fetch banners failed, falling back:', e);
    }
  }
  const banners = getLocalData('banners', defaultBanners);
  const cleanList = banners.filter(b => !isTestBanner(b) && b.is_active !== false);
  return (cleanList.length ? cleanList : defaultBanners).map(b => ({ 
    ...b, 
    image_url: optimizeCloudinaryUrl(b.image_url, 1920) 
  }));
}

export async function saveBanner(bannerData) {
  if (isSupabaseConfigured) {
    if (bannerData.id) {
      const { data, error } = await supabase
        .from('banners')
        .update(bannerData)
        .eq('id', bannerData.id)
        .select();
      if (!error && data?.length) return data[0];
    }
    const { id, ...newBanner } = bannerData;
    const { data, error } = await supabase
      .from('banners')
      .insert([newBanner])
      .select();
    if (error) throw error;
    return data[0];
  }
  const banners = getLocalData('banners', defaultBanners);
  let updated;
  if (bannerData.id) {
    updated = banners.map(b => b.id === bannerData.id ? { ...b, ...bannerData } : b);
  } else {
    updated = [...banners, { ...bannerData, id: `b_${Date.now()}` }];
  }
  setLocalData('banners', updated);
  return bannerData;
}

export async function deleteBanner(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
  const banners = getLocalData('banners', defaultBanners);
  setLocalData('banners', banners.filter(b => b.id !== id));
  return true;
}

// ==========================================
// 2. NEWS & ARTICLES API
// ==========================================
export async function getNewsList() {
  const mapNewsData = (item) => {
    let gal = [];
    if (Array.isArray(item.gallery)) {
      gal = item.gallery.map(u => optimizeCloudinaryUrl(u, 800));
    } else if (typeof item.gallery === 'string') {
      try {
        const parsed = JSON.parse(item.gallery);
        if (Array.isArray(parsed)) gal = parsed.map(u => optimizeCloudinaryUrl(u, 800));
      } catch (e) {
        if (item.gallery) gal = [optimizeCloudinaryUrl(item.gallery, 800)];
      }
    }
    const cover = optimizeCloudinaryUrl(item.cover_image || item.img, 800);
    if (cover && !gal.includes(cover)) {
      gal.unshift(cover);
    }
    return {
      ...item,
      img: cover,
      cover_image: cover,
      gallery: gal,
      title: item.title || '',
      title_en: item.title_en || '',
      summary: item.summary || item.excerpt || '',
      summary_en: item.summary_en || item.excerpt_en || '',
      excerpt: item.summary || item.excerpt || 'Thông tin bài viết kỹ thuật thi công đá tự nhiên...',
      excerpt_en: item.summary_en || item.excerpt_en || '',
      content: item.content || '',
      content_en: item.content_en || '',
      date: item.created_at ? new Date(item.created_at).toLocaleDateString('vi-VN') : (item.date || 'Gần đây')
    };
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data.map(mapNewsData);
      }
    } catch (e) {
      console.warn('Supabase fetch news failed, falling back:', e);
    }
  }
  const news = getLocalData('news', initialNews);
  return news.map(mapNewsData);
}

export async function getNewsBySlugOrId(idOrSlug) {
  const news = await getNewsList();
  return news.find(n => n.id === idOrSlug || n.slug === idOrSlug) || news[0];
}

export async function saveNews(newsItem) {
  const slug = newsItem.slug || newsItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const mainImg = newsItem.img || newsItem.cover_image || '';
  let gal = Array.isArray(newsItem.gallery) ? [...newsItem.gallery] : [];
  if (mainImg && !gal.includes(mainImg)) {
    gal.unshift(mainImg);
  }

  const payload = {
    title: newsItem.title,
    title_en: newsItem.title_en || '',
    slug,
    summary: newsItem.excerpt || newsItem.summary,
    summary_en: newsItem.summary_en || newsItem.excerpt_en || '',
    content: Array.isArray(newsItem.content) ? newsItem.content.join('\n\n') : newsItem.content,
    content_en: Array.isArray(newsItem.content_en) ? newsItem.content_en.join('\n\n') : (newsItem.content_en || ''),
    cover_image: mainImg,
    category: newsItem.category || 'Tin tức',
    status: newsItem.status || 'published',
    gallery: gal
  };

  if (isSupabaseConfigured) {
    try {
      if (newsItem.id) {
        const { data, error } = await supabase
          .from('news')
          .update(payload)
          .eq('id', newsItem.id)
          .select();
        if (!error && data?.length) {
          const list = getLocalData('news', initialNews);
          setLocalData('news', list.map(n => n.id === newsItem.id ? { ...n, ...payload, id: newsItem.id } : n));
          return data[0];
        }
        if (error) console.error('Supabase update news error:', error);
      } else {
        const { data, error } = await supabase
          .from('news')
          .insert([payload])
          .select();
        if (!error && data?.length) {
          const list = getLocalData('news', initialNews);
          setLocalData('news', [data[0], ...list]);
          return data[0];
        }
        if (error) console.error('Supabase insert news error:', error);
      }
    } catch (e) {
      console.warn('Supabase saveNews error, falling back to local:', e);
    }
  }
  const list = getLocalData('news', initialNews);
  let updated;
  if (newsItem.id) {
    updated = list.map(n => n.id === newsItem.id ? { ...n, ...newsItem, ...payload, slug } : n);
  } else {
    updated = [{ ...newsItem, ...payload, id: `news_${Date.now()}`, slug }, ...list];
  }
  setLocalData('news', updated);
  return newsItem;
}

export async function deleteNews(id) {
  if (isSupabaseConfigured) {
    try {
      if (isUuid(id)) {
        await supabase.from('news').delete().eq('id', id);
      } else {
        await supabase.from('news').delete().eq('slug', id);
      }
    } catch (e) {
      console.warn('Supabase delete news failed:', e);
    }
  }
  const list = getLocalData('news', initialNews);
  setLocalData('news', list.filter(n => n.id !== id && n.slug !== id));
  return true;
}

// ==========================================
// 3. PRODUCTS API
// ==========================================
export function normalizeProductCategory(cat) {
  if (!cat) return 'da-den-lop-mai';
  const c = String(cat).toLowerCase().trim();
  if (c.includes('da-den-lop-mai') || c.includes('đen lợp mái') || c.includes('den lop mai') || c.includes('đá lợp mái') || c.includes('da lop mai') || c === 'roofing' || c === 'da-lop-mai') {
    return 'da-den-lop-mai';
  }
  if (c.includes('da-den-op-lat') || c.includes('đen ốp lát') || c.includes('den op lat') || c.includes('đá ốp tường') || c.includes('đá lát sân') || c === 'wall' || c === 'flooring') {
    return 'da-den-op-lat';
  }
  if (c.includes('da-da-sac-lop-mai') || c.includes('đa sắc lợp mái') || c.includes('da sac lop mai')) {
    return 'da-da-sac-lop-mai';
  }
  if (c.includes('da-da-sac-op-lat') || c.includes('đa sắc ốp lát') || c.includes('da sac op lat')) {
    return 'da-da-sac-op-lat';
  }
  if (c.includes('da-trang-tri') || c.includes('rối') || c.includes('roi') || c.includes('chẻ') || c.includes('che')) {
    return 'da-trang-tri';
  }
  return cat;
}

// Filter out old test / dummy products from initial setups
const TEST_PRODUCT_KEYWORDS = [
  'da-roi-tu-nhien-op-san-resort',
  'da-den-lai-chau-lop-mai-vay-ca',
  'da-den-lai-chau-lat-san-vuon',
  'da-da-sac-lai-chau-op-tuong',
  'đá rối tự nhiên ốp sân resort',
  'đá đen lai châu lợp mái vảy cá',
  'đá đen lai châu lát sân vườn',
  'đá đa sắc lai châu ốp tường'
];

export function isTestProduct(product) {
  if (!product) return false;
  const slug = String(product.slug || product.code || product.id || '').toLowerCase().trim();
  const name = String(product.name || product.title || '').toLowerCase().trim();
  return TEST_PRODUCT_KEYWORDS.some(kw => slug === kw || name === kw || slug.includes(kw) || name.includes(kw));
}

export async function getProductsList() {
  const defaultSpecs = {
    origin: 'Mỏ đá Slate Lai Châu, Việt Nam',
    sizes: '30x30, 30x60, 40x40 cm',
    thickness: '1.0 - 1.5 cm',
    surface: 'Chẻ tự nhiên / Mài thô'
  };

  const mapProductData = (p) => {
    const mainImg = optimizeCloudinaryUrl(p.image_url || p.img || '', 800);
    let gal = [];
    if (Array.isArray(p.gallery)) {
      gal = p.gallery.map(u => optimizeCloudinaryUrl(u, 800));
    } else if (typeof p.gallery === 'string') {
      try {
        const parsed = JSON.parse(p.gallery);
        if (Array.isArray(parsed)) gal = parsed.map(u => optimizeCloudinaryUrl(u, 800));
      } catch (e) {
        if (p.gallery) gal = [optimizeCloudinaryUrl(p.gallery, 800)];
      }
    }
    if (mainImg && !gal.includes(mainImg)) {
      gal.unshift(mainImg);
    }
    let specsObj = p.specs;
    if (typeof specsObj === 'string') {
      try { specsObj = JSON.parse(specsObj); } catch (e) { specsObj = null; }
    }
    const finalSpecs = {
      origin: (specsObj?.origin && String(specsObj.origin).trim()) || p.origin || defaultSpecs.origin,
      sizes: (specsObj?.sizes && String(specsObj.sizes).trim()) || p.sizes || defaultSpecs.sizes,
      thickness: (specsObj?.thickness && String(specsObj.thickness).trim()) || p.thickness || defaultSpecs.thickness,
      surface: (specsObj?.surface && String(specsObj.surface).trim()) || p.surface || defaultSpecs.surface,
      ...specsObj
    };
    if (!finalSpecs.sizes || !String(finalSpecs.sizes).trim() || finalSpecs.sizes === 'Liên hệ') finalSpecs.sizes = defaultSpecs.sizes;
    if (!finalSpecs.thickness || !String(finalSpecs.thickness).trim() || finalSpecs.thickness === 'Liên hệ') finalSpecs.thickness = defaultSpecs.thickness;
    if (!finalSpecs.surface || !String(finalSpecs.surface).trim() || finalSpecs.surface === 'Liên hệ') finalSpecs.surface = defaultSpecs.surface;
    if (!finalSpecs.origin || !String(finalSpecs.origin).trim()) finalSpecs.origin = defaultSpecs.origin;

    const localMatch = Array.isArray(initialProducts) ? initialProducts.find(ip => ip.id === p.id || ip.slug === p.slug || ip.title === p.name || ip.title === p.title) : null;
    const fallbackNameEn = (p.name || '').includes('DOL01') ? 'BLACK SLATE SQUARE PAVING - CODE DOL01'
      : (p.name || '').includes('DOL02') ? 'BLACK SLATE RECTANGULAR PAVING - CODE DOL02'
      : (p.name || '').includes('DOL03') ? 'BLACK SLATE SQUARE PAVING - CODE DOL03'
      : (p.name || '').includes('DOL04') ? 'BLACK SLATE SQUARE PAVING - CODE DOL04'
      : (p.name || '').includes('DOL05') ? 'BLACK SLATE RECTANGULAR PAVING - CODE DOL05'
      : (p.name || '').toLowerCase().includes('đa sắc') ? 'MULTICOLOR SLATE CLADDING & PAVING'
      : '';
    const resolvedNameEn = p.name_en || p.title_en || p.engTitle || localMatch?.engTitle || localMatch?.name_en || fallbackNameEn;

    return {
      ...p,
      title: p.name || p.title,
      name: p.name || p.title,
      name_en: resolvedNameEn,
      desc: p.description || p.desc,
      description: p.description || p.desc,
      description_en: p.description_en || p.desc_en || localMatch?.desc_en || '',
      img: mainImg,
      image_url: mainImg,
      gallery: gal,
      code: p.slug || p.code,
      category: normalizeProductCategory(p.category),
      specs: finalSpecs
    };
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.filter(p => !isTestProduct(p)).map(mapProductData);
      }
    } catch (e) {
      console.warn('Supabase fetch products failed, falling back:', e);
    }
  }
  const localProducts = getLocalData('products', initialProducts);
  const list = Array.isArray(localProducts) ? localProducts : Object.values(localProducts).flat();
  return list.filter(p => !isTestProduct(p)).map(mapProductData);
}

export async function saveProduct(productData) {
  const slug = productData.slug || (productData.name || productData.title).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const mainImg = productData.img || productData.image_url || '';
  let gal = Array.isArray(productData.gallery) ? [...productData.gallery] : [];
  if (mainImg && !gal.includes(mainImg)) {
    gal.unshift(mainImg);
  }

  const specsObj = productData.specs || {
    sizes: productData.sizes || '30x30, 30x60, 40x40 cm',
    thickness: productData.thickness || '1.0 - 1.5 cm',
    surface: productData.surface || 'Chẻ tự nhiên / Mài thô',
    origin: productData.origin || 'Mỏ đá Slate Lai Châu, Việt Nam'
  };

  const payload = {
    name: productData.name || productData.title,
    name_en: productData.name_en || productData.title_en || '',
    slug,
    price: productData.price || 'Liên hệ',
    description: productData.description || productData.desc || '',
    description_en: productData.description_en || productData.desc_en || '',
    image_url: mainImg,
    category: normalizeProductCategory(productData.category),
    is_new: productData.is_new ?? true,
    specs: specsObj,
    gallery: gal,
    features: Array.isArray(productData.features) ? productData.features : [],
    applications: Array.isArray(productData.applications) ? productData.applications : []
  };

  let savedResult = null;

  if (isSupabaseConfigured) {
    try {
      if (productData.id && typeof productData.id === 'string' && productData.id.length > 20) {
        const { data, error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', productData.id)
          .select();
        if (error) throw error;
        if (data?.length) savedResult = data[0];
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([payload])
          .select();
        if (error) throw error;
        if (data?.length) savedResult = data[0];
      }
    } catch (err) {
      console.warn('Supabase save with specs/gallery payload failed, trying basic payload:', err.message);
      const basicPayload = { ...payload };
      delete basicPayload.specs;
      delete basicPayload.gallery;
      delete basicPayload.features;
      delete basicPayload.applications;

      try {
        if (productData.id && typeof productData.id === 'string' && productData.id.length > 20) {
          const { data, error } = await supabase
            .from('products')
            .update(basicPayload)
            .eq('id', productData.id)
            .select();
          if (!error && data?.length) savedResult = data[0];
        } else {
          const { data, error } = await supabase
            .from('products')
            .insert([basicPayload])
            .select();
          if (!error && data?.length) savedResult = data[0];
        }
      } catch (err2) {
        console.error('Basic Supabase save failed:', err2);
      }
    }
  }

  const fullItem = {
    ...productData,
    ...payload,
    id: savedResult?.id || productData.id || `prod_${Date.now()}`,
    img: mainImg
  };
  const list = getLocalData('products', initialProducts);
  const updated = list.map(p => (p.id === fullItem.id || p.slug === fullItem.slug) ? fullItem : p);
  if (!list.some(p => p.id === fullItem.id || p.slug === fullItem.slug)) {
    updated.unshift(fullItem);
  }
  setLocalData('products', updated);
  return savedResult || fullItem;
}

export async function deleteProduct(id) {
  if (isSupabaseConfigured) {
    try {
      if (isUuid(id)) {
        await supabase.from('products').delete().eq('id', id);
      } else {
        await supabase.from('products').delete().eq('slug', id);
      }
    } catch (e) {
      console.warn('Supabase delete product failed:', e);
    }
  }
  const list = getLocalData('products', initialProducts);
  setLocalData('products', list.filter(p => p.id !== id && p.slug !== id));
  return true;
}

// ==========================================
// 4. POLICIES & COMPANY PROFILE API
// ==========================================
export async function getPolicy(key) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('policies')
        .select('*')
        .eq('key', key)
        .single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase fetch policy failed, falling back:', e);
    }
  }
  const policies = getLocalData('policies', defaultPolicies);
  return policies[key] || { key, title: 'Chưa cập nhật', content: '<p>Nội dung đang cập nhật...</p>' };
}

export async function savePolicy(key, title, content, title_en = '', content_en = '') {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('policies')
      .upsert(
        { key, title, title_en, content, content_en, updated_at: new Date() },
        { onConflict: 'key' }
      )
      .select();
    if (error) throw error;
    return data[0];
  }
  const policies = getLocalData('policies', defaultPolicies);
  policies[key] = { key, title, title_en, content, content_en };
  setLocalData('policies', policies);
  return policies[key];
}

// ==========================================
// 5. EVENTS API
// ==========================================
export async function getEventsList() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data?.length) {
        return data.map(e => ({
          ...e,
          cover_image: optimizeCloudinaryUrl(e.cover_image || e.img, 800)
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch events failed, falling back:', e);
    }
  }
  const events = getLocalData('events', defaultEvents);
  return events.map(e => ({
    ...e,
    cover_image: optimizeCloudinaryUrl(e.cover_image || e.img, 800)
  }));
}

export async function saveEvent(evt) {
  const slug = evt.slug || evt.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const payload = {
    title: evt.title,
    title_en: evt.title_en || '',
    slug,
    summary: evt.summary || '',
    summary_en: evt.summary_en || '',
    content: evt.content || '',
    content_en: evt.content_en || '',
    cover_image: evt.cover_image || evt.img || '',
    event_date: evt.event_date || null,
    location: evt.location || '',
    status: evt.status || 'upcoming'
  };

  if (isSupabaseConfigured) {
    if (evt.id) {
      const { data, error } = await supabase
        .from('events')
        .update(payload)
        .eq('id', evt.id)
        .select();
      if (!error && data?.length) return data[0];
    }
    const { data, error } = await supabase
      .from('events')
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  }
  const events = getLocalData('events', defaultEvents);
  let updated;
  if (evt.id) {
    updated = events.map(e => e.id === evt.id ? { ...e, ...evt, slug } : e);
  } else {
    updated = [{ ...evt, id: `evt_${Date.now()}`, slug }, ...events];
  }
  setLocalData('events', updated);
  return evt;
}

export async function deleteEvent(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
  const events = getLocalData('events', defaultEvents);
  setLocalData('events', events.filter(e => e.id !== id));
  return true;
}

// Filter out old test / dummy projects
const TEST_PROJECT_KEYWORDS = [
  'hotel de la coupole',
  'hotel-de-la-coupole',
  'vinhomes riverside',
  'vinhomes-riverside',
  'amanoi resort',
  'amanoi-resort'
];

export function isTestProject(project) {
  if (!project) return false;
  const slug = String(project.slug || project.id || '').toLowerCase().trim();
  const title = String(project.title || project.name || '').toLowerCase().trim();
  return TEST_PROJECT_KEYWORDS.some(kw => slug === kw || title === kw || slug.includes(kw) || title.includes(kw));
}

// ==========================================
// 6. PROJECTS & PORTFOLIO API
// ==========================================
export async function getProjectsList() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data?.length) {
        return data
          .filter(p => !isTestProject(p))
          .map(p => {
            const dp = defaultProjects.find(d => d.slug === p.slug || d.id === p.id || (d.title && p.title && d.title.toLowerCase() === p.title.toLowerCase()) || (p.title && d.title && p.title.toLowerCase().includes(d.title.toLowerCase())));
            return {
              ...p,
              title_en: p.title_en || dp?.title_en || p.title,
              img: optimizeCloudinaryUrl(p.image_url || p.img || dp?.img, 800),
              desc: p.description || p.desc || dp?.desc,
              desc_en: p.description_en || p.desc_en || dp?.desc_en || '',
              description_en: p.description_en || p.desc_en || dp?.desc_en || ''
            };
          });
      }
    } catch (e) {
      console.warn('Supabase fetch projects failed, falling back:', e);
    }
  }
  const projects = getLocalData('projects', defaultProjects);
  return projects
    .filter(p => !isTestProject(p))
    .map(p => ({
      ...p,
      img: optimizeCloudinaryUrl(p.img || p.image_url, 800),
      desc: p.description || p.desc,
      desc_en: p.description_en || p.desc_en || '',
      description_en: p.description_en || p.desc_en || ''
    }));
}

export async function saveProject(projectData) {
  const slug = projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const payload = {
    title: projectData.title,
    title_en: projectData.title_en || '',
    slug,
    category: projectData.category || 'villa',
    location: projectData.location || '',
    scale: projectData.scale || '',
    year: projectData.year || '2026',
    description: projectData.desc || projectData.description || '',
    description_en: projectData.desc_en || projectData.description_en || '',
    image_url: projectData.img || projectData.image_url
  };

  if (isSupabaseConfigured) {
    if (projectData.id) {
      const { data, error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', projectData.id)
        .select();
      if (!error && data?.length) return data[0];
    }
    const { data, error } = await supabase
      .from('projects')
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  }
  const list = await getProjectsList();
  let updated;
  if (projectData.id) {
    updated = list.map(p => p.id === projectData.id ? { ...p, ...projectData, slug } : p);
  } else {
    updated = [{ ...projectData, id: `proj_${Date.now()}`, slug }, ...list];
  }
  setLocalData('projects', updated);
  return projectData;
}

export async function deleteProject(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
  const list = await getProjectsList();
  setLocalData('projects', list.filter(p => p.id !== id));
  return true;
}

// ==========================================
// 7. SITE SETTINGS (HOTLINE, FOOTER, ADDRESS) API
// ==========================================
const defaultSettings = {
  hotline: '0909168587',
  zalo: '0909168587',
  email: 'info@htstone.vn',
  office_laichau: 'Số nhà 206 Trần Hưng Đạo, phường Đoàn Kết, tỉnh Lai Châu',
  office_laichau_phone: '0338.693.555',
  office_laichau_map: 'https://maps.app.goo.gl/7Shh2TsFGunCtt6A7',
  quarry_namho: 'Xã Pa Tần, Tỉnh Lai Châu',
  quarry_namho_phone: '0968005321',
  quarry_namho_map: 'https://maps.app.goo.gl/hyjSR6VSaarHiCb87',
  quarry_phiengen: 'Xã Lê Lợi, Tỉnh Lai Châu',
  address_headquarters: 'Số nhà 206 Trần Hưng Đạo, phường Đoàn Kết, tỉnh Lai Châu',
  address_factory: 'Mỏ Nậm Ho (Xã Pa Tần) & Mỏ Phiêng Én (Xã Lê Lợi), Tỉnh Lai Châu',
  company_full_name: 'HT STONE là thương hiệu đá tự nhiên thuộc Công ty TNHH MTV Thương mại và Xây dựng Hiền Tài',
  company_full_name_en: 'HT STONE is the natural stone brand of Hien Tai Trading & Construction One Member Co., Ltd.',
  facebook_url: 'https://facebook.com',
  instagram_url: 'https://instagram.com',
  home_intro_title: 'Làm Chủ Nguồn Đá Slate Tự Nhiên Từ Lai Châu',
  home_intro_title_en: 'Owning the Finest Lai Chau Slate at the Source',
  home_intro_desc: 'HT STONE sở hữu mỏ đá Slate tự nhiên tại Lai Châu, cung cấp hai dòng sản phẩm chính là đá Slate đen và đá Slate đa sắc. Việc làm chủ nguồn đá giúp chúng tôi kiểm soát chất lượng ngay từ khâu khai thác và đảm bảo nguồn cung ổn định cho các dự án. Với độ hút nước thấp, kết cấu bền chắc và vẻ đẹp nguyên bản của đá tự nhiên, Slate Lai Châu là lựa chọn phù hợp cho các hạng mục lợp mái, ốp tường và lát nền. HT STONE đồng hành cùng khách hàng từ khai thác – sản xuất – phân phối – thi công, mang đến giải pháp đá tự nhiên trọn gói.',
  home_intro_desc_en: 'HT STONE owns and operates natural Slate quarries in Lai Chau, supplying two signature collections: Black Slate and Multicolor Slate. By controlling the stone at its source, we ensure consistent quality, reliable supply, and complete quality control from quarrying onward. With exceptionally low water absorption, outstanding durability, and the authentic beauty of natural stone, Lai Chau Slate is an ideal choice for roofing, wall cladding, and paving applications. From quarrying and processing to supply and installation, HT STONE delivers complete natural stone solutions for projects of every scale.',
  footer_about: 'HT STONE là thương hiệu đá tự nhiên thuộc Công ty TNHH MTV Thương mại và Xây dựng Hiền Tài',
  footer_about_en: 'HT STONE is the natural stone brand of Hien Tai Trading & Construction One Member Co., Ltd.',
  office_laichau_en: '206 Tran Hung Dao Street, Doan Ket Ward, Lai Chau Province, Vietnam',
  quarry_namho_en: 'Pa Tan Commune, Lai Chau Province, Vietnam',
  quarry_phiengen_en: 'Le Loi Commune, Lai Chau Province, Vietnam'
};

export async function getSiteSettings() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      if (!error && data?.length) {
        const settingsMap = { ...defaultSettings };
        data.forEach(item => {
          settingsMap[item.key] = item.value;
        });
        return settingsMap;
      }
    } catch (e) {
      console.warn('Supabase fetch settings failed, falling back:', e);
    }
  }
  return getLocalData('settings', defaultSettings);
}

export async function saveSiteSettings(settingsObj) {
  if (isSupabaseConfigured) {
    const records = Object.entries(settingsObj).map(([key, value]) => ({
      key,
      value: String(value || '')
    }));
    const { error } = await supabase
      .from('site_settings')
      .upsert(records, { onConflict: 'key' });
    if (error) throw error;
    return settingsObj;
  }
  setLocalData('settings', settingsObj);
  return settingsObj;
}

// ==========================================
// 8. ADMIN AUTHENTICATION HELPERS
// ==========================================
export async function loginAdmin(email, password) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data?.user) {
        localStorage.setItem('sailor_admin_session', JSON.stringify(data.user));
        return data.user;
      }
    } catch (e) {
      console.warn('Supabase auth failed, checking fallback master admin:', e.message);
    }
  }
  if ((email === 'admin@htstone.vn' || email === 'admin@gmail.com') && password === 'admin123') {
    const adminUser = { id: 'admin_master', email: 'admin@htstone.vn', role: 'authenticated' };
    localStorage.setItem('sailor_admin_session', JSON.stringify(adminUser));
    return adminUser;
  }
  throw new Error('Email hoặc mật khẩu không chính xác!');
}

export async function getCurrentAdmin() {
  const localSaved = localStorage.getItem('sailor_admin_session');
  if (localSaved) {
    try { return JSON.parse(localSaved); } catch (e) {}
  }
  if (isSupabaseConfigured) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        localStorage.setItem('sailor_admin_session', JSON.stringify(user));
        return user;
      }
    } catch (e) {
      console.warn('Supabase getUser warning:', e);
    }
  }
  return null;
}

export async function logoutAdmin() {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signOut warning:', e);
    }
  }
  localStorage.removeItem('sailor_admin_session');
}

// ==========================================
// 9. QUẢN LÝ LIÊN HỆ (CONTACTS)
// ==========================================

export async function submitContactForm(contactData) {
  const newContact = {
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: contactData.name || '',
    phone: contactData.phone || '',
    email: contactData.email || '',
    subject: contactData.subject || 'Tư vấn báo giá đá tự nhiên',
    message: contactData.message || '',
    status: 'new',
    created_at: new Date().toISOString()
  };

  // 1. Luôn lưu vào LocalStorage để đảm bảo dữ liệu không bao giờ bị mất
  try {
    const localContacts = JSON.parse(localStorage.getItem('moda_contacts') || '[]');
    localContacts.unshift(newContact);
    localStorage.setItem('moda_contacts', JSON.stringify(localContacts));
  } catch (e) {
    console.warn('LocalStorage save contact warning:', e);
  }

  // 2. Gửi lên Supabase nếu có cấu hình
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('contacts').insert([{
        name: newContact.name,
        phone: newContact.phone,
        email: newContact.email,
        subject: newContact.subject,
        message: newContact.message,
        status: newContact.status
      }]).select();
      if (error) {
        console.warn('Supabase insert contact warning (saved to local):', error.message);
      } else if (data && data.length > 0) {
        newContact.id = data[0].id;
      }
    } catch (e) {
      console.warn('Supabase insert contact network warning:', e.message);
    }
  }

  return newContact;
}

export async function getContacts() {
  let supabaseList = null;
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && Array.isArray(data)) {
        supabaseList = data;
      }
    } catch (e) {
      console.warn('Supabase getContacts warning, falling back:', e);
    }
  }

  const localList = JSON.parse(localStorage.getItem('moda_contacts') || '[]');
  
  if (supabaseList && supabaseList.length > 0) {
    // Kết hợp dữ liệu từ Supabase và LocalStorage tránh trùng lặp
    const combined = [...supabaseList];
    localList.forEach(localItem => {
      if (!combined.some(s => s.id === localItem.id || (s.phone === localItem.phone && s.created_at === localItem.created_at))) {
        combined.push(localItem);
      }
    });
    return combined;
  }

  return localList;
}

export async function updateContactStatus(id, status) {
  // Cập nhật LocalStorage
  try {
    const contacts = JSON.parse(localStorage.getItem('moda_contacts') || '[]');
    const index = contacts.findIndex(c => String(c.id) === String(id));
    if (index !== -1) {
      contacts[index].status = status;
      localStorage.setItem('moda_contacts', JSON.stringify(contacts));
    }
  } catch (e) {
    console.warn('LocalStorage update status warning:', e);
  }

  if (isSupabaseConfigured) {
    try {
      await supabase.from('contacts').update({ status }).eq('id', id);
    } catch (e) {
      console.warn('Supabase update status warning:', e);
    }
  }
  return true;
}

export async function deleteContact(id) {
  // Xóa khỏi LocalStorage
  try {
    const contacts = JSON.parse(localStorage.getItem('moda_contacts') || '[]');
    const filtered = contacts.filter(c => String(c.id) !== String(id));
    localStorage.setItem('moda_contacts', JSON.stringify(filtered));
  } catch (e) {
    console.warn('LocalStorage delete contact warning:', e);
  }

  if (isSupabaseConfigured) {
    try {
      await supabase.from('contacts').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete contact warning:', e);
    }
  }
  return true;
}

