import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Expand, ExternalLink, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjectsList } from '../services/api';
import SEO from '../components/SEO';

const Projects = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [activeFilter, setActiveFilter] = useState('all');
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = isEn ? "Projects | HT STONE - Portfolio" : "Công trình tiêu biểu | HT STONE";
    async function fetchProjects() {
      try {
        const data = await getProjectsList();
        setProjectsList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [isEn]);

  const filters = [
    { key: 'all', name: 'Tất cả công trình', name_en: 'All Projects' },
    { key: 'iconic', name: 'Kiến trúc biểu tượng', name_en: 'Iconic Architecture' },
    { key: 'hotel', name: 'Khách sạn sang trọng', name_en: 'Luxury Hotels' },
    { key: 'urban', name: 'Đô thị hiện đại', name_en: 'Urban Developments' },
    { key: 'public', name: 'Công trình công cộng', name_en: 'Public Buildings' },
    { key: 'resort', name: 'Nghỉ dưỡng & Resort', name_en: 'Resorts' },
    { key: 'villa', name: 'Biệt thự cao cấp', name_en: 'Luxury Villas' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsList
    : projectsList.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-background text-primary pt-24">
      <SEO 
        title={isEn ? "HT STONE Project Portfolio - Black & Multicolor Lai Chau Slate" : "Dự Án Thi Công Đá Đen & Đá Đa Sắc Lai Châu | HT STONE"}
        description={isEn ? "Explore HT STONE's benchmark projects featuring Lai Chau Slate across luxury villas, resorts, iconic public buildings, and urban developments." : "Tuyển tập các dự án thi công lợp mái đá đen Lai Châu, ốp mặt tiền biệt thự và lát cảnh quan resort cao cấp của HT STONE trên toàn quốc."}
        keywords="dự án thi công đá đen, lợp mái đá biệt thự, đá lai châu ốp tường resort, công trình đá tự nhiên, ht stone"
        canonical="/projects"
      />
      {/* 1. Header Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{t('projects')}</span>
            <div className="w-12 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-light text-primary leading-relaxed">
            {isEn ? 'PORTFOLIO' : 'DANH SÁCH DỰ ÁN'} <br />
            <span className="font-bold">{isEn ? 'Architectural Masterpieces' : 'Công Trình Tiêu Biểu'}</span>
          </h1>
        </div>
      </section>

      {/* 2. Portfolio Filters */}
      <section className="py-8 md:py-12 bg-background border-b border-muted/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`font-body text-xs md:text-sm uppercase tracking-wider font-semibold py-2 px-3 border-b-2 transition-all duration-300 ${
                  activeFilter === f.key
                    ? 'border-accent text-accent'
                    : 'border-transparent text-secondary hover:text-primary hover:border-muted'
                }`}
              >
                {isEn ? f.name_en : f.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Project Gallery Grid */}
      <section className="py-16 md:py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id} 
                className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <Link to={`/projects/${proj.id}`} className="aspect-[4/3] overflow-hidden border border-muted/50 rounded-xs mb-4 relative block">
                    <img 
                      src={proj.img} 
                      alt={proj.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-surface border border-muted flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <Expand className="text-accent" size={18} />
                      </div>
                    </div>
                  </Link>

                  {/* Project Title */}
                  <div className="space-y-2 text-left">
                    <Link to={`/projects/${proj.id}`} className="block">
                      <h3 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {isEn ? (proj.title_en || proj.title) : proj.title}
                      </h3>
                    </Link>
                    <p className="font-body text-xs text-secondary/80 line-clamp-2">
                      {proj.desc || proj.scale || proj.location}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-muted/50 flex items-center justify-between">
                  <Link 
                    to={`/projects/${proj.id}`} 
                    className="inline-flex items-center gap-1.5 text-accent font-body uppercase tracking-wider text-xs font-bold hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
                  >
                    {isEn ? 'View Project Details' : 'Xem chi tiết'} <MoveRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-t border-muted text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">{isEn ? 'Planning Your Architectural Project?' : 'Lên Ý Tưởng Cho Công Trình Của Bạn?'}</h2>
          <p className="font-body text-secondary text-xs md:text-sm leading-relaxed mb-8">
            {isEn ? 'Connect with HT STONE technical experts for tailored stone laying plans and direct quarry pricing estimates.' : 'Hãy liên hệ với đội ngũ kỹ sư và chuyên viên kỹ thuật của HT STONE để nhận bản vẽ chi tiết thi công đá và phương án tối ưu hóa chi phí nhất.'}
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-surface px-8 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400">
            {isEn ? 'REQUEST FREE TECHNICAL CONSULTATION' : 'TƯ VẤN THIẾT KẾ MIỄN PHÍ'} <ExternalLink size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Projects;
