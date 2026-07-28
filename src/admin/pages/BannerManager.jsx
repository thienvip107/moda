import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, UploadCloud, Loader2, ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { getBanners, saveBanner, deleteBanner } from '../../services/api';
import { uploadToCloudinary } from '../../services/cloudinary';

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [langTab, setLangTab] = useState('vi');
  const [form, setForm] = useState({
    id: null,
    title: '',
    title_en: '',
    subtitle: '',
    subtitle_en: '',
    image_url: '',
    link_url: '/products',
    order_index: 1,
    is_active: true
  });

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    setLoading(true);
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const cdnUrl = await uploadToCloudinary(file);
      setForm(prev => ({ ...prev, image_url: cdnUrl }));
    } catch (err) {
      alert('Upload ảnh lên Cloudinary thất bại: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image_url) {
      alert('Vui lòng chọn hoặc upload ảnh banner!');
      return;
    }

    try {
      await saveBanner(form);
      resetForm();
      loadBanners();
    } catch (err) {
      alert('Lưu banner thất bại: ' + err.message);
    }
  };

  const handleEdit = (banner) => {
    setForm({
      ...banner,
      title_en: banner.title_en || '',
      subtitle_en: banner.subtitle_en || ''
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      await deleteBanner(id);
      loadBanners();
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: '',
      title_en: '',
      subtitle: '',
      subtitle_en: '',
      image_url: '',
      link_url: '/products',
      order_index: banners.length + 1,
      is_active: true
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider uppercase flex items-center space-x-3">
          <ImageIcon className="w-7 h-7 text-[#D4AF37]" />
          <span>Quản Lý Banner Trang Chủ</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Thay đổi hình ảnh Slider chính, câu khẩu hiệu song ngữ (Việt - Anh) và đường dẫn nút bấm chuyển hướng
        </p>
      </div>

      {/* Editor Form Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{editing ? 'Chỉnh Sửa Banner' : 'Tạo Banner Mới'}</span>
          </h2>
          {editing && (
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Đang Sửa ID: {form.id}
            </span>
          )}
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <button
            type="button"
            onClick={() => setLangTab('vi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              langTab === 'vi' 
                ? 'bg-[#171717] text-[#D4AF37] shadow-sm' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <span>🇻🇳 Tiếng Việt (Nội dung chính)</span>
          </button>
          <button
            type="button"
            onClick={() => setLangTab('en')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              langTab === 'en' 
                ? 'bg-[#171717] text-[#D4AF37] shadow-sm' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <span>🇬🇧 English Content</span>
            {form.title_en && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {langTab === 'vi' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                  Tiêu Đề Banner (Tiếng Việt) *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Ví dụ: ĐÁ SLATE LAI CHÂU TỰ NHIÊN HIGH-END"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                  Mô Tả Phụ (Tiếng Việt)
                </label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={e => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Ví dụ: Giải pháp ốp lát & lợp mái cao cấp..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                  Banner Title (English)
                </label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={e => setForm({ ...form, title_en: e.target.value })}
                  placeholder="Example: HIGH-END NATURAL LAI CHAU SLATE STONE"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                  Banner Subtitle (English)
                </label>
                <input
                  type="text"
                  value={form.subtitle_en}
                  onChange={e => setForm({ ...form, subtitle_en: e.target.value })}
                  placeholder="Example: Premium paving and roofing solutions..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                Đường Dẫn Nút Bấm (Link URL)
              </label>
              <input
                type="text"
                value={form.link_url}
                onChange={e => setForm({ ...form, link_url: e.target.value })}
                placeholder="/products"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                Thứ Tự Hiển Thị Slider
              </label>
              <input
                type="number"
                value={form.order_index}
                onChange={e => setForm({ ...form, order_index: parseInt(e.target.value) || 1 })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
              />
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="space-y-3">
            <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider">
              Hình Ảnh Banner (Upload Trực Tiếp Cloudinary CDN) *
            </label>
            
            <div className="p-6 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 hover:bg-stone-100/80 transition-all text-center relative cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                onChange={handleFileChange}
                disabled={uploading}
              />
              
              <div className="space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 text-[#D4AF37] flex items-center justify-center mx-auto shadow-sm">
                  {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
                </div>
                <p className="text-sm font-bold text-[#171717]">
                  {uploading ? 'Đang Upload Ảnh Lên Cloudinary CDN...' : 'Nhấp hoặc kéo thả file ảnh vào đây'}
                </p>
                <p className="text-xs text-stone-500">
                  Tự động tối ưu định dạng WebP/AVIF siêu nhẹ (<code className="text-[#D4AF37] font-bold">f_auto, q_auto</code>)
                </p>
              </div>
            </div>

            {/* Direct URL Input */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-stone-500 flex-shrink-0 font-medium">Hoặc URL ảnh:</span>
              <input
                type="text"
                value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://res.cloudinary.com/..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-xs text-stone-700 focus:border-[#171717] focus:outline-none font-mono"
              />
            </div>

            {/* Preview */}
            {form.image_url && (
              <div className="relative rounded-2xl overflow-hidden border border-stone-300 h-48 max-w-xl bg-stone-900 shadow-md">
                <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#D4AF37] text-stone-950 px-2 py-0.5 rounded w-fit mb-1">
                    Preview Banner #{form.order_index}
                  </span>
                  <p className="text-white font-extrabold text-lg leading-tight">{form.title || 'Tiêu đề Banner'}</p>
                  <p className="text-xs text-stone-300 mt-0.5">{form.subtitle}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#171717] hover:bg-stone-800 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>{editing ? 'Cập Nhật Banner' : 'Thêm Banner Mới'}</span>
            </button>

            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Hủy Chỉnh Sửa
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Banner Items Grid */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider">Danh Sách Banner ({banners.length})</h2>

        {loading ? (
          <p className="text-xs text-stone-500">Đang nạp danh sách banner...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-400 transition-all group shadow-sm">
                <div className="relative h-48 bg-stone-200">
                  <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#D4AF37] text-stone-950 px-2 py-0.5 rounded w-fit mb-1">
                      Thứ Tự: #{banner.order_index}
                    </span>
                    <h3 className="font-extrabold text-white text-base leading-snug">{banner.title}</h3>
                    <p className="text-xs text-stone-300 truncate mt-0.5">{banner.subtitle}</p>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-mono truncate max-w-[200px]">Link: {banner.link_url}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                      title="Sửa"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
