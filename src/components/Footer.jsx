import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { getSiteSettings } from '../services/api';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [settings, setSettings] = useState({
    hotline: '0909168587',
    email: 'info@htstone.vn',
    showroom_hanoi: 'Số 8 ngõ 42 Trần Cung, TP Hà Nội',
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
              <div className="space-y-1.5 bg-surface/60 p-3 rounded-sm border border-muted/50">
                <p className="font-bold text-primary flex items-center gap-1.5">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span>HT STONE – Showroom Hà Nội</span>
                </p>
                <p className="text-secondary/80 pl-5">Số 8 ngõ 42 Trần Cung, TP Hà Nội</p>
                <p className="text-secondary/80 pl-5 font-semibold">ĐT: 0909168587</p>
              </div>

              <div className="space-y-1.5 bg-surface/60 p-3 rounded-sm border border-muted/50">
                <p className="font-bold text-primary flex items-center gap-1.5">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span>HT STONE – Văn phòng Lai Châu</span>
                </p>
                <p className="text-secondary/80 pl-5">206 Trần Hưng Đạo, P. Đoàn Kết, Tỉnh Lai Châu</p>
                <p className="text-secondary/80 pl-5 font-semibold">Ms. Hiền - ĐT: 0338.693.555</p>
              </div>

              <div className="space-y-1.5 bg-surface/60 p-3 rounded-sm border border-muted/50">
                <p className="font-bold text-primary flex items-center gap-1.5">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span>HT STONE – Mỏ đá Đen Nậm Ho</span>
                </p>
                <p className="text-secondary/80 pl-5">Xã Pa Tần, Tỉnh Lai Châu (Mr. Tài)</p>
              </div>

              <div className="space-y-1.5 bg-surface/60 p-3 rounded-sm border border-muted/50">
                <p className="font-bold text-primary flex items-center gap-1.5">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span>HT STONE – Mỏ đá Đa Sắc Phiêng Én</span>
                </p>
                <p className="text-secondary/80 pl-5">Xã Lê Lợi, Tỉnh Lai Châu</p>
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
