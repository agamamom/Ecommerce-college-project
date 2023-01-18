import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductSO from "../product-specialOffer/ProductSO";
import ProductsListView from "../product-specialOffer/ProductsListView";

const ListView = () => {
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

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="h-[1350px] relative">
      <div className="container absolute">
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

      <div className="row mb-[14px] absolute -bottom-[100px] w-full">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </div>
  );
};

export default ListView;
