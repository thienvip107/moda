import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, UploadCloud, Loader2, Newspaper, Sparkles } from 'lucide-react';
import { getNewsList, saveNews, deleteNews } from '../../services/api';
import { uploadToCloudinary } from '../../services/cloudinary';

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [langTab, setLangTab] = useState('vi');
  const [form, setForm] = useState({
    id: null,
    title: '',
    title_en: '',
    category: 'Tin tức công ty',
    excerpt: '',
    excerpt_en: '',
    content: '',
    content_en: '',
    img: '',
    status: 'published'
  });

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    setLoading(true);
    try {
      const data = await getNewsList();
      setNews(data);
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
      setForm(prev => ({ ...prev, img: cdnUrl }));
    } catch (err) {
      alert('Upload ảnh bài viết thất bại: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert('Vui lòng nhập tiêu đề và nội dung bài viết!');
      return;
    }

    try {
      await saveNews(form);
      resetForm();
      loadNews();
    } catch (err) {
      alert('Lưu bài viết thất bại: ' + err.message);
    }
  };

  const handleEdit = (item) => {
    setForm({
      ...item,
      title_en: item.title_en || '',
      excerpt: item.excerpt || item.summary || '',
      excerpt_en: item.excerpt_en || item.summary_en || '',
      content: Array.isArray(item.content) ? item.content.join('\n\n') : item.content,
      content_en: Array.isArray(item.content_en) ? item.content_en.join('\n\n') : (item.content_en || ''),
      img: item.img || item.cover_image
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      await deleteNews(id);
      loadNews();
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: '',
      title_en: '',
      category: 'Tin tức công ty',
      excerpt: '',
      excerpt_en: '',
      content: '',
      content_en: '',
      img: '',
      status: 'published'
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider uppercase flex items-center space-x-3">
          <Newspaper className="w-7 h-7 text-[#D4AF37]" />
          <span>Quản Lý Tin Tức & Bài Viết</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">Đăng bài viết hoạt động doanh nghiệp, kỹ thuật thi công, cẩm nang chọn đá song ngữ (Việt - Anh)</p>
      </div>

      {/* Editor Form Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{editing ? 'Chỉnh Sửa Bài Viết' : 'Soạn Bài Viết Mới'}</span>
          </h2>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {langTab === 'vi' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Tiêu Đề Bài Viết (Tiếng Việt) *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Nhập tiêu đề bài viết..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Chuyên Mục</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  >
                    <option value="Tin tức công ty">Tin tức công ty</option>
                    <option value="Kỹ thuật thi công">Kỹ thuật thi công</option>
                    <option value="Kiến thức vật liệu">Kiến thức vật liệu</option>
                    <option value="Vận hành mỏ">Vận hành mỏ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Đoạn Tóm Tắt (Tiếng Việt)</label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Tóm tắt ngắn gọn hiển thị ở danh sách bài viết..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Nội Dung Chi Tiết (Tiếng Việt) *</label>
                <textarea
                  rows={8}
                  required
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Nhập nội dung đầy đủ bài viết..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none font-mono text-xs leading-relaxed transition-all"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Article Title (English)</label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={e => setForm({ ...form, title_en: e.target.value })}
                  placeholder="Enter article title in English..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Article Summary / Excerpt (English)</label>
                <textarea
                  rows={2}
                  value={form.excerpt_en}
                  onChange={e => setForm({ ...form, excerpt_en: e.target.value })}
                  placeholder="Short summary displayed in the news catalog..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Detailed Content (English)</label>
                <textarea
                  rows={8}
                  value={form.content_en}
                  onChange={e => setForm({ ...form, content_en: e.target.value })}
                  placeholder="Enter full English article content..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none font-mono text-xs leading-relaxed transition-all"
                />
              </div>
            </>
          )}

          {/* Upload Dropzone */}
          <div className="space-y-3">
            <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider">Ảnh Bìa Bài Viết (Cloudinary CDN Upload)</label>
            
            <div className="p-5 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 hover:bg-stone-100/80 transition-all text-center relative cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                onChange={handleFileChange}
                disabled={uploading}
              />
              <div className="space-y-1 pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 text-[#D4AF37] flex items-center justify-center mx-auto shadow-sm">
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
                </div>
                <p className="text-xs font-bold text-[#171717]">
                  {uploading ? 'Đang Upload Ảnh Bìa...' : 'Tải Ảnh Bìa Mới (f_auto, q_auto)'}
                </p>
              </div>
            </div>

            {form.img && (
              <div className="w-36 h-24 rounded-xl overflow-hidden border border-stone-300 bg-stone-100 shadow-sm">
                <img src={form.img} alt="Cover Preview" className="w-full h-full object-cover" />
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
              <span>{editing ? 'Cập Nhật Bài Viết' : 'Xuất Bản Bài Viết'}</span>
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

      {/* List */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider">Danh Sách Bài Viết Đã Đăng ({news.length})</h2>

        {loading ? (
          <p className="text-xs text-stone-500">Đang nạp bài viết...</p>
        ) : (
          <div className="divide-y divide-stone-200">
            {news.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between space-x-4 group">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0">
                    {item.img || item.cover_image ? (
                      <img src={item.img || item.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <Newspaper className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#171717] text-sm group-hover:text-[#D4AF37] transition-colors line-clamp-1">{item.title}</h3>
                    <div className="flex items-center space-x-3 text-xs text-stone-500 mt-1">
                      <span className="text-[#171717] bg-stone-100 px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">{item.category}</span>
                      <span>• {item.date || 'Gần đây'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
