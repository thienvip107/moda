import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/30 text-secondary pt-16 pb-8 border-t border-muted">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-heading font-bold text-primary tracking-widest">HT STONE</h2>
            </Link>
            <p className="font-body text-sm leading-relaxed text-secondary/80">
              {t('slogan_1')} <br />
              {t('slogan_2')}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-primary/70 hover:bg-accent hover:text-surface hover:border-accent transition-all duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-primary/70 hover:bg-accent hover:text-surface hover:border-accent transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-primary/70 hover:bg-accent hover:text-surface hover:border-accent transition-all duration-300">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-heading font-semibold text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/about" className="hover:text-accent transition-colors duration-300">{t('about')}</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors duration-300">{t('products')}</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors duration-300">{t('projects')}</Link></li>
              <li><Link to="/capabilities" className="hover:text-accent transition-colors duration-300">{t('capabilities')}</Link></li>
              <li><Link to="/news" className="hover:text-accent transition-colors duration-300">{t('news')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-primary font-heading font-semibold text-lg mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4 font-body text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>Văn phòng HN: Số 12, Đường 3, KĐT Him Lam, Long Biên, Hà Nội</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>Mỏ đá Lai Châu: Xã Thân Thuộc, Huyện Tân Uyên, Tỉnh Lai Châu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+84 987 654 321</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>info@htstone.vn</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-primary font-heading font-semibold text-lg mb-6 tracking-wide">Newsletter</h4>
            <p className="font-body text-sm text-secondary/80 mb-4">Subscribe to receive updates on new products and projects.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-surface border border-muted text-primary font-body text-sm px-4 py-2.5 w-full focus:outline-none focus:border-accent transition-colors"
              />
              <button 
                type="submit" 
                className="bg-accent text-surface px-4 py-2.5 hover:bg-primary transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-muted flex flex-col md:flex-row items-center justify-between gap-4 font-body text-xs text-secondary/70">
          <p>© {new Date().getFullYear()} <strong className="text-primary">HT STONE</strong>. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
