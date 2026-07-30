import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Projects from './pages/Projects';
import Capabilities from './pages/Capabilities';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';

// Admin CMS imports
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import DashboardOverview from './admin/pages/DashboardOverview';
import BannerManager from './admin/pages/BannerManager';
import NewsManager from './admin/pages/NewsManager';
import ProductManager from './admin/pages/ProductManager';
import ProjectManager from './admin/pages/ProjectManager';
import EventManager from './admin/pages/EventManager';
import PolicyManager from './admin/pages/PolicyManager';
import SettingsManager from './admin/pages/SettingsManager';



import { useTranslation } from 'react-i18next';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout cho trang Public (có Header & Footer)
const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Web Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Admin CMS Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="banners" element={<BannerManager />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="events" element={<EventManager />} />
            <Route path="policies" element={<PolicyManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

