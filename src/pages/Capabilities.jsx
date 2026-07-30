import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gem, Truck, Hammer, ShieldCheck, ChevronRight, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';

const Capabilities = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = "Năng lực khai thác & thi công | HT STONE";
  }, []);

  return (
    <main className="min-h-screen bg-background text-primary pt-24">
      {/* 1. Header Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{t('capabilities')}</span>
            <div className="w-12 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-primary leading-relaxed">
            Năng Lực Khai Thác <br />
            <span className="font-bold">& Thi Công Trọn Gói</span>
          </h1>
        </div>
      </section>

      {/* 2. Four Pillars of Capability */}
      <section className="py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* Pillar 1 */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Gem size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold">1. Khai Thác</h3>
              <p className="font-body text-sm text-secondary/90 leading-relaxed">
                HT STONE sở hữu quyền khai thác hợp pháp vỉa đá Slate Lai Châu chất lượng cao. Đảm bảo nguồn nguyên liệu tự nhiên dồi dào, kiểm soát chất lượng từ phôi đá thô ngay tại lòng đất mỏ.
              </p>
              <ul className="space-y-2 font-body text-xs text-secondary border-t border-muted/50 pt-4">
                <li className="flex items-center gap-2">✓ Trữ lượng khai thác lớn và ổn định</li>
                <li className="flex items-center gap-2">✓ Khai thác chọn lọc vỉa đá già tuổi</li>
                <li className="flex items-center gap-2">✓ Tối ưu chi phí sản xuất tận gốc</li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Hammer size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold">2. Sản Xuất</h3>
              <p className="font-body text-sm text-secondary/90 leading-relaxed">
                Nhà máy gia công hiện đại đặt gần chân mỏ, quy tụ các nghệ nhân chẻ đá có tay nghề cao nhất Tây Bắc. Kết hợp máy móc CNC và kỹ thuật chẻ tay thủ công để tạo ra sản phẩm hoàn hảo.
              </p>
              <ul className="space-y-2 font-body text-xs text-secondary border-t border-muted/50 pt-4">
                <li className="flex items-center gap-2">✓ Kỹ nghệ chẻ tay giữ nguyên vân đá độc bản</li>
                <li className="flex items-center gap-2">✓ Cắt CNC chuẩn xác quy cách thiết kế</li>
                <li className="flex items-center gap-2">✓ Phân loại độ dày đồng đều, nghiêm ngặt</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Truck size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold">3. Phân Phối</h3>
              <p className="font-body text-sm text-secondary/90 leading-relaxed">
                Hệ thống tổng kho lớn và mạng lưới logistics chuyên nghiệp trên cả nước, đáp ứng nhanh chóng mọi yêu cầu giao hàng. Sản phẩm được đóng pallet gỗ chắc chắn để tránh sứt mẻ.
              </p>
              <ul className="space-y-2 font-body text-xs text-secondary border-t border-muted/50 pt-4">
                <li className="flex items-center gap-2">✓ Hệ thống tổng kho tại Hà Nội, Đà Nẵng, TP.HCM</li>
                <li className="flex items-center gap-2">✓ Vận chuyển tận chân công trình an toàn</li>
                <li className="flex items-center gap-2">✓ Đóng kiện tiêu chuẩn xuất khẩu</li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <HardHat size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold">4. Thi Công</h3>
              <p className="font-body text-sm text-secondary/90 leading-relaxed">
                Đội ngũ kỹ sư và thợ thi công lành nghề của HT STONE am hiểu sâu sắc về đặc tính kỹ thuật của đá tự nhiên. Đảm bảo tính thẩm mỹ, chống thấm dột tuyệt đối cho mái đá và ốp lát.
              </p>
              <ul className="space-y-2 font-body text-xs text-secondary border-t border-muted/50 pt-4">
                <li className="flex items-center gap-2">✓ Bản vẽ thiết kế chia đá chi tiết</li>
                <li className="flex items-center gap-2">✓ Kỹ thuật lợp mái đá chống thấm dột 100%</li>
                <li className="flex items-center gap-2">✓ Bảo hành kỹ thuật và bảo trì định kỳ</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Factory Showcase Banner */}
      <section className="py-20 md:py-24 bg-muted/20 border-y border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            
            <div className="relative">
              <div className="aspect-[16/10] overflow-hidden border border-muted/50 rounded-sm shadow-xl">
                <img 
                  src="/assets/img/project_3.jpg" 
                  alt="Quality assurance checks" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="space-y-6">
              <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Quy Trình Kiểm Tra Chất Lượng</span>
              <h2 className="text-3xl md:text-4xl font-heading font-light leading-relaxed">
                Tiêu Chuẩn <span className="font-bold">Đá Xuất Khẩu Nghiêm Ngặt</span>
              </h2>
              <p className="font-body text-base text-secondary leading-relaxed">
                Mỗi kiện đá Slate Lai Châu trước khi xếp lên xe vận chuyển đều trải qua 3 lớp kiểm định chất lượng:
              </p>
              
              <div className="space-y-4 font-body text-sm text-secondary">
                <div className="flex gap-3">
                  <ShieldCheck className="text-accent shrink-0" size={20} />
                  <div>
                    <strong>Kiểm tra vỉa đá thô:</strong> Chỉ khai thác các vỉa đá già, phân thớ đều và không bị đứt gãy ngầm.
                  </div>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="text-accent shrink-0" size={20} />
                  <div>
                    <strong>Kiểm soát quy cách gia công:</strong> Đo đạc sai số kích thước và độ dày chuẩn chỉnh từng viên đá thành phẩm.
                  </div>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="text-accent shrink-0" size={20} />
                  <div>
                    <strong>Kiểm tra đóng gói đóng kiện:</strong> Đá được xếp trong pallet gỗ chắc chắn, có xốp chèn lót chống sứt mẻ cạnh khi vận chuyển.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Project Call Action */}
      <section className="py-16 md:py-24 bg-background text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-heading font-bold mb-4">Bạn Cần Nhà Cung Cấp Đá Uy Tín Cho Dự Án Lớn?</h2>
          <p className="font-body text-secondary text-sm leading-relaxed mb-8">
            HT STONE luôn sẵn sàng cung cấp hồ sơ năng lực (Profile), mẫu đá thực tế miễn phí tại văn phòng Hà Nội và Lai Châu để quý khách kiểm chứng chất lượng.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-accent text-surface px-8 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400">
              Đăng ký nhận mẫu đá miễn phí
            </Link>
            <Link to="/projects" className="border border-muted text-primary px-8 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:border-accent hover:text-accent transition-all duration-400 flex items-center justify-center gap-2">
              Xem các dự án đã hoàn thành <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Capabilities;
