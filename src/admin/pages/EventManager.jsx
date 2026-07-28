import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, UploadCloud, Loader2, CalendarDays, Calendar, MapPin, Sparkles } from 'lucide-react';
import { getEventsList, saveEvent, deleteEvent } from '../../services/api';
import { uploadToCloudinary } from '../../services/cloudinary';

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [langTab, setLangTab] = useState('vi');
  const [form, setForm] = useState({
    id: null,
    title: '',
    title_en: '',
    summary: '',
    summary_en: '',
    content: '',
    content_en: '',
    cover_image: '',
    event_date: '',
    location: '',
    status: 'upcoming'
  });

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    try {
      const data = await getEventsList();
      setEvents(data);
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
      setForm(prev => ({ ...prev, cover_image: cdnUrl }));
    } catch (err) {
      alert('Upload ảnh sự kiện thất bại: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      alert('Vui lòng nhập tên sự kiện!');
      return;
    }

    try {
      await saveEvent(form);
      resetForm();
      loadEvents();
    } catch (err) {
      alert('Lưu sự kiện thất bại: ' + err.message);
    }
  };

  const handleEdit = (item) => {
    setForm({
      ...item,
      title_en: item.title_en || '',
      summary_en: item.summary_en || '',
      content_en: item.content_en || '',
      cover_image: item.cover_image || item.img || ''
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sự kiện này?')) {
      await deleteEvent(id);
      loadEvents();
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: '',
      title_en: '',
      summary: '',
      summary_en: '',
      content: '',
      content_en: '',
      cover_image: '',
      event_date: '',
      location: '',
      status: 'upcoming'
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider uppercase flex items-center space-x-3">
          <Calendar className="w-7 h-7 text-[#D4AF37]" />
          <span>Quản Lý Sự Kiện & Hội Chợ</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">Đăng lịch trình triển lãm Vietbuild, sự kiện công ty song ngữ (Việt - Anh)</p>
      </div>

      {/* Editor Form Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{editing ? 'Chỉnh Sửa Sự Kiện' : 'Tạo Sự Kiện Mới'}</span>
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
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Tên Sự Kiện (Tiếng Việt) *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Triển lãm Vietbuild 2026..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Ngày Tổ Chức</label>
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={e => setForm({ ...form, event_date: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Mô Tả Tóm Tắt (Tiếng Việt)</label>
                <textarea
                  rows={2}
                  value={form.summary}
                  onChange={e => setForm({ ...form, summary: e.target.value })}
                  placeholder="Tóm tắt ngắn gọn nội dung chính sự kiện..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Event Title (English)</label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={e => setForm({ ...form, title_en: e.target.value })}
                  placeholder="Vietbuild International Exhibition 2026..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Event Summary (English)</label>
                <textarea
                  rows={2}
                  value={form.summary_en}
                  onChange={e => setForm({ ...form, summary_en: e.target.value })}
                  placeholder="Short event summary..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Địa Điểm Tổ Chức</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="Trung tâm Triển lãm SECC, TP.HCM"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Trạng Thái Sự Kiện</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
              >
                <option value="upcoming">Sắp diễn ra</option>
                <option value="ongoing">Đang diễn ra</option>
                <option value="completed">Đã kết thúc</option>
              </select>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="space-y-3">
            <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider">Ảnh Bìa Sự Kiện (Cloudinary CDN Upload)</label>

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
                  {uploading ? 'Đang Upload Ảnh Bìa...' : 'Tải Ảnh Bìa Sự Kiện Mới (f_auto, q_auto)'}
                </p>
              </div>
            </div>

            {form.cover_image && (
              <div className="w-40 h-24 rounded-2xl overflow-hidden border border-stone-300 bg-stone-100 shadow-sm">
                <img src={form.cover_image} alt="Event Preview" className="w-full h-full object-cover" />
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
              <span>{editing ? 'Cập Nhật Sự Kiện' : 'Lưu Sự Kiện'}</span>
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
        <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider">Danh Sách Sự Kiện ({events.length})</h2>

        {loading ? (
          <p className="text-xs text-stone-500">Đang nạp danh sách sự kiện...</p>
        ) : (
          <div className="space-y-4">
            {events.map((evt) => (
              <div key={evt.id} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 hover:border-stone-400 transition-all shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-[#171717] font-bold flex-shrink-0 shadow-sm">
                    <CalendarDays className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#171717] text-base">{evt.title}</h3>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{evt.summary}</p>
                    <div className="flex items-center space-x-4 text-xs text-stone-500 mt-2">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{evt.location || 'Chưa cập nhật địa điểm'}</span>
                      </span>
                      <span>• Ngày: {evt.event_date || 'Chưa định'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(evt)}
                    className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt.id)}
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
