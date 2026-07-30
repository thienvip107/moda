import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Layers, ExternalLink, MoveRight, Sparkles } from 'lucide-react';
import { getProjectsList } from '../services/api';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjectData() {
      try {
        const list = await getProjectsList();
        setAllProjects(list);
        const found = list.find(p => p.id === projectId || p.slug === projectId);
        if (found) {
          setProject(found);
          document.title = `${found.title} | HT STONE - Dự Án Tiêu Biểu`;
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
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 text-center">
        <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="font-body text-sm text-secondary mt-4">Đang tải thông tin công trình...</p>
      </div>
    );
  }

  if (!project) return null;

  const relatedProjects = allProjects
    .filter(p => p.id !== project.id && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-primary pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-muted/50">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-secondary hover:text-accent font-body text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> Quay lại danh sách công trình
          </Link>
          
          <nav className="font-body text-xs text-secondary/70 flex items-center gap-2">
            <Link to="/" className="hover:text-accent transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-accent transition-colors">Công trình</Link>
            <span>/</span>
            <span className="text-primary font-semibold truncate max-w-[200px] md:max-w-xs">{project.title}</span>
          </nav>
        </div>

        {/* Header */}
        <header className="space-y-4 mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Sparkles size={12} />
            <span>
              {project.category === 'villa' && 'Biệt Thự Cao Cấp'}
              {project.category === 'resort' && 'Resort & Khách Sạn'}
              {project.category === 'garden' && 'Sân Vườn & Cảnh Quan'}
              {project.category !== 'villa' && project.category !== 'resort' && project.category !== 'garden' && 'Công Trình Tiêu Biểu'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-relaxed">
            {project.title}
          </h1>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface border border-muted p-5 rounded-sm shadow-xs font-body text-sm text-secondary mt-6">
            <div className="flex items-center gap-3">
              <MapPin className="text-accent shrink-0" size={20} />
              <div>
                <span className="text-xs uppercase text-secondary/60 block font-semibold">Địa điểm</span>
                <strong className="text-primary font-medium">{project.location || 'Lai Châu / Việt Nam'}</strong>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-muted/70 pt-3 md:pt-0 md:pl-4">
              <Calendar className="text-accent shrink-0" size={20} />
              <div>
                <span className="text-xs uppercase text-secondary/60 block font-semibold">Năm hoàn thành</span>
                <strong className="text-primary font-medium">{project.year || '2024'}</strong>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-muted/70 pt-3 md:pt-0 md:pl-4">
              <Layers className="text-accent shrink-0" size={20} />
              <div>
                <span className="text-xs uppercase text-secondary/60 block font-semibold">Quy mô hạng mục</span>
                <strong className="text-primary font-medium">{project.scale || 'Đá lợp mái & ốp lát'}</strong>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="aspect-[16/9] w-full overflow-hidden border border-muted rounded-sm mb-12 shadow-lg">
          <img 
            src={project.img || project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description & Overview */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8 space-y-6 text-left font-body text-base md:text-lg text-secondary leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">Tổng Quan Dự Án</h2>
            <p>
              {project.desc || project.description || 'Dự án sử dụng đá tự nhiên Slate Lai Châu cao cấp do HT STONE trực tiếp khai thác, chế tác và thi công hoàn thiện.'}
            </p>
            <p>
              Tất cả các hạng mục ngói đá lợp mái và đá ốp lát sân vườn tại công trình đều đạt tiêu chuẩn kỹ thuật nghiêm ngặt, có khả năng chống thấm tuyệt đối, không rêu mốc và bền màu vĩnh cửu theo thời gian.
            </p>
          </div>

          <div className="lg:col-span-4 bg-surface border border-muted p-6 rounded-sm space-y-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-primary">Tư Vấn Công Trình Tương Tự</h3>
            <p className="font-body text-sm text-secondary leading-relaxed">
              Bạn muốn nhận phương án bản vẽ chia đá và dự toán chi phí thi công cho công trình của mình?
            </p>
            <Link 
              to="/contact" 
              state={{ subject: `Tư vấn dự án tương tự: ${project.title}` }}
              className="w-full inline-flex items-center justify-center gap-2 bg-accent text-surface px-6 py-3.5 font-body uppercase tracking-wider text-xs font-bold hover:bg-primary transition-all duration-400"
            >
              Liên hệ tư vấn ngay <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-8 border-t border-muted/50 pt-12 text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary">Các Công Trình Khác</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div key={rel.id} className="group bg-surface border border-muted p-4 rounded-sm shadow-sm hover:shadow-lg transition-all duration-400 flex flex-col justify-between">
                  <div>
                    <Link to={`/projects/${rel.id}`} className="aspect-[4/3] overflow-hidden rounded-xs border border-muted/50 mb-4 block relative">
                      <img src={rel.img} alt={rel.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </Link>
                    <Link to={`/projects/${rel.id}`} className="block">
                      <h3 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                    </Link>
                  </div>
                  <div className="mt-4 pt-3 border-t border-muted/50">
                    <Link to={`/projects/${rel.id}`} className="inline-flex items-center gap-1 text-accent font-body uppercase text-xs font-bold hover:text-primary">
                      Xem chi tiết <MoveRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default ProjectDetail;
