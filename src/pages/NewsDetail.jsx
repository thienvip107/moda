import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, User, Sparkles, Share2 } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { getNewsBySlugOrId, getNewsList } from '../services/api';
import SEO from '../components/SEO';

const NewsDetail = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    async function loadPost() {
      const foundPost = await getNewsBySlugOrId(newsId);
      const newsData = await getNewsList();
      setAllNews(newsData);

      if (foundPost) {
        setPost(foundPost);
        document.title = `${foundPost.title} | HT STONE - Đá Tự Nhiên Lai Châu`;
      } else {
        navigate('/news');
      }
    }
    loadPost();
    window.scrollTo(0, 0);
  }, [newsId, navigate]);

  if (!post) return null;

  // Get related posts (same category, excluding current post)
  const relatedPosts = allNews
    .filter(p => p.category === post.category && p.id !== post.id && p.slug !== post.slug)
    .slice(0, 2);

  const backupRelated = relatedPosts.length > 0 
    ? relatedPosts 
    : allNews.filter(p => p.id !== post.id && p.slug !== post.slug).slice(0, 2);


  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.image_url ? `https://www.modalaichau.com${post.image_url}` : "https://www.modalaichau.com/assets/img/roofing_slate.jpg",
    "description": post.excerpt || post.summary || post.title,
    "author": {
      "@type": "Organization",
      "name": "HT STONE"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HT STONE",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.modalaichau.com/assets/img/favicon.png"
      }
    },
    "datePublished": post.created_at || "2026-07-30"
  };

  return (
    <main className="min-h-screen bg-background text-primary pt-28 pb-20">
      <SEO 
        title={`${post.title} | HT STONE - Đá Tự Nhiên Lai Châu`}
        description={post.excerpt || post.summary || `${post.title} - Bài viết chuyên sâu về đá Slate Lai Châu, đá đen lợp mái, đá ốp tường sân vườn từ mỏ HT STONE.`}
        keywords={`${post.title}, đá lai châu, đá đen, mỏ đá lai châu, đá slate, ht stone`}
        canonical={`/news/${post.slug || post.id}`}
        ogImage={post.image_url}
        ogType="article"
        schemaData={articleSchema}
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        
        {/* 1. Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-muted/50">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-secondary hover:text-accent font-body text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> Quay lại tin tức
          </Link>
          
          <nav className="font-body text-xs text-secondary/70 flex items-center gap-2">
            <Link to="/" className="hover:text-accent transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-accent transition-colors">Tin tức</Link>
            <span>/</span>
            <span className="text-primary font-semibold truncate max-w-[200px] md:max-w-xs">{post.title}</span>
          </nav>
        </div>

        {/* 2. Article Header */}
        <header className="space-y-6 text-left mb-10">
          <span className="inline-flex items-center gap-1 bg-accent/15 text-accent text-xs font-bold font-body uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Sparkles size={12} /> {post.category}
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-relaxed">
            {(i18n.language === 'en' && post.title_en) ? post.title_en : post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-secondary/80 font-body border-y border-muted/50 py-4">
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-accent" /> Đăng bởi: <strong className="text-primary">{post.author}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-accent" /> Ngày: <strong>{post.date}</strong>
            </span>
            
            {/* Mock Social Share */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wider text-secondary/50 flex items-center gap-1"><Share2 size={10} /> Chia sẻ:</span>
              <button className="text-secondary hover:text-accent transition-colors" aria-label="Share Facebook">
                <FaFacebook size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* 3. Hero Image */}
        <div className="aspect-[21/9] w-full overflow-hidden border border-muted bg-surface rounded-sm mb-10 shadow-md">
          <img 
            src={post.img} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4. Article Body Content */}
        <div className="prose prose-lg max-w-none text-left space-y-6 font-body text-base md:text-lg text-secondary leading-relaxed mb-12">
          {(() => {
            const rawContent = (i18n.language === 'en' && post.content_en) ? post.content_en : post.content;
            let paragraphs = [];
            if (Array.isArray(rawContent)) {
              paragraphs = rawContent;
            } else if (typeof rawContent === 'string') {
              paragraphs = rawContent.split(/\n+/).filter(Boolean);
            }
            if (paragraphs.length === 0) {
              paragraphs = [rawContent || ''];
            }

            return paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className={`whitespace-pre-line leading-relaxed ${
                  index === 0 ? 'first-letter:text-5xl first-letter:font-heading first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-accent first-letter:mt-1 first-letter:leading-none' : ''
                }`}
              >
                {paragraph}
              </p>
            ));
          })()}
        </div>

        {/* 4.5 Article Photo Gallery (If multiple images present) */}
        {post.gallery && post.gallery.length > 0 && (
          <div className="mb-16 space-y-4 border-t border-muted/50 pt-8">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-primary text-left flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span>Bộ Ảnh Bài Viết</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {post.gallery.map((imgUrl, gIdx) => (
                <div key={gIdx} className="aspect-[4/3] rounded-sm overflow-hidden border border-muted/80 bg-surface shadow-sm group">
                  <img 
                    src={imgUrl} 
                    alt={`${post.title} - Ảnh ${gIdx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Related Articles Section */}
        <div className="space-y-8 border-t border-muted/50 pt-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary text-left">Bài Viết Liên Quan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {backupRelated.map((relPost) => (
              <Link 
                key={relPost.id}
                to={`/news/${relPost.id}`}
                className="group flex flex-col md:flex-row bg-surface border border-muted rounded-sm overflow-hidden shadow-xs hover:shadow-lg transition-all duration-400"
              >
                <div className="md:w-1/3 aspect-[4/3] md:aspect-auto overflow-hidden relative">
                  <img 
                    src={relPost.img} 
                    alt={relPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="md:w-2/3 p-4 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[9px] font-bold font-body uppercase text-accent tracking-wider block mb-1">
                      {relPost.category}
                    </span>
                    <h3 className="font-heading text-base font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                      {relPost.title}
                    </h3>
                  </div>
                  <span className="font-body text-[10px] text-secondary/60 block mt-4">
                    {relPost.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default NewsDetail;
