import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Sparkles, MoveRight, PhoneCall, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  React.useEffect(() => {
    document.title = "Sản phẩm | HT STONE - Đá Tự Nhiên Lai Châu";
  }, []);

  const productsList = [
    {
      id: 'roofing-black',
      category: 'roofing',
      title: 'Ngói Đá Đen Lợp Mái Lai Châu',
      engTitle: 'Classic Black Roofing Slate',
      desc: 'Mái ngói đá đen tự nhiên - biểu tượng trường tồn của các công trình cổ điển và biệt thự cao cấp. Không phai màu, không hấp thụ nhiệt.',
      img: '/assets/img/roofing_slate.jpg',
      specs: {
        origin: 'Lai Châu, Việt Nam',
        sizes: '20x30 cm, 20x40 cm, 15x25 cm',
        thickness: '4 - 7 mm',
        surface: 'Chẻ tay thủ công thô mộc'
      }
    },
    {
      id: 'roofing-multi',
      category: 'roofing',
      title: 'Ngói Đá Đa Sắc Lợp Mái',
      engTitle: 'Multicolor Roofing Slate',
      desc: 'Sự kết hợp ngẫu nhiên giữa màu xám đen, vàng gỉ sét và nâu đồng tạo phong cách cổ kính, vương giả kiểu Pháp.',
      img: '/assets/img/multicolor_slate.jpg',
      specs: {
        origin: 'Lai Châu, Việt Nam',
        sizes: 'Rối tự do hoặc quy chuẩn',
        thickness: '5 - 8 mm',
        surface: 'Vân thô tự nhiên'
      }
    },
    {
      id: 'wall-black',
      category: 'wall',
      title: 'Đá Thẻ Ốp Tường Đen Tự Nhiên',
      engTitle: 'Natural Black Wall Cladding Slate',
      desc: 'Các thanh đá thẻ dài mỏng chẻ thô ốp ghép so le tạo hiệu ứng vách đá tự nhiên đầy nghệ thuật và chiều sâu.',
      img: '/assets/img/wall_cladding.jpg',
      specs: {
        origin: 'Lai Châu, Việt Nam',
        sizes: '10x20 cm, 5x20 cm, 15x30 cm',
        thickness: '10 - 15 mm',
        surface: 'Chẻ tay nhô cao nghệ thuật'
      }
    },
    {
      id: 'wall-multi',
      category: 'wall',
      title: 'Đá Vân Sóng Đa Sắc Ốp Mặt Tiền',
      engTitle: 'Multicolor Slate Wall Cladding',
      desc: 'Màu sắc biến chuyển kỳ ảo nổi bật dưới ánh nắng mặt trời, hoàn hảo cho mặt tiền biệt thự và vách trang trí sảnh đón.',
      img: '/assets/img/multicolor_slate.jpg',
      specs: {
        origin: 'Lai Châu, Việt Nam',
        sizes: '15x60 cm, 10x50 cm',
        thickness: '15 - 20 mm',
        surface: 'Ghép tấm băm gồ ghề'
      }
    },
    {
      id: 'paving-black',
      category: 'paving',
      title: 'Đá Lát Sân Vườn Đen Nhám',
      engTitle: 'Textured Black Paving Slate',
      desc: 'Bề mặt chống trơn trượt tuyệt đối, độ chịu lực uốn nén cao, chịu nhiệt và chống rêu mốc tối đa cho sân vườn, lối đi ô tô.',
      img: '/assets/img/paving_slate.jpg',
      specs: {
        origin: 'Lai Châu, Việt Nam',
        sizes: '30x30 cm, 30x60 cm, 40x40 cm',
        thickness: '12 - 25 mm',
        surface: 'Chẻ thô phẳng tự nhiên'
      }
    },
    {
      id: 'paving-step',
      category: 'paving',
      title: 'Đá Thớt Lát Bước Dạo Sân Vườn',
      engTitle: 'Natural Garden Step Stones',
      desc: 'Đá cắt hình dạng thớt tự do, giữ trọn vẹn nét mộc mạc hoang sơ của đá tự nhiên để xếp đặt lối đi dạo trên thảm cỏ.',
      img: '/assets/img/project_1.jpg',
      specs: {
        origin: 'Lai Châu, Việt Nam',
        sizes: 'Đường kính 30 - 50 cm',
        thickness: '30 - 45 mm',
        surface: 'Bề mặt chẻ tay thô ráp'
      }
    }
  ];

  const filters = [
    { key: 'all', name: 'Tất cả sản phẩm' },
    { key: 'roofing', name: 'Đá Lợp Mái' },
    { key: 'wall', name: 'Đá Ốp Tường' },
    { key: 'paving', name: 'Đá Lát Sân Vườn' }
  ];

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
                  <div className="aspect-[16/10] overflow-hidden rounded-xs border border-muted/50 relative mb-8">
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-accent text-xs font-body uppercase tracking-wider">
                      <Sparkles size={14} />
                      <span>{product.category === 'roofing' ? 'Đá lợp mái' : product.category === 'wall' ? 'Đá ốp tường' : 'Đá lát sân vườn'}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary group-hover:text-accent transition-colors">
                      {product.title}
                    </h3>
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
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-accent font-body uppercase tracking-wider text-xs font-bold hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
                  >
                    Yêu cầu báo giá <MoveRight size={14} />
                  </Link>
                  <a 
                    href="/catalogue.pdf" 
                    className="inline-flex items-center gap-1.5 font-body text-xs text-secondary hover:text-accent transition-colors"
                  >
                    <FileText size={14} /> Spec Sheet
                  </a>
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
