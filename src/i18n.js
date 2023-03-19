import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "./locales/en/home.json";
import HOME_VI from "./locales/vi/home.json";
import SHOP_EN from "./locales/en/shop.json";
import SHOP_VI from "./locales/vi/shop.json";
import PRODUCT_EN from "./locales/en/product.json";
import PRODUCT_VI from "./locales/vi/product.json";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
};

const resources = {
  en: {
    home: HOME_EN,
    shop: SHOP_EN,
    product: PRODUCT_EN,
  },
  vi: {
    home: HOME_VI,
    shop: SHOP_VI,
    product: PRODUCT_VI,
  },
};

const defaultNS = "home";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.
    ns: ["home", "shop", "product"],
    fallbackLng: "vi",
    defaultNS,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
