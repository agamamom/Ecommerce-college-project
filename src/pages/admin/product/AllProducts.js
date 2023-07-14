import React, { useState, useEffect } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FallingLines } from "react-loader-spinner";

const AllProducts = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);

   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadAllProducts();
   }, []);

   const loadAllProducts = () => {
      setLoading(true);
      getProductsByCount(100)
         .then((res) => {
            setProducts(res.data);
            setLoading(false);
         })
         .catch((err) => {
            setLoading(false);
            console.log(err);
         });
   };

   const handleRemove = (slug) => {
      // let answer = window.confirm("Delete?");
      if (window.confirm("Delete?")) {
         // console.log("send delete request", slug);
         removeProduct(slug, user.token)
            .then((res) => {
               loadAllProducts();
               toast.error(`${res.data.title} is deleted`);
            })
            .catch((err) => {
               if (err.response.status === 400) toast.error(err.response.data);
               console.log(err);
            });
      }
   };

   return (
      <div className="container-fluid">
         <div className="flex">
            <div className="w-[300px] fixed text-[20px] admin-nav">
               <AdminNav />
            </div>
            <main className="main-wrap text-[20px]">
               <section className="content-main">
                  {loading ? (
                     <FallingLines
                        color="#4fa94d"
                        width="100"
                        visible={true}
                        ariaLabel="falling-lines-loading"
                     />
                  ) : (
                     <h4>All Products</h4>
                  )}
                  <div className="row">
                     {products.map((product) => (
                        <div key={product._id} className="col-md-3 pb-3">
                           <AdminProductCard
                              product={product}
                              handleRemove={handleRemove}
                           />
                        </div>
                     ))}
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
};

export default AllProducts;
