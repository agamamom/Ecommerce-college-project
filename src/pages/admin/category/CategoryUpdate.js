import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { useNavigate, useParams } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
const CategoryUpdate = () => {
   const { user } = useSelector((state) => ({ ...state }));

   const [name, setName] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   let { slug } = useParams();

   useEffect(() => {
      loadCategory();
   }, []);

   const loadCategory = () =>
      getCategory(slug).then((c) => setName(c.data.name));

   const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(name);
      setLoading(true);
      updateCategory(slug, { name }, user.token)
         .then((res) => {
            // console.log(res)
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is updated`);
            navigate("/admin/category");
         })
         .catch((err) => {
            console.log("eerrr me", err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
         });
   };

   const categoryForm = () => (
      <form onSubmit={handleSubmit}>
         <div className="form-group">
            <label>Name</label>
            <input
               type="text"
               className="form-control"
               onChange={(e) => setName(e.target.value)}
               value={name}
               autoFocus
               required
            />
            <br />
            <button className="btn btn-outline-primary">Save</button>
         </div>
      </form>
   );

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
                        <h4>Update category</h4>
                     )}
                     {categoryForm()}
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
};

export default CategoryUpdate;
