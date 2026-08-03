import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Send, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = "Liên hệ & báo giá | HT STONE";
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 800);
  };

  return (
    <main className="min-h-screen bg-background text-primary pt-24">
      <SEO 
        title="Liên Hệ Báo Giá Đá Đen & Đá Đa Sắc Lai Châu Tận Mỏ | HT STONE"
        description="Liên hệ HT STONE để nhận báo giá đá Slate Lai Châu lợp mái, ốp tường, lát sân vườn trực tiếp tại mỏ. Tư vấn kỹ thuật và gửi mẫu đá miễn phí toàn quốc."
        keywords="báo giá đá lai châu, báo giá đá đen, báo giá mỏ đá lai châu, liên hệ ht stone, tư vấn lợp mái đá"
        canonical="/contact"
      />
      {/* 1. Header Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{t('contact')}</span>
            <div className="w-12 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-primary leading-relaxed">
            Kết Nối Để Kiến Tạo <br />
            <span className="font-bold">Không Gian Độc Bản</span>
          </h1>
        </div>
      </section>

      {/* 2. Contact Split Pane */}
      <section className="py-20 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24">
            
            {/* Contact Details (Left) */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Thông Tin Liên Hệ</span>
                <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mt-2 mb-6">
                  Văn Phòng & <br />
                  <span className="font-bold">Hệ Thống Mỏ Đá</span>
                </h2>
                <p className="font-body text-secondary text-sm leading-relaxed">
                  Quý khách hàng, chủ đầu tư, kiến trúc sư có nhu cầu mua hàng, nhận mẫu thử hoặc tìm hiểu chính sách đại lý xin vui lòng liên hệ theo thông tin bên dưới hoặc gửi yêu cầu qua form biểu mẫu.
                </p>
              </div>

              <div className="space-y-6 font-body">
                {/* Hanoi Office */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/25 flex items-center justify-center text-accent shrink-0 bg-surface shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">Văn Phòng Đại Diện Hà Nội</h4>
                    <p className="text-sm text-secondary/90 leading-relaxed">
                      Số 12, Đường 3, KĐT Him Lam, Phường Cổ Linh, Quận Long Biên, Hà Nội
                    </p>
                  </div>
                </div>

                {/* Lai Chau Quarry */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/25 flex items-center justify-center text-accent shrink-0 bg-surface shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">Mỏ Khai Thác & Nhà Máy Gia Công</h4>
                    <p className="text-sm text-secondary/90 leading-relaxed">
                      Xã Thân Thuộc, Huyện Tân Uyên, Tỉnh Lai Châu, Việt Nam
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/25 flex items-center justify-center text-accent shrink-0 bg-surface shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">Hotline Hỗ Trợ 24/7</h4>
                    <p className="text-sm text-secondary hover:text-accent font-medium">
                      <a href="tel:+84987654321">+84 987 654 321</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent/25 flex items-center justify-center text-accent shrink-0 bg-surface shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">Hòm Thư Điện Tử</h4>
                    <p className="text-sm text-secondary hover:text-accent font-medium">
                      <a href="mailto:info@htstone.vn">info@htstone.vn</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Right) */}
            <div className="lg:col-span-7 bg-surface border border-muted p-8 md:p-10 rounded-sm shadow-xl relative">
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-bold mb-2">Gửi Yêu Cầu Cho Chúng Tôi</h3>
                <p className="font-body text-xs text-secondary/80">Chúng tôi thường phản hồi trong vòng 2 giờ làm việc.</p>
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={28} />
                  </div>
                  <h4 className="text-2xl font-heading font-bold text-primary">Gửi thành công!</h4>
                  <p className="font-body text-sm text-secondary max-w-sm mx-auto leading-relaxed">
                    Cảm ơn bạn đã liên hệ với HT STONE. Chúng tôi đã nhận được yêu cầu và chuyên viên sẽ chủ động liên hệ lại sớm nhất.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="font-body text-xs uppercase tracking-wider text-accent border-b border-accent hover:text-primary hover:border-primary pt-4 pb-1 transition-colors"
                  >
                    Gửi thêm yêu cầu mới
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-body text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-secondary">Họ và tên *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background border border-muted/80 rounded-xs py-3 px-4 focus:outline-none focus:border-accent text-primary transition-colors"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs uppercase tracking-wider font-semibold text-secondary">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-background border border-muted/80 rounded-xs py-3 px-4 focus:outline-none focus:border-accent text-primary transition-colors"
                        placeholder="09xxxxxxxx"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-secondary">Địa chỉ Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background border border-muted/80 rounded-xs py-3 px-4 focus:outline-none focus:border-accent text-primary transition-colors"
                      placeholder="example@gmail.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs uppercase tracking-wider font-semibold text-secondary">Hạng mục quan tâm</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-background border border-muted/80 rounded-xs py-3 px-4 focus:outline-none focus:border-accent text-primary transition-colors appearance-none"
                    >
                      <option value="">-- Chọn hạng mục cần tư vấn --</option>
                      <option value="roofing">Đá lợp mái Lai Châu</option>
                      <option value="wall">Đá ốp tường mặt tiền / trang trí</option>
                      <option value="paving">Đá lát sân vườn / lối đi bộ</option>
                      <option value="sample">Đăng ký nhận mẫu đá thực tế</option>
                      <option value="partner">Hợp tác làm đại lý phân phối</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-wider font-semibold text-secondary">Nội dung chi tiết yêu cầu *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-background border border-muted/80 rounded-xs py-3 px-4 focus:outline-none focus:border-accent text-primary transition-colors resize-none"
                      placeholder="Mô tả dự án, kích thước, độ dày cần tư vấn báo giá..."
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-accent text-surface py-4 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400 flex items-center justify-center gap-2"
                    >
                      Gửi Thông Tin Yêu Cầu <Send size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. Help / FAQ Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-t border-muted">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <HelpCircle className="text-accent mx-auto mb-6" size={40} strokeWidth={1.5} />
          <h3 className="text-2xl font-heading font-bold mb-4">Các Câu Hỏi Thường Gặp</h3>
          
          <div className="space-y-6 text-left mt-10 font-body text-sm text-secondary">
            <div>
              <h5 className="font-semibold text-primary text-base mb-2">Tôi có thể nhận mẫu thử (sample block) ở xa không?</h5>
              <p className="leading-relaxed">
                Hoàn toàn được. HT STONE gửi mẫu đá thực tế miễn phí đến mọi tỉnh thành qua đường chuyển phát nhanh. Quý khách chỉ thanh toán cước vận chuyển COD thông thường cho đơn vị vận chuyển.
              </p>
            </div>
            <div className="border-t border-muted/50 pt-6">
              <h5 className="font-semibold text-primary text-base mb-2">Đá Slate Lai Châu có bị rêu mốc trơn trượt sau thời gian dài không?</h5>
              <p className="leading-relaxed">
                Độ hút nước của đá Slate Lai Châu gần như bằng không (dưới 0.1%), cấu trúc thớ đá mịn khít giúp loại bỏ nguy cơ phát triển rêu mốc. Bề mặt chẻ thô có độ ma sát tự nhiên cao, chống trơn trượt rất tốt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
