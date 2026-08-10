import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, ChevronRight, ChevronLeft, Send } from 'lucide-react';
import { getBanners, getPolicy, getProjectsList, getSiteSettings } from '../services/api';
import SEO from '../components/SEO';

const Home = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [banners, setBanners] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    document.title = isEn ? "HT STONE - Lai Chau Natural Slate Quarries" : "HT STONE - Đá Tự Nhiên Lai Châu Cao Cấp";
    async function fetchHomeData() {
      try {
        const data = await getBanners();
        setBanners(data);
        const projData = await getProjectsList();
        setProjects(projData);
        const siteSettings = await getSiteSettings();
        setSettings(siteSettings);
      } catch (err) {
        console.error(err);
      }
    }
    fetchHomeData();
  }, [isEn]);

  const slides = banners.length > 0 ? banners.map(b => ({
    image: b.image_url,
    title: isEn ? (b.title_en || b.title) : b.title,
    subtitle: isEn ? (b.subtitle_en || b.subtitle) : b.subtitle,
    link: b.link_url || '/products'
  })) : [
    {
      image: "https://res.cloudinary.com/ydxroi9a/image/upload/w_1920,f_auto,q_auto/v1784694449/xhcldvnhsangyaor75uz.jpg",
      title: isEn ? "(01) QUARRYING - PROCESSING - SUPPLY - INSTALLATION" : "(1) KHAI THÁC - SẢN XUẤT - PHÂN PHỐI - THI CÔNG",
      subtitle: isEn ? "Owning and operating our own Slate quarries, HT STONE manages every stage-from quarrying and processing to supply and professional installation." : "Sở hữu mỏ đá, HT STONE làm chủ toàn bộ quy trình từ khai thác đến thi công, đảm bảo nguồn cung ổn định và đáp ứng các dự án quy mô lớn.",
      link: "/products"
    }
  ];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="min-h-screen bg-background text-primary">
      <SEO 
        title={isEn ? "Lai Chau Slate Quarry - Premium Black & Multicolor Slate | HT STONE" : "Mỏ Đá Slate Lai Châu - Đá Đen, Đá Đa Sắc Cao Cấp | HT STONE"}
        description={isEn ? "HT STONE owns and operates natural Slate quarries in Lai Chau, Vietnam. Direct quarry supply for roofing, cladding, and paving." : "HT STONE sở hữu mỏ đá Lai Châu khai thác trực tiếp. Chuyên sản xuất, gia công & thi công đá đen Lai Châu, đá đa sắc lợp mái, ốp tường, lát sân vườn tự nhiên cao cấp toàn quốc."}
        keywords="mỏ đá, đá đen, đá lai châu, đá cao cấp, đá đen lai châu, mỏ đá lai châu, đá tự nhiên cao cấp, đá ốp tường, đá lợp mái, đá lát sân vườn, đá slate lai châu, ht stone, modalaichau"
        canonical="/"
      />
      
      {/* 1. Hero Banner (Slideshow) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Slides */}
        {slides.map((slide, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20 z-10"></div>

        {/* Hero Content & Controls */}
        <div className="absolute bottom-16 left-0 right-0 z-20 w-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            {/* Slide Info */}
            <div className="text-left max-w-2xl animate-fade-in-up">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 tracking-wide leading-snug">
                {slides[currentSlide]?.title || ''}
              </h2>
              <p className="font-body text-xs md:text-sm text-gray-300 font-light tracking-wider leading-relaxed">
                {slides[currentSlide]?.subtitle || ''}
              </p>
            </div>

            {/* Slide Controls */}
            <div className="flex items-center gap-6 text-white font-body shrink-0">
              <span className="text-xs font-semibold tracking-widest text-gray-300">
                {`0${currentSlide + 1} / 0${slides.length}`}
              </span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Về Chúng Tôi (Google Sheet Content) */}
      <section className="py-20 md:py-28 lg:py-36 bg-background text-left">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[1px] bg-accent"></div>
                <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">
                  {isEn ? 'ABOUT US' : 'VỀ CHÚNG TÔI'}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-light text-primary leading-tight">
                {isEn ? 'Owning the Finest Lai Chau Slate at the Source' : (settings?.home_intro_title || 'Làm Chủ Nguồn Đá Slate Tự Nhiên Từ Lai Châu')}
              </h2>
              
              <p className="font-body text-sm md:text-base text-secondary leading-relaxed whitespace-pre-wrap">
                {isEn 
                  ? 'HT STONE owns and operates natural Slate quarries in Lai Chau, supplying two signature collections: Black Slate and Multicolor Slate. By controlling the stone at its source, we ensure consistent quality, reliable supply, and complete quality control from quarrying onward. With exceptionally low water absorption, outstanding durability, and the authentic beauty of natural stone, Lai Chau Slate is an ideal choice for roofing, wall cladding, and paving applications. From quarrying and processing to supply and installation, HT STONE delivers complete natural stone solutions for projects of every scale.'
                  : (settings?.home_intro_desc || 'HT STONE sở hữu mỏ đá Slate tự nhiên tại Lai Châu, cung cấp hai dòng sản phẩm chính là đá Slate đen và đá Slate đa sắc. Việc làm chủ nguồn đá giúp chúng tôi kiểm soát chất lượng ngay từ khâu khai thác và đảm bảo nguồn cung ổn định cho các dự án. Với độ hút nước thấp, kết cấu bền chắc và vẻ đẹp nguyên bản của đá tự nhiên, Slate Lai Châu là lựa chọn phù hợp cho các hạng mục lợp mái, ốp tường và lát nền. HT STONE đồng hành cùng khách hàng từ khai thác – sản xuất – phân phối – thi công, mang đến giải pháp đá tự nhiên trọn gói.')}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-muted/70">
                <div>
                  <h4 className="font-heading text-2xl md:text-3xl font-bold text-accent mb-1">100%</h4>
                  <p className="font-body text-[10px] md:text-xs uppercase font-semibold text-secondary">
                    {isEn ? 'Natural Solid Slate' : 'Đá Tự Nhiên Nguyên Khối'}
                  </p>
                </div>
                <div>
                  <h4 className="font-heading text-2xl md:text-3xl font-bold text-accent mb-1">≈0.04%</h4>
                  <p className="font-body text-[10px] md:text-xs uppercase font-semibold text-secondary">
                    {isEn ? 'Ultra-Low Water Absorption' : 'Độ Hút Nước Cực Thấp'}
                  </p>
                </div>
                <div>
                  <h4 className="font-heading text-2xl md:text-3xl font-bold text-accent mb-1">{isEn ? 'Millions' : 'Hàng triệu năm'}</h4>
                  <p className="font-body text-[10px] md:text-xs uppercase font-semibold text-secondary">
                    {isEn ? 'Shaped by Nature' : 'Kiến Tạo Bởi Tự Nhiên'}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/about" className="inline-flex items-center gap-2 text-accent font-body uppercase tracking-wider text-xs font-bold hover:text-primary transition-colors border-b border-accent pb-1">
                  {isEn ? 'Discover our story' : 'Khám phá hành trình'} <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] overflow-hidden border border-muted/50 rounded-sm shadow-2xl">
                <img 
                  src="https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694456/vfdzgkygfdtwfp2eeoj8.jpg" 
                  alt="Mỏ đá Lai Châu kết cấu địa chất" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Danh Mục Sản Phẩm (Google Sheet Categories) */}
      <section className="py-20 md:py-28 lg:py-36 bg-muted/20 border-y border-muted text-left">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-[1px] bg-accent"></div>
                <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">
                  {isEn ? 'PRODUCT CATEGORY' : 'DANH MỤC SẢN PHẨM'}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-light text-primary">
                {isEn ? 'Lai Chau Slate' : 'Đá Slate Lai Châu'}
              </h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-secondary font-body uppercase tracking-wider text-xs font-bold hover:text-accent transition-colors pb-1 border-b border-secondary hover:border-accent">
              {isEn ? 'View all products' : 'Xem tất cả sản phẩm'} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              {
                title: isEn ? "1. Black Slate Roofing" : "1. Đá Slate Đen Lợp Mái",
                desc: isEn ? "Natural Black Slate in rectangular, fish scale, hexagonal profiles. Low water absorption & lasting color stability." : "Đá Slate đen tự nhiên với nhiều kiểu dáng như chữ nhật, vảy cá, lục giác... Độ hút nước thấp, bền màu và phù hợp cho mái biệt thự, resort.",
                img: "https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694444/cap5xlp4lzlzh5ca8zv2.jpg",
                filter: "da-den-lop-mai"
              },
              {
                title: isEn ? "2. Black Slate Cladding & Paving" : "2. Đá Slate Đen Ốp Lát",
                desc: isEn ? "Suitable for wall cladding, courtyards, pathways. Slip-resistant surface balancing rustic charm with sophistication." : "Đá Slate đen dùng cho ốp tường, lát sân và lối đi. Bề mặt tự nhiên, chống trơn trượt, chịu thời tiết tốt và mang vẻ đẹp sang trọng.",
                img: "https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694419/khg9fw7wkqnqssrksraj.jpg",
                filter: "da-den-op-lat"
              },
              {
                title: isEn ? "3. Multicolor Slate Roofing" : "3. Đá Slate Đa Sắc Lợp Mái",
                desc: isEn ? "A harmonious blend of natural colors creating one-of-a-kind slate roofs celebrating authentic architecture." : "Sự hòa quyện của những gam màu tự nhiên tạo nên mái đá độc bản, tôn vinh vẻ đẹp tự nhiên, là dấu ấn riêng cho từng công trình.",
                img: "https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694413/eacdckyeft9xsvbfszpb.jpg",
                filter: "da-da-sac-lop-mai"
              },
              {
                title: isEn ? "4. Multicolor Slate Cladding & Paving" : "4. Đá Slate Đa Sắc Ốp Lát",
                desc: isEn ? "Designed for wall cladding, paving, and landscape applications with naturally balanced warm tones." : "Đá Slate đa sắc dùng cho ốp tường, lát sân và cảnh quan. Màu sắc tự nhiên hài hòa, bền chắc cho cả nội và ngoại thất.",
                img: "https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694413/eacdckyeft9xsvbfszpb.jpg",
                filter: "da-da-sac-op-lat"
              },
              {
                title: isEn ? "5. Natural Random Slate" : "5. Đá Rối Tự Nhiên",
                desc: isEn ? "Ideal for wall cladding, retaining walls, garden paving, and decorative architectural features." : "Đá Slate rối phù hợp ốp tường, kè cảnh quan, lát sân vườn và các hạng mục trang trí ngoài trời lẫn trong nhà.",
                img: "https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694459/cbxamzsfpfvto5g5hi4q.jpg",
                filter: "da-trang-tri"
              }
            ].map((cat, idx) => (
              <Link 
                key={idx} 
                to="/products"
                state={{ filter: cat.filter }}
                className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden mb-4 rounded-xs border border-muted/50">
                    <img 
                      src={cat.img} 
                      alt={cat.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-base font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {cat.title}
                  </h3>
                  <p className="font-body text-xs text-secondary/80 leading-relaxed line-clamp-3 mb-4">
                    {cat.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-accent font-body uppercase tracking-wider text-[11px] font-bold border-b border-transparent group-hover:border-accent pb-0.5 w-fit">
                  {isEn ? 'View Category' : 'Xem danh mục'} <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ứng Dụng (Google Sheet Applications) */}
      <section className="py-20 md:py-28 lg:py-36 bg-background text-left">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-[1px] bg-accent"></div>
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">
                {isEn ? 'APPLICATIONS' : 'ỨNG DỤNG'}
              </span>
              <div className="w-10 h-[1px] bg-accent"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-light text-primary">
              {isEn ? 'Architectural Applications' : 'Ứng Dụng Thi Công Đá Tự Nhiên'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: isEn ? "Natural Slate Roofing" : "Mái Đá Tự Nhiên",
                desc: isEn ? "Increasingly chosen for premium architectural projects, Lai Chau Slate roofing offers exceptional durability, timeless beauty, and an elegant finish." : "Ngày càng nhiều công trình cao cấp lựa chọn mái đá Slate Lai Châu là vật liệu không thể thay thế bởi độ bền bỉ, vẻ đẹp tự nhiên.",
                img: "https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694444/cap5xlp4lzlzh5ca8zv2.jpg"
              },
              {
                title: isEn ? "Facades & Feature Walls" : "Ốp Mặt Tiền & Vách Nghệ Thuật",
                desc: isEn ? "Create architectural depth and visual impact with the authentic texture of natural Slate, bringing strength and sophistication." : "Tôn lên chiều sâu kiến trúc với bề mặt đá tự nhiên, mạnh mẽ, tinh tế và đầy dấu ấn.",
                img: "https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694413/eacdckyeft9xsvbfszpb.jpg"
              },
              {
                title: isEn ? "Paving & Pathways" : "Lát Nền & Lối Đi",
                desc: isEn ? "Complete outdoor living spaces with durable natural stone that combines safety, resilience, and harmony with the landscape." : "Hoàn thiện không gian ngoại thất bằng vật liệu tự nhiên bền chắc, an toàn và hài hòa với cảnh quan.",
                img: "https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694425/p3mrfgfx1g0v5vihwj5i.jpg"
              }
            ].map((app, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden aspect-[4/5] border border-muted/50 rounded-sm shadow-md hover:shadow-2xl transition-all duration-500 bg-black"
              >
                <img 
                  src={app.img} 
                  alt={app.title} 
                  className="w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-20">
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                    {app.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                    {app.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Công Trình (Google Sheet Project Portfolio) */}
      <section className="py-20 md:py-28 lg:py-36 bg-muted/20 border-y border-muted text-left">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-[1px] bg-accent"></div>
                <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">
                  {isEn ? 'PROJECT PORTFOLIO' : 'DANH SÁCH DỰ ÁN'}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-light text-primary">
                {isEn ? 'Featured Projects' : 'Công Trình Tiêu Biểu'}
              </h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-secondary font-body uppercase tracking-wider text-xs font-bold hover:text-accent transition-colors pb-1 border-b border-secondary hover:border-accent">
              {isEn ? 'View More Projects' : 'XEM THÊM DỰ ÁN'} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {(projects.length > 0 ? projects.slice(0, 4) : []).map((proj, idx) => (
              <Link 
                key={proj.id || idx} 
                to={`/projects/${proj.id || proj.slug}`}
                className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-400 block"
              >
                <div className="aspect-[4/3] overflow-hidden border border-muted/50 rounded-xs mb-4 relative">
                  <img 
                    src={proj.img || proj.image_url} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                  />
                </div>
                <h4 className="font-heading font-bold text-base text-primary mb-1 group-hover:text-accent transition-colors line-clamp-1">
                  {isEn ? (proj.title_en || proj.title) : proj.title}
                </h4>
                <p className="font-body text-xs text-secondary/80 line-clamp-1">
                  {proj.desc || proj.scale || proj.location}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/projects" className="inline-flex items-center justify-center px-10 py-3.5 border border-accent text-accent font-body uppercase tracking-wider text-xs font-bold hover:bg-accent hover:text-surface transition-all duration-400">
              {isEn ? 'VIEW MORE PROJECTS' : 'XEM THÊM DỰ ÁN'}
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Form Liên Hệ Báo Giá Trực Tiếp Từ Mỏ (Google Sheet Section 6) */}
      <section className="py-20 md:py-28 lg:py-36 bg-background text-left">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-surface border border-muted p-8 md:p-12 rounded-sm shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">
                {isEn ? 'GET IN TOUCH' : 'LIÊN HỆ TRỰC TIẾP'}
              </span>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary mt-2 mb-4">
                {isEn ? 'Request a Consultation & Quarry-Direct Quotation' : 'Nhận Tư Vấn & Báo Giá Trực Tiếp Từ Mỏ'}
              </h2>
              <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                {isEn 
                  ? 'Leave your information, and the HT STONE team will contact you promptly with tailored natural stone solutions, product catalogues, project quotations, and professional technical support.'
                  : 'Để lại thông tin, đội ngũ HT STONE sẽ liên hệ trong thời gian sớm nhất để tư vấn giải pháp đá tự nhiên phù hợp, gửi catalogue, báo giá và hỗ trợ kỹ thuật cho dự án của bạn.'}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert(isEn ? 'Thank you! The HT STONE team will contact you shortly.' : 'Cảm ơn bạn! Đội ngũ HT STONE sẽ liên hệ tư vấn ngay.'); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs uppercase font-bold text-secondary mb-1">{isEn ? 'Full Name *' : 'Họ và tên *'}</label>
                <input type="text" required placeholder={isEn ? 'e.g. John Smith' : 'Ví dụ: Nguyễn Văn A'} className="w-full bg-background border border-muted px-4 py-3 text-xs text-primary focus:outline-none focus:border-accent" />
              </div>

              <div>
                <label className="block font-body text-xs uppercase font-bold text-secondary mb-1">{isEn ? 'Phone Number *' : 'Số điện thoại *'}</label>
                <input type="tel" required placeholder={isEn ? 'e.g. 0909168587' : 'Ví dụ: 0909168587'} className="w-full bg-background border border-muted px-4 py-3 text-xs text-primary focus:outline-none focus:border-accent" />
              </div>

              <div className="md:col-span-2">
                <label className="block font-body text-xs uppercase font-bold text-secondary mb-1">{isEn ? 'Email' : 'Địa chỉ Email'}</label>
                <input type="email" placeholder="info@example.com" className="w-full bg-background border border-muted px-4 py-3 text-xs text-primary focus:outline-none focus:border-accent" />
              </div>

              <div className="md:col-span-2">
                <label className="block font-body text-xs uppercase font-bold text-secondary mb-1">{isEn ? 'Project Details / Request' : 'Nội dung cần tư vấn (Loại đá, diện tích, quy cách...)'}</label>
                <textarea rows={3} placeholder={isEn ? 'Enter your inquiry...' : 'Nhập chi tiết yêu cầu...'} className="w-full bg-background border border-muted px-4 py-3 text-xs text-primary focus:outline-none focus:border-accent"></textarea>
              </div>

              <div className="md:col-span-2 text-center pt-2">
                <button type="submit" className="inline-flex items-center gap-2 bg-accent text-surface px-10 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400">
                  <Send size={14} /> {isEn ? 'SEND REQUEST' : 'GỬI YÊU CẦU BÁO GIÁ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
