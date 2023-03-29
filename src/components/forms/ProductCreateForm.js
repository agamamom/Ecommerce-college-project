import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;

const ProductCreateForm = ({
   handleSubmit,
   handleChange,
   values,
   handleCategoryChange,
   subOptions,
   showSub,
   setValues,
}) => {
   // destructure
   const {
      title,
      description,
      price,
      categories,
      subs,
      quantity,
      colors,
      brand,
   } = values;
   const { t } = useTranslation(["adminNav"]);
   return (
      <form onSubmit={handleSubmit}>
         <div className="form-group">
            <label>{t("ProductCreate.Title")}</label>
            <input
               type="text"
               name="title"
               className="form-control"
               value={title}
               onChange={handleChange}
            />
         </div>

         <div className="form-group">
            <label>{t("ProductCreate.Description")}</label>
            <textarea
               type="text"
               name="description"
               className="form-control"
               value={description}
               onChange={handleChange}
            />
         </div>

         <div className="form-group">
            <label>{t("ProductCreate.Price")}</label>
            <input
               type="number"
               name="price"
               className="form-control"
               value={price}
               onChange={handleChange}
            />
         </div>

         <div className="form-group">
            <label>{t("ProductCreate.Shipping")}</label>
            <select
               name="shipping"
               className="form-control"
               onChange={handleChange}
            >
               <option>{t("ProductCreate.Please select")}</option>
               <option value="No">{t("ProductCreate.No")}</option>
               <option value="Yes">{t("ProductCreate.Yes")}</option>
            </select>
         </div>

         <div className="form-group">
            <label>{t("ProductCreate.Quantity")}</label>
            <input
               type="number"
               name="quantity"
               className="form-control"
               value={quantity}
               onChange={handleChange}
            />
         </div>

         <div className="form-group">
            <label>{t("ProductCreate.Color")}</label>
            <select
               name="color"
               className="form-control"
               onChange={handleChange}
            >
               <option>{t("ProductCreate.Please select")}</option>
               {colors.map((c) => (
                  <option key={c} value={c}>
                     {c}
                  </option>
               ))}
            </select>
         </div>

         <div className="form-group">
            <label>{t("ProductCreate.Brand")}</label>
            <input
               type="text"
               name="brand"
               className="form-control"
               value={brand}
               onChange={handleChange}
            />
         </div>

         <div className="form-group">
            <label>{t("ProductCreate.Category")}</label>
            <select
               name="category"
               className="form-control"
               onChange={handleCategoryChange}
            >
               <option>{t("ProductCreate.Please select")}</option>
               {categories.length > 0 &&
                  categories.map((c) => (
                     <option key={c._id} value={c._id}>
                        {c.name}
                     </option>
                  ))}
            </select>
         </div>

         {showSub && (
            <div>
               <label>{t("ProductCreate.Sub Categories")}</label>
               <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  value={subs}
                  onChange={(value) => setValues({ ...values, subs: value })}
               >
                  {subOptions.length &&
                     subOptions.map((s) => (
                        <Option key={s._id} value={s._id}>
                           {s.name}
                        </Option>
                     ))}
               </Select>
            </div>
         )}

         <br />

         <button className="btn btn-outline-info">
            {t("ProductCreate.Save")}
         </button>
      </form>
   );
};

export default ProductCreateForm;
