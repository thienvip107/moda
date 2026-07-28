import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ImageIcon, 
  Newspaper, 
  Package, 
  CalendarDays, 
  FolderKanban,
  Settings,
  Database,
  CloudUpload,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Crown
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { getBanners, getNewsList, getProductsList, getEventsList, getProjectsList } from '../../services/api';

export default function DashboardOverview() {
  const [stats, setStats] = useState({ banners: 0, news: 0, products: 0, events: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [b, n, p, e, pr] = await Promise.all([
          getBanners(),
          getNewsList(),
          getProductsList(),
          getEventsList(),
          getProjectsList()
        ]);
        setStats({
          banners: b.length,
          news: n.length,
          products: p.length,
          events: e.length,
          projects: pr.length
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const quickActions = [
    { title: 'Thay Banner Trang Chủ', desc: 'Đổi ảnh slider & slogan', path: '/admin/banners', icon: ImageIcon },
    { title: 'Đăng Bài Viết Mới', desc: 'Tin tức & cẩm nang kỹ thuật', path: '/admin/news', icon: Newspaper },
    { title: 'Thêm Sản Phẩm Đá', desc: 'Đá lợp mái, đá lát, đá ốp', path: '/admin/products', icon: Package },
    { title: 'Đăng Dự Án Thi Công', desc: 'Biệt thự, resort thực tế', path: '/admin/projects', icon: FolderKanban },
    { title: 'Tạo Sự Kiện Công Ty', desc: 'Lịch triển lãm & hội thảo', path: '/admin/events', icon: CalendarDays },
    { title: 'Cấu Hình Hotline & Footer', desc: 'SĐT, email, địa chỉ showroom', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Hero Banner */}
      <div className="rounded-3xl bg-[#171717] text-white p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" />
            <span>Hệ Thống CMS Động Đã Kích Hoạt</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Trang Quản Trị HT STONE
          </h1>
          <p className="text-sm text-stone-300 max-w-xl leading-relaxed">
            Quản lý toàn bộ nội dung web động từ Slider Trang Chủ, Tin Tức, Sản Phẩm Đá Lai Châu, Công Trình Biệt Thự cho đến Hotline và thông tin chân trang.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#D4AF37] hover:bg-[#c49f27] text-[#171717] font-bold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center space-x-2 flex-shrink-0"
        >
          <span>Xem Trang Live</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Cloud & Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Supabase Status */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-stone-100 text-[#171717]">
            <Database className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-[#171717] text-base">Supabase Database</h3>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${isSupabaseConfigured ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                {isSupabaseConfigured ? 'Đang Nối Cloud' : 'Local Sandbox'}
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              {isSupabaseConfigured 
                ? 'Dữ liệu được lưu thời gian thực tại dự án Supabase wedelvydreumqskcmgxx.'
                : 'Đang chạy chế độ lưu tạm LocalStorage. Khai báo Supabase keys trong client/.env để kết nối cloud.'}
            </p>
          </div>
        </div>

        {/* Cloudinary Status */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex items-start space-x-4">
          <div className="p-3 rounded-2xl bg-[#D4AF37]/10 text-stone-900">
            <CloudUpload className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-[#171717] text-base">Cloudinary CDN (f_auto, q_auto)</h3>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200">
                Tối Ưu Siêu Nhanh
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Tự động nén và phục vụ ảnh định dạng WebP/AVIF tối ưu chất lượng vân đá với tốc độ tải trang cực nhanh.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-stone-100 rounded-xl text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Slider</span>
          </div>
          <p className="text-3xl font-extrabold text-[#171717] mt-4">{loading ? '...' : stats.banners}</p>
          <p className="text-xs text-stone-500 font-semibold mt-0.5">Banner Trang Chủ</p>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-stone-100 rounded-xl text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors">
              <Newspaper className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Bài Viết</span>
          </div>
          <p className="text-3xl font-extrabold text-[#171717] mt-4">{loading ? '...' : stats.news}</p>
          <p className="text-xs text-stone-500 font-semibold mt-0.5">Tin Tức & Bài Viết</p>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-stone-100 rounded-xl text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Sản Phẩm</span>
          </div>
          <p className="text-3xl font-extrabold text-[#171717] mt-4">{loading ? '...' : stats.products}</p>
          <p className="text-xs text-stone-500 font-semibold mt-0.5">Đá Slate Lai Châu</p>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-stone-100 rounded-xl text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Công Trình</span>
          </div>
          <p className="text-3xl font-extrabold text-[#171717] mt-4">{loading ? '...' : stats.projects}</p>
          <p className="text-xs text-stone-500 font-semibold mt-0.5">Dự Án Biệt Thự</p>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-stone-100 rounded-xl text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Sự Kiện</span>
          </div>
          <p className="text-3xl font-extrabold text-[#171717] mt-4">{loading ? '...' : stats.events}</p>
          <p className="text-xs text-stone-500 font-semibold mt-0.5">Sự Kiện Công Ty</p>
        </div>
      </div>

      {/* Quick Access Shortcuts Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-[#171717] uppercase tracking-wider">Truy Cập Nhanh Các Phân Hệ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.path}
                className="p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-[#171717] shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-stone-100 text-[#171717] group-hover:bg-[#171717] group-hover:text-[#D4AF37] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#171717] text-sm group-hover:text-[#D4AF37] transition-colors">{action.title}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">{action.desc}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#171717] group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
