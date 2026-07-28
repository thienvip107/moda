import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gem, Truck, Hammer, ShieldCheck, ChevronRight } from 'lucide-react';
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

      {/* 2. Three Pillars of Capability */}
      <section className="py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
            
            {/* Pillar 1 */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Gem size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold">1. Khai Thác Tại Mỏ</h3>
              <p className="font-body text-sm text-secondary/90 leading-relaxed">
                Chúng tôi sở hữu quyền khai thác hợp pháp vỉa đá Lai Châu có chất lượng cao nhất. Đảm bảo nguồn nguyên liệu dồi dào, trực tiếp không qua trung gian giúp giá thành cạnh tranh tuyệt đối.
              </p>
              <ul className="space-y-2 font-body text-xs text-secondary border-t border-muted/50 pt-4">
                <li className="flex items-center gap-2">✓ Trữ lượng khai thác ổn định lâu dài</li>
                <li className="flex items-center gap-2">✓ Tuyển chọn chất lượng vỉa đá ngay tại mỏ</li>
                <li className="flex items-center gap-2">✓ Đảm bảo tiến độ cung cấp mọi khối lượng</li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Hammer size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold">2. Chế Tác & Gia Công</h3>
              <p className="font-body text-sm text-secondary/90 leading-relaxed">
                Nhà máy gia công được đặt ngay gần chân mỏ đá Lai Châu, trang bị hệ thống máy cắt CNC, máy hiệu chuẩn chiều dày hiện đại kết hợp với bàn tay chẻ đá lành nghề của thợ đá Tây Bắc.
              </p>
              <ul className="space-y-2 font-body text-xs text-secondary border-t border-muted/50 pt-4">
                <li className="flex items-center gap-2">✓ Gia công kích thước chuẩn xác từng milimet</li>
                <li className="flex items-center gap-2">✓ Độ dày đá được phân loại đồng đều</li>
                <li className="flex items-center gap-2">✓ Chẻ tay tinh xảo, giữ vân đá tự nhiên đẹp nhất</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Truck size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold">3. Logistics & Thi Công</h3>
              <p className="font-body text-sm text-secondary/90 leading-relaxed">
                HT STONE cung cấp dịch vụ logistics vận chuyển trực tiếp đến chân công trình toàn quốc. Đội ngũ kỹ thuật viên lắp đặt chuyên nghiệp, giàu kinh nghiệm đảm bảo tính thẩm mỹ cao nhất cho công trình.
              </p>
              <ul className="space-y-2 font-body text-xs text-secondary border-t border-muted/50 pt-4">
                <li className="flex items-center gap-2">✓ Giao hàng toàn quốc an toàn, đúng hẹn</li>
                <li className="flex items-center gap-2">✓ Đội ngũ thợ đá chuyên nghiệp thi công lắp đặt</li>
                <li className="flex items-center gap-2">✓ Giám sát kỹ thuật chặt chẽ, bảo hành lâu dài</li>
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
