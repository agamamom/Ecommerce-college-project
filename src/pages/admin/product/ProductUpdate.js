import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  // router
  let { slug } = useParams();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      setValues({ ...values, ...p.data });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="flex">
        <div className="w-[300px] fixed text-[20px] admin-nav">
          <AdminNav />
        </div>

        <main class="main-wrap">
          <section class="content-main">
            <div className="">
              <h4>Product update</h4>
              <ProductUpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setValues={setValues}
                values={values}
              />
              <hr />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductUpdate;
