import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, removeSub, getSubs } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { FallingLines } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
const SubCreate = () => {
   const { t } = useTranslation(["adminNav"]);
   const { user } = useSelector((state) => ({ ...state }));
   const [name, setName] = useState("");
   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState([]);
   const [category, setCategory] = useState("");
   const [subs, setSubs] = useState([]);
   // step 1
   const [keyword, setKeyword] = useState("");

   useEffect(() => {
      loadCategories();
      loadSubs();
   }, []);

   const loadCategories = () =>
      getCategories().then((c) => setCategories(c.data));

   const loadSubs = () => getSubs().then((s) => setSubs(s.data));

   const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(name);
      setLoading(true);
      createSub({ name, parent: category }, user.token)
         .then((res) => {
            // console.log(res)
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is created`);
            loadSubs();
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
         });
   };

   const handleRemove = async (slug) => {
      if (window.confirm("Delete?")) {
         setLoading(true);
         removeSub(slug, user.token)
            .then((res) => {
               setLoading(false);
               toast.error(`${res.data.name} deleted`);
               loadSubs();
            })
            .catch((err) => {
               if (err.response.status === 400) {
                  setLoading(false);
                  toast.error(err.response.data);
               }
            });
      }
   };

   // step 4
   const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

   return (
      <div className="container-fluid">
         <div className="flex">
            <div className="w-[300px] fixed text-[20px] admin-nav">
               <AdminNav />
            </div>
            <main class="main-wrap">
               <section class="content-main">
                  <div className="">
                     {loading ? (
                        <FallingLines
                           color="#4fa94d"
                           width="100"
                           visible={true}
                           ariaLabel="falling-lines-loading"
                        />
                     ) : (
                        <h4>{t("SubCreate.Create sub category")}</h4>
                     )}

                     <div className="form-group">
                        <label>{t("SubCreate.Parent category")}</label>
                        <select
                           name="category"
                           className="form-control"
                           onChange={(e) => setCategory(e.target.value)}
                        >
                           <option>{t("SubCreate.Please select")}</option>
                           {categories.length > 0 &&
                              categories.map((c) => (
                                 <option key={c._id} value={c._id}>
                                    {c.name}
                                 </option>
                              ))}
                        </select>
                     </div>

                     <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                     />

                     {/* step 2 and step 3 */}
                     <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                     {/* step 5 */}
                     {subs.filter(searched(keyword)).map((s) => (
                        <div className="alert alert-secondary" key={s._id}>
                           {s.name}
                           <span
                              onClick={() => handleRemove(s.slug)}
                              className="btn btn-sm float-right"
                           >
                              <DeleteOutlined className="text-danger" />
                           </span>
                           <Link to={`/admin/sub/${s.slug}`}>
                              <span className="btn btn-sm float-right">
                                 <EditOutlined className="text-warning" />
                              </span>
                           </Link>
                        </div>
                     ))}
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
};

export default SubCreate;
