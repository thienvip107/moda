import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Sparkles, MoveRight, PhoneCall, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { filters } from '../data/products';
import { getProductsList, normalizeProductCategory } from '../services/api';
import SEO from '../components/SEO';

const Products = () => {
  const { t, i18n } = useTranslation();
  const isEn = Boolean(i18n?.language && i18n.language.toLowerCase().startsWith('en'));
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = isEn 
      ? "Products & Catalog | HT STONE - Lai Chau Natural Slate" 
      : "Sản phẩm | HT STONE - Đá Tự Nhiên Lai Châu";
    if (location.state && location.state.filter) {
      setActiveFilter(location.state.filter);
    }
    async function fetchProducts() {
      try {
        const data = await getProductsList();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [isEn, location.state]);

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => normalizeProductCategory(p.category) === activeFilter);

  const getSeoData = () => {
    if (isEn) {
      switch (activeFilter) {
        case 'da-den-lop-mai':
        case 'roofing':
          return {
            title: "Lai Chau Black Slate Roofing - Fish Scale & Rectangular Tiles | HT STONE",
            description: "Direct quarry supply of Lai Chau natural Black Slate roofing tiles. Ultra-low water absorption, 100+ year durability for villas and luxury resorts.",
            keywords: "slate roofing, black slate roofing, lai chau slate roofing, fish scale slate, villa roofing"
          };
        case 'da-den-op-lat':
        case 'wall':
          return {
            title: "Black Slate Cladding & Paving - Premium Lai Chau Stone | HT STONE",
            description: "Natural Black Slate tiles for wall cladding, exterior facades, courtyards, and garden pathways. Direct quarry production, moss-resistant.",
            keywords: "slate wall cladding, black slate paving, stone facade, natural slate tiles"
          };
        case 'da-da-sac-lop-mai':
          return {
            title: "Multicolor Slate Roofing - Bespoke Natural Stone Tiles | HT STONE",
            description: "Bespoke Multicolor Slate roofing tiles for luxury villas and estates, crafted from Lai Chau quarries.",
            keywords: "multicolor slate roofing, natural slate tiles, bespoke roofing"
          };
        case 'da-da-sac-op-lat':
        case 'flooring':
          return {
            title: "Multicolor Slate Cladding & Paving - Heavy-Duty Natural Stone | HT STONE",
            description: "Multicolor Slate paving for garden landscapes, pedestrian paths, and exterior walls. Slip-resistant and durable.",
            keywords: "multicolor slate paving, garden stone, slate cladding, lai chau slate"
          };
        case 'da-trang-tri':
          return {
            title: "Natural Random Slate - Rustic Hand-Split Stone | HT STONE",
            description: "Hand-split natural Random Slate for landscape retaining walls, pond edges, and architectural feature walls.",
            keywords: "random slate, natural flagstone, rustic slate, garden slate"
          };
        default:
          return {
            title: "Natural Slate Products Catalog - Black & Multicolor Slate | HT STONE",
            description: "Complete catalog of premium natural Lai Chau Slate products directly from the quarry: roofing, cladding, and paving.",
            keywords: "slate quarry, black slate, lai chau slate, natural stone, slate roofing, slate cladding"
          };
      }
    }

    switch (activeFilter) {
      case 'da-den-lop-mai':
      case 'roofing':
        return {
          title: "Đá Đen Lợp Mái Lai Châu - Đá Slate Vảy Cá, Mái Biệt Thự | HT STONE",
          description: "Báo giá đá đen lợp mái Lai Châu tự nhiên cao cấp, đá vảy cá, đá lợp mái hình chữ nhật từ mỏ khai thác trực tiếp. Không thấm nước, độ bền vĩnh cửu 100 năm.",
          keywords: "đá lợp mái, đá đen lợp mái, đá slate lai châu lợp mái, đá vảy cá, đá lợp mái biệt thự, đá đen lai châu"
        };
      case 'da-den-op-lat':
      case 'wall':
        return {
          title: "Đá Đen & Đá Đa Sắc Ốp Tường - Đá Slate Lai Châu Cao Cấp | HT STONE",
          description: "Các mẫu đá đen Lai Châu ốp tường, đá đa sắc ốp mặt tiền, chân tường biệt thự, resort sang trọng. Sản xuất trực tiếp tại mỏ, chống rêu mốc tối đa.",
          keywords: "đá ốp tường, đá đen ốp tường, đá đa sắc ốp tường, đá lai châu ốp tường, đá slate lai châu ốp tường"
        };
      case 'da-da-sac-lop-mai':
        return {
          title: "Đá Đa Sắc Lợp Mái Lai Châu - Ngói Đá Tự Nhiên Độc Bản | HT STONE",
          description: "Đá Slate đa sắc lợp mái biệt thự, lâu đài tạo điểm nhấn kiến trúc độc bản sang trọng từ mỏ đá Lai Châu.",
          keywords: "đá đa sắc lợp mái, ngói đá đa sắc, đá slate đa sắc"
        };
      case 'da-da-sac-op-lat':
      case 'flooring':
        return {
          title: "Đá Đa Sắc Lát Sân Vườn, Ốp Tường - Đá Slate Lai Châu Chịu Lực | HT STONE",
          description: "Đá đa sắc lát sân vườn, lát lối đi biệt thự, quảng trường. Đá tự nhiên chẻ thô chống trơn trượt, chịu tải trọng lớn, độ bền hơn 100 năm.",
          keywords: "đá lát sân vườn, đá đa sắc lát sân, đá lai châu lát nền, đá slate lát lối đi, đá đa sắc lai châu"
        };
      case 'da-trang-tri':
        return {
          title: "Đá Rối Tự Nhiên Lai Châu - Đá Chẻ Trang Trí Ốp Lát | HT STONE",
          description: "Đá rối tự nhiên Slate Lai Châu ốp chân tường, kè hồ cá, lối đi sân vườn độc đáo.",
          keywords: "đá rối tự nhiên, đá chẻ tự nhiên, đá slate rối"
        };
      default:
        return {
          title: "Đá Đen & Đá Đa Sắc Lai Châu - Mỏ Đá Tự Nhiên Cao Cấp | HT STONE",
          description: "Danh mục sản phẩm đá Slate Lai Châu tự nhiên cao cấp khai thác trực tiếp tại mỏ. Bao gồm đá đen lợp mái, đá đen ốp tường, đá đa sắc lát sân vườn.",
          keywords: "mỏ đá, đá đen, đá lai châu, đá cao cấp, đá slate lai châu, đá đen lai châu, đá ốp tường, đá lợp mái, đá lát sân"
        };
    }
  };

  const seoInfo = getSeoData();

  const getTranslatedSurface = (surface) => {
    if (!surface) return isEn ? 'Hand-split / Natural' : 'Chẻ tự nhiên / Mài thô';
    if (!isEn) return surface;
    return surface
      .replace('Xén cạnh thủ công hoặc Cắt phẳng bằng máy', 'Hand-split edge or Machine-cut')
      .replace('Chẻ tự nhiên / Mài thô', 'Hand-split / Natural')
      .replace('Chẻ thô tự nhiên chống trơn', 'Rough hand-split slip-resistant')
      .replace('Chẻ tay tự nhiên', 'Natural hand-split')
      .replace('Chẻ tay thủ công', 'Hand-split craftsmanship');
  };

  return (
    <main className="min-h-screen bg-background text-primary">
      <SEO 
        title={seoInfo.title}
        description={seoInfo.description}
        keywords={seoInfo.keywords}
        canonical="/products"
      />
      {/* 1. Header Section */}
      <section className="relative h-[450px] md:h-[540px] lg:h-[600px] flex items-center justify-center overflow-hidden bg-white border-b border-stone-200">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/img/banners/banner_products.jpg" 
            alt="HT STONE Natural Slate Products Catalog" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-20 max-w-xl animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-[0.2em] text-accent text-xs font-bold">{t('products')}</span>
            <div className="w-10 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-light text-stone-900 leading-tight">
            {isEn ? 'ARCHITECTURAL MASTERPIECES' : 'TUYỆT TÁC KIẾN TRÚC'} <br />
            <span className="font-bold text-stone-950">{isEn ? 'Premium Natural Slate' : 'Đá Tự Nhiên Cao Cấp'}</span>
          </h1>
        </div>
      </section>

      {/* 2. Catalog Filters */}
      <section className="py-8 md:py-12 bg-background border-b border-muted/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`font-body text-xs md:text-sm uppercase tracking-wider font-semibold py-2 px-4 border-b-2 transition-all duration-300 ${
                  activeFilter === f.key
                    ? 'border-accent text-accent'
                    : 'border-transparent text-secondary hover:text-primary hover:border-muted'
                }`}
              >
                {isEn ? (f.name_en || f.name) : f.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Grid */}
      <section className="py-16 md:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const displayTitle = isEn ? (product.name_en || product.engTitle || product.title) : product.title;
              return (
                <div 
                  key={product.id} 
                  className="group bg-surface border border-muted p-5 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Showcase */}
                    <Link to={`/products/${product.id}`} className="aspect-square overflow-hidden rounded-xs border border-muted/50 relative mb-5 block">
                      <img 
                        src={product.img || product.image_url} 
                        alt={displayTitle} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Link>
   
                    {/* Info */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-1.5 text-accent text-xs font-body uppercase tracking-wider font-semibold">
                        <Sparkles size={12} />
                        <span>
                          {normalizeProductCategory(product.category) === 'da-den-lop-mai' && (isEn ? 'Black Slate Roofing' : 'Đá đen lợp mái')}
                          {normalizeProductCategory(product.category) === 'da-den-op-lat' && (isEn ? 'Black Slate Cladding & Paving' : 'Đá đen ốp lát')}
                          {normalizeProductCategory(product.category) === 'da-da-sac-lop-mai' && (isEn ? 'Multicolor Slate Roofing' : 'Đá đa sắc lợp mái')}
                          {normalizeProductCategory(product.category) === 'da-da-sac-op-lat' && (isEn ? 'Multicolor Slate Cladding & Paving' : 'Đá đa sắc ốp lát')}
                          {normalizeProductCategory(product.category) === 'da-trang-tri' && (isEn ? 'Natural Random Slate' : 'Đá rối tự nhiên')}
                        </span>
                      </div>
                      <Link to={`/products/${product.id}`} className="block group/title">
                        <h3 className="text-base md:text-lg font-heading font-bold text-[#171717] group-hover/title:text-accent transition-colors line-clamp-2 min-h-[3.25rem] flex items-center">
                          {displayTitle}
                        </h3>
                      </Link>
                    </div>
   
                    {/* Technical Specs Table */}
                    <div className="mt-5 pt-4 border-t border-muted/70 space-y-2.5 font-body text-sm text-secondary">
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-secondary/70">{t('specs_sizes')}</span>
                        <span className="font-semibold text-primary text-right">{product.specs?.sizes || '30x30, 30x60, 40x40 cm'}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-secondary/70">{t('specs_thickness')}</span>
                        <span className="font-semibold text-primary text-right">{product.specs?.thickness || '1.0 - 1.5 cm'}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium text-secondary/70">{t('specs_surface')}</span>
                        <span className="font-semibold text-primary text-right">{getTranslatedSurface(product.specs?.surface)}</span>
                      </div>
                    </div>
   
                  </div>
   
                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-muted/50 flex items-center justify-between gap-2">
                    <Link 
                      to={`/products/${product.id}`} 
                      className="inline-flex items-center gap-1.5 text-accent font-body uppercase tracking-wider text-xs font-bold hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
                    >
                      {t('view_details')} <MoveRight size={14} />
                    </Link>
                    <Link 
                      to="/contact" 
                      state={{ subject: isEn ? `Quotation Request: ${displayTitle}` : `Yêu cầu báo giá: ${displayTitle}` }}
                      className="inline-flex items-center gap-1 font-body text-xs font-semibold text-secondary hover:text-accent transition-colors"
                    >
                      {t('get_quote')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quality Guarantee (Sheet 3) */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-t border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-3xl">
          <Shield className="text-accent mx-auto mb-6" size={48} strokeWidth={1.5} />
          <h2 className="text-3xl font-heading font-bold mb-4">{t('quality_commitment')}</h2>
          <p className="font-body text-secondary text-base leading-relaxed mb-8">
            {t('quality_commitment_desc')}
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-surface px-8 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400">
            <PhoneCall size={16} /> {t('quality_commitment_cta')}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Products;
