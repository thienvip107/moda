import React, { useEffect } from 'react';

/**
 * Custom SEO Component for dynamic Head Meta & Structured Data management.
 * Ensures search engines and social media crawlers receive dynamic meta tags
 * for generic keywords (mỏ đá, đá đen, đá lai châu, đá cao cấp).
 */
const SEO = ({
  title = 'Mỏ Đá Slate Lai Châu - Đá Đen, Đá Đa Sắc Cao Cấp | HT STONE',
  description = 'HT STONE sở hữu mỏ đá Lai Châu khai thác trực tiếp. Chuyên gia công & thi công đá đen Lai Châu, đá đa sắc lợp mái biệt thự, ốp tường, lát sân vườn cao cấp. Báo giá tại mỏ.',
  keywords = 'mỏ đá, đá đen, đá lai châu, đá cao cấp, đá slate lai châu, đá đen lai châu, đá đa sắc lai châu, đá lợp mái biệt thự, đá ốp tường mặt tiền, đá lát sân vườn, báo giá đá lai châu, giá đá lợp mái, mua đá slate ở đâu, ngói đá vảy cá, đá chẻ tay thủ công, đá tự nhiên lát lối đi, ht stone, modalaichau',
  canonical = '',
  ogImage = 'https://www.modalaichau.com/assets/img/roofing_slate.jpg',
  ogType = 'website',
  schemaData = null
}) => {
  const siteUrl = 'https://www.modalaichau.com';
  const currentCanonical = canonical ? `${siteUrl}${canonical}` : (window.location.href ? window.location.href.split('?')[0] : siteUrl);

  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // Helper to update or create meta tags
    const updateMetaTag = (selector, attributeName, attributeValue, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper to update canonical link
    const updateCanonical = (url) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', url);
    };

    // 2. Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    
    // 3. OpenGraph Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', currentCanonical);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);

    // 4. Twitter Card Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 5. Canonical Link
    updateCanonical(currentCanonical);

    // 6. Dynamic JSON-LD Schema
    const schemaId = 'dynamic-seo-schema';
    let schemaScript = document.getElementById(schemaId);
    if (schemaData) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('id', schemaId);
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaData);
    } else if (schemaScript) {
      schemaScript.remove();
    }

  }, [title, description, keywords, currentCanonical, ogImage, ogType, schemaData]);

  return null;
};

export default SEO;
