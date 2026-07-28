import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, Play, ChevronRight, ChevronLeft, Gem, Truck, Hammer } from 'lucide-react';
import { getBanners } from '../services/api';

const Home = () => {
  const { t } = useTranslation();
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.title = "HT STONE - Đá Tự Nhiên Lai Châu Cao Cấp";
    async function fetchBanners() {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBanners();
  }, []);

  const slides = banners.length > 0 ? banners.map(b => ({
    image: b.image_url,
    title: b.title,
    subtitle: b.subtitle,
    link: b.link_url || '/products'
  })) : [
    {
      image: "/assets/img/slide_1.jpg",
      title: "ĐÁ SLATE LAI CHÂU TỰ NHIÊN High-End",
      subtitle: "Giải pháp ốp lát & lợp mái cao cấp trường tồn theo thời gian",
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
        
        {/* Subtle bottom vignette overlay for text readability (no general blur, no heavy gray tint) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10"></div>

        {/* Minimalist Info & Control Bar (Salvatori Style) */}
        <div className="absolute bottom-16 left-0 right-0 z-20 w-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            {/* Slide Info (Bottom Left) */}
            <div className="text-left max-w-xl animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-3 tracking-wide leading-relaxed">
                {slides[currentSlide]?.title || ''}
              </h2>
              <p className="font-body text-sm md:text-base text-gray-300 font-light tracking-wider leading-relaxed">
                {slides[currentSlide]?.subtitle || ''}
              </p>
            </div>


            {/* Slide Controls & Indicator (Bottom Right) */}
            <div className="flex items-center gap-6 text-white font-body">
              {/* Pagination */}
              <span className="text-sm font-semibold tracking-widest text-gray-300">
                {`0${currentSlide + 1} / 0${slides.length}`}
              </span>
              
              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary hover:border-white transition-all duration-300"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary hover:border-white transition-all duration-300"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Về HT STONE */}
      <section className="py-20 md:py-28 lg:py-36 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-accent"></div>
                <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Về Chúng Tôi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-light text-primary leading-relaxed">
                Di Sản Đá Tự Nhiên <br />
                <span className="font-bold">Lai Châu Trường Tồn</span>
              </h2>
              <p className="font-body text-base md:text-lg text-secondary leading-relaxed">
                Được hình thành từ hàng triệu năm kiến tạo địa chất, đá Slate Lai Châu sở hữu độ bền vĩnh cửu cùng vẻ đẹp thô mộc, độc bản. HT STONE tự hào là đơn vị sở hữu mỏ và chế tác đá tự nhiên Lai Châu hàng đầu Việt Nam, mang tinh hoa của núi rừng Tây Bắc vào các công trình kiến trúc đẳng cấp toàn quốc.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-muted">
                <div>
                  <h4 className="font-heading text-3xl font-bold text-accent mb-1">100%</h4>
                  <p className="font-body text-xs uppercase tracking-wider text-secondary">Đá Tự Nhiên Nguyên Khối</p>
                </div>
                <div>
                  <h4 className="font-heading text-3xl font-bold text-accent mb-1">15+ Năm</h4>
                  <p className="font-body text-xs uppercase tracking-wider text-secondary">Kinh Nghiệm Khai Thác & Chế Tác</p>
                </div>
              </div>
              <div className="pt-4">
                <Link to="/about" className="inline-flex items-center gap-2 text-accent font-body uppercase tracking-wider text-sm font-semibold hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
                  Khám phá hành trình <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl border border-muted/50 rounded-sm">
                <img 
                  src="/assets/img/about_stone.jpg" 
                  alt="Slab stone detail" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-36 h-36 md:w-48 md:h-48 bg-surface border border-muted p-4 md:p-6 flex flex-col justify-center items-center text-center shadow-xl">
                <span className="text-2xl md:text-4xl font-heading font-bold text-accent mb-1 md:mb-2">500+</span>
                <span className="font-body text-[10px] md:text-xs uppercase tracking-wider text-secondary">Dự Án Đã Bàn Giao</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Bộ Sưu Tập Sản Phẩm (Slabstone.vn Category Slider Style) */}
      <section className="py-20 md:py-28 lg:py-36 bg-muted/20 border-y border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-accent"></div>
                <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Danh Mục</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-light text-primary">
                Bộ Sưu Tập <span className="font-bold">Đá Slate Lai Châu</span>
              </h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-secondary font-body uppercase tracking-wider text-sm font-semibold hover:text-accent transition-colors pb-2 border-b border-transparent hover:border-accent">
              Xem tất cả sản phẩm <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Đá Đen Lợp Mái",
                desc: "Ngói đá đen tự nhiên hình vảy cá, chữ nhật, mũi hài... bền bỉ vĩnh cửu ngoài trời.",
                img: "/assets/img/roofing_slate.jpg",
                filter: "da-den-lop-mai"
              },
              {
                title: "Đá Đen Ốp Lát",
                desc: "Đá lát nền sân vườn chống trơn và đá quy cách ốp tường trang trí đẳng cấp.",
                img: "/assets/img/paving_slate.jpg",
                filter: "da-den-op-lat"
              },
              {
                title: "Đá Đa Sắc Lợp Mái",
                desc: "Ngói phối sắc tự nhiên rực rỡ, mang phong cách lâu đài biệt thự Châu Âu cổ kính.",
                img: "/assets/img/multicolor_slate.jpg",
                filter: "da-da-sac-lop-mai"
              },
              {
                title: "Đá Đa Sắc Ốp Lát",
                desc: "Đá lát sân vườn & ốp tường mặt tiền phối màu đa sắc sinh động dưới nắng.",
                img: "/assets/img/wall_cladding.jpg",
                filter: "da-da-sac-op-lat"
              },
              {
                title: "Đá Trang Trí",
                desc: "Đá rối tự do, đá ghép 3D tạo điểm nhấn mộc mạc nghệ thuật cho tiểu cảnh sân vườn.",
                img: "/assets/img/project_1.jpg",
                filter: "da-trang-tri"
              }
            ].map((cat, idx) => (
              <Link 
                key={idx} 
                to="/products"
                state={{ filter: cat.filter }}
                className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="aspect-square overflow-hidden mb-6 rounded-xs relative">
                  <img 
                    src={cat.img} 
                    alt={cat.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-body text-xs text-secondary/80 leading-relaxed mb-6">
                      {cat.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-accent font-body uppercase tracking-wider text-xs font-bold mt-auto border-b border-transparent group-hover:border-accent pb-1 w-fit">
                    Chi tiết <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ứng Dụng Thiết Kế (Slabstone.vn Application Section Style) */}
      <section className="py-20 md:py-28 lg:py-36 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-accent"></div>
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Phong Cách Sống</span>
              <div className="w-12 h-[1px] bg-accent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-primary mb-6">
              Không Gian <span className="font-bold">Kiến Trúc Sang Trọng</span>
            </h2>
            <p className="font-body text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Giải pháp đá tự nhiên hoàn thiện cho ngoại thất trường tồn và không gian sống mang hơi thở nghệ thuật.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Mái Đá Biệt Thự",
                desc: "Mang vẻ đẹp vương giả cổ điển cho mái biệt thự, lâu đài với ngói đá đen Lai Châu tự nhiên, chịu mưa nắng vĩnh cửu.",
                img: "/assets/img/slide_2.jpg"
              },
              {
                title: "Ốp Mặt Tiền & Vách Nghệ Thuật",
                desc: "Tạo ấn tượng mạnh mẽ cho không gian phòng khách, sảnh đón với những bức tường ốp đá thẻ, đá vân băm thô ráp tinh tế.",
                img: "/assets/img/wall_cladding.jpg"
              },
              {
                title: "Lát Nền Lối Đi & Hồ Bơi",
                desc: "Đá tự nhiên nguyên bản chống rêu mốc, chống trơn trượt tối ưu cho sân vườn biệt thự resort cao cấp.",
                img: "/assets/img/slide_3.jpg"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full z-20 text-left">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    {app.title}
                  </h3>
                  <p className="font-body text-sm text-gray-300 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {app.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-accent font-body uppercase tracking-wider text-xs font-bold border-b border-transparent group-hover:border-accent pb-1 w-fit">
                    Chi tiết ứng dụng <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dự Án Tiêu Biểu (Slabstone.vn Project Showcase Style) */}
      <section className="py-20 md:py-28 lg:py-36 bg-muted/20 border-y border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-accent"></div>
                <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Tuyệt Tác</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-light text-primary">
                Công Trình <span className="font-bold">HT STONE Tiêu Biểu</span>
              </h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-secondary font-body uppercase tracking-wider text-sm font-semibold hover:text-accent transition-colors pb-2 border-b border-transparent hover:border-accent">
              Xem toàn bộ dự án <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {[
              {
                title: "Vinhomes Riverside Villa",
                type: "Đá ốp vách trang trí & Lát sân vườn",
                img: "/assets/img/project_1.jpg"
              },
              {
                title: "Amanoi Resort Ninh Thuận",
                type: "Đá lát lối đi & Quanh hồ bơi cao cấp",
                img: "/assets/img/project_2.jpg"
              },
              {
                title: "Hotel de la Coupole Sapa",
                type: "Mái ngói đá đen tự nhiên Lai Châu",
                img: "/assets/img/project_3.jpg"
              },
              {
                title: "Biệt thự cổ điển Tây Hồ",
                type: "Ốp cột đá đa sắc & Lát sảnh đón",
                img: "/assets/img/project_4.jpg"
              }
            ].map((proj, idx) => (
              <div 
                key={idx} 
                className="group bg-surface border border-muted p-3 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400"
              >
                <div className="aspect-square overflow-hidden border border-muted/50 rounded-xs mb-4 relative">
                  <img 
                    src={proj.img} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className="font-heading font-bold text-lg text-primary mb-1 group-hover:text-accent transition-colors">
                  {proj.title}
                </h4>
                <p className="font-body text-xs text-secondary/80">
                  {proj.type}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/projects" className="inline-flex items-center justify-center px-10 py-4 border border-accent text-accent font-body uppercase tracking-wider text-xs font-bold hover:bg-accent hover:text-surface transition-all duration-400">
              Khám Phá Toàn Bộ Dự Án
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CTA / Contact */}
      <section className="py-20 md:py-28 lg:py-36 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full text-muted/30 pointer-events-none opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <polygon points="100,0 100,100 0,100" fill="currentColor"></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-light text-primary mb-6">
            Kiến Tạo Không Gian <span className="font-bold">Đẳng Cấp?</span>
          </h2>
          <p className="font-body text-secondary text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
            Liên hệ ngay với các chuyên gia của HT STONE để nhận tư vấn kỹ thuật chi tiết về đá Lai Châu và bảng báo giá gốc tại mỏ.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/contact" className="bg-accent text-surface px-10 py-4 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary hover:text-surface transition-all duration-400">
              Đăng Ký Tư Vấn & Báo Giá
            </Link>
            <a href="/catalogue.pdf" className="flex items-center justify-center gap-2 border border-primary/20 text-primary px-10 py-4 font-body uppercase tracking-wider text-xs font-bold hover:border-accent hover:text-accent transition-all duration-400">
              <Download size={16} /> Tải Xuống Catalogue
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
