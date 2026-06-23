import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, User, MoveRight } from 'lucide-react';
import { newsList } from '../data/news';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  React.useEffect(() => {
    document.title = "Tin tức & Cẩm nang | HT STONE - Đá Tự Nhiên Lai Châu";
    window.scrollTo(0, 0);
  }, []);

  const categories = ['all', 'Kỹ thuật thi công', 'Kiến thức vật liệu', 'Vận hành mỏ', 'Ý tưởng thiết kế', 'Chăm sóc nhà cửa'];

  const filteredNews = newsList.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background text-primary pt-24 pb-20">
      {/* 1. Header Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-muted/20 border-b border-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-3xl">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-body uppercase tracking-widest text-accent text-xs font-bold">Tin tức & Cẩm nang</span>
            <div className="w-12 h-[1px] bg-accent"></div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-primary mb-6">
            Không gian kiến thức <br />
            <span className="font-bold">Đá Slate Lai Châu</span>
          </h1>
          <p className="font-body text-secondary text-sm md:text-base leading-relaxed">
            Nơi chia sẻ các bài viết kỹ thuật thi công chuẩn chỉ, cẩm nang chọn lựa đá tự nhiên chất lượng cao và các ý tưởng phối cảnh thiết kế độc bản từ chuyên gia kiến trúc.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Bar */}
      <section className="py-8 bg-background border-b border-muted/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-body text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-full border transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-accent border-accent text-surface shadow-sm'
                    : 'border-muted text-secondary hover:text-primary hover:border-secondary'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
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
              {filteredNews.map((post) => (
                <article 
                  key={post.id}
                  className="group bg-surface border border-muted rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden"
                >
                  {/* Thumbnail */}
                  <Link to={`/news/${post.id}`} className="aspect-[16/10] overflow-hidden relative block">
                    <img 
                      src={post.img} 
                      alt={post.title} 
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
                          <Sparkles size={10} /> {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {post.date}
                        </span>
                      </div>

                      {/* Title */}
                      <Link to={`/news/${post.id}`} className="block mb-3">
                        <h3 className="text-xl font-heading font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      <p className="font-body text-xs text-secondary/80 leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Read More */}
                    <div className="pt-4 border-t border-muted/50 flex items-center justify-between text-secondary">
                      <span className="flex items-center gap-1 font-body text-[10px] uppercase tracking-wider">
                        <User size={10} /> {post.author}
                      </span>
                      <Link 
                        to={`/news/${post.id}`}
                        className="inline-flex items-center gap-1 text-accent font-body uppercase tracking-wider text-[10px] font-bold hover:text-primary transition-colors"
                      >
                        Đọc tiếp <MoveRight size={10} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/5 border border-muted border-dashed rounded-sm max-w-xl mx-auto">
              <p className="font-body text-secondary text-base">Không tìm thấy bài viết nào phù hợp.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="mt-4 text-accent font-body text-xs uppercase tracking-wider font-bold hover:text-primary transition-colors border-b border-accent hover:border-primary pb-0.5"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default News;
