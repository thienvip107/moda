import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('products'), path: '/products' },
    { name: t('projects'), path: '/projects' },
    { name: t('capabilities'), path: '/capabilities' },
    { name: t('contact'), path: '/contact' },
  ];

  const showSolidHeader = isScrolled || location.pathname !== '/' || mobileMenuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showSolidHeader ? 'bg-surface/90 backdrop-blur-md py-3 shadow-sm border-b border-muted/50' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <h1 className={`text-2xl md:text-3xl font-heading font-bold tracking-widest transition-colors duration-300 ${showSolidHeader ? 'text-primary' : 'text-white'}`}>
            HT STONE
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`font-body text-sm uppercase tracking-wider font-semibold transition-colors duration-300 hover:text-accent ${
                location.pathname === link.path 
                  ? 'text-accent' 
                  : showSolidHeader ? 'text-primary/80' : 'text-white/90'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className={`flex items-center gap-1 font-body text-sm font-semibold transition-colors hover:text-accent ${showSolidHeader ? 'text-primary' : 'text-white'}`}
          >
            <Globe size={18} />
            {i18n.language.toUpperCase()}
          </button>
          
          <Link to="/contact" className={`hidden md:inline-flex items-center justify-center px-6 py-2.5 border font-body text-sm uppercase tracking-wider font-bold transition-all duration-300 ${showSolidHeader ? 'border-accent text-accent hover:bg-accent hover:text-surface' : 'border-white/80 text-white hover:bg-white hover:text-primary'}`}>
            {t('contact')}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 transition-colors ${showSolidHeader ? 'text-primary' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: '#FAF7F0' }}
      >
        <div className="flex flex-col h-full justify-between" >
          <div>
            {/* Mobile Menu Header Bar */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-muted/50">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                <h1 className="text-2xl font-heading font-bold tracking-widest text-primary">
                  HT STONE
                </h1>
              </Link>
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 font-body text-sm font-semibold text-primary hover:text-accent"
                >
                  <Globe size={18} />
                  {i18n.language.toUpperCase()}
                </button>
                <button 
                  className="p-2 text-primary hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col p-6 gap-4" style={{ backgroundColor: '#FAF7F0' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-body text-lg uppercase tracking-wider font-semibold border-b border-muted pb-2 ${
                    location.pathname === link.path ? 'text-accent' : 'text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 text-center px-6 py-3 bg-accent text-surface font-body text-base uppercase tracking-wider font-bold"
              >
                {t('contact')}
              </Link>
            </nav>
          </div>

          {/* Branding Watermark */}
          <div className="p-8 text-center border-t border-muted/30">
            <p className="font-heading text-xl font-bold text-accent tracking-widest">HT STONE</p>
            <p className="font-body text-[10px] text-secondary/60 uppercase tracking-widest mt-1">Đá Tự Nhiên Lai Châu Trường Tồn</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
