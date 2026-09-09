import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send, ExternalLink } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { getSiteSettings } from '../services/api';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [settings, setSettings] = useState({
    hotline: '0909168587',
    email: 'info@htstone.vn',
    office_laichau: '206 Trần Hưng Đạo, phường Đoàn Kết, tỉnh Lai Châu',
    quarry_namho: 'Xã Pa Tần, Tỉnh Lai Châu',
    quarry_phiengen: 'Xã Lê Lợi, Tỉnh Lai Châu',
    company_full_name: 'HT STONE là thương hiệu đá tự nhiên thuộc Công ty TNHH MTV Thương mại và Xây dựng Hiền Tài',
    company_full_name_en: 'HT STONE is the natural stone brand of Hien Tai Trading & Construction One Member Co., Ltd.',
    facebook_url: '#',
    instagram_url: '#'
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSiteSettings();
        setSettings(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.error(err);
      }
    }
    fetchSettings();
  }, []);

  return (
    <footer className="bg-muted/30 text-secondary pt-16 pb-8 border-t border-muted">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src="/assets/img/logo-black.png" 
                alt="HT STONE" 
                className="h-14 md:h-16 w-auto object-contain" 
              />
            </Link>
            <p className="font-body text-xs font-medium leading-relaxed text-secondary/90">
              {isEn 
                ? (settings.company_full_name_en || 'HT STONE is the natural stone brand of Hien Tai Trading & Construction One Member Co., Ltd.') 
                : (settings.footer_about || settings.company_full_name || 'HT STONE là thương hiệu đá tự nhiên thuộc Công ty TNHH MTV Thương mại và Xây dựng Hiền Tài')}
            </p>
            <div className="flex gap-3 pt-2">
              <a href={settings.facebook_url || '#'} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-muted flex items-center justify-center text-primary/70 hover:bg-accent hover:text-surface hover:border-accent transition-all duration-300">
                <FaFacebook size={16} />
              </a>
              <a href={settings.instagram_url || '#'} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-muted flex items-center justify-center text-primary/70 hover:bg-accent hover:text-surface hover:border-accent transition-all duration-300">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-heading font-semibold text-sm mb-4 uppercase tracking-wider">{isEn ? 'QUICK LINKS' : 'DANH MỤC'}</h4>
            <ul className="space-y-2.5 font-body text-xs font-semibold uppercase tracking-wider">
              <li><Link to="/about" className="hover:text-accent transition-colors duration-300">{t('about')}</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors duration-300">{t('products')}</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors duration-300">{t('projects')}</Link></li>
              <li><Link to="/news" className="hover:text-accent transition-colors duration-300">{t('news')}</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors duration-300">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info (Google Sheet Detailed Specs) */}
          <div className="lg:col-span-2">
            <h4 className="text-primary font-heading font-semibold text-sm mb-4 uppercase tracking-wider">{isEn ? 'CONTACT & QUARRY LOCATIONS' : 'VĂN PHÒNG & MỎ ĐÁ HT STONE'}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body text-xs leading-relaxed">
              {/* Lai Chau Office */}
              <div className="space-y-1.5 bg-surface/80 p-3.5 rounded-lg border border-muted/70 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-primary flex items-center gap-1.5">
                    <MapPin size={14} className="text-accent shrink-0" />
                    <span>HT STONE – VP Lai Châu</span>
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/7Shh2TsFGunCtt6A7" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Mở Google Maps"
                    className="text-accent hover:text-primary transition-colors p-1"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
                <p className="text-secondary/80 pl-5">Số nhà 206 Trần Hưng Đạo, P. Đoàn Kết, Lai Châu</p>
                <div className="pl-5 flex items-center justify-between pt-0.5">
                  <a href="tel:0338693555" className="text-accent font-semibold hover:underline flex items-center gap-1">
                    <Phone size={11} /> ĐT: 0338.693.555
                  </a>
                  <a href="https://maps.app.goo.gl/7Shh2TsFGunCtt6A7" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-secondary/70 hover:text-accent hover:underline">
                    Chỉ đường &rarr;
                  </a>
                </div>
              </div>

              {/* Nam Ho Quarry */}
              <div className="space-y-1.5 bg-surface/80 p-3.5 rounded-lg border border-muted/70 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-primary flex items-center gap-1.5">
                    <MapPin size={14} className="text-accent shrink-0" />
                    <span>HT STONE – Mỏ Đen Nậm Ho</span>
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/hyjSR6VSaarHiCb87" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Mở Google Maps"
                    className="text-accent hover:text-primary transition-colors p-1"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
                <p className="text-secondary/80 pl-5">Xã Pa Tần, Tỉnh Lai Châu</p>
                <div className="pl-5 flex items-center justify-between pt-0.5">
                  <a href="tel:0968005321" className="text-accent font-semibold hover:underline flex items-center gap-1">
                    <Phone size={11} /> ĐT: 0968005321
                  </a>
                  <a href="https://maps.app.goo.gl/hyjSR6VSaarHiCb87" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-secondary/70 hover:text-accent hover:underline">
                    Chỉ đường &rarr;
                  </a>
                </div>
              </div>

              {/* Phieng En Quarry */}
              <div className="space-y-1.5 bg-surface/80 p-3.5 rounded-lg border border-muted/70 hover:border-accent/40 transition-colors">
                <p className="font-bold text-primary flex items-center gap-1.5">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span>HT STONE – Mỏ Đa Sắc Phiêng Én</span>
                </p>
                <p className="text-secondary/80 pl-5">Xã Lê Lợi, Tỉnh Lai Châu</p>
                <p className="text-[10px] text-secondary/60 pl-5">Khai thác đá đa sắc tự nhiên</p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-muted flex flex-col md:flex-row items-center justify-between gap-3 font-body text-xs text-secondary/70">
          <p>© {new Date().getFullYear()} <strong className="text-primary">HT STONE</strong>. {isEn ? 'All Rights Reserved.' : 'Bảo lưu mọi quyền.'}</p>
          <p className="text-[11px] text-secondary/70">
            {isEn ? 'HT STONE is the natural stone brand of Hien Tai Trading & Construction One Member Co., Ltd.' : 'HT STONE là thương hiệu đá tự nhiên thuộc Công ty TNHH MTV Thương mại và Xây dựng Hiền Tài'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
