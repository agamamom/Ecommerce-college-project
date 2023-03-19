import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarShopFilter from "../../components/shop-page/SidebarShopFilter";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsByCount,
  fetchProductsByFilter,
  getProductsCount,
  getProductsInShopByPage,
} from "../../functions/product";
import ProductSO from "../../components/product-specialOffer/ProductSO";
import { Breadcrumb } from "antd";
import BreadcrumbComponent from "../../components/breadcrumb/Breadcrumb";
import ScrollToTop from "react-scroll-to-top";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation(["shop"]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [star, setStar] = useState("");
  const [sub, setSub] = useState([]);
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  const [isChecked, setIsChecked] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    CountOfAllProducts();
  }, []);

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  const ref = useRef(null);

  const handleClick = (value) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setPage(value);
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsInShopByPage("createdAt", "desc", page).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const CountOfAllProducts = () => {
    getProductsCount().then((p) => {
      setProductsCount(p.data);
    });
  };

  useEffect(() => {
    if (text !== "") {
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
    } else {
      getProductsByCount(12).then((p) => {
        setProducts(p.data);
        setLoading(false);
      });
    }
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 3. load products based on price range
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const breadCrumb = () => {
    return (
      <div className="py-[50px] flex justify-between items-center relative z-[2px]">
        <div className="text-[30px] uppercase">{t("Shop Page.SHOP")}</div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">{t("Shop Page.Home")}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/shop`}>{t("Shop Page.shop")}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  };

  return (
    <div>
      <BreadcrumbComponent>{breadCrumb()}</BreadcrumbComponent>
      <div className="px-[45px] mt-[40px]" ref={ref}>
        <div className="grid grid-cols-5 gap-7">
          <div className="col-span-1 w-full ">
            <SidebarShopFilter
              price={price}
              setPrice={setPrice}
              fetchProducts={fetchProducts}
              star={star}
              setStar={setStar}
              setSub={setSub}
              sub={sub}
              setBrand={setBrand}
              brand={brand}
              setIsChecked={setIsChecked}
              setOk={setOk}
              ok={ok}
            />
          </div>
          {isChecked ? (
            <div className="col-span-4 w-full ">
              {products.length < 1 && <p>{t("Shop Page.No products found")}</p>}
              <div className="row pb-5">
                {products.map((product) => (
                  <div key={product._id} className="col-md-3 mt-3">
                    <ProductSO
                      height="h-[448px]"
                      product={product}
                      productBorderRight="product"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-4 w-full ">
              {products.length < 1 && <p>{t("Shop Page.No products found")}</p>}
              <div className="row pb-5">
                {products.map((p) => (
                  <div key={p._id} className="col-md-3 mt-3">
                    <ProductSO
                      height="h-[448px]"
                      product={p}
                      productBorderRight="product"
                    />
                  </div>
                ))}
                <div className="mt-10 mb-[14px] w-full">
                  <nav className="col-md-6 offset-md-4 text-center pt-5 p-3">
                    <Pagination
                      current={page}
                      total={productsCount}
                      onChange={(value) => handleClick(value)}
                      onShowSizeChange={(value) => handleClick(value)}
                    />
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ScrollToTop smooth />
    </div>
  );
};

export default Home;
