import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  Layers 
} from 'lucide-react';
import { productsList } from '../data/products';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('features');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const foundProduct = productsList.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.img);
      document.title = `${foundProduct.title} | HT STONE - Đá Tự Nhiên Lai Châu`;
    } else {
      // If product not found, redirect back to products
      navigate('/products');
    }
    window.scrollTo(0, 0);
  }, [productId, navigate]);

  if (!product) return null;

  // Get related products (same category, excluding current product)
  const relatedProducts = productsList
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'da-den-lop-mai': return 'Đá đen LỢP MÁI';
      case 'da-den-op-lat': return 'Đá đen ỐP LÁT';
      case 'da-da-sac-lop-mai': return 'Đá đa sắc LỢP MÁI';
      case 'da-da-sac-op-lat': return 'Đá đa sắc ỐP LÁT';
      case 'da-trang-tri': return 'Đá TRANG TRÍ';
      default: return 'Đá Tự Nhiên';
    }
  };

  return (
    <main className="min-h-screen bg-background text-primary pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* 1. Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-muted/50">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-secondary hover:text-accent font-body text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> Quay lại danh sách
          </Link>
          
          <nav className="font-body text-xs text-secondary/70 flex items-center gap-2">
            <Link to="/" className="hover:text-accent transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent transition-colors">Sản phẩm</Link>
            <span>/</span>
            <Link 
              to="/products" 
              state={{ filter: product.category }}
              className="hover:text-accent transition-colors"
            >
              {getCategoryLabel(product.category)}
            </Link>
            <span>/</span>
            <span className="text-primary font-semibold">{product.title}</span>
          </nav>
        </div>

        {/* 2. Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square w-full overflow-hidden border border-muted bg-surface rounded-sm relative shadow-md">
              <img 
                src={selectedImage} 
                alt={product.title} 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`aspect-square overflow-hidden rounded-xs border transition-all duration-300 ${
                      selectedImage === imgUrl 
                        ? 'border-accent shadow-md scale-[1.02]' 
                        : 'border-muted hover:border-accent/50'
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${product.title} detail ${index}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-accent text-xs font-body uppercase tracking-widest font-bold">
                <Sparkles size={14} />
                <span>{getCategoryLabel(product.category)}</span>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-relaxed">
                  {product.title}
                </h1>
                <p className="text-secondary/60 font-body text-sm md:text-base italic">
                  {product.engTitle}
                </p>
              </div>

              <p className="font-body text-base text-secondary leading-relaxed border-l-2 border-accent/30 pl-4">
                {product.desc}
              </p>

              {/* Quick Spec Highlights */}
              <div className="bg-muted/10 border border-muted p-6 rounded-sm space-y-3 font-body text-sm text-secondary">
                <h4 className="font-semibold text-primary uppercase tracking-wider text-xs border-b border-muted pb-2 mb-2">Thông tin quy cách nhanh</h4>
                <div className="flex justify-between">
                  <span className="text-primary/70">Kích thước thông dụng:</span>
                  <span className="font-semibold text-primary">{product.specs?.sizes || '30x30, 30x60, 40x40 cm'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">Độ dày tiêu chuẩn:</span>
                  <span className="font-semibold text-primary">{product.specs?.thickness || '1.0 - 1.5 cm'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">Bề mặt hoàn thiện:</span>
                  <span className="font-semibold text-primary">{product.specs?.surface || 'Chẻ tự nhiên / Mài thô'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">Xuất xứ:</span>
                  <span className="font-semibold text-primary">{product.specs?.origin || 'Mỏ đá Slate Lai Châu, Việt Nam'}</span>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 border-t border-muted/50">
              <Link 
                to="/contact" 
                state={{ subject: `Báo giá sản phẩm: ${product.title}` }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-surface py-4 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400 shadow-md"
              >
                <Phone size={14} /> Nhận Báo Giá Ngay
              </Link>
              <a 
                href="/catalogue.pdf" 
                className="flex-1 inline-flex items-center justify-center gap-2 border border-primary/20 text-primary py-4 font-body uppercase tracking-wider text-xs font-bold hover:border-accent hover:text-accent transition-all duration-400"
              >
                <FileText size={14} /> Tải Catalogue PDF
              </a>
            </div>
          </div>

        </div>

        {/* 3. Product Tabs Section (Rich info like laichauslate.com) */}
        <div className="mb-20 border border-muted bg-surface rounded-sm shadow-sm overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-muted bg-muted/10 overflow-x-auto">
            <button
              onClick={() => setActiveTab('features')}
              className={`flex items-center gap-2 px-6 py-4 font-body text-sm font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'features' 
                  ? 'border-accent text-accent bg-surface' 
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <CheckCircle2 size={16} /> Đặc tính nổi bật
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center gap-2 px-6 py-4 font-body text-sm font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'tech' 
                  ? 'border-accent text-accent bg-surface' 
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <Info size={16} /> Thông số vật lý
            </button>
            <button
              onClick={() => setActiveTab('apps')}
              className={`flex items-center gap-2 px-6 py-4 font-body text-sm font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'apps' 
                  ? 'border-accent text-accent bg-surface' 
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <Layers size={16} /> Ứng dụng thi công
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 lg:p-12 text-left">
            {activeTab === 'features' && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">Ưu Điểm Vượt Trội Của Đá Slate Lai Châu</h3>
                <p className="font-body text-sm text-secondary/90 leading-relaxed mb-6">
                  Đá Slate Lai Châu sở hữu độ tuổi kiến tạo địa chất lên tới hàng triệu năm. Dưới nhiệt độ và áp suất cực lớn của lòng đất, các lớp thớ đá được ép chặt, tạo ra liên kết vật lý hoàn hảo mang đến cho sản phẩm những đặc điểm độc nhất vô nhị:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body text-sm text-secondary">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-muted/10 p-4 rounded-xs border border-muted/50">
                      <span className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">Kết Quả Kiểm Định Chỉ Tiêu Cơ Lý</h3>
                <p className="font-body text-sm text-secondary/90 leading-relaxed mb-6">
                  Tất cả sản phẩm đá Lai Châu của HT STONE đều được khai thác từ những vỉa đá chất lượng nhất và được chứng nhận đạt chuẩn chỉ tiêu kỹ thuật phục vụ cho cả các công trình công cộng lẫn dự án tư nhân cao cấp:
                </p>
                <div className="border border-muted rounded-xs overflow-hidden max-w-3xl">
                  <table className="w-full text-left border-collapse font-body text-sm text-secondary">
                    <thead>
                      <tr className="bg-muted/20 border-b border-muted">
                        <th className="p-4 font-semibold text-primary uppercase tracking-wider text-xs">Chỉ tiêu cơ lý</th>
                        <th className="p-4 font-semibold text-primary uppercase tracking-wider text-xs">Trị số đo thực nghiệm</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted">
                      <tr className="hover:bg-muted/5">
                        <td className="p-4 font-semibold text-primary/70">Cường độ chịu lực uốn nén (Flexural Strength)</td>
                        <td className="p-4 text-primary font-semibold">{product.techSpecs.flexuralStrength}</td>
                      </tr>
                      <tr className="hover:bg-muted/5">
                        <td className="p-4 font-semibold text-primary/70">Tỷ lệ hút nước (Water Absorption)</td>
                        <td className="p-4 text-primary font-semibold">{product.techSpecs.waterAbsorption}</td>
                      </tr>
                      <tr className="hover:bg-muted/5">
                        <td className="p-4 font-semibold text-primary/70">Khối lượng thể tích (Density)</td>
                        <td className="p-4 text-primary font-semibold">{product.techSpecs.density}</td>
                      </tr>
                      <tr className="hover:bg-muted/5">
                        <td className="p-4 font-semibold text-primary/70">Độ cứng bề mặt (Mohs Hardness Scale)</td>
                        <td className="p-4 text-primary font-semibold">{product.techSpecs.mohsHardness}</td>
                      </tr>
                      <tr className="hover:bg-muted/5">
                        <td className="p-4 font-semibold text-primary/70">Khả năng bền hoá chất (Acid Resistance)</td>
                        <td className="p-4 text-primary font-semibold">{product.techSpecs.acidResistance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'apps' && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">Các Hạng Mục Ứng Dụng Hàng Đầu</h3>
                <p className="font-body text-sm text-secondary/90 leading-relaxed mb-6">
                  Nhờ tính thẩm mỹ cao cùng tính năng chống chọi thời tiết tuyệt hảo, dòng sản phẩm này thường được thiết kế để phục vụ cho các hạng mục sau:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {product.applications.map((app, idx) => (
                    <div key={idx} className="border border-muted p-6 rounded-xs bg-muted/5 shadow-xs">
                      <span className="text-accent text-xs font-bold font-body uppercase tracking-wider block mb-2">Hạng mục 0{idx + 1}</span>
                      <h4 className="font-heading text-lg font-bold text-primary mb-2">{app}</h4>
                      <p className="font-body text-xs text-secondary/80 leading-relaxed">
                        Đảm bảo yêu cầu kỹ thuật thi công lâu dài, bền màu và mang lại giá trị gia tăng cực lớn cho tài sản.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8 border-t border-muted/50 pt-16">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">Sản Phẩm Cùng Danh Mục</h2>
              <p className="font-body text-sm text-secondary/60 mt-1">Các tùy chọn đá Lai Châu tự nhiên chất lượng khác có thể bạn quan tâm</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/products/${relProduct.id}`}
                  className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                >
                  <div className="aspect-square overflow-hidden mb-6 rounded-xs relative">
                    <img 
                      src={relProduct.img} 
                      alt={relProduct.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex-grow flex flex-col justify-between text-left">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
                        {relProduct.title}
                      </h3>
                      <p className="font-body text-xs text-secondary/80 leading-relaxed mt-2 line-clamp-2">
                        {relProduct.desc}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-accent font-body uppercase tracking-wider text-[10px] font-bold mt-4 border-b border-transparent group-hover:border-accent pb-1 w-fit">
                      Xem chi tiết →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default ProductDetail;
