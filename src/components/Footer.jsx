import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { getSiteSettings } from '../services/api';

const Footer = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    hotline: '0988 123 456',
    email: 'info@htstone.vn',
    address_headquarters: 'Lô C2-4, KCN Thụy Vân, TP. Việt Trì, Phú Thọ',
    address_factory: 'Mỏ đá Slate Nậm Nhùn, Tỉnh Lai Châu',
    facebook_url: '#',
    instagram_url: '#'
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSettings();
  }, []);

  return (
    <footer className="bg-muted/30 text-secondary pt-16 pb-8 border-t border-muted">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/assets/img/logo-black.png" 
                alt="HT STONE" 
                className="h-14 md:h-18 w-auto object-contain" 
              />
            </Link>
            <p className="font-body text-sm leading-relaxed text-secondary/80">
              {t('slogan_1')} <br />
              {t('slogan_2')}
            </p>
            <div className="flex gap-4 pt-2">
              <a href={settings.facebook_url || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-primary/70 hover:bg-accent hover:text-surface hover:border-accent transition-all duration-300">
                <FaFacebook size={18} />
              </a>
              <a href={settings.instagram_url || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-primary/70 hover:bg-accent hover:text-surface hover:border-accent transition-all duration-300">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-heading font-semibold text-lg mb-6 tracking-wide">HT STONE</h4>
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
            <h4 className="text-primary font-heading font-semibold text-lg mb-6 tracking-wide">Liên hệ</h4>
            <ul className="space-y-4 font-body text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>Showroom/Văn phòng: {settings.address_headquarters}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>Mỏ đá & Nhà máy: {settings.address_factory}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <a href={`tel:${settings.hotline}`} className="hover:text-accent font-semibold">{settings.hotline}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-accent">{settings.email}</a>
              </li>
            </ul>
          </div>

          {/* Catalogue / Newsletter */}
          <div>
            <h4 className="text-primary font-heading font-semibold text-lg mb-6 tracking-wide">Catalogue</h4>
            <p className="font-body text-sm text-secondary/80 mb-4 leading-relaxed">
              Liên hệ ngay với các chuyên gia của HT STONE để nhận tư vấn kỹ thuật chi tiết về đá Lai Châu và catalogue sản phẩm.
            </p>
            <form className="flex" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký nhận thông tin và Catalogue!'); }}>
              <input 
                type="email" 
                placeholder="Nhập địa chỉ email của bạn..." 
                className="bg-surface border border-muted text-primary font-body text-sm px-4 py-2.5 w-full focus:outline-none focus:border-accent transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-accent text-surface px-4 py-2.5 hover:bg-primary transition-colors shrink-0"
                aria-label="Đăng ký nhận catalogue"
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
