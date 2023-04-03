import React, { useState } from "react";
import AdminNav from "../../components/nav/AdminNav/AdminNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { FallingLines } from "react-loader-spinner";
const PasswordAdmin = () => {
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      // console.log(password);

      await auth.currentUser
         .updatePassword(password)
         .then(() => {
            setLoading(false);
            setPassword("");
            toast.success("Password updated");
         })
         .catch((err) => {
            setLoading(false);
            toast.error(err.message);
         });
   };

   const passwordUpdateForm = () => (
      <form onSubmit={handleSubmit}>
         <div className="form-group">
            <label className="mt-[30px] mb-[10px]">Your new Password</label>
            <input
               type="password"
               onChange={(e) => setPassword(e.target.value)}
               className="form-control"
               placeholder="Enter new password"
               disabled={loading}
               value={password}
            />
            <button
               className="btn btn-primary mt-[10px]"
               disabled={!password || password.length < 6 || loading}
            >
               Submit
            </button>
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
                  <div class="content-header">
                     <div>
                        {loading ? (
                           <FallingLines
                              color="#4fa94d"
                              width="100"
                              visible={true}
                              ariaLabel="falling-lines-loading"
                           />
                        ) : (
                           <h4>Password Update</h4>
                        )}
                        {passwordUpdateForm()}
                     </div>
                  </div>
               </section>
            </main>
         </div>
      </div>
   );
};

export default PasswordAdmin;
