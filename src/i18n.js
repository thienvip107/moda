import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  vi: {
    translation: {
      "home": "Trang chủ",
      "about": "Về chúng tôi",
      "products": "Sản phẩm",
      "projects": "Công trình",
      "capabilities": "Năng lực",
      "contact": "Liên hệ",
      "slogan_1": "Đá trường tồn. Kiến trúc trường tồn.",
      "slogan_2": "Timeless Stone. Timeless Architecture.",
      "hero_desc": "Từ nguồn đá tự nhiên tại các mỏ đá Lai Châu, HT STONE mang đến giải pháp trọn gói từ khai thác, sản xuất, cung ứng đến thi công, kiến tạo nên những công trình mang giá trị bền vững và trường tồn theo thời gian.",
      "discover": "Khám phá công trình",
      "view_products": "Xem sản phẩm",
      "download_catalogue": "Download Catalogue",
      "about_desc": "HT STONE là đơn vị khai thác, sản xuất, cung cấp và thi công đá tự nhiên tại Lai Châu, sở hữu nguồn nguyên liệu trực tiếp từ các mỏ đá Slate Đen và Đá Đa Sắc.",
      // More translations to be added
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
      "slogan_1": "Timeless Stone. Timeless Architecture.",
      "slogan_2": "Đá trường tồn. Kiến trúc trường tồn.",
      "hero_desc": "From natural stone sources at Lai Chau quarries, HT STONE offers comprehensive solutions from mining, production, and supply to construction, creating projects with sustainable value that last over time.",
      "discover": "Discover Projects",
      "view_products": "View Products",
      "download_catalogue": "Download Catalogue",
      "about_desc": "HT STONE is a unit exploring, producing, supplying and constructing natural stone in Lai Chau, owning direct raw materials from Black Slate and Multicolor Slate quarries.",
      // More translations to be added
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi", // default language
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
