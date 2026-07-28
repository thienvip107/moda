import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, KeyRound, Mail, AlertCircle, Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react';
import { loginAdmin } from '../services/api';
import { isSupabaseConfigured } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginAdmin(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@htstone.vn');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#171717] flex items-center justify-center p-4 selection:bg-[#D4AF37]/20 selection:text-[#171717]">
      
      <div className="w-full max-w-md bg-white border border-stone-200/90 rounded-3xl p-8 shadow-xl relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-[#171717] rounded-2xl mx-auto flex items-center justify-center shadow-md border border-stone-800">
            <Crown className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider">Hệ Thống CMS HT STONE</h1>
            <p className="text-xs text-stone-500 mt-1">Đăng nhập trang quản trị nội dung web động</p>
          </div>
        </div>

        {/* Demo Mode Banner */}
        {!isSupabaseConfigured && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-2">
            <div className="flex items-center space-x-2 font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>Chạy Sandbox Demo (LocalStorage)</span>
            </div>
            <p className="text-stone-700">Bấm nút bên dưới để điền tài khoản thử nghiệm nhanh:</p>
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full bg-white hover:bg-stone-50 text-[#171717] font-bold py-2.5 rounded-xl border border-stone-300 text-xs transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Tự Điền: admin@htstone.vn / admin123</span>
            </button>
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-2">
            <div className="flex items-center space-x-2 font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            {error.includes('Invalid login credentials') && (
              <div className="mt-2 text-[11px] text-stone-700 bg-white p-3 rounded-xl border border-stone-200 leading-relaxed">
                <p className="font-bold text-[#171717]">💡 Hướng dẫn tạo tài khoản Admin trên Supabase:</p>
                <ol className="list-decimal list-inside mt-1 space-y-1 text-stone-600">
                  <li>Vào Supabase Dashboard project <code className="text-amber-700 font-bold">wedelvydreumqskcmgxx</code>.</li>
                  <li>Chọn <strong className="text-[#171717]">Authentication</strong> ➜ <strong className="text-[#171717]">Users</strong> ➜ Bấm <strong className="text-[#171717]">Add user</strong>.</li>
                  <li>Tạo user với Email & Mật khẩu bạn nhập ở trên (Tích chọn Auto Confirm User).</li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Email Quản Trị</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@htstone.vn"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#171717] transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Mật Khẩu</label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-stone-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-11 py-2.5 text-sm text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#171717] transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#171717] hover:bg-stone-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50 text-xs tracking-widest uppercase mt-2 flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Đang Xác Thực...' : 'Đăng Nhập Quản Trị'}</span>
          </button>
        </form>

        <p className="text-center text-[11px] text-stone-400 font-medium">
          Hệ Thống Quản Lý Nội Dung Độc Quyền HT STONE © {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
}
