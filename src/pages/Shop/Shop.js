import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/category-page/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../../functions/product";
import ProductSO from "../../components/product-specialOffer/ProductSO";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="px-[45px] mt-[40px]">
      <div className="grid grid-cols-5 gap-7">
        <div className="col-span-1 w-full ">
          <Sidebar />
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
  );
};

export default Home;
