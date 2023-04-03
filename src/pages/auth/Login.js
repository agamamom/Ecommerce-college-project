import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FiMail } from "react-icons/fi";
import { BsGoogle } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import { createBrowserHistory } from "history";
import { Button } from "antd";
import { ColorRing } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const Login = () => {
   const { t } = useTranslation(["login"]);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const { user } = useSelector((state) => ({ ...state }));
   let history = createBrowserHistory();
   useEffect(() => {
      let intended = history.location;
      console.log("intended", intended);
      if (intended) {
         return;
      } else {
         if (user && user.token) {
            navigate("/");
         }
      }
   }, [user, navigate]);

   let dispatch = useDispatch();

   const roleBasedRedirect = (res) => {
      let intended = history.location;
      if (intended) {
         history.back();
      } else {
         if (res.data.role === "admin") {
            navigate("/admin/dashboard");
         } else {
            navigate("/user/history");
         }
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const result = await auth.signInWithEmailAndPassword(email, password);
         // console.log(result);
         const { user } = result;
         const idTokenResult = await user.getIdTokenResult();

         createOrUpdateUser(idTokenResult.token)
            .then((res) => {
               console.log("res", res);
               dispatch({
                  type: "LOGGED_IN_USER",
                  payload: {
                     name: res.data.name,
                     email: user.email,
                     token: idTokenResult.token,
                     role: res.data.role,
                     _id: res.data._id,
                  },
               });
               roleBasedRedirect(res);
            })
            .catch((err) => console.log(err));

         // navigate("/");
      } catch (error) {
         console.log(error);
         toast.error(error.message);
         setLoading(false);
      }
   };

   const googleLogin = async () => {
      auth
         .signInWithPopup(googleAuthProvider)
         .then(async (result) => {
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
               .then((res) => {
                  dispatch({
                     type: "LOGGED_IN_USER",
                     payload: {
                        name: res.data.name,
                        email: user.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id,
                     },
                  });
                  roleBasedRedirect(res);
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => {
            console.log(err);
            toast.error(err.message);
         });
   };

   const yourEmail = t("loginScreen.Your email");
   const yourPassword = t("loginScreen.Your password");
   const loginForm = () => (
      <form onSubmit={handleSubmit}>
         <div className="form-group">
            <input
               type="email"
               className="form-control"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder={yourEmail}
               autoFocus
            />
         </div>

         <div className="form-group">
            <input
               type="password"
               className="form-control"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder={yourPassword}
            />
         </div>

         <br />
         <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            block
            shape="round"
            size="large"
            disabled={!email || password.length < 6}
         >
            <div className="flex justify-center items-center">
               <FiMail className="mr-[10px] text-[20px]" />
               <span>{t("loginScreen.Login with Email/Password")}</span>
            </div>
         </Button>
      </form>
   );

   return (
      <div className="container p-5">
         <div className="row">
            <div className="col-md-6 offset-md-3">
               {loading ? (
                  <ColorRing
                     visible={true}
                     height="80"
                     width="80"
                     ariaLabel="blocks-loading"
                     wrapperStyle={{}}
                     wrapperClass="blocks-wrapper"
                     colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                     ]}
                  />
               ) : (
                  <h1 className="text-[30px] mb-[10px] uppercase tracking-wider">
                     {t("loginScreen.Login")}
                  </h1>
               )}

               {loginForm()}

               <Button
                  onClick={googleLogin}
                  type="danger"
                  className="mb-3"
                  block
                  shape="round"
                  size="large"
               >
                  <div className="flex justify-center items-center">
                     <BsGoogle className="mr-[10px] text-[20px]" />
                     <span>{t("loginScreen.Login with Google")}</span>
                  </div>
               </Button>

               <Link to="/forgot/password" className="float-right text-danger">
                  {t("loginScreen.Forgot Password")}
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Login;
