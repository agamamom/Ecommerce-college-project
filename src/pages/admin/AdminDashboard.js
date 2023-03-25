import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
   const { t } = useTranslation(["adminNav"]);
   const [orders, setOrders] = useState([]);
   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadOrders();
   }, []);

   const loadOrders = () =>
      getOrders(user.token).then((res) => {
         setOrders(res.data);
      });

   const handleStatusChange = (orderId, orderStatus) => {
      changeStatus(orderId, orderStatus, user.token).then((res) => {
         toast.success("Status updated");
         loadOrders();
      });
   };

   return (
      <div className="container-fluid">
         <div className="flex">
            <div className="w-[300px] fixed text-[20px] admin-nav">
               <AdminNav />
            </div>
            <main class="main-wrap text-[20px]">
               <section class="content-main">
                  <h4>{t("adminDashboard.Admin Dashboard")}</h4>
                  <Orders
                     orders={orders}
                     handleStatusChange={handleStatusChange}
                  />
               </section>
            </main>
         </div>
      </div>
   );
};

export default AdminDashboard;
