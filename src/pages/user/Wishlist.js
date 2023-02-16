import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import ProductSO from "../../components/product-specialOffer/ProductSO";

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
              {wishlist.map((p) => (
                // <div
                //   key={p._id}
                //   className="alert alert-secondary flex items-center justify-between"
                // >
                //   <Link to={`/product/${p.slug}`}>{p.title}</Link>
                //   <span
                //     onClick={() => handleRemove(p._id)}
                //     className="btn btn-sm flex"
                //   >
                //     <DeleteOutlined className="text-danger" />
                //   </span>
                // </div>
                <div key={p._id} className="col-md-3 mt-3">
                  <ProductSO product={p} productBorderRight="product" />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Wishlist;
