import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Save, CheckCircle2, Loader2, Globe, Settings } from 'lucide-react';
import { getSiteSettings, saveSiteSettings } from '../../services/api';

export default function SettingsManager() {
  const [settings, setSettings] = useState({
    hotline: '',
    zalo: '',
    email: '',
    address_headquarters: '',
    address_factory: '',
    facebook_url: '',
    instagram_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    try {
      const data = await getSiteSettings();
      setSettings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await saveSiteSettings(settings);
      setMessage('Đã lưu cấu hình thông tin liên hệ thành công!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider uppercase flex items-center space-x-3">
          <Settings className="w-7 h-7 text-[#D4AF37]" />
          <span>Quản Lý Cấu Hình Liên Hệ & Footer</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">Thay đổi Hotline, Zalo, Email, địa chỉ mỏ đá & showroom công ty trên toàn bộ trang web</p>
      </div>

      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {loading ? (
          <p className="text-xs text-stone-500">Đang nạp cấu hình...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {/* Hotline & Email */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2 border-b border-stone-200 pb-3">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Hotline & Email Tư Vấn Khách Hàng</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Số Hotline Bán Hàng</label>
                  <input
                    type="text"
                    value={settings.hotline}
                    onChange={e => setSettings({ ...settings, hotline: e.target.value })}
                    placeholder="0988 123 456"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Số Zalo Tư Vấn</label>
                  <input
                    type="text"
                    value={settings.zalo}
                    onChange={e => setSettings({ ...settings, zalo: e.target.value })}
                    placeholder="0988 123 456"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Email Công Ty</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={e => setSettings({ ...settings, email: e.target.value })}
                    placeholder="info@htstone.vn"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Địa chỉ trụ sở & nhà máy */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2 border-b border-stone-200 pb-3">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Địa Chỉ Văn Phòng & Mỏ Đá</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Địa Chỉ Văn Phòng / Showroom</label>
                  <input
                    type="text"
                    value={settings.address_headquarters}
                    onChange={e => setSettings({ ...settings, address_headquarters: e.target.value })}
                    placeholder="Lô C2-4, KCN Thụy Vân, TP. Việt Trì, Phú Thọ"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Địa Chỉ Mỏ Đá & Nhà Máy Chế Tác</label>
                  <input
                    type="text"
                    value={settings.address_factory}
                    onChange={e => setSettings({ ...settings, address_factory: e.target.value })}
                    placeholder="Mỏ đá Slate Nậm Nhùn, Tỉnh Lai Châu"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Mạng xã hội */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2 border-b border-stone-200 pb-3">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>Liên Kết Mạng Xã Hội</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Facebook Fanpage URL</label>
                  <input
                    type="text"
                    value={settings.facebook_url}
                    onChange={e => setSettings({ ...settings, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/htstone"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Instagram URL</label>
                  <input
                    type="text"
                    value={settings.instagram_url}
                    onChange={e => setSettings({ ...settings, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/htstone"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#171717] hover:bg-stone-800 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-[#D4AF37]" />}
              <span>{saving ? 'Đang Lưu Cấu Hình...' : 'Lưu Cấu Hình Mới'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
