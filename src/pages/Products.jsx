import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Sparkles, MoveRight, PhoneCall, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { productsList, filters } from '../data/products';

const Products = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');

  React.useEffect(() => {
    document.title = "Sản phẩm | HT STONE - Đá Tự Nhiên Lai Châu";
    if (location.state && location.state.filter) {
      setActiveFilter(location.state.filter);
    }
  }, [location.state]);

  const filteredProducts = activeFilter === 'all'
    ? productsList
    : productsList.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-background text-primary pt-24">
      {/* 1. Header Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{t('products')}</span>
            <div className="w-12 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-primary">
            Tuyệt Tác Kiến Trúc <br />
            <span className="font-bold">Đá Tự Nhiên Cao Cấp</span>
          </h1>
        </div>
      </section>

      {/* 2. Catalog Filters */}
      <section className="py-8 md:py-12 bg-background border-b border-muted/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`font-body text-sm uppercase tracking-wider font-semibold py-2 px-4 border-b-2 transition-all duration-300 ${
                  activeFilter === f.key
                    ? 'border-accent text-accent'
                    : 'border-transparent text-secondary hover:text-primary hover:border-muted'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Grid */}
      <section className="py-16 md:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-surface border border-muted p-6 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image Showcase */}
                  <Link to={`/products/${product.id}`} className="aspect-[16/10] overflow-hidden rounded-xs border border-muted/50 relative mb-8 block">
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>

                  {/* Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-accent text-xs font-body uppercase tracking-wider">
                      <Sparkles size={14} />
                      <span>
                        {product.category === 'da-den-lop-mai' && 'Đá đen LỢP MÁI'}
                        {product.category === 'da-den-op-lat' && 'Đá đen ỐP LÁT'}
                        {product.category === 'da-da-sac-lop-mai' && 'Đá đa sắc LỢP MÁI'}
                        {product.category === 'da-da-sac-op-lat' && 'Đá đa sắc ỐP LÁT'}
                        {product.category === 'da-trang-tri' && 'Đá TRANG TRÍ'}
                      </span>
                    </div>
                    <Link to={`/products/${product.id}`} className="block">
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary group-hover:text-accent transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-body text-sm text-secondary/80 leading-relaxed">
                      {product.desc}
                    </p>
                  </div>

                  {/* Technical Specs Table */}
                  <div className="mt-8 pt-6 border-t border-muted/70 space-y-3 font-body text-xs text-secondary">
                    <div className="flex justify-between">
                      <span className="font-semibold uppercase tracking-wider text-primary/70">Xuất xứ:</span>
                      <span>{product.specs.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold uppercase tracking-wider text-primary/70">Kích thước thông dụng:</span>
                      <span>{product.specs.sizes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold uppercase tracking-wider text-primary/70">Độ dày tiêu chuẩn:</span>
                      <span>{product.specs.thickness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold uppercase tracking-wider text-primary/70">Bề mặt hoàn thiện:</span>
                      <span>{product.specs.surface}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-muted/50 flex items-center justify-between gap-4">
                  <Link 
                    to={`/products/${product.id}`} 
                    className="inline-flex items-center gap-2 text-accent font-body uppercase tracking-wider text-xs font-bold hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
                  >
                    Xem chi tiết <MoveRight size={14} />
                  </Link>
                  <Link 
                    to="/contact" 
                    state={{ subject: `Yêu cầu báo giá: ${product.title}` }}
                    className="inline-flex items-center gap-1.5 font-body text-xs text-secondary hover:text-accent transition-colors"
                  >
                    Yêu cầu báo giá
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Quality Guarantee */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-t border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-3xl">
          <Shield className="text-accent mx-auto mb-6" size={48} strokeWidth={1.5} />
          <h2 className="text-3xl font-heading font-bold mb-4">Cam Kết Chất Lượng HT STONE</h2>
          <p className="font-body text-secondary text-base leading-relaxed mb-8">
            Chúng tôi tự tin bảo hành vĩnh viễn về màu sắc và độ bền tự nhiên của đá Slate Lai Châu cung cấp cho mọi hạng mục công trình. Tất cả sản phẩm đều được kiểm định chất lượng nghiêm ngặt trước khi xuất xưởng.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-surface px-8 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400">
            <PhoneCall size={16} /> Liên hệ tư vấn kỹ thuật trực tiếp
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Products;
