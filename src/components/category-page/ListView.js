import React, { useEffect, useState, useRef } from "react";
import { Pagination } from "antd";
import {
  getProducts,
  getCategoryProductByCount,
} from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductsListView from "../product-specialOffer/ProductsListView";

const ListView = ({ slug }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  console.log("slug----------=====-----==", slug);
  useEffect(() => {
    loadAllProducts();
  }, [page, slug]);

  useEffect(() => {
    getCategoryProductByCount(slug).then((res) => setProductsCount(res.data));
  }, []);

  const ref = useRef(null);

  const handleClick = (value) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setPage(value);
  };

  const loadAllProducts = () => {
    setLoading(true);

    // sort, order, limit
    getProducts("createdAt", "desc", page, slug).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="">
      <div
        ref={ref}
        className={`container ${
          products.length > 6 ? "min-h-[2500px]" : "h-0"
        } ${products.length < 5 ? "min-h-[1270px]" : "h-[0]"}`}
      >
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="w-full">
            {products.map((product) => (
              <div key={product._id} className="">
                <ProductsListView
                  product={product}
                  productBorderRight="product"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row mb-[14px] w-full">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={productsCount}
            onChange={(value) => handleClick(value)}
            onShowSizeChange={(value) => handleClick(value)}
          />
        </nav>
      </div>
    </div>
  );
};

export default ListView;
