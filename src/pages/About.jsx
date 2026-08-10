import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Shield, Leaf, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPolicy } from '../services/api';
import SEO from '../components/SEO';

const About = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    document.title = isEn ? "About Us | HT STONE - Lai Chau Natural Slate" : "Về chúng tôi | HT STONE - Đá Tự Nhiên Lai Châu";
    async function fetchProfile() {
      try {
        const data = await getPolicy('company_profile');
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, [isEn]);

  return (
    <main className="min-h-screen bg-background text-primary pt-24">
      <SEO 
        title={isEn ? "About HT STONE - Lai Chau Natural Slate Quarry & Craftsmanship" : "Về HT STONE - Đơn Vị Khai Thác Mỏ Đá Slate Lai Châu Cao Cấp"}
        description={isEn ? "HT STONE owns and operates natural Slate quarries in Lai Chau, Vietnam. Delivering black and multicolor slate solutions." : "HT STONE là thương hiệu sản xuất, khai thác mỏ đá Lai Châu và thi công các dòng đá đen, đá đa sắc tự nhiên hàng đầu Việt Nam."}
        keywords="mỏ đá, mỏ đá lai châu, ht stone, modalaichau, đá lai châu, đá đen lai châu, nhà máy đá slate"
        canonical="/about"
      />
      {/* 1. Page Header */}
      <section className="py-20 lg:py-28 bg-muted/20 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{t('about')}</span>
            <div className="w-12 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-light text-primary leading-relaxed">
            {isEn ? 'Timeless Stone. Timeless Architecture.' : 'Đá Trường Tồn - Kiến Trúc Trường Tồn'}
          </h1>
        </div>
      </section>

      {/* 2. Brand Story */}
      <section className="py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="aspect-[16/10] overflow-hidden border border-muted/50 rounded-sm shadow-xl">
                <img 
                  src="https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694456/vfdzgkygfdtwfp2eeoj8.jpg" 
                  alt="Mỏ đá Lai Châu HT STONE" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-surface border border-muted p-6 shadow-xl hidden md:block">
                <p className="font-heading text-xl font-bold text-accent">{isEn ? 'Quarry Operations' : 'Làm chủ nguồn đá'}</p>
                <p className="font-body text-xs uppercase tracking-wider text-secondary">{isEn ? 'Lai Chau Slate Quarries' : 'Mỏ đá tự nhiên Lai Châu'}</p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{isEn ? 'OUR STORY' : 'CÂU CHUYỆN CỦA CHÚNG TÔI'}</span>
              <h2 className="text-2xl md:text-4xl font-heading font-light leading-relaxed">
                {isEn ? 'NATURAL STONE FROM LAI CHAU' : 'ĐÁ TỰ NHIÊN LAI CHÂU'} <br />
                <span className="font-bold">{isEn ? 'A Gift from the Earth' : 'MÓN QUÀ TỪ LÒNG ĐẤT'}</span>
              </h2>

              <div className="font-body text-sm md:text-base text-secondary leading-relaxed space-y-4">
                {profile ? (
                  <div dangerouslySetInnerHTML={{ __html: isEn && profile.content_en ? profile.content_en : profile.content }} />
                ) : (
                  <>
                    <p>HT STONE là thương hiệu đá tự nhiên thuộc Công ty TNHH MTV Thương mại và Xây dựng Hiền Tài. Chúng tôi tự hào mang đến những sản phẩm đá tự nhiên Slate chất lượng nhất.</p>
                  </>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Craftsmanship */}
      <section className="py-20 md:py-24 lg:py-32 bg-muted/20 border-y border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{isEn ? 'CRAFTSMANSHIP' : 'PHƯƠNG PHÁP CHẾ TÁC'}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-primary mt-2">
              {isEn ? 'Hand-Split Stone Craftsmanship' : 'Kỹ Nghệ Chẻ Tay Thủ Công'}
            </h2>
            <p className="font-body text-secondary text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              {isEn 
                ? 'The combination of time-honored hand-splitting techniques practiced by experienced craftsmen and modern quality control standards preserves the natural texture and authentic structure of every stone while ensuring consistency across every product.'
                : 'Sự kết hợp giữa kỹ thuật chế tác bởi những nghệ nhân giàu kinh nghiệm và tiêu chuẩn kiểm soát hiện đại giúp giữ trọn đường vân tự nhiên, kết cấu nguyên bản nhưng cũng tạo ra được sự đồng nhất trong các sản phẩm, đáp ứng tiêu chuẩn ngày càng cao và đa dạng của thị trường.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-surface border border-muted p-8 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400">
              <Award className="text-accent mb-6" size={36} strokeWidth={1.5} />
              <h3 className="text-xl font-heading font-bold mb-3">{isEn ? 'Card 1 – Rigorous Selection' : 'Card 1 - Tuyển chọn khắt khe'}</h3>
              <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                {isEn 
                  ? 'Every slab undergoes a rigorous selection process. Only stone that meets strict standards for quality and structural integrity is chosen for craftsmanship.'
                  : 'Mỗi phiến đá đều trải qua quá trình tuyển chọn nghiêm ngặt. Chỉ những phiến đá đạt tiêu chuẩn về chất lượng, kết cấu ổn định mới được đưa vào chế tác.'}
              </p>
            </div>

            <div className="bg-surface border border-muted p-8 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400">
              <Shield className="text-accent mb-6" size={36} strokeWidth={1.5} />
              <h3 className="text-xl font-heading font-bold mb-3">{isEn ? 'Card 2 – Expert Craftsmanship' : 'Card 2 - Nghệ thuật chế tác tinh xảo'}</h3>
              <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                {isEn 
                  ? 'Finished by experienced artisans, every cut and surface is carefully refined to reveal the authentic beauty and distinctive character of natural Slate.'
                  : 'Được hoàn thiện bởi những nghệ nhân giàu kinh nghiệm, từng đường cắt và bề mặt đều được xử lý tỉ mỉ để tôn lên vẻ đẹp tự nhiên vốn có.'}
              </p>
            </div>

            <div className="bg-surface border border-muted p-8 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400">
              <Leaf className="text-accent mb-6" size={36} strokeWidth={1.5} />
              <h3 className="text-xl font-heading font-bold mb-3">{isEn ? 'Card 3 – Built to Last' : 'Card 3 - Độ bền vĩnh cửu'}</h3>
              <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                {isEn 
                  ? 'A gift from the earth, shaped over millions of years. Its dense structure and exceptionally low water absorption help Lai Chau Slate preserve its rich natural color and enduring beauty for generations.'
                  : 'Món quà từ lòng đất, được kiến tạo qua hàng triệu năm. Kết cấu thớ đặc chắc, độ hút nước thấp giúp đá Slate Lai Châu luôn giữ được màu đen nguyên bản, trường tồn cùng thời gian.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quarry Capacity */}
      <section className="py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1 text-left">
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{isEn ? 'CAPABILITIES' : 'NĂNG LỰC'}</span>
              <h2 className="text-2xl md:text-4xl font-heading font-light leading-tight">
                {isEn ? 'Mastering the Entire Value Chain' : 'Làm Chủ Chuỗi Giá Trị'}
              </h2>
              <p className="font-body text-sm md:text-base text-secondary leading-relaxed">
                {isEn 
                  ? 'HT STONE manages the complete journey of every stone—from quarrying and craftsmanship to quality control, supply, and professional installation. By investing in advanced machinery, modern processing technology, and an experienced team, we consistently deliver premium natural stone solutions for projects of every scale across Vietnam.'
                  : 'Chúng tôi làm chủ toàn bộ hành trình của đá – từ khai thác tại mỏ, chế tác, kiểm soát chất lượng đến phân phối và thi công. Đầu tư đồng bộ vào máy móc, thiết bị hiện đại cùng đội ngũ giàu kinh nghiệm giúp tạo nên những sản phẩm có chất lượng ổn định, đáp ứng các công trình quy mô lớn trên toàn quốc.'}
              </p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 pt-4 border-t border-muted">
                <div>
                  <h4 className="text-3xl md:text-4xl font-heading font-bold text-accent">20.000 m²</h4>
                  <p className="font-body text-xs uppercase tracking-wider text-secondary mt-1">
                    {isEn ? 'Quarrying & Production Capacity / Month' : 'Năng lực khai thác & sản xuất / tháng'}
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-heading font-bold text-accent">50+ {isEn ? 'Units' : 'Thiết bị'}</h4>
                  <p className="font-body text-xs uppercase tracking-wider text-secondary mt-1">
                    {isEn ? 'Fleet, Quarry Machinery & Processing Lines' : 'Hệ thống xe, máy & dây chuyền gia công'}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-surface font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400">
                  {isEn ? 'Partner With Us' : 'Liên hệ hợp tác'}
                </Link>
                <a href="/catalogue.pdf" download className="inline-flex items-center gap-2 justify-center px-8 py-3.5 border border-accent text-accent font-body uppercase tracking-wider text-xs font-bold hover:bg-accent hover:text-surface transition-all duration-400">
                  <Download size={16} /> {isEn ? 'Download Company Profile' : 'Tải hồ sơ năng lực'}
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] overflow-hidden border border-muted/50 rounded-sm shadow-xl">
                <img 
                  src="https://res.cloudinary.com/ydxroi9a/image/upload/w_800,f_auto,q_auto/v1784694423/kcnmsxbnasrbezglaqmy.jpg" 
                  alt="Nhà xưởng đóng gói palet đá Slate Lai Châu" 
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
