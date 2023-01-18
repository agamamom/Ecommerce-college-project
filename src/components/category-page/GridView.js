import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductSO from "../product-specialOffer/ProductSO";

const GridView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const as = (productsCount / 3) * 10;

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="">
      <div
        className={`container ${
          products.length > 6 ? "min-h-[1350px]" : "h-0"
        }`}
      >
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductSO product={product} productBorderRight="product" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row mb-[14px] w-full">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={Math.round(as)}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </div>
  );
};

export default GridView;
