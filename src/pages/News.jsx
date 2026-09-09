import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Calendar, User, MoveRight } from 'lucide-react';
import { getNewsList } from '../services/api';
import SEO from '../components/SEO';

const News = () => {
  const { t, i18n } = useTranslation();
  const isEn = Boolean(i18n?.language && i18n.language.toLowerCase().startsWith('en'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = isEn ? "News & Insights | HT STONE - Lai Chau Natural Slate" : "Tin tức & Cẩm nang | HT STONE - Đá Tự Nhiên Lai Châu";
    window.scrollTo(0, 0);

    async function fetchNews() {
      try {
        const data = await getNewsList();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [isEn]);

  const categories = [
    { key: 'all', name_vi: 'Tất cả', name_en: 'All Articles' },
    { key: 'Tin tức công ty', name_vi: 'Tin tức công ty', name_en: 'Company News' },
    { key: 'Kỹ thuật thi công', name_vi: 'Kỹ thuật thi công', name_en: 'Installation Techniques' },
    { key: 'Kiến thức vật liệu', name_vi: 'Kiến thức vật liệu', name_en: 'Material Knowledge' },
    { key: 'Vận hành mỏ', name_vi: 'Vận hành mỏ', name_en: 'Quarry Operations' },
    { key: 'Ý tưởng thiết kế', name_vi: 'Ý tưởng thiết kế', name_en: 'Design Inspiration' },
    { key: 'Chăm sóc nhà cửa', name_vi: 'Chăm sóc nhà cửa', name_en: 'Home Care' }
  ];

  const getPostCategoryLabel = (cat) => {
    const found = categories.find(c => c.key === cat);
    if (!found) return cat;
    return isEn ? found.name_en : found.name_vi;
  };

  const filteredNews = news.filter(post => {
    const title = isEn ? (post.title_en || post.title || '') : (post.title || '');
    const excerpt = isEn ? (post.excerpt_en || post.summary_en || post.excerpt || post.summary || '') : (post.excerpt || post.summary || '');
    const content = isEn ? (post.content_en || post.content || '') : (post.content || '');
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (post.title || '').toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background text-primary pb-20">
      <SEO 
        title={isEn ? "News & Articles - Lai Chau Natural Slate Quarries | HT STONE" : "Tin Tức & Cẩm Nang Đá Slate Lai Châu - Mỏ Đá & Thi Công | HT STONE"}
        description={isEn ? "Discover the latest updates, craftsmanship insights, and installation guides on Lai Chau Natural Slate from HT STONE." : "Cập nhật tin tức mới nhất về ngành đá tự nhiên, kỹ thuật lợp mái đá đen Lai Châu, kinh nghiệm chọn đá ốp tường sân vườn và báo giá tận mỏ."}
        keywords="tin tức đá lai châu, cẩm nang đá đen, kỹ thuật lợp mái đá, kinh nghiệm chọn đá ốp tường, mỏ đá lai châu, ht stone"
        canonical="/news"
      />
      {/* 1. Header Section with Banner Photo */}
      <section className="relative h-[450px] md:h-[540px] lg:h-[600px] flex items-center justify-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/img/banners/banner_news.jpg" 
            alt="HT STONE News & Knowledge Center" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30 z-10"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-20 max-w-3xl animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-[0.2em] text-accent text-xs font-bold">
              {isEn ? 'NEWS & ARTICLES' : 'Tin tức & Cẩm nang'}
            </span>
            <div className="w-10 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-light text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {isEn ? 'Architecture & Insights' : 'Không gian kiến thức'} <br />
            <span className="font-bold">{isEn ? 'Lai Chau Slate Stone' : 'Đá Slate Lai Châu'}</span>
          </h1>
        </div>
      </section>

      {/* 2. Filter & Search Bar */}
      <section className="py-8 bg-background border-b border-muted/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`font-body text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-full border transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat.key
                    ? 'bg-accent border-accent text-surface shadow-sm'
                    : 'border-muted text-secondary hover:text-primary hover:border-secondary'
                }`}
              >
                {isEn ? cat.name_en : cat.name_vi}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder={isEn ? "Search articles..." : "Tìm kiếm bài viết..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-muted py-2.5 px-4 pr-10 rounded-sm font-body text-sm focus:outline-none focus:border-accent text-primary"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60">
              🔍
            </span>
          </div>
        </div>
      </section>

      {/* 3. News Grid List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {filteredNews.map((post) => {
                const postTitle = isEn ? (post.title_en || post.title) : post.title;
                const postExcerpt = isEn ? (post.excerpt_en || post.summary_en || post.excerpt || post.summary) : (post.excerpt || post.summary);
                const postImg = post.img || post.cover_image || '/assets/img/banners/banner_news.jpg';
                const postSlug = post.slug || post.id;

                return (
                  <article 
                    key={post.id}
                    className="group bg-surface border border-muted rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <Link to={`/news/${postSlug}`} className="aspect-[16/10] overflow-hidden relative block">
                      <img 
                        src={postImg} 
                        alt={postTitle} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Link>

                    {/* Body Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-[10px] text-secondary/80 font-body uppercase tracking-wider mb-3">
                          <span className="text-accent font-bold flex items-center gap-1">
                            <Sparkles size={10} /> {getPostCategoryLabel(post.category)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={10} /> {post.date}
                          </span>
                        </div>

                        {/* Title */}
                        <Link to={`/news/${postSlug}`} className="block mb-3">
                          <h3 className="text-xl font-heading font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                            {postTitle}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        <p className="font-body text-xs text-secondary/80 leading-relaxed mb-6 line-clamp-3">
                          {postExcerpt}
                        </p>
                      </div>

                      {/* Author & Read More */}
                      <div className="pt-4 border-t border-muted/50 flex items-center justify-between text-secondary">
                        <span className="flex items-center gap-1 font-body text-[10px] uppercase tracking-wider">
                          <User size={10} /> {post.author || 'HT STONE'}
                        </span>
                        <Link 
                          to={`/news/${postSlug}`}
                          className="inline-flex items-center gap-1 text-accent font-body uppercase tracking-wider text-[10px] font-bold hover:text-primary transition-colors"
                        >
                          {isEn ? 'Read more' : 'Đọc tiếp'} <MoveRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/5 border border-muted border-dashed rounded-sm max-w-xl mx-auto">
              <p className="font-body text-secondary text-base">
                {isEn ? 'No articles found matching your criteria.' : 'Không tìm thấy bài viết nào phù hợp.'}
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="mt-4 text-accent font-body text-xs uppercase tracking-wider font-bold hover:text-primary transition-colors border-b border-accent hover:border-primary pb-0.5"
              >
                {isEn ? 'Reset Filter' : 'Đặt lại bộ lọc'}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default News;
