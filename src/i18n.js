import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Comprehensive UI Translations
const resources = {
  vi: {
    translation: {
      "home": "Trang chủ",
      "about": "Về chúng tôi",
      "products": "Sản phẩm",
      "projects": "Công trình",
      "capabilities": "Năng lực",
      "contact": "Liên hệ",
      "news": "Tin tức",
      "slogan_1": "Đá trường tồn. Kiến trúc trường tồn.",
      "slogan_2": "Timeless Stone. Timeless Architecture.",
      "hero_desc": "Từ nguồn đá tự nhiên tại các mỏ đá Lai Châu, HT STONE mang đến giải pháp trọn gói từ khai thác, sản xuất, cung ứng đến thi công, kiến tạo nên những công trình mang giá trị bền vững và trường tồn theo thời gian.",
      "discover": "Khám phá công trình",
      "view_products": "Xem sản phẩm",
      "download_catalogue": "Download Catalogue",
      "about_desc": "HT STONE là đơn vị khai thác, sản xuất, cung cấp và thi công đá tự nhiên tại Lai Châu, sở hữu nguồn nguyên liệu trực tiếp từ các mỏ đá Slate Đen và Đá Đa Sắc.",
      
      // Common UI Actions
      "view_details": "Xem chi tiết",
      "get_quote": "Báo giá",
      "request_quote_now": "Nhận Báo Giá Ngay",
      "download_catalogue_pdf": "Tải Catalogue PDF",
      "back_to_list": "Quay lại danh sách",
      "back_to_projects": "Quay lại danh sách công trình",
      "all_products": "Tất cả sản phẩm",
      "all_projects": "Tất cả công trình",
      "all_articles": "Tất cả bài viết",
      "search_articles": "Tìm kiếm bài viết...",
      "no_results": "Không tìm thấy kết quả phù hợp",
      "loading": "Đang tải dữ liệu...",
      "get_directions": "Chỉ đường",
      
      // Product Specs & Tabs
      "specs_sizes": "Kích thước:",
      "specs_thickness": "Độ dày:",
      "specs_surface": "Cạnh viền:",
      "specs_origin": "Xuất xứ:",
      "quick_specs": "Thông tin quy cách nhanh",
      "tab_features": "Đặc tính nổi bật",
      "tab_tech": "Thông số vật lý",
      "tab_apps": "Ứng dụng thi công",
      "related_products": "Sản phẩm cùng loại",
      
      // Product Categories
      "cat_all": "Tất cả sản phẩm",
      "cat_black_roofing": "Đá Slate Đen Lợp Mái",
      "cat_black_cladding": "Đá Slate Đen Ốp Lát",
      "cat_multi_roofing": "Đá Slate Đa Sắc Lợp Mái",
      "cat_multi_cladding": "Đá Slate Đa Sắc Ốp Lát",
      "cat_random": "Đá Rối Tự Nhiên",
      
      // Projects
      "project_portfolio": "DANH SÁCH DỰ ÁN",
      "featured_projects": "Công Trình Tiêu Biểu",
      "view_more_projects": "XEM THÊM DỰ ÁN",
      "project_overview": "Tổng Quan Dự Án",
      "request_similar_consultation": "Tư Vấn Công Trình Tương Tự",
      "consultation_prompt": "Bạn muốn nhận phương án bản vẽ chia đá và dự toán chi phí thi công cho công trình của mình?",
      "contact_consult_now": "Liên hệ tư vấn ngay",
      "other_projects": "Các Công Trình Khác",
      
      // Quality Guarantee (Sheet 3)
      "quality_commitment": "Cam Kết Chất Lượng HT STONE",
      "quality_commitment_desc": "Chúng tôi đặt chất lượng lên hàng đầu, từ khâu khai thác, gia công đến hoàn thiện, để mỗi phiến đá đều giữ trọn vẻ đẹp tự nhiên và giá trị lâu dài.",
      "quality_commitment_cta": "LIÊN HỆ NHẬN BÁO GIÁ",
      
      // Contact & Footer Details (Sheet 1 & 6)
      "contact_title": "THÔNG TIN LIÊN HỆ",
      "quarry_network": "Văn Phòng & Hệ Thống Mỏ Đá",
      "laichau_office_name": "HT STONE – Văn phòng Lai Châu",
      "laichau_office_addr": "Số nhà 206 Trần Hưng Đạo, phường Đoàn Kết, tỉnh Lai Châu",
      "namho_quarry_name": "HT STONE – Mỏ đá Đen Nậm Ho",
      "namho_quarry_addr": "Xã Pa Tần, Tỉnh Lai Châu",
      "phiengen_quarry_name": "HT STONE – Mỏ đá Đa Sắc Phiêng Én",
      "phiengen_quarry_addr": "Xã Lê Lợi, Tỉnh Lai Châu",
      "brand_statement": "HT STONE là thương hiệu đá tự nhiên thuộc Công ty TNHH MTV Thương mại và Xây dựng Hiền Tài",
      
      // Form fields
      "form_name": "Họ và tên *",
      "form_phone": "Số điện thoại *",
      "form_email": "Địa chỉ Email",
      "form_message": "Nội dung cần tư vấn (Loại đá, diện tích, quy cách...)",
      "form_send": "GỬI YÊU CẦU BÁO GIÁ",
      "form_sending": "ĐANG GỬI...",
      "form_success_title": "Cảm Ơn Quý Khách Đã Gửi Yêu Cầu!",
      "form_success_desc": "Đội ngũ chuyên viên HT STONE đã tiếp nhận thông tin và sẽ liên hệ trực tiếp tới số điện thoại của quý khách trong thời gian sớm nhất."
    }
  },
  en: {
    translation: {
      "home": "Home",
      "about": "About Us",
      "products": "Products",
      "projects": "Projects",
      "capabilities": "Capabilities",
      "contact": "Contact",
      "news": "News",
      "slogan_1": "Timeless Stone. Timeless Architecture.",
      "slogan_2": "Đá trường tồn. Kiến trúc trường tồn.",
      "hero_desc": "From natural stone sources at Lai Chau quarries, HT STONE offers comprehensive solutions from mining, production, and supply to construction, creating projects with sustainable value that last over time.",
      "discover": "Discover Projects",
      "view_products": "View Products",
      "download_catalogue": "Download Catalogue",
      "about_desc": "HT STONE is a unit exploring, producing, supplying and constructing natural stone in Lai Chau, owning direct raw materials from Black Slate and Multicolor Slate quarries.",
      
      // Common UI Actions
      "view_details": "View Details",
      "get_quote": "Get a Quote",
      "request_quote_now": "Request Quotation Now",
      "download_catalogue_pdf": "Download Catalogue PDF",
      "back_to_list": "Back to List",
      "back_to_projects": "Back to Projects",
      "all_products": "All Products",
      "all_projects": "All Projects",
      "all_articles": "All Articles",
      "search_articles": "Search articles...",
      "no_results": "No matching results found",
      "loading": "Loading data...",
      "get_directions": "Get Directions",
      
      // Product Specs & Tabs
      "specs_sizes": "Sizes:",
      "specs_thickness": "Thickness:",
      "specs_surface": "Edge Profile:",
      "specs_origin": "Origin:",
      "quick_specs": "Quick Specifications",
      "tab_features": "Key Features",
      "tab_tech": "Physical Properties",
      "tab_apps": "Applications",
      "related_products": "Related Products",
      
      // Product Categories
      "cat_all": "All Products",
      "cat_black_roofing": "Black Slate Roofing",
      "cat_black_cladding": "Black Slate Cladding & Paving",
      "cat_multi_roofing": "Multicolor Slate Roofing",
      "cat_multi_cladding": "Multicolor Slate Cladding & Paving",
      "cat_random": "Natural Random Slate",
      
      // Projects
      "project_portfolio": "PROJECT PORTFOLIO",
      "featured_projects": "Architectural Masterpieces",
      "view_more_projects": "VIEW MORE PROJECTS",
      "project_overview": "Project Overview",
      "request_similar_consultation": "Request Consultation for Similar Projects",
      "consultation_prompt": "Would you like to receive custom stone layout drawings and cost estimates for your project?",
      "contact_consult_now": "Contact Us Now",
      "other_projects": "Other Projects",
      
      // Quality Guarantee (Sheet 3)
      "quality_commitment": "HT STONE Quality Commitment",
      "quality_commitment_desc": "We place quality at the heart of every stage — from quarrying and processing to final finishing — ensuring that every stone slab preserves its natural beauty and delivers lasting value.",
      "quality_commitment_cta": "GET A QUOTE",
      
      // Contact & Footer Details (Sheet 1 & 6)
      "contact_title": "CONTACT INFORMATION",
      "quarry_network": "Headquarters & Quarry Network",
      "laichau_office_name": "HT STONE – Lai Chau Office",
      "laichau_office_addr": "206 Tran Hung Dao Street, Doan Ket Ward, Lai Chau Province, Vietnam",
      "namho_quarry_name": "HT STONE – Nam Ho Black Slate Quarry",
      "namho_quarry_addr": "Pa Tan Commune, Lai Chau Province, Vietnam",
      "phiengen_quarry_name": "HT STONE – Phieng En Multicolor Slate Quarry",
      "phiengen_quarry_addr": "Le Loi Commune, Lai Chau Province, Vietnam",
      "brand_statement": "HT STONE is the natural stone brand of Hien Tai Trading & Construction One Member Co., Ltd.",
      
      // Form fields
      "form_name": "Full Name *",
      "form_phone": "Phone Number *",
      "form_email": "Email Address",
      "form_message": "Project Details / Requirements (Stone type, area, specifications...)",
      "form_send": "SEND QUOTATION REQUEST",
      "form_sending": "SENDING...",
      "form_success_title": "Thank You For Reaching Out!",
      "form_success_desc": "Our technical team has received your inquiry and will contact you directly via phone shortly."
    }
  }
};

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('i18nextLng');
    if (saved && (saved.startsWith('en') || saved === 'en')) return 'en';
    if (saved && (saved.startsWith('vi') || saved === 'vi')) return 'vi';
  }
  return 'vi';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false
    }
  });

if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    const cleanLng = (lng && lng.toLowerCase().startsWith('en')) ? 'en' : 'vi';
    localStorage.setItem('i18nextLng', cleanLng);
  });
}

export default i18n;
