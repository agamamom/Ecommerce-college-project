import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";

import ProductsListView from "../../components/product-specialOffer/ProductsListView";

const Wishlist = () => {
   const [wishlist, setWishlist] = useState([]);
   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadWishlist();
   }, []);

   const loadWishlist = () =>
      getWishlist(user.token).then((res) => {
         setWishlist(res.data.wishlist);
      });

   const handleRemove = (productId) =>
      removeWishlist(productId, user.token).then((res) => {
         loadWishlist();
      });

   return (
      <div className="container-fluid">
         <div className="flex">
            <div className="w-[300px] fixed text-[20px] admin-nav">
               <UserNav />
            </div>
            <main class="main-wrap">
               <section class="content-main">
                  <div class="">
                     <h4>Wishlist</h4>
                     <div className="w-full">
                        {wishlist.map((p) => (
                           <div key={p._id}>
                              <ProductsListView
                                 product={p}
                                 productBorderRight="product"
                                 handleRemove={handleRemove}
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
};

export default Wishlist;
