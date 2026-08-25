import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Save, CheckCircle2, Loader2, Globe, Settings } from 'lucide-react';
import { getSiteSettings, saveSiteSettings } from '../../services/api';

export default function SettingsManager() {
  const [settings, setSettings] = useState({
    hotline: '',
    zalo: '',
    email: '',
    showroom_hanoi: '',
    showroom_hanoi_phone: '',
    showroom_hanoi_map: '',
    office_laichau: '',
    office_laichau_phone: '',
    office_laichau_map: '',
    quarry_namho: '',
    quarry_namho_phone: '',
    quarry_namho_map: '',
    quarry_phiengen: '',
    address_headquarters: '',
    address_factory: '',
    facebook_url: '',
    instagram_url: '',
    home_intro_title: '',
    home_intro_desc: '',
    footer_about: ''
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
            {/* Địa chỉ showroom, văn phòng & mỏ đá */}
            <div className="space-y-6 pt-2">
              <h2 className="text-xs font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2 border-b border-stone-200 pb-3">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Địa Chỉ Showroom, Văn Phòng & Mỏ Đá (Kèm Link Google Maps)</span>
              </h2>

              {/* Showroom Hà Nội */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-4">
                <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">1. Showroom Hà Nội</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Địa chỉ</label>
                    <input
                      type="text"
                      value={settings.showroom_hanoi}
                      onChange={e => setSettings({ ...settings, showroom_hanoi: e.target.value })}
                      placeholder="Số 8 ngõ 42 Trần Cung, Hà Nội"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Số điện thoại</label>
                    <input
                      type="text"
                      value={settings.showroom_hanoi_phone}
                      onChange={e => setSettings({ ...settings, showroom_hanoi_phone: e.target.value })}
                      placeholder="0909168587"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Link Google Maps</label>
                    <input
                      type="text"
                      value={settings.showroom_hanoi_map}
                      onChange={e => setSettings({ ...settings, showroom_hanoi_map: e.target.value })}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Văn phòng Lai Châu */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-4">
                <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">2. Văn phòng Lai Châu</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Địa chỉ</label>
                    <input
                      type="text"
                      value={settings.office_laichau}
                      onChange={e => setSettings({ ...settings, office_laichau: e.target.value })}
                      placeholder="Số nhà 206 Trần Hưng Đạo, phường Đoàn Kết, tỉnh Lai Châu"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Số điện thoại</label>
                    <input
                      type="text"
                      value={settings.office_laichau_phone}
                      onChange={e => setSettings({ ...settings, office_laichau_phone: e.target.value })}
                      placeholder="0338.693.555"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Link Google Maps</label>
                    <input
                      type="text"
                      value={settings.office_laichau_map}
                      onChange={e => setSettings({ ...settings, office_laichau_map: e.target.value })}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Mỏ đá Đen Nậm Ho & Mỏ Đa Sắc */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-4">
                <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">3. Hệ Thống Mỏ Đá Lai Châu</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Mỏ đá Đen Nậm Ho</label>
                    <input
                      type="text"
                      value={settings.quarry_namho}
                      onChange={e => setSettings({ ...settings, quarry_namho: e.target.value })}
                      placeholder="Xã Pa Tần, Tỉnh Lai Châu"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">ĐT Mỏ Đen Nậm Ho</label>
                    <input
                      type="text"
                      value={settings.quarry_namho_phone}
                      onChange={e => setSettings({ ...settings, quarry_namho_phone: e.target.value })}
                      placeholder="0968005321"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Link Google Maps Mỏ Nậm Ho</label>
                    <input
                      type="text"
                      value={settings.quarry_namho_map}
                      onChange={e => setSettings({ ...settings, quarry_namho_map: e.target.value })}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/60">
                  <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">Mỏ đá Đa Sắc Phiêng Én</label>
                  <input
                    type="text"
                    value={settings.quarry_phiengen}
                    onChange={e => setSettings({ ...settings, quarry_phiengen: e.target.value })}
                    placeholder="Xã Lê Lợi, Tỉnh Lai Châu"
                    className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
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

            {/* Nội dung tĩnh */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2 border-b border-stone-200 pb-3">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>Nội Dung Tĩnh (Trang Chủ & Footer)</span>
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Tiêu đề Giới thiệu Trang Chủ</label>
                  <input
                    type="text"
                    value={settings.home_intro_title}
                    onChange={e => setSettings({ ...settings, home_intro_title: e.target.value })}
                    placeholder="Làm Chủ Nguồn Đá Slate Tự Nhiên Từ Lai Châu"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Nội dung Giới thiệu Trang Chủ</label>
                  <textarea
                    rows={4}
                    value={settings.home_intro_desc}
                    onChange={e => setSettings({ ...settings, home_intro_desc: e.target.value })}
                    placeholder="HT STONE sở hữu mỏ đá Slate tự nhiên tại Lai Châu..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Đoạn mô tả Footer</label>
                  <textarea
                    rows={2}
                    value={settings.footer_about}
                    onChange={e => setSettings({ ...settings, footer_about: e.target.value })}
                    placeholder="HT STONE là thương hiệu đá tự nhiên thuộc Công ty..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
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
