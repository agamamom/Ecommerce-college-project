import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
   getCoupons,
   removeCoupon,
   createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav/AdminNav";
import { useTranslation } from "react-i18next";

const CreateCouponPage = () => {
   const { t } = useTranslation(["adminNav"]);
   const [name, setName] = useState("");
   const [expiry, setExpiry] = useState(new Date());
   const [discount, setDiscount] = useState("");
   const [loading, setLoading] = useState("");
   const [coupons, setCoupons] = useState([]);

   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadAllCoupons();
   }, []);

   const loadAllCoupons = () =>
      getCoupons().then((res) => setCoupons(res.data));

   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      console.table(name, expiry, discount);
      createCoupon({ name, expiry, discount }, user.token)
         .then((res) => {
            setLoading(false);
            loadAllCoupons();
            setName("");
            setDiscount("");
            setExpiry("");
            toast.success(`"${res.data.name}" is created`);
         })
         .catch((err) => console.log("create coupon err", err));
   };

   const handleRemove = (couponId) => {
      if (window.confirm("Delete?")) {
         setLoading(true);
         removeCoupon(couponId, user.token)
            .then((res) => {
               loadAllCoupons(); // load all coupons
               setLoading(false);
               toast.error(`Coupon "${res.data.name}" deleted`);
            })
            .catch((err) => console.log(err));
      }
   };

   return (
      <div className="container-fluid">
         <div className="flex">
            <div className="w-[300px] fixed text-[20px] admin-nav">
               <AdminNav />
            </div>
            <main class="main-wrap">
               <section class="content-main">
                  <h4 class="content-header mb-[20px]">{t("coupon.Coupon")}</h4>
                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label className="text-muted">{t("coupon.Name")}</label>
                        <input
                           type="text"
                           className="form-control"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                           autoFocus
                           required
                        />
                     </div>

                     <div className="form-group">
                        <label className="text-muted">
                           {t("coupon.Discount")} %
                        </label>
                        <input
                           type="text"
                           className="form-control"
                           onChange={(e) => setDiscount(e.target.value)}
                           value={discount}
                           required
                        />
                     </div>

                     <div className="form-group">
                        <label className="text-muted">
                           {t("coupon.Expiry")}
                        </label>
                        <br />
                        <DatePicker
                           className="form-control"
                           selected={expiry}
                           onChange={(date) => setExpiry(date)}
                           required
                        />
                     </div>

                     <button className="btn btn-outline-primary">
                        {t("coupon.Save")}
                     </button>
                  </form>
                  <br />

                  <h4>
                     {coupons.length} {t("coupon.Coupons")}
                  </h4>

                  <table className="table table-bordered">
                     <thead className="thead-light">
                        <tr>
                           <th scope="col">{t("coupon.Name")}</th>
                           <th scope="col">{t("coupon.Expiry")}</th>
                           <th scope="col">{t("coupon.Discount")}</th>
                           <th scope="col">{t("coupon.Action")}</th>
                        </tr>
                     </thead>

                     <tbody>
                        {coupons.map((c) => (
                           <tr key={c._id}>
                              <td>{c.name}</td>
                              <td>{new Date(c.expiry).toLocaleDateString()}</td>
                              <td>{c.discount}%</td>
                              <td>
                                 <DeleteOutlined
                                    onClick={() => handleRemove(c._id)}
                                    className="text-danger pointer"
                                 />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </section>
            </main>
         </div>
      </div>
   );
};

export default CreateCouponPage;
