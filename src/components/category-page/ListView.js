import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductsListView from "../product-specialOffer/ProductsListView";

const ListView = ({ slug }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadAllProducts();
  }, [page, slug]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const as = (productsCount / 3) * 10;

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
        className={`container ${
          products.length > 6 ? "min-h-[2500px]" : "h-0"
        } ${products.length < 4 ? "min-h-[1270px]" : "h-[0]"}`}
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
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </div>
  );
};

export default ListView;
