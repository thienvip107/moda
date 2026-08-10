import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Newspaper, 
  Package, 
  CalendarDays, 
  FileText, 
  FolderKanban,
  Settings,
  LogOut, 
  Menu, 
  X,
  ExternalLink,
  Crown,
  UserCheck,
  ChevronRight,
  Mail,
  Sparkles
} from 'lucide-react';
import { logoutAdmin } from '../services/api';
import { isSupabaseConfigured } from '../lib/supabase';

export default function AdminLayout({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    if (onLogout) onLogout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Tổng Quan', path: '/admin', icon: LayoutDashboard },
    { label: 'Thay Banner Trang Chủ', path: '/admin/banners', icon: ImageIcon },
    { label: 'Tin Tức & Bài Viết', path: '/admin/news', icon: Newspaper },
    { label: 'Sản Phẩm Mới', path: '/admin/products', icon: Package },
    { label: 'Dự Án Công Trình', path: '/admin/projects', icon: FolderKanban },
    { label: 'Sự Kiện Công Ty', path: '/admin/events', icon: CalendarDays },
    {label: 'Về Chúng Tôi & Chính Sách', path: '/admin/policies', icon: FileText },
    { label: 'Yêu Cầu Liên Hệ', path: '/admin/contacts', icon: Mail },
    { label: 'Hotline & Footer', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#171717] flex flex-col md:flex-row font-sans selection:bg-[#D4AF37]/20 selection:text-[#171717]">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#171717] flex items-center justify-center shadow-md">
            <Crown className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <span className="font-bold text-base tracking-wide text-[#171717] block leading-tight">HT STONE</span>
            <span className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider">Hệ Thống CMS</span>
          </div>
        </div>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-stone-200/90 p-6 flex flex-col justify-between
        transform transition-all duration-300 ease-out md:relative md:translate-x-0 shadow-sm
        ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="px-1 pt-1">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-[#171717] flex items-center justify-center shadow-md border border-stone-800">
                <Crown className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-[#171717] tracking-wider leading-tight">HT STONE CMS</h2>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-semibold text-stone-500">
                    {isSupabaseConfigured ? 'Supabase Live' : 'Sandbox Demo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Live Preview Pill */}
            <div className="mt-5 p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs text-stone-700 font-semibold">Website Public</span>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#171717] hover:text-[#D4AF37] bg-white hover:bg-stone-100 border border-stone-300 px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 shadow-sm"
              >
                <span>Xem Trang</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-stone-400 mb-2">Danh Mục Quản Trị</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      group flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200
                      ${isActive 
                        ? 'bg-[#171717] text-white shadow-md' 
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#D4AF37]' : 'text-stone-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-stone-200 space-y-3">
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#171717] flex items-center justify-center text-[#D4AF37] font-bold text-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-[#171717] truncate">Quản Trị Viên</p>
              <p className="text-[10px] text-stone-500 truncate">admin@htstone.vn</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport Container */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#F8F9FA] min-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
