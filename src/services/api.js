import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { newsList as initialNews } from '../data/news';
import { productsList as initialProducts } from '../data/products';
import { optimizeCloudinaryUrl } from './cloudinary';

// Data mẫu ban đầu dùng làm fallback khi DB chưa có hoặc lỗi
const defaultBanners = [
  {
    id: 'b1',
    title: 'ĐÁ SLATE LAI CHÂU TỰ NHIÊN High-End',
    subtitle: 'Giải pháp ốp lát & lợp mái cao cấp trường tồn theo thời gian',
    image_url: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_1920,f_auto,q_auto/v1784694449/xhcldvnhsangyaor75uz.jpg',
    link_url: '/products',
    order_index: 1,
    is_active: true
  },
  {
    id: 'b2',
    title: 'CHẾ TÁC & THI CÔNG ĐÁ ĐỘC BẢN',
    subtitle: 'Kiến tạo không gian kiến trúc đẳng cấp hoàng gia',
    image_url: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_1920,f_auto,q_auto/v1784694451/gfdazhqzcrw0asamtbnw.jpg',
    link_url: '/projects',
    order_index: 2,
    is_active: true
  },
  {
    id: 'b3',
    title: 'KIẾN TRÚC TRƯỜNG TỒN THEO THỜI GIAN',
    subtitle: 'Đá tự nhiên nguyên khối được khai thác trực tiếp từ mỏ Lai Châu',
    image_url: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_1920,f_auto,q_auto/v1784694456/vfdzgkygfdtwfp2eeoj8.jpg',
    link_url: '/about',
    order_index: 3,
    is_active: true
  }
];

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
    id: 'vinhomes-riverside',
    title: 'Biệt Thự Đơn Lập Vinhomes Riverside',
    slug: 'vinhomes-riverside',
    category: 'villa',
    desc: 'Hạng mục đá lát sân vườn, lối đi ô tô và ốp tường rào biệt thự bằng đá đen Lai Châu tự nhiên chẻ thô.',
    location: 'Long Biên, Hà Nội',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694423/kcnmsxbnasrbezglaqmy.jpg',
    year: '2024',
    scale: 'Đá lát 450 m², Đá ốp 180 m²'
  },
  {
    id: 'amanoi-resort',
    title: 'Amanoi Resort Ninh Thuận',
    slug: 'amanoi-resort',
    category: 'resort',
    desc: 'Cung cấp đá đen Lai Châu chống trơn lát sàn quanh hồ bơi vô cực, thềm hiên và lối đi nối các biệt thự Bungalow.',
    location: 'Vịnh Vĩnh Hy, Ninh Thuận',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694425/p3mrfgfx1g0v5vihwj5i.jpg',
    year: '2023',
    scale: 'Đá lát 2.500 m²'
  },
  {
    id: 'hotel-de-la-coupole',
    title: 'Hotel de la Coupole Sapa',
    slug: 'hotel-de-la-coupole',
    category: 'resort',
    desc: 'Hệ mái ngói đá Lai Châu đen hình vảy cá kết hợp chữ nhật, kiến tạo nên mái ngói tráng lệ mang đậm dấu ấn Indochine.',
    location: 'Sapa, Lào Cai',
    img: 'https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694428/adpht1zwuubd1lddxbtq.jpg',
    year: '2022',
    scale: 'Ngói đá lợp mái 4.800 m²'
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
// ==========================================
export async function getBanners() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('order_index', { ascending: true });
      if (!error && data?.length) {
        return data.map(b => ({
          ...b,
          image_url: optimizeCloudinaryUrl(b.image_url, 1920)
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch banners failed, falling back:', e);
    }
  }
  const banners = getLocalData('banners', defaultBanners);
  return banners.map(b => ({ ...b, image_url: optimizeCloudinaryUrl(b.image_url, 1920) }));
}

export async function saveBanner(bannerData) {
  if (isSupabaseConfigured) {
    if (bannerData.id && typeof bannerData.id === 'string' && bannerData.id.length > 20) {
      const { data, error } = await supabase
        .from('banners')
        .update(bannerData)
        .eq('id', bannerData.id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const { id, ...newBanner } = bannerData;
      const { data, error } = await supabase
        .from('banners')
        .insert([newBanner])
        .select();
      if (error) throw error;
      return data[0];
    }
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
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data?.length) {
        return data.map(item => ({
          ...item,
          img: optimizeCloudinaryUrl(item.cover_image || item.img, 800),
          excerpt: item.summary || item.excerpt || 'Thông tin bài viết kỹ thuật thi công đá tự nhiên...',
          content: typeof item.content === 'string' ? [item.content] : item.content,
          date: item.created_at ? new Date(item.created_at).toLocaleDateString('vi-VN') : 'Gần đây'
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch news failed, falling back:', e);
    }
  }
  const news = getLocalData('news', initialNews);
  return news.map(item => ({
    ...item,
    img: optimizeCloudinaryUrl(item.img || item.cover_image, 800)
  }));
}

export async function getNewsBySlugOrId(idOrSlug) {
  const news = await getNewsList();
  return news.find(n => n.id === idOrSlug || n.slug === idOrSlug) || news[0];
}

export async function saveNews(newsItem) {
  const slug = newsItem.slug || newsItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const payload = {
    title: newsItem.title,
    title_en: newsItem.title_en || '',
    slug,
    summary: newsItem.excerpt || newsItem.summary,
    summary_en: newsItem.summary_en || newsItem.excerpt_en || '',
    content: Array.isArray(newsItem.content) ? newsItem.content.join('\n\n') : newsItem.content,
    content_en: Array.isArray(newsItem.content_en) ? newsItem.content_en.join('\n\n') : (newsItem.content_en || ''),
    cover_image: newsItem.img || newsItem.cover_image,
    category: newsItem.category || 'Tin tức',
    status: newsItem.status || 'published'
  };

  if (isSupabaseConfigured) {
    if (newsItem.id && typeof newsItem.id === 'string' && newsItem.id.length > 20) {
      const { data, error } = await supabase
        .from('news')
        .update(payload)
        .eq('id', newsItem.id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const { data, error } = await supabase
        .from('news')
        .insert([payload])
        .select();
      if (error) throw error;
      return data[0];
    }
  }
  const list = getLocalData('news', initialNews);
  let updated;
  if (newsItem.id) {
    updated = list.map(n => n.id === newsItem.id ? { ...n, ...newsItem, slug } : n);
  } else {
    updated = [{ ...newsItem, id: `news_${Date.now()}`, slug }, ...list];
  }
  setLocalData('news', updated);
  return newsItem;
}

export async function deleteNews(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
  const list = getLocalData('news', initialNews);
  setLocalData('news', list.filter(n => n.id !== id));
  return true;
}

// ==========================================
// 3. PRODUCTS API
// ==========================================
export async function getProductsList() {
  const defaultSpecs = {
    origin: 'Mỏ đá Slate Lai Châu, Việt Nam',
    sizes: '30x30, 30x60, 40x40 cm',
    thickness: '1.0 - 1.5 cm',
    surface: 'Chẻ tự nhiên / Mài thô'
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data?.length) {
        const dbProducts = data.map(p => ({
          ...p,
          title: p.name || p.title,
          desc: p.description || p.desc,
          img: optimizeCloudinaryUrl(p.image_url || p.img, 800),
          code: p.slug || p.code,
          category: p.category || 'da-den-lop-mai',
          specs: p.specs || defaultSpecs
        }));
        if (dbProducts.length < initialProducts.length) {
          const dbSlugs = new Set(dbProducts.map(p => p.slug || p.id));
          const extra = initialProducts.filter(p => !dbSlugs.has(p.id) && !dbSlugs.has(p.slug)).map(p => ({
            ...p,
            img: optimizeCloudinaryUrl(p.img || p.image_url, 800)
          }));
          return [...dbProducts, ...extra];
        }
        return dbProducts;
      }
    } catch (e) {
      console.warn('Supabase fetch products failed, falling back:', e);
    }
  }
  const localProducts = getLocalData('products', initialProducts);
  const list = Array.isArray(localProducts) ? localProducts : Object.values(localProducts).flat();
  return list.map(p => ({
    ...p,
    title: p.title || p.name,
    desc: p.desc || p.description,
    img: optimizeCloudinaryUrl(p.image_url || p.img, 800),
    specs: p.specs || defaultSpecs
  }));
}

export async function saveProduct(productData) {
  const slug = productData.slug || (productData.name || productData.title).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const payload = {
    name: productData.name || productData.title,
    name_en: productData.name_en || productData.title_en || '',
    slug,
    price: productData.price || 'Liên hệ',
    description: productData.description || productData.desc || '',
    description_en: productData.description_en || productData.desc_en || '',
    image_url: productData.img || productData.image_url,
    category: productData.category || 'Đá lợp mái',
    is_new: productData.is_new ?? true
  };

  if (isSupabaseConfigured) {
    if (productData.id && typeof productData.id === 'string' && productData.id.length > 20) {
      const { data, error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', productData.id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert([payload])
        .select();
      if (error) throw error;
      return data[0];
    }
  }
  const list = await getProductsList();
  let updated;
  if (productData.id) {
    updated = list.map(p => p.id === productData.id ? { ...p, ...productData, slug } : p);
  } else {
    updated = [{ ...productData, id: `prod_${Date.now()}`, slug }, ...list];
  }
  setLocalData('products', updated);
  return productData;
}

export async function deleteProduct(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
  const list = await getProductsList();
  setLocalData('products', list.filter(p => p.id !== id));
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
      .upsert({ key, title, title_en, content, content_en, updated_at: new Date() })
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
    if (evt.id && typeof evt.id === 'string' && evt.id.length > 20) {
      const { data, error } = await supabase
        .from('events')
        .update(payload)
        .eq('id', evt.id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const { data, error } = await supabase
        .from('events')
        .insert([payload])
        .select();
      if (error) throw error;
      return data[0];
    }
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
        return data.map(p => ({
          ...p,
          img: optimizeCloudinaryUrl(p.image_url || p.img, 800),
          desc: p.description || p.desc
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch projects failed, falling back:', e);
    }
  }
  const projects = getLocalData('projects', defaultProjects);
  return projects.map(p => ({
    ...p,
    img: optimizeCloudinaryUrl(p.img || p.image_url, 800)
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
    if (projectData.id && typeof projectData.id === 'string' && projectData.id.length > 20) {
      const { data, error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', projectData.id)
        .select();
      if (error) throw error;
      return data[0];
    } else {
      const { data, error } = await supabase
        .from('projects')
        .insert([payload])
        .select();
      if (error) throw error;
      return data[0];
    }
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
  hotline: '0988 123 456',
  zalo: '0988 123 456',
  email: 'info@htstone.vn',
  address_headquarters: 'Lô C2-4, KCN Thụy Vân, TP. Việt Trì, Phú Thọ',
  address_factory: 'Mỏ đá Slate Nậm Nhùn, Tỉnh Lai Châu',
  facebook_url: 'https://facebook.com',
  instagram_url: 'https://instagram.com'
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
      .upsert(records);
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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }
  if (email === 'admin@htstone.vn' && password === 'admin123') {
    const fakeUser = { id: 'admin_local', email: 'admin@htstone.vn' };
    localStorage.setItem('sailor_admin_session', JSON.stringify(fakeUser));
    return fakeUser;
  }
  throw new Error('Email hoặc mật khẩu không chính xác!');
}

export async function getCurrentAdmin() {
  if (isSupabaseConfigured) {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
  const saved = localStorage.getItem('sailor_admin_session');
  return saved ? JSON.parse(saved) : null;
}

export async function logoutAdmin() {
  if (isSupabaseConfigured) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem('sailor_admin_session');
}
