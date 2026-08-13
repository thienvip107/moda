import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, UploadCloud, Loader2, Package, Sparkles, Layers, Image as ImageIcon, Star, X, Check, FileText } from 'lucide-react';
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
    category: 'da-den-lop-mai',
    description: '',
    description_en: '',
    img: '',
    gallery: [],
    is_new: true,
    specs: {
      sizes: '30x30, 30x60, 40x40 cm',
      thickness: '1.0 - 1.5 cm',
      surface: 'Chẻ tự nhiên / Mài thô',
      origin: 'Mỏ đá Slate Lai Châu, Việt Nam',
      sizes_en: '',
      thickness_en: '',
      surface_en: '',
      origin_en: ''
    },
    featuresText: '',
    applicationsText: ''
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

  // Upload nhiều ảnh cùng lúc lên Cloudinary
  const handleMultipleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      setForm(prev => {
        const currentGallery = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
        uploadedUrls.forEach(url => {
          if (!currentGallery.includes(url)) {
            currentGallery.push(url);
          }
        });
        const mainImg = prev.img || currentGallery[0] || '';
        return {
          ...prev,
          img: mainImg,
          gallery: currentGallery
        };
      });
    } catch (err) {
      alert('Upload ảnh lên Cloudinary thất bại: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Thêm URL ảnh thủ công
  const handleAddImageUrl = () => {
    const url = prompt('Nhập đường dẫn URL ảnh Cloudinary:');
    if (!url || !url.trim()) return;
    const cleanUrl = url.trim();
    setForm(prev => {
      const currentGallery = Array.isArray(prev.gallery) ? [...prev.gallery] : [];
      if (!currentGallery.includes(cleanUrl)) {
        currentGallery.push(cleanUrl);
      }
      return {
        ...prev,
        img: prev.img || cleanUrl,
        gallery: currentGallery
      };
    });
  };

  // Đặt làm ảnh đại diện chính
  const handleSetMainImage = (url) => {
    setForm(prev => ({
      ...prev,
      img: url
    }));
  };

  // Xóa ảnh khỏi bộ ảnh gallery
  const handleRemoveGalleryImage = (urlToRemove) => {
    setForm(prev => {
      const newGal = (prev.gallery || []).filter(u => u !== urlToRemove);
      let newMain = prev.img;
      if (prev.img === urlToRemove) {
        newMain = newGal[0] || '';
      }
      return {
        ...prev,
        img: newMain,
        gallery: newGal
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || (!form.img && (!form.gallery || form.gallery.length === 0))) {
      alert('Vui lòng nhập tên sản phẩm và chọn ít nhất 1 hình ảnh!');
      return;
    }

    const mainImg = form.img || (form.gallery && form.gallery[0]) || '';
    const galleryArr = Array.isArray(form.gallery) ? [...form.gallery] : [];
    if (mainImg && !galleryArr.includes(mainImg)) {
      galleryArr.unshift(mainImg);
    }

    const payload = {
      ...form,
      name: form.name,
      name_en: form.name_en,
      description: form.description,
      description_en: form.description_en,
      img: mainImg,
      image_url: mainImg,
      gallery: galleryArr,
      specs: {
        sizes: form.specs.sizes || '30x30, 30x60, 40x40 cm',
        thickness: form.specs.thickness || '1.0 - 1.5 cm',
        surface: form.specs.surface || 'Chẻ tự nhiên / Mài thô',
        origin: form.specs.origin || 'Mỏ đá Slate Lai Châu, Việt Nam',
        sizes_en: form.specs.sizes_en || '',
        thickness_en: form.specs.thickness_en || '',
        surface_en: form.specs.surface_en || '',
        origin_en: form.specs.origin_en || ''
      },
      features: form.featuresText ? form.featuresText.split('\n').map(s => s.trim()).filter(Boolean) : [],
      applications: form.applicationsText ? form.applicationsText.split('\n').map(s => s.trim()).filter(Boolean) : []
    };

    try {
      await saveProduct(payload);
      resetForm();
      loadProducts();
    } catch (err) {
      alert('Lưu sản phẩm thất bại: ' + err.message);
    }
  };

  const handleEdit = (prod) => {
    const mainImg = prod.img || prod.image_url || '';
    let gal = Array.isArray(prod.gallery) ? [...prod.gallery] : [];
    if (mainImg && !gal.includes(mainImg)) {
      gal.unshift(mainImg);
    }
    const specs = prod.specs || {};

    setForm({
      id: prod.id,
      name: prod.name || prod.title || '',
      name_en: prod.name_en || prod.title_en || prod.engTitle || '',
      price: prod.price || 'Liên hệ',
      category: prod.category || 'da-den-lop-mai',
      description: prod.description || prod.desc || '',
      description_en: prod.description_en || prod.desc_en || '',
      img: mainImg,
      gallery: gal,
      is_new: prod.is_new ?? true,
      specs: {
        sizes: specs.sizes || '30x30, 30x60, 40x40 cm',
        thickness: specs.thickness || '1.0 - 1.5 cm',
        surface: specs.surface || 'Chẻ tự nhiên / Mài thô',
        origin: specs.origin || 'Mỏ đá Slate Lai Châu, Việt Nam',
        sizes_en: specs.sizes_en || '',
        thickness_en: specs.thickness_en || '',
        surface_en: specs.surface_en || '',
        origin_en: specs.origin_en || ''
      },
      featuresText: Array.isArray(prod.features) ? prod.features.join('\n') : (prod.features || ''),
      applicationsText: Array.isArray(prod.applications) ? prod.applications.join('\n') : (prod.applications || '')
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
      category: 'da-den-lop-mai',
      description: '',
      description_en: '',
      img: '',
      gallery: [],
      is_new: true,
      specs: {
        sizes: '30x30, 30x60, 40x40 cm',
        thickness: '1.0 - 1.5 cm',
        surface: 'Chẻ tự nhiên / Mài thô',
        origin: 'Mỏ đá Slate Lai Châu, Việt Nam',
        sizes_en: '',
        thickness_en: '',
        surface_en: '',
        origin_en: ''
      },
      featuresText: '',
      applicationsText: ''
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider uppercase flex items-center space-x-3">
          <Package className="w-7 h-7 text-[#D4AF37]" />
          <span>Quản Lý Sản Phẩm</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">Cập nhật danh mục sản phẩm đá Slate Lai Châu, upload bộ nhiều ảnh, chỉnh sửa thông tin quy cách kỹ thuật và nội dung song ngữ</p>
      </div>

      {/* Editor Form Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 className="text-sm font-extrabold text-[#171717] uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{editing ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</span>
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
            {form.name_en && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Nhập thông tin giới thiệu chi tiết về dòng đá tự nhiên..."
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
                  placeholder="Enter specifications, thickness, split texture details in English..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Danh Mục Sản Phẩm</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium font-bold"
              >
                <option value="da-den-lop-mai">Đá Slate Đen Lợp Mái</option>
                <option value="da-den-op-lat">Đá Slate Đen Ốp Lát</option>
                <option value="da-da-sac-lop-mai">Đá Slate Đa Sắc Lợp Mái</option>
                <option value="da-da-sac-op-lat">Đá Slate Đa Sắc Ốp Lát</option>
                <option value="da-trang-tri">Đá Rối Tự Nhiên</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="is_new"
                checked={form.is_new}
                onChange={e => setForm({ ...form, is_new: e.target.checked })}
                className="w-5 h-5 accent-[#171717] rounded cursor-pointer"
              />
              <label htmlFor="is_new" className="text-sm font-bold text-[#171717] cursor-pointer">Đánh dấu nhãn "Sản Phẩm Mới"</label>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PHẦN CHỈNH SỬA THÔNG TIN QUY CÁCH KỸ THUẬT (EDIT SPECS) */}
          {/* ========================================================= */}
          <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-xs font-extrabold text-[#171717] uppercase tracking-wider">
                  THÔNG TIN QUY CÁCH KỸ THUẬT (CHỈNH SỬA SPECS)
                </h3>
              </div>
              <span className="text-[10px] text-stone-500 font-medium">Hiển thị trực tiếp ở ô Thông Tin Quy Cách Nhanh</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">
                  Kích Thước Thông Dụng (Sizes) {langTab === 'en' ? '(EN)' : ''}
                </label>
                <input
                  type="text"
                  value={langTab === 'en' ? (form.specs.sizes_en || '') : form.specs.sizes}
                  onChange={e => {
                    const val = e.target.value;
                    setForm(prev => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        [langTab === 'en' ? 'sizes_en' : 'sizes']: val
                      }
                    }));
                  }}
                  placeholder={langTab === 'en' ? 'e.g. 30x30, 30x60, 40x40 cm' : 'Ví dụ: 30x30, 30x60, 40x40 cm'}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">
                  Độ Dày Tiêu Chuẩn (Thickness) {langTab === 'en' ? '(EN)' : ''}
                </label>
                <input
                  type="text"
                  value={langTab === 'en' ? (form.specs.thickness_en || '') : form.specs.thickness}
                  onChange={e => {
                    const val = e.target.value;
                    setForm(prev => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        [langTab === 'en' ? 'thickness_en' : 'thickness']: val
                      }
                    }));
                  }}
                  placeholder={langTab === 'en' ? 'e.g. 1.0 - 1.5 cm' : 'Ví dụ: 1.0 - 1.5 cm'}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">
                  Bề Mặt Hoàn Thiện (Surface) {langTab === 'en' ? '(EN)' : ''}
                </label>
                <input
                  type="text"
                  value={langTab === 'en' ? (form.specs.surface_en || '') : form.specs.surface}
                  onChange={e => {
                    const val = e.target.value;
                    setForm(prev => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        [langTab === 'en' ? 'surface_en' : 'surface']: val
                      }
                    }));
                  }}
                  placeholder={langTab === 'en' ? 'e.g. Natural Split / Honed' : 'Ví dụ: Chẻ tự nhiên / Mài thô'}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-[#171717] uppercase tracking-wider mb-1">
                  Xuất Xứ (Origin) {langTab === 'en' ? '(EN)' : ''}
                </label>
                <input
                  type="text"
                  value={langTab === 'en' ? (form.specs.origin_en || '') : form.specs.origin}
                  onChange={e => {
                    const val = e.target.value;
                    setForm(prev => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        [langTab === 'en' ? 'origin_en' : 'origin']: val
                      }
                    }));
                  }}
                  placeholder={langTab === 'en' ? 'e.g. Lai Chau Slate Quarry, Vietnam' : 'Ví dụ: Mỏ đá Slate Lai Châu, Việt Nam'}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-[#171717] placeholder-stone-400 focus:border-[#171717] focus:outline-none transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PHẦN UPLOAD BỘ NHIỀU ẢNH SẢN PHẨM (PRODUCT GALLERY) */}
          {/* ========================================================= */}
          <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-xs font-extrabold text-[#171717] uppercase tracking-wider">
                  BỘ ẢNH SẢN PHẨM (UPLOAD NHIỀU ẢNH CLOUDINARY CDN)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                Đã chọn: {form.gallery ? form.gallery.length : 0} ảnh
              </span>
            </div>

            {/* Dropzone Upload Nhiều Ảnh */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-stone-300 bg-white hover:bg-stone-50 transition-all text-center relative cursor-pointer shadow-sm">
              <input 
                type="file" 
                accept="image/*"
                multiple 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                onChange={handleMultipleFileChange}
                disabled={uploading}
              />
              <div className="space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 text-[#D4AF37] flex items-center justify-center mx-auto shadow-sm">
                  {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
                </div>
                <p className="text-xs font-bold text-[#171717]">
                  {uploading ? 'Đang Upload Các Ảnh Lên Cloudinary CDN...' : 'Nhấn hoặc Kéo Thả một / nhiều tệp ảnh vào đây'}
                </p>
                <p className="text-[11px] text-stone-500">
                  Tải lên nhiều hình ảnh sản phẩm góc chụp chi tiết. Hệ thống tự động bóp nhỏ kích thước & tối ưu <code className="text-[#D4AF37] font-bold">f_auto, q_auto</code> siêu nhẹ!
                </p>
              </div>
            </div>

            {/* Phím bấm phụ */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="text-xs text-stone-600 hover:text-[#171717] font-semibold underline flex items-center gap-1"
              >
                <span>+ Nhập URL ảnh thủ công</span>
              </button>
              {form.img && (
                <span className="text-[11px] text-stone-500 italic">
                  💡 Nhấn vào bất kỳ hình ảnh nào bên dưới để chọn làm <strong>Ảnh Đại Diện Chính</strong> sản phẩm.
                </span>
              )}
            </div>

            {/* Grid Thư Viện Ảnh (Gallery Grid) */}
            {form.gallery && form.gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                {form.gallery.map((url, idx) => {
                  const isMain = form.img === url;
                  return (
                    <div 
                      key={idx}
                      className={`group relative aspect-square rounded-xl overflow-hidden border-2 bg-stone-900 transition-all ${
                        isMain ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-md' : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      
                      {/* Badge Top Left */}
                      {isMain ? (
                        <span className="absolute top-1.5 left-1.5 bg-[#171717] text-[#D4AF37] font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#D4AF37]" /> Ảnh Chính
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(url)}
                          className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 bg-white/95 text-stone-800 hover:text-[#171717] font-bold text-[9px] px-2 py-0.5 rounded shadow transition-all"
                        >
                          Chọn ảnh chính
                        </button>
                      )}

                      {/* Delete Button Top Right */}
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(url)}
                        className="absolute top-1.5 right-1.5 bg-rose-600/90 hover:bg-rose-700 text-white p-1 rounded-full shadow transition-colors"
                        title="Xóa ảnh này"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#171717] hover:bg-stone-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>{editing ? 'Cập Nhật Sản Phẩm' : 'Lưu Sản Phẩm'}</span>
            </button>

            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
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
                  <img src={prod.img || prod.image_url} alt={prod.name || prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {prod.is_new && (
                    <span className="absolute top-2 left-2 bg-[#171717] text-[#D4AF37] font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-md">
                      Mới
                    </span>
                  )}

                  {prod.gallery && prod.gallery.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-[#D4AF37]" /> {prod.gallery.length} ảnh
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#171717] text-sm line-clamp-1">{prod.name || prod.title}</h3>
                    <p className="text-xs text-amber-800 font-bold mt-1">{prod.price}</p>
                    
                    {prod.specs && (
                      <div className="mt-2 text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-200 space-y-0.5">
                        <p className="font-semibold text-stone-800 truncate">Quy cách: {prod.specs.sizes || 'Tự do'}</p>
                        <p className="text-stone-500 truncate">Dày: {prod.specs.thickness || '1-1.5 cm'} | {prod.specs.surface || 'Chẻ tay'}</p>
                      </div>
                    )}

                    <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed">{prod.description || prod.desc}</p>
                  </div>

                  <div className="flex space-x-2 mt-4 pt-3 border-t border-stone-200 justify-end">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold px-3"
                    >
                      <Edit3 className="w-4 h-4 text-amber-700" />
                      <span>Sửa</span>
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
