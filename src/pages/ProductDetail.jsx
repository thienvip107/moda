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
import { getProductsList, normalizeProductCategory } from '../services/api';
import SEO from '../components/SEO';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = Boolean(i18n?.language && i18n.language.toLowerCase().startsWith('en'));
  const [product, setProduct] = useState(null);
  const [allProductsList, setAllProductsList] = useState([]);
  const [activeTab, setActiveTab] = useState('features');
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const allProds = await getProductsList();
        setAllProductsList(allProds);
        const found = allProds.find(p => String(p.id) === String(productId) || String(p.slug) === String(productId) || String(p.code) === String(productId))
          || productsList.find(p => String(p.id) === String(productId) || String(p.slug) === String(productId));

        if (found) {
          setProduct(found);
          setSelectedImage(found.img || found.image_url);
          const name = isEn ? (found.name_en || found.engTitle || found.title || found.name) : (found.title || found.name);
          document.title = isEn 
            ? `${name} | HT STONE - Lai Chau Natural Slate` 
            : `${name} | HT STONE - Đá Tự Nhiên Lai Châu`;
        } else if (allProds.length > 0) {
          setProduct(allProds[0]);
          setSelectedImage(allProds[0].img || allProds[0].image_url);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    window.scrollTo(0, 0);
  }, [productId, isEn]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 text-center">
        <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="font-body text-sm text-secondary mt-4">{t('loading')}</p>
      </div>
    );
  }

  if (!product) return null;

  // Get related products (same category first, then other products from catalog)
  const candidatePool = allProductsList.length > 0 ? allProductsList : productsList;
  const sameCategory = candidatePool.filter(p => 
    normalizeProductCategory(p.category) === normalizeProductCategory(product.category) && 
    String(p.id) !== String(product.id) &&
    String(p.slug) !== String(product.slug)
  );
  const otherCategory = candidatePool.filter(p => 
    String(p.id) !== String(product.id) && 
    String(p.slug) !== String(product.slug) && 
    !sameCategory.some(sc => String(sc.id) === String(p.id))
  );
  const relatedProducts = [...sameCategory, ...otherCategory].slice(0, 3);

  const getCategoryLabel = (cat) => {
    const normalized = normalizeProductCategory(cat);
    switch (normalized) {
      case 'da-den-lop-mai': return isEn ? 'Black Slate Roofing' : 'Đá Slate Đen Lợp Mái';
      case 'da-den-op-lat': return isEn ? 'Black Slate Cladding & Paving' : 'Đá Slate Đen Ốp Lát';
      case 'da-da-sac-lop-mai': return isEn ? 'Multicolor Slate Roofing' : 'Đá Slate Đa Sắc Lợp Mái';
      case 'da-da-sac-op-lat': return isEn ? 'Multicolor Slate Cladding & Paving' : 'Đá Slate Đa Sắc Ốp Lát';
      case 'da-trang-tri': return isEn ? 'Natural Random Slate' : 'Đá Rối Tự Nhiên';
      default: return isEn ? 'Natural Slate' : 'Đá Tự Nhiên';
    }
  };

  const displayTitle = isEn ? (product.name_en || product.engTitle || product.title || product.name) : (product.title || product.name);
  const displayDesc = isEn 
    ? (product.description_en || product.desc_en || 'Premium Lai Chau Natural Slate directly quarried and hand-crafted for luxury roofing, cladding, and paving applications.')
    : (product.description || product.desc || 'Đá tự nhiên nguyên bản khai thác tại mỏ đá Lai Châu. Chuyên dùng lợp mái biệt thự, ốp tường và lát sân vườn cao cấp. Báo giá tốt nhất tại mỏ.');

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

  const productTitle = isEn 
    ? `${displayTitle} - Premium Lai Chau Slate | HT STONE` 
    : `${displayTitle} - Đá Slate Lai Châu Cao Cấp | HT STONE`;
  const productDesc = isEn 
    ? `${displayTitle} natural slate directly quarried from Lai Chau, Vietnam. Direct quarry quotation.` 
    : `${displayTitle} tự nhiên nguyên bản khai thác tại mỏ đá Lai Châu. Báo giá tốt nhất tại mỏ.`;
  const productKeywords = `${displayTitle}, slate quarry, lai chau slate, natural stone, ht stone`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": displayTitle,
    "image": product.img || product.image_url ? `https://www.modalaichau.com${product.img || product.image_url}` : undefined,
    "description": displayDesc,
    "sku": String(product.code || product.id),
    "mpn": String(product.code || product.id),
    "brand": {
      "@type": "Brand",
      "name": "HT STONE"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.modalaichau.com/products/${product.id}`,
      "priceCurrency": "VND",
      "price": "250000",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <main className="min-h-screen bg-background text-primary pt-28 pb-20">
      <SEO 
        title={productTitle}
        description={productDesc}
        keywords={productKeywords}
        canonical={`/products/${product.id}`}
        ogImage={product.img || product.image_url}
        schemaData={productSchema}
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* 1. Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-muted/50">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-secondary hover:text-accent font-body text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> {t('back_to_list')}
          </Link>
          
          <nav className="font-body text-xs text-secondary/70 flex items-center gap-2">
            <Link to="/" className="hover:text-accent transition-colors">{t('home')}</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent transition-colors">{t('products')}</Link>
            <span>/</span>
            <Link 
              to="/products" 
              state={{ filter: product.category }}
              className="hover:text-accent transition-colors"
            >
              {getCategoryLabel(product.category)}
            </Link>
            <span>/</span>
            <span className="text-primary font-semibold truncate max-w-[180px] md:max-w-xs">{displayTitle}</span>
          </nav>
        </div>

        {/* 2. Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square w-full overflow-hidden border border-muted bg-surface rounded-sm relative shadow-md">
              <img 
                src={selectedImage} 
                alt={displayTitle} 
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
                      alt={`${displayTitle} detail ${index}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-accent text-xs font-body uppercase tracking-widest font-bold">
                <Sparkles size={14} />
                <span>{getCategoryLabel(product.category)}</span>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-relaxed">
                  {displayTitle}
                </h1>
                {isEn && (product.title || product.name) !== displayTitle && (
                  <p className="text-secondary/60 font-body text-sm italic">
                    {product.title || product.name}
                  </p>
                )}
              </div>

              <p className="font-body text-base text-secondary leading-relaxed border-l-2 border-accent/30 pl-4">
                {displayDesc}
              </p>

              {/* Quick Spec Highlights */}
              <div className="bg-muted/10 border border-muted p-6 rounded-sm space-y-3 font-body text-sm text-secondary">
                <h4 className="font-semibold text-primary uppercase tracking-wider text-xs border-b border-muted pb-2 mb-2">{t('quick_specs')}</h4>
                <div className="flex justify-between">
                  <span className="text-primary/70">{t('specs_sizes')}</span>
                  <span className="font-semibold text-primary">{product.specs?.sizes || '30x30, 30x60, 40x40 cm'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">{t('specs_thickness')}</span>
                  <span className="font-semibold text-primary">{product.specs?.thickness || '1.0 - 1.5 cm'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">{t('specs_surface')}</span>
                  <span className="font-semibold text-primary">{getTranslatedSurface(product.specs?.surface)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">{t('specs_origin')}</span>
                  <span className="font-semibold text-primary">{isEn ? 'Lai Chau Slate Quarry, Vietnam' : (product.specs?.origin || 'Mỏ đá Slate Lai Châu, Việt Nam')}</span>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 border-t border-muted/50">
              <Link 
                to="/contact" 
                state={{ subject: isEn ? `Quotation Request: ${displayTitle}` : `Báo giá sản phẩm: ${displayTitle}` }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-surface py-4 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400 shadow-md"
              >
                <Phone size={14} /> {t('request_quote_now')}
              </Link>
              <a 
                href="/catalogue.pdf" 
                className="flex-1 inline-flex items-center justify-center gap-2 border border-primary/20 text-primary py-4 font-body uppercase tracking-wider text-xs font-bold hover:border-accent hover:text-accent transition-all duration-400"
              >
                <FileText size={14} /> {t('download_catalogue_pdf')}
              </a>
            </div>
          </div>

        </div>

        {/* 3. Product Tabs Section */}
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
              <CheckCircle2 size={16} /> {t('tab_features')}
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center gap-2 px-6 py-4 font-body text-sm font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'tech' 
                  ? 'border-accent text-accent bg-surface' 
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <Info size={16} /> {t('tab_tech')}
            </button>
            <button
              onClick={() => setActiveTab('apps')}
              className={`flex items-center gap-2 px-6 py-4 font-body text-sm font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'apps' 
                  ? 'border-accent text-accent bg-surface' 
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              <Layers size={16} /> {t('tab_apps')}
            </button>
          </div>

          {/* Tab Content */}
          {(() => {
            const defaultFeaturesVi = [
              'Độ bền vĩnh cửu trên 100 năm, chịu lực và chống ăn mòn cực tốt.',
              'Màu sắc tự nhiên không phai dưới mưa nắng axit.',
              'Kháng nước tuyệt đối (độ hút nước < 0.08%), không phát sinh rêu mốc.',
              'Cách nhiệt và cách âm vượt trội cho công trình.'
            ];

            const defaultFeaturesEn = [
              '100+ years enduring lifespan, superior load-bearing and corrosion resistance.',
              'Authentic natural color that never fades under acid rain and weathering.',
              'Near-zero water absorption (< 0.08%), fully moss and frost resistant.',
              'Outstanding thermal and acoustic insulation for architectural projects.'
            ];

            const defaultTechSpecs = {
              flexuralStrength: '58.4 - 61.0 MPa',
              waterAbsorption: '0.08%',
              density: '2.78 - 2.80 g/cm³',
              mohsHardness: '5.5 / 10',
              acidResistance: isEn ? 'Permanently resistant' : 'Bền bỉ vĩnh viễn'
            };

            const defaultApplicationsVi = [
              'Lợp mái biệt thự & lâu đài',
              'Ốp lát sân vườn & resort',
              'Trang trí ngoại thất cao cấp'
            ];

            const defaultApplicationsEn = [
              'Luxury Villa & Castle Roofing',
              'Garden Cladding & Resort Paving',
              'Premium Exterior Facade Decoration'
            ];

            const featuresList = isEn 
              ? (Array.isArray(product?.features_en) && product.features_en.length > 0 ? product.features_en : defaultFeaturesEn)
              : (Array.isArray(product?.features) && product.features.length > 0 ? product.features : defaultFeaturesVi);

            const techSpecsData = product?.techSpecs || defaultTechSpecs;

            const appsList = isEn
              ? (Array.isArray(product?.applications_en) && product.applications_en.length > 0 ? product.applications_en : defaultApplicationsEn)
              : (Array.isArray(product?.applications) && product.applications.length > 0 ? product.applications : defaultApplicationsVi);

            return (
              <div className="p-6 md:p-8 lg:p-12 text-left">
                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-heading font-bold text-primary mb-4">
                      {isEn ? 'Outstanding Advantages of Lai Chau Slate' : 'Ưu Điểm Vượt Trội Của Đá Slate Lai Châu'}
                    </h3>
                    <p className="font-body text-sm text-secondary/90 leading-relaxed mb-6">
                      {isEn 
                        ? 'Lai Chau natural Slate has a geological history spanning millions of years. Under extreme tectonic pressure and temperature, the layered structure forms an exceptionally dense bond that gives the stone its unique physical characteristics:'
                        : 'Đá Slate Lai Châu sở hữu độ tuổi kiến tạo địa chất lên tới hàng triệu năm. Dưới nhiệt độ và áp suất cực lớn của lòng đất, các lớp thớ đá được ép chặt, tạo ra liên kết vật lý hoàn hảo mang đến cho sản phẩm những đặc điểm độc nhất vô nhị:'}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body text-sm text-secondary">
                      {featuresList.map((feat, idx) => (
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
                    <h3 className="text-xl font-heading font-bold text-primary mb-4">
                      {isEn ? 'Physical & Mechanical Test Results' : 'Kết Quả Kiểm Định Chỉ Tiêu Cơ Lý'}
                    </h3>
                    <p className="font-body text-sm text-secondary/90 leading-relaxed mb-6">
                      {isEn 
                        ? 'All HT STONE Lai Chau slate products are quarried from premium seams and certified to meet demanding international technical benchmarks for public and luxury private architecture:'
                        : 'Tất cả sản phẩm đá Lai Châu của HT STONE đều được khai thác từ những vỉa đá chất lượng nhất và được chứng nhận đạt chuẩn chỉ tiêu kỹ thuật phục vụ cho cả các công trình công cộng lẫn dự án tư nhân cao cấp:'}
                    </p>
                    <div className="border border-muted rounded-xs overflow-hidden max-w-3xl">
                      <table className="w-full text-left border-collapse font-body text-sm text-secondary">
                        <thead>
                          <tr className="bg-muted/20 border-b border-muted">
                            <th className="p-4 font-semibold text-primary uppercase tracking-wider text-xs">
                              {isEn ? 'Physical Property' : 'Chỉ tiêu cơ lý'}
                            </th>
                            <th className="p-4 font-semibold text-primary uppercase tracking-wider text-xs">
                              {isEn ? 'Experimental Value' : 'Trị số đo thực nghiệm'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted">
                          <tr className="hover:bg-muted/5">
                            <td className="p-4 font-semibold text-primary/70">
                              {isEn ? 'Flexural / Compressive Strength' : 'Cường độ chịu lực uốn nén (Flexural Strength)'}
                            </td>
                            <td className="p-4 text-primary font-semibold">{techSpecsData.flexuralStrength || '58.4 - 61.0 MPa'}</td>
                          </tr>
                          <tr className="hover:bg-muted/5">
                            <td className="p-4 font-semibold text-primary/70">
                              {isEn ? 'Water Absorption Rate' : 'Tỷ lệ hút nước (Water Absorption)'}
                            </td>
                            <td className="p-4 text-primary font-semibold">{techSpecsData.waterAbsorption || '0.08%'}</td>
                          </tr>
                          <tr className="hover:bg-muted/5">
                            <td className="p-4 font-semibold text-primary/70">
                              {isEn ? 'Density' : 'Khối lượng thể tích (Density)'}
                            </td>
                            <td className="p-4 text-primary font-semibold">{techSpecsData.density || '2.78 - 2.80 g/cm³'}</td>
                          </tr>
                          <tr className="hover:bg-muted/5">
                            <td className="p-4 font-semibold text-primary/70">
                              {isEn ? 'Mohs Hardness Scale' : 'Độ cứng bề mặt (Mohs Hardness Scale)'}
                            </td>
                            <td className="p-4 text-primary font-semibold">{techSpecsData.mohsHardness || '5.5 / 10'}</td>
                          </tr>
                          <tr className="hover:bg-muted/5">
                            <td className="p-4 font-semibold text-primary/70">
                              {isEn ? 'Acid & Chemical Resistance' : 'Khả năng bền hoá chất (Acid Resistance)'}
                            </td>
                            <td className="p-4 text-primary font-semibold">{techSpecsData.acidResistance || (isEn ? 'Permanently resistant' : 'Bền bỉ vĩnh viễn')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'apps' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-heading font-bold text-primary mb-4">
                      {isEn ? 'Key Architectural Applications' : 'Các Hạng Mục Ứng Dụng Hàng Đầu'}
                    </h3>
                    <p className="font-body text-sm text-secondary/90 leading-relaxed mb-6">
                      {isEn 
                        ? 'With its timeless natural texture and weather resilience, this stone is specifically engineered for the following applications:'
                        : 'Nhờ tính thẩm mỹ cao cùng tính năng chống chọi thời tiết tuyệt hảo, dòng sản phẩm này thường được thiết kế để phục vụ cho các hạng mục sau:'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {appsList.map((app, idx) => (
                        <div key={idx} className="border border-muted p-6 rounded-xs bg-muted/5 shadow-xs">
                          <span className="text-accent text-xs font-bold font-body uppercase tracking-wider block mb-2">
                            {isEn ? `Application 0${idx + 1}` : `Hạng mục 0${idx + 1}`}
                          </span>
                          <h4 className="font-heading text-lg font-bold text-primary mb-2">{app}</h4>
                          <p className="font-body text-xs text-secondary/80 leading-relaxed">
                            {isEn 
                              ? 'Delivering exceptional long-term durability, colorfast elegance, and substantial architectural value.'
                              : 'Đảm bảo yêu cầu kỹ thuật thi công lâu dài, bền màu và mang lại giá trị gia tăng cực lớn cho tài sản.'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* 4. Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8 border-t border-muted/50 pt-16">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">{t('related_products')}</h2>
              <p className="font-body text-sm text-secondary/60 mt-1">
                {isEn 
                  ? 'Other premium natural Lai Chau Slate options you may be interested in' 
                  : 'Các tùy chọn đá Slate Lai Châu tự nhiên chất lượng cao khác có thể bạn quan tâm'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relProduct) => {
                const relTitle = isEn ? (relProduct.name_en || relProduct.engTitle || relProduct.title || relProduct.name) : (relProduct.title || relProduct.name);
                const relDesc = isEn ? (relProduct.description_en || relProduct.desc_en || relProduct.desc || relProduct.description) : (relProduct.desc || relProduct.description);
                return (
                  <Link
                    key={relProduct.id}
                    to={`/products/${relProduct.id}`}
                    className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                  >
                    <div className="aspect-square overflow-hidden mb-6 rounded-xs relative">
                      <img 
                        src={relProduct.img || relProduct.image_url} 
                        alt={relTitle} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="flex-grow flex flex-col justify-between text-left">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-[#171717] group-hover:text-accent transition-colors line-clamp-1">
                          {relTitle}
                        </h3>
                        <p className="font-body text-xs text-secondary/80 leading-relaxed mt-2 line-clamp-2">
                          {relDesc}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-accent font-body uppercase tracking-wider text-[10px] font-bold mt-4 border-b border-transparent group-hover:border-accent pb-1 w-fit">
                        {t('view_details')} →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default ProductDetail;
