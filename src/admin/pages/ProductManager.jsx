import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, UploadCloud, Loader2, Package, Sparkles } from 'lucide-react';
import { getProductsList, saveProduct, deleteProduct } from '../../services/api';
import { uploadToCloudinary } from '../../services/cloudinary';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [langTab, setLangTab] = useState('vi');
  const [form, setForm] = useState({
    id: null,
    name: '',
    name_en: '',
    price: 'Liên hệ',
    category: 'Đá lợp mái',
    description: '',
    description_en: '',
    img: '',
    is_new: true
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await getProductsList();
      setProducts(data);
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
      alert('Upload ảnh sản phẩm lên Cloudinary thất bại: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.img) {
      alert('Vui lòng nhập tên sản phẩm và chọn ảnh!');
      return;
    }

    try {
      await saveProduct(form);
      resetForm();
      loadProducts();
    } catch (err) {
      alert('Lưu sản phẩm thất bại: ' + err.message);
    }
  };

  const handleEdit = (prod) => {
    setForm({
      ...prod,
      name: prod.name || prod.title || '',
      name_en: prod.name_en || prod.title_en || '',
      description: prod.description || prod.desc || '',
      description_en: prod.description_en || prod.desc_en || '',
      img: prod.img || prod.image_url
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: '',
      name_en: '',
      price: 'Liên hệ',
      category: 'Đá lợp mái',
      description: '',
      description_en: '',
      img: '',
      is_new: true
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider uppercase flex items-center space-x-3">
          <Package className="w-7 h-7 text-[#D4AF37]" />
          <span>Quản Lý Sản Phẩm Mới</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">Cập nhật danh mục sản phẩm đá Slate Lai Châu, giá bán, nội dung song ngữ (Việt - Anh) và hình ảnh</p>
      </div>

      {/* Editor Form Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{editing ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</span>
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
            {form.name_en && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {langTab === 'vi' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Tên Sản Phẩm (Tiếng Việt) *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Đá đen Lai Châu lợp mái vảy cá..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Giá Bán Hiển Thị</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="Liên hệ / 350.000đ/m²"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Mô Tả Sản Phẩm Chi Tiết (Tiếng Việt)</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Nhập kích thước quy cách, độ dày, độ rãnh chẻ..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Product Name (English)</label>
                <input
                  type="text"
                  value={form.name_en}
                  onChange={e => setForm({ ...form, name_en: e.target.value })}
                  placeholder="Lai Chau Black Roofing Slate (Fish Scale)..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Product Description (English)</label>
                <textarea
                  rows={3}
                  value={form.description_en}
                  onChange={e => setForm({ ...form, description_en: e.target.value })}
                  placeholder="Enter specifications, thickness, split texture details..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </>
          )}

          {/* Upload Dropzone */}
          <div className="space-y-3">
            <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider">Ảnh Sản Phẩm (Cloudinary CDN Upload) *</label>

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
                  {uploading ? 'Đang Upload Ảnh Lên Cloudinary...' : 'Tải Ảnh Sản Phẩm Mới (f_auto, q_auto)'}
                </p>
              </div>
            </div>

            {form.img && (
              <div className="w-32 h-32 rounded-2xl overflow-hidden border border-stone-300 bg-stone-100 shadow-sm">
                <img src={form.img} alt="Product Preview" className="w-full h-full object-cover" />
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
              <span>{editing ? 'Cập Nhật Sản Phẩm' : 'Lưu Sản Phẩm'}</span>
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
        <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider">Danh Sách Sản Phẩm ({products.length})</h2>

        {loading ? (
          <p className="text-xs text-stone-500">Đang nạp danh sách sản phẩm...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((prod) => (
              <div key={prod.id} className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-400 transition-all group shadow-sm">
                <div className="relative aspect-square bg-stone-200">
                  <img src={prod.img || prod.image_url} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {prod.is_new && (
                    <span className="absolute top-2 left-2 bg-[#171717] text-[#D4AF37] font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-md">
                      Mới
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#171717] text-sm line-clamp-1">{prod.name}</h3>
                    <p className="text-xs text-amber-800 font-bold mt-1">{prod.price}</p>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed">{prod.description}</p>
                  </div>

                  <div className="flex space-x-2 mt-4 pt-3 border-t border-stone-200 justify-end">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
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
