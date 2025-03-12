import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import vi from "../locales/vi.json";
import * as Localization from 'react-native-localize';

// Lấy danh sách ngôn ngữ từ hệ thống
const locales = Localization.getLocales();

// Lấy mã ngôn ngữ mặc định (nếu không có thì dùng 'en')
const defaultLanguage = locales.length > 0 ? locales[0].languageTag.split("-")[0] : "en";

// Khởi tạo tài nguyên ngôn ngữ
const languageResources = {
    en: {
        translation: en
    },
    vi: {
        translation: vi
    }
};

// Cấu hình `i18next`
i18next
    .use(initReactI18next) // Khởi tạo react-i18next với i18next instance
    .init({
        resources: languageResources,
        lng: ["en", "vi"].includes(defaultLanguage) ? defaultLanguage : "en", // Ngôn ngữ mặc định
        fallbackLng: "en",
        compatibilityJSON: "v4", // Đảm bảo sử dụng định dạng JSON tương thích
        interpolation: {
            escapeValue: false // React đã tự động chống XSS
        }
    });

export default i18next;