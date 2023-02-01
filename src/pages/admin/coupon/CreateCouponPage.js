import React from "react";
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

const CreateCouponPage = () => {
  return (
    <div className="container-fluid">
      <div className="flex">
        <div className="w-[300px] fixed text-[20px] admin-nav">
          <AdminNav />
        </div>
        <main class="main-wrap">
          <section class="content-main">
            <div class="content-header">Coupon</div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CreateCouponPage;
