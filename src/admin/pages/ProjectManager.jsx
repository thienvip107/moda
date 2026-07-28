import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, UploadCloud, Loader2, FolderKanban, MapPin, Sparkles, Building2 } from 'lucide-react';
import { getProjectsList, saveProject, deleteProject } from '../../services/api';
import { uploadToCloudinary } from '../../services/cloudinary';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [langTab, setLangTab] = useState('vi');
  const [form, setForm] = useState({
    id: null,
    title: '',
    title_en: '',
    category: 'villa',
    location: '',
    scale: '',
    year: '2026',
    desc: '',
    desc_en: '',
    img: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await getProjectsList();
      setProjects(data);
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
      alert('Upload ảnh công trình thất bại: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.img) {
      alert('Vui lòng nhập tên công trình và chọn ảnh!');
      return;
    }

    try {
      await saveProject(form);
      resetForm();
      loadProjects();
    } catch (err) {
      alert('Lưu dự án thất bại: ' + err.message);
    }
  };

  const handleEdit = (proj) => {
    setForm({
      ...proj,
      title_en: proj.title_en || '',
      desc: proj.desc || proj.description || '',
      desc_en: proj.desc_en || proj.description_en || '',
      img: proj.img || proj.image_url
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công trình này?')) {
      await deleteProject(id);
      loadProjects();
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: '',
      title_en: '',
      category: 'villa',
      location: '',
      scale: '',
      year: '2026',
      desc: '',
      desc_en: '',
      img: ''
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider uppercase flex items-center space-x-3">
          <Building2 className="w-7 h-7 text-[#D4AF37]" />
          <span>Quản Lý Công Trình & Dự Án</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">Cập nhật hình ảnh thực tế công trình biệt thự, resort ốp lát đá Slate Lai Châu song ngữ (Việt - Anh)</p>
      </div>

      {/* Editor Form Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{editing ? 'Chỉnh Sửa Dự Án' : 'Thêm Công Trình Mới'}</span>
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
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Tên Công Trình / Dự Án (Tiếng Việt) *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Biệt Thự Đơn Lập Vinhomes Riverside..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Loại Công Trình</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  >
                    <option value="villa">Biệt thự / Lâu đài (Villa)</option>
                    <option value="resort">Khu nghỉ dưỡng (Resort / Hotel)</option>
                    <option value="building">Tòa nhà / Văn phòng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Mô Tả Hạng Mục Thi Công (Tiếng Việt)</label>
                <textarea
                  rows={3}
                  value={form.desc}
                  onChange={e => setForm({ ...form, desc: e.target.value })}
                  placeholder="Mô tả quy mô hạng mục đá lát sân, đá ốp tường..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Project Title (English)</label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={e => setForm({ ...form, title_en: e.target.value })}
                  placeholder="Vinhomes Riverside Detached Villa..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Project Description (English)</label>
                <textarea
                  rows={3}
                  value={form.desc_en}
                  onChange={e => setForm({ ...form, desc_en: e.target.value })}
                  placeholder="Describe paving and wall cladding work..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Địa Điểm Công Trình</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="Long Biên, Hà Nội"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Quy Mô Khối Lượng</label>
              <input
                type="text"
                value={form.scale}
                onChange={e => setForm({ ...form, scale: e.target.value })}
                placeholder="Đá lát 450 m², Đá ốp 180 m²"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Năm Hoàn Thành</label>
              <input
                type="text"
                value={form.year}
                onChange={e => setForm({ ...form, year: e.target.value })}
                placeholder="2026"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Mô Tả Chi Tiết Hạng Mục Thi Công</label>
            <textarea
              rows={3}
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              placeholder="Mô tả các hạng mục ốp mái, lát sân hay chẻ thô..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
            />
          </div>

          {/* Upload Dropzone */}
          <div className="space-y-3">
            <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider">Hình Ảnh Thực Tế (Cloudinary CDN Upload) *</label>

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
                  {uploading ? 'Đang Upload Ảnh Lên Cloudinary...' : 'Tải Ảnh Thực Tế Mới (f_auto, q_auto)'}
                </p>
              </div>
            </div>

            {form.img && (
              <div className="w-44 h-28 rounded-2xl overflow-hidden border border-stone-300 bg-stone-100 shadow-sm">
                <img src={form.img} alt="Project Preview" className="w-full h-full object-cover" />
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
              <span>{editing ? 'Cập Nhật Dự Án' : 'Lưu Công Trình'}</span>
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

      {/* Grid danh sách */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider">Danh Sách Công Trình ({projects.length})</h2>

        {loading ? (
          <p className="text-xs text-stone-500">Đang nạp danh sách công trình...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((item) => (
              <div key={item.id} className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-400 transition-all group shadow-sm">
                <div className="relative h-48 bg-stone-200">
                  <img src={item.img || item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[#171717] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-stone-200 shadow-sm">
                    {item.year || '2026'}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#171717] text-base line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-stone-500 mt-1 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed">{item.desc || item.description}</p>
                  </div>

                  <div className="flex space-x-2 mt-4 pt-3 border-t border-stone-200 justify-end">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
