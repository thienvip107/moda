import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, Play, ChevronRight, ChevronLeft, Gem, Truck, Hammer, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getBanners, getPolicy, getProjectsList } from '../services/api';
import SEO from '../components/SEO';

const Home = () => {
  const { t } = useTranslation();
  const [banners, setBanners] = useState([]);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.title = "HT STONE - Đá Tự Nhiên Lai Châu Cao Cấp";
    async function fetchHomeData() {
      try {
        const data = await getBanners();
        setBanners(data);
        const policyData = await getPolicy('company_profile');
        setProfile(policyData);
        const projData = await getProjectsList();
        setProjects(projData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchHomeData();
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
      <SEO 
        title="Mỏ Đá Slate Lai Châu - Đá Đen, Đá Đa Sắc Cao Cấp | HT STONE"
        description="HT STONE sở hữu mỏ đá Lai Châu khai thác trực tiếp. Chuyên sản xuất, gia công & thi công đá đen Lai Châu, đá đa sắc lợp mái, ốp tường, lát sân vườn tự nhiên cao cấp toàn quốc. Báo giá tận mỏ."
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
                {profile?.title ? (
                  profile.title
                ) : (
                  <>
                    Di Sản Đá Tự Nhiên <br />
                    <span className="font-bold">Lai Châu Trường Tồn</span>
                  </>
                )}
              </h2>
              {profile?.content ? (
                <div 
                  className="font-body text-base md:text-lg text-secondary leading-relaxed space-y-4 prose prose-neutral max-w-none"
                  dangerouslySetInnerHTML={{ __html: profile.content }}
                />
              ) : (
                <p className="font-body text-base md:text-lg text-secondary leading-relaxed">
                  Được hình thành từ hàng triệu năm kiến tạo địa chất, đá Slate Lai Châu sở hữu độ bền vĩnh cửu cùng vẻ đẹp thô mộc, độc bản. HT STONE tự hào là đơn vị sở hữu mỏ và chế tác đá tự nhiên Lai Châu hàng đầu Việt Nam, mang tinh hoa của núi rừng Tây Bắc vào các công trình kiến trúc đẳng cấp toàn quốc.
                </p>
              )}
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
            {(projects.length > 0 ? projects.slice(0, 4) : [
              {
                id: 'vinhomes-riverside',
                title: "Vinhomes Riverside Villa",
                desc: "Đá ốp vách trang trí & Lát sân vườn",
                img: "/assets/img/project_1.jpg"
              },
              {
                id: 'amanoi-resort',
                title: "Amanoi Resort Ninh Thuận",
                desc: "Đá lát lối đi & Quanh hồ bơi cao cấp",
                img: "/assets/img/project_2.jpg"
              },
              {
                id: 'hotel-de-la-coupole',
                title: "Hotel de la Coupole Sapa",
                desc: "Mái ngói đá đen tự nhiên Lai Châu",
                img: "/assets/img/project_3.jpg"
              },
              {
                id: 'biet-thu-tay-ho',
                title: "Biệt thự cổ điển Tây Hồ",
                desc: "Ốp cột đá đa sắc & Lát sảnh đón",
                img: "/assets/img/project_4.jpg"
              }
            ]).map((proj, idx) => (
              <Link 
                key={proj.id || idx} 
                to={`/projects/${proj.id || proj.slug}`}
                className="group bg-surface border border-muted p-3 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400 block text-left"
              >
                <div className="aspect-square overflow-hidden border border-muted/50 rounded-xs mb-4 relative">
                  <img 
                    src={proj.img || proj.image_url} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className="font-heading font-bold text-lg text-primary mb-1 group-hover:text-accent transition-colors line-clamp-1">
                  {proj.title}
                </h4>
                <p className="font-body text-xs text-secondary/80 line-clamp-1">
                  {proj.desc || proj.scale || proj.location || 'Đá ốp lát & lợp mái Lai Châu'}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/projects" className="inline-flex items-center justify-center px-10 py-4 border border-accent text-accent font-body uppercase tracking-wider text-xs font-bold hover:bg-accent hover:text-surface transition-all duration-400">
              Khám Phá Toàn Bộ Dự Án
            </Link>
          </div>
        </div>
      </section>

      {/* 6.5. SEO Rich Content Section (Dành cho Google Index & Tìm kiếm Từ khóa Ngành) */}
      <section className="py-16 md:py-24 bg-surface border-t border-b border-muted/60">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center">
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Tổng Quan Sản Phẩm & Mỏ Khai Thác</span>
              <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mt-2">
                Mỏ Đá Slate Lai Châu - <span className="font-bold">Đá Đen & Đá Đa Sắc Cao Cấp</span>
              </h2>
              <div className="w-16 h-[2px] bg-accent mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base text-secondary leading-relaxed">
              <div className="space-y-4 bg-background p-6 rounded-sm border border-muted/50">
                <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                  <ShieldCheck className="text-accent" size={20} /> Mỏ Đá Lai Châu Khai Thác Trực Tiếp
                </h3>
                <p>
                  <strong>HT STONE (Modalaichau)</strong> sở hữu và vận hành trực tiếp <strong>mỏ đá Lai Châu</strong> tại Phong Thổ. Chúng tôi là nhà khai thác & chế tác chuyên nghiệp các dòng <strong>đá đen Lai Châu</strong>, <strong>đá đa sắc Lai Châu</strong> và <strong>đá slate tự nhiên cao cấp</strong> không qua trung gian.
                </p>
                <p>
                  Cam kết mang đến <strong>báo giá đá Lai Châu tận mỏ</strong> cạnh tranh nhất, cắt chẻ đá theo quy cách yêu cầu (15x30, 20x30, 30x60, đá rối, đá vảy cá) phục vụ các dự án toàn quốc.
                </p>
              </div>

              <div className="space-y-4 bg-background p-6 rounded-sm border border-muted/50">
                <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                  <Gem className="text-accent" size={20} /> Đá Đen Lợp Mái & Đá Ốp Lát Sân Vườn
                </h3>
                <p>
                  Dòng <strong>đá đen lợp mái biệt thự</strong> nổi tiếng với cấu trúc thớ đá chặt chẽ, độ hút nước &lt;0.08%, không phát sinh rêu mốc và độ bền trên 100 năm. Các kiểu dáng <strong>ngói đá vảy cá</strong>, <strong>đá lợp mái lục giác</strong> đem lại vẻ đẹp đẳng cấp vượt thời gian cho kiến trúc biệt thự, lâu đài.
                </p>
                <p>
                  Đối với hạng mục cảnh quan, <strong>đá đen lát sân vườn</strong> chẻ thô tự nhiên mang đặc tính chống trơn trượt tuyệt đối, chịu tải trọng lớn, chuyên dùng lát vỉa hè, lối đi sân vườn, resort và hồ bơi sang trọng.
                </p>
              </div>
            </div>

            {/* Các Từ Khóa Tìm Kiếm Thường Gặp Ngành Đá */}
            <div className="pt-6 border-t border-muted/40">
              <h3 className="font-heading font-bold text-lg text-primary mb-4 text-center">
                Từ Khóa Tìm Kiếm Báo Giá & Dịch Vụ Đá Tự Nhiên Lai Châu
              </h3>
              <div className="flex flex-wrap justify-center gap-2 text-xs font-body text-secondary">
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Báo giá đá đen Lai Châu</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Báo giá đá slate lợp mái</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Đá đen ốp tường mặt tiền</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Đá lát sân vườn 30x60</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Đá đa sắc Lai Châu ốp chân tường</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Ngói đá vảy cá biệt thự</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Đá chẻ tay thủ công</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Mua đá slate Lai Châu ở đâu</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Kỹ thuật lợp mái đá tự nhiên</span>
                <span className="bg-background border border-muted px-3 py-1 rounded-full">Đá lát lối đi chống trơn</span>
              </div>
            </div>

            <div className="bg-muted/20 p-6 md:p-8 rounded-sm border border-accent/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="font-heading font-bold text-primary text-base md:text-lg">
                  Bạn đang tìm bảng báo giá Đá Đen, Đá Đa Sắc Lai Châu tận mỏ?
                </h4>
                <p className="font-body text-xs md:text-sm text-secondary">
                  Cung cấp đầy đủ chứng nhận CO/CQ, gửi mẫu đá tận nơi và tư vấn phương án thi công lợp mái đá trọn gói.
                </p>
              </div>
              <Link to="/products" className="bg-accent text-surface px-6 py-3 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all whitespace-nowrap">
                Xem Bảng Giá & Danh Mục Đá
              </Link>
            </div>
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
