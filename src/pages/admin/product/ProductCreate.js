import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

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
   color: "",
   brand: "",
};

const ProductCreate = () => {
   const { t } = useTranslation(["adminNav"]);
   const [values, setValues] = useState(initialState);
   const [subOptions, setSubOptions] = useState([]);
   const [showSub, setShowSub] = useState(false);
   const [loading, setLoading] = useState(false);

   // redux
   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadCategories();
   }, []);

   const loadCategories = () =>
      getCategories().then((c) => setValues({ ...values, categories: c.data }));

   const handleSubmit = (e) => {
      e.preventDefault();
      createProduct(values, user.token)
         .then((res) => {
            console.log(res);
            window.alert(`"${res.data.title}" is created`);
            window.location.reload();
         })
         .catch((err) => {
            console.log(err);
            // if (err.response.status === 400) toast.error(err.response.data);
            toast.error(err.response.data.err);
         });
   };

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, " ----- ", e.target.value);
   };

   const handleCategoryChange = (e) => {
      e.preventDefault();
      console.log("CLICKED CATEGORY", e.target.value);
      setValues({ ...values, subs: [], category: e.target.value });
      getCategorySubs(e.target.value).then((res) => {
         console.log("SUB OPTIONS ON CATGORY CLICK", res);
         setSubOptions(res.data);
      });
      setShowSub(true);
   };

   return (
      <div className="container-fluid">
         <div className="flex">
            <div className="w-[300px] fixed text-[20px] admin-nav">
               <AdminNav />
            </div>

            <main className="main-wrap">
               <section className="content-main">
                  <div className="">
                     {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                     ) : (
                        <h4>{t("ProductCreate.Product create")}</h4>
                     )}
                     <hr />

                     <div className="mt-[20px]">{t("ProductCreate.Image")}</div>

                     <div className="p-[20px]">
                        <FileUpload
                           values={values}
                           setValues={setValues}
                           setLoading={setLoading}
                        />
                     </div>

                     <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                        setValues={setValues}
                     />
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
};

export default ProductCreate;
