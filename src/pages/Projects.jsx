import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Expand, Layers, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjectsList } from '../services/api';

const Projects = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Công trình tiêu biểu | HT STONE";
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
  }, []);




  const filters = [
    { key: 'all', name: 'Tất cả công trình' },
    { key: 'villa', name: 'Biệt thự cao cấp' },
    { key: 'resort', name: 'Resort & Khách sạn' },
    { key: 'garden', name: 'Sân vườn & Cảnh quan' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsList
    : projectsList.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-background text-primary pt-24">
      {/* 1. Header Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">{t('projects')}</span>
            <div className="w-12 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-primary leading-relaxed">
            Những Tuyệt Tác <br />
            <span className="font-bold">Đá Tự Nhiên Kiến Tạo</span>
          </h1>
        </div>
      </section>

      {/* 2. Portfolio Filters */}
      <section className="py-8 md:py-12 bg-background border-b border-muted/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`font-body text-sm uppercase tracking-wider font-semibold py-2 px-4 border-b-2 transition-all duration-300 ${
                  activeFilter === f.key
                    ? 'border-accent text-accent'
                    : 'border-transparent text-secondary hover:text-primary hover:border-muted'
                }`}
              >
                {f.name}
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
                className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Project Image */}
                <div className="aspect-[4/3] overflow-hidden border border-muted/50 rounded-xs mb-6 relative">
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
                </div>

                {/* Project Metadata */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-body text-xs text-secondary/80">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-accent" /> {proj.location}
                    </span>
                    <span>Năm: {proj.year}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-heading font-bold text-primary group-hover:text-accent transition-colors">
                    {proj.title}
                  </h3>

                  <p className="font-body text-sm text-secondary/80 leading-relaxed">
                    {proj.desc}
                  </p>

                  <div className="pt-4 border-t border-muted/70 flex items-center gap-2 font-body text-xs text-secondary">
                    <Layers size={14} className="text-accent" />
                    <span><strong>Quy mô:</strong> {proj.scale}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-16 md:py-20 lg:py-28 bg-muted/20 border-t border-muted text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-heading font-bold mb-4">Lên Ý Tưởng Cho Công Trình Của Bạn?</h2>
          <p className="font-body text-secondary text-sm leading-relaxed mb-8">
            Hãy liên hệ với đội ngũ kỹ sư và chuyên viên kỹ thuật của HT STONE để nhận bản vẽ chi tiết thi công đá và phương án tối ưu hóa chi phí nhất.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-surface px-8 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400">
            Tư vấn thiết kế miễn phí <ExternalLink size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Projects;
