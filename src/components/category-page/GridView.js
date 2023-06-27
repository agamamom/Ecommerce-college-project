import React, { useEffect, useState, useRef } from "react";
import { Pagination } from "antd";
import {
   getProducts,
   getCategoryProductByCount,
} from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductSO from "../product-specialOffer/ProductSO";
import { useLocation } from "react-router-dom";

const GridView = ({ slug }) => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [productsCount, setProductsCount] = useState(0);
   const [page, setPage] = useState(1);
   const [getSlug, setGetSlug] = useState(slug);

   const prevSlug = useRef(getSlug);
   const location = useLocation();
   useEffect(() => {
      setGetSlug(slug);
      prevSlug.current = getSlug;
      if (prevSlug !== getSlug) {
         setPage(1);
      }
   }, [slug]);

   useEffect(() => {
      loadAllProducts();
   }, [location]);

   useEffect(() => {
      loadAllProducts();
   }, [page]);

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
               products.length > 6 ? "min-h-[1450px]" : "h-0"
            } ${products.length < 5 ? "min-h-[930px]" : "h-[0]"}`}
         >
            {loading ? (
               <LoadingCard count={3} />
            ) : (
               <div className="row">
                  {products.map((product) => (
                     <div key={product._id} className="col-md-4">
                        <ProductSO
                           height="h-full"
                           product={product}
                           productBorderRight="product"
                        />
                     </div>
                  ))}
               </div>
            )}
         </div>

         <div className="row mb-[14px] w-full">
            <nav className=" text-center pt-5 p-3">
               <Pagination
                  current={page}
                  total={productsCount * 2}
                  onChange={(value) => handleClick(value)}
                  onShowSizeChange={(value) => handleClick(value)}
               />
            </nav>
         </div>
      </div>
   );
};

export default GridView;
