import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Award, Shield, Cpu, Leaf, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPolicy } from '../services/api';

const About = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    document.title = "Về chúng tôi | HT STONE - Đá Tự Nhiên Lai Châu";
    async function fetchProfile() {
      try {
        const data = await getPolicy('company_profile');
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  return (
    <main className="min-h-screen bg-background text-primary pt-24">
      {/* 1. Page Header */}
      <section className="py-20 lg:py-28 bg-muted/20 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{t('about')}</span>
            <div className="w-12 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-primary leading-relaxed">
            {profile?.title || 'Hành Trình Kiến Tạo Giá Trị Vĩnh Cửu'}
          </h1>
        </div>
      </section>

      {/* 2. Brand Story Split-Pane */}
      <section className="py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] overflow-hidden border border-muted/50 rounded-sm shadow-xl">
                <img 
                  src="/assets/img/about_stone.jpg" 
                  alt="HT Stone Quarry" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-surface border border-muted p-6 shadow-xl hidden md:block">
                <p className="font-heading text-2xl font-bold text-accent">Khai thác trực tiếp</p>
                <p className="font-body text-xs uppercase tracking-wider text-secondary">Tại mỏ đá Lai Châu</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Câu Chuyện Của Chúng Tôi</span>
              <h2 className="text-3xl md:text-4xl font-heading font-light leading-relaxed">
                Đá Tự Nhiên Lai Châu - <br />
                <span className="font-bold">Món Quà Từ Lòng Đất</span>
              </h2>

              {profile?.content ? (
                <div 
                  className="font-body text-base text-secondary leading-relaxed space-y-4 prose prose-neutral"
                  dangerouslySetInnerHTML={{ __html: profile.content }}
                />
              ) : (
                <>
                  <p className="font-body text-base text-secondary leading-relaxed">
                    Được tích tụ và biến đổi qua hàng trăm triệu năm dưới áp lực địa chất khổng lồ của dãy Hoàng Liên Sơn, đá Slate Lai Châu mang trong mình cấu trúc thớ lớp đặc biệt, độ cứng tuyệt đối và khả năng chống chịu thời tiết khắc nghiệt tối đa.
                  </p>
                  <p className="font-body text-base text-secondary leading-relaxed">
                    Tại HT STONE, chúng tôi không chỉ khai thác đá; chúng tôi nâng niu từng thớ đá tự nhiên độc bản để tạo nên các tác phẩm nghệ thuật kiến trúc bền vững qua nhiều thế hệ.
                  </p>
                </>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 3. Craftsmanship and Quality (Process) */}
      <section className="py-20 md:py-24 lg:py-32 bg-muted/20 border-y border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Phương Pháp Chế Tác</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-primary mt-2">
              Kỹ Nghệ Chẻ Tay <span className="font-bold">Thủ Công Truyền Thống</span>
            </h2>
            <p className="font-body text-secondary text-base mt-4 max-w-xl mx-auto leading-relaxed">
              Mỗi viên đá Slate Lai Châu của HT STONE đều được chẻ tay hoàn toàn bởi những nghệ nhân đá lành nghề để giữ lại vân đá tự nhiên gồ ghề, độc bản nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface border border-muted p-8 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400">
              <Award className="text-accent mb-6" size={36} strokeWidth={1.5} />
              <h3 className="text-2xl font-heading font-bold mb-3">Chất Lượng Thượng Hạng</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                100% đá tự nhiên được chọn lọc kỹ lưỡng từ các vỉa đá chất lượng tốt nhất Lai Châu, loại bỏ các viên nứt vỡ hoặc lẫn tạp chất sắt gây ố vàng.
              </p>
            </div>

            <div className="bg-surface border border-muted p-8 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400">
              <Shield className="text-accent mb-6" size={36} strokeWidth={1.5} />
              <h3 className="text-2xl font-heading font-bold mb-3">Độ Bền Vĩnh Cửu</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                Đá không phai màu theo thời gian, không thấm nước, không bám rêu mốc và chịu được nhiệt độ từ cực lạnh đến nắng nóng gay gắt.
              </p>
            </div>

            <div className="bg-surface border border-muted p-8 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400">
              <Leaf className="text-accent mb-6" size={36} strokeWidth={1.5} />
              <h3 className="text-2xl font-heading font-bold mb-3">Thân Thiện Môi Trường</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                Khai thác tự nhiên không sử dụng hóa chất độc hại, bảo vệ môi trường sinh thái và mang lại không gian sống an lành, mộc mạc cho gia chủ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quarry Capacity */}
      <section className="py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Năng Lực Khai Thác</span>
              <h2 className="text-3xl md:text-4xl font-heading font-light leading-tight">
                Làm Chủ Nguồn <span className="font-bold">Nguyên Liệu Mỏ</span>
              </h2>
              <p className="font-body text-base text-secondary leading-relaxed">
                Sở hữu quyền khai thác mỏ đá tự nhiên với trữ lượng lớn tại tỉnh Lai Châu, HT STONE đảm bảo nguồn cung ổn định và đồng đều về chất lượng cho cả các dự án resort, khu đô thị quy mô lớn.
              </p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 pt-4 border-t border-muted">
                <div>
                  <h4 className="text-4xl font-heading font-bold text-accent">20.000 m²</h4>
                  <p className="font-body text-xs uppercase tracking-wider text-secondary mt-1">Sản lượng khai thác / tháng</p>
                </div>
                <div>
                  <h4 className="text-4xl font-heading font-bold text-accent">50+ Máy</h4>
                  <p className="font-body text-xs uppercase tracking-wider text-secondary mt-1">Thiết bị cắt, gia công hiện đại</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-surface font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400">
                  Liên hệ hợp tác thương mại
                </Link>
                <a href="/assets/files/profile_htstone.pdf" download className="inline-flex items-center gap-2 justify-center px-8 py-3.5 border border-accent text-accent font-body uppercase tracking-wider text-xs font-bold hover:bg-accent hover:text-surface transition-all duration-400">
                  <Download size={16} /> Tải Hồ sơ năng lực
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] overflow-hidden border border-muted/50 rounded-sm shadow-xl">
                <img 
                  src="/assets/img/project_1.jpg" 
                  alt="Finished slab stack" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
