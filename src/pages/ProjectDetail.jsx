import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Calendar, Layers, ExternalLink, MoveRight, Sparkles } from 'lucide-react';
import { getProjectsList } from '../services/api';
import SEO from '../components/SEO';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = Boolean(i18n?.language && i18n.language.toLowerCase().startsWith('en'));
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjectData() {
      try {
        const list = await getProjectsList();
        setAllProjects(list);
        const found = list.find(p => String(p.id) === String(projectId) || String(p.slug) === String(projectId));
        if (found) {
          setProject(found);
          const name = isEn ? (found.title_en || found.title) : found.title;
          document.title = isEn 
            ? `${name} | HT STONE - Portfolio` 
            : `${name} | HT STONE - Dự Án Tiêu Biểu`;
        } else if (list.length > 0) {
          setProject(list[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProjectData();
    window.scrollTo(0, 0);
  }, [projectId, isEn]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 text-center">
        <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="font-body text-sm text-secondary mt-4">{t('loading')}</p>
      </div>
    );
  }

  if (!project) return null;

  const relatedProjects = allProjects
    .filter(p => p.id !== project.id && p.slug !== project.slug)
    .slice(0, 3);

  const displayTitle = isEn ? (project.title_en || project.title) : project.title;
  const displayDesc = isEn 
    ? (project.description_en || project.desc_en || project.desc || 'Architectural project featuring premium Lai Chau Natural Slate, directly extracted, manufactured, and installed by HT STONE.')
    : (project.desc || project.description || 'Dự án sử dụng đá tự nhiên Slate Lai Châu cao cấp do HT STONE trực tiếp khai thác, chế tác và thi công hoàn thiện.');

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'iconic': return isEn ? 'Iconic Architecture' : 'Kiến Trúc Biểu Tượng';
      case 'hotel': return isEn ? 'Luxury Hotels' : 'Khách Sạn Sang Trọng';
      case 'urban': return isEn ? 'Urban Developments' : 'Đô Thị Hiện Đại';
      case 'public': return isEn ? 'Public Buildings' : 'Công Trình Công Cộng';
      case 'resort': return isEn ? 'Resorts & Retreats' : 'Nghỉ Dưỡng & Resort';
      case 'villa': return isEn ? 'Luxury Villas' : 'Biệt Thự Cao Cấp';
      default: return isEn ? 'Featured Project' : 'Công Trình Tiêu Biểu';
    }
  };

  return (
    <main className="min-h-screen bg-background text-primary pt-28 pb-20">
      <SEO 
        title={isEn ? `${displayTitle} - Lai Chau Slate Installation | HT STONE` : `${displayTitle} - Thi Công Đá Slate Lai Châu | HT STONE`}
        description={isEn 
          ? `Project ${displayTitle} in ${project.location || 'Vietnam'}. Premium natural slate roofing and wall cladding by HT STONE.` 
          : `Dự án ${displayTitle} tại ${project.location || 'Việt Nam'}. ${displayDesc}`}
        keywords={`${displayTitle}, thi công đá lai châu, đá đen lợp mái, công trình biệt thự, ht stone`}
        canonical={`/projects/${project.id}`}
        ogImage={project.img || project.image_url}
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-muted/50">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-secondary hover:text-accent font-body text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> {t('back_to_projects')}
          </Link>
          
          <nav className="font-body text-xs text-secondary/70 flex items-center gap-2">
            <Link to="/" className="hover:text-accent transition-colors">{t('home')}</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-accent transition-colors">{t('projects')}</Link>
            <span>/</span>
            <span className="text-primary font-semibold truncate max-w-[200px] md:max-w-xs">{displayTitle}</span>
          </nav>
        </div>

        {/* Header */}
        <header className="space-y-4 mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Sparkles size={12} />
            <span>{getCategoryLabel(project.category)}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-relaxed">
            {displayTitle}
          </h1>
          {isEn && project.title !== displayTitle && (
            <p className="text-secondary/70 font-body text-sm italic">
              {project.title}
            </p>
          )}
        </header>

        {/* Hero Cover Image */}
        <div className="aspect-[16/9] w-full overflow-hidden border border-muted rounded-sm mb-12 shadow-lg">
          <img 
            src={project.img || project.image_url} 
            alt={displayTitle} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description & Overview */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8 space-y-6 text-left font-body text-base md:text-lg text-secondary leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">
              {t('project_overview')}
            </h2>
            <p>
              {displayDesc}
            </p>
            <p>
              {isEn 
                ? 'All slate roofing tiles, wall cladding, and paving at the project adhere to rigorous technical standards, delivering complete waterproofing, anti-moss performance, and timeless enduring beauty across generations.'
                : 'Tất cả các hạng mục ngói đá lợp mái và đá ốp lát sân vườn tại công trình đều đạt tiêu chuẩn kỹ thuật nghiêm ngặt, có khả năng chống thấm tuyệt đối, không rêu mốc và bền màu vĩnh cửu theo thời gian.'}
            </p>
          </div>

          <div className="lg:col-span-4 bg-surface border border-muted p-6 rounded-sm space-y-6 shadow-sm text-left">
            <h3 className="font-heading text-xl font-bold text-primary">
              {t('request_similar_consultation')}
            </h3>
            <p className="font-body text-sm text-secondary leading-relaxed">
              {t('consultation_prompt')}
            </p>
            <Link 
              to="/contact" 
              state={{ subject: isEn ? `Consultation for project similar to: ${displayTitle}` : `Tư vấn dự án tương tự: ${displayTitle}` }}
              className="w-full inline-flex items-center justify-center gap-2 bg-accent text-surface px-6 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400"
            >
              {t('contact_consult_now')} <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-8 border-t border-muted/50 pt-12 text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">
              {t('other_projects')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => {
                const relTitle = isEn ? (rel.title_en || rel.title) : rel.title;
                return (
                  <div key={rel.id} className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400 flex flex-col justify-between">
                    <div>
                      <Link to={`/projects/${rel.id}`} className="aspect-[4/3] overflow-hidden rounded-xs border border-muted/50 mb-4 block relative">
                        <img src={rel.img || rel.image_url} alt={relTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </Link>
                      <Link to={`/projects/${rel.id}`} className="block">
                        <h3 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                          {relTitle}
                        </h3>
                      </Link>
                    </div>
                    <div className="mt-4 pt-3 border-t border-muted/50">
                      <Link to={`/projects/${rel.id}`} className="inline-flex items-center gap-1 text-accent font-body uppercase text-xs font-bold hover:text-primary">
                        {t('view_details')} <MoveRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default ProjectDetail;
