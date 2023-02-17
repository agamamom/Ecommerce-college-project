import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarShopFilter from "../../components/shop-page/SidebarShopFilter";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../../functions/product";
import ProductSO from "../../components/product-specialOffer/ProductSO";
import { Breadcrumb } from "antd";
import BreadcrumbComponent from "../../components/breadcrumb/Breadcrumb";
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [star, setStar] = useState("");
  const [sub, setSub] = useState([]);
  const [brand, setBrand] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
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

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setStar("");
    setSub("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const breadCrumb = () => {
    return (
      <div className="py-[50px] flex justify-between items-center relative z-[2px]">
        <div className="text-[30px] uppercase">SHOP</div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/shop`}>shop</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  };

  return (
    <div>
      <BreadcrumbComponent>{breadCrumb()}</BreadcrumbComponent>
      <div className="px-[45px] mt-[40px]">
        <div className="grid grid-cols-5 gap-7">
          <div className="col-span-1 w-full ">
            <SidebarShopFilter
              handleSlider={handleSlider}
              price={price}
              setPrice={setPrice}
              fetchProducts={fetchProducts}
              star={star}
              setStar={setStar}
              setSub={setSub}
              sub={sub}
              setBrand={setBrand}
              brand={brand}
            />
          </div>
          <div className="col-span-4 w-full ">
            {products.length < 1 && <p>No products found</p>}
            <div className="row pb-5">
              {products.map((p) => (
                <div key={p._id} className="col-md-3 mt-3">
                  <ProductSO product={p} productBorderRight="product" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop smooth />
    </div>
  );
};

export default Home;
