import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FiMail } from "react-icons/fi";
import { BsGoogle } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import { createBrowserHistory } from "history";
import { Button, Checkbox, Form, Input } from "antd";
const Login = () => {
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
    // console.table(email, password);
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

  // const loginForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <input
  //         type="email"
  //         className="form-control"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         placeholder="Your email"
  //         autoFocus
  //       />
  //     </div>

  //     <div className="form-group">
  //       <input
  //         type="password"
  //         className="form-control"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         placeholder="Your password"
  //       />
  //     </div>

  //     <br />
  //     <Button
  //       onClick={handleSubmit}
  //       type="primary"
  //       className="mb-3"
  //       block
  //       shape="round"
  //       size="large"
  //       disabled={!email || password.length < 6}
  //     >
  //       <div className="flex justify-center items-center">
  //         <FiMail className="mr-[10px] text-[20px]" />
  //         <span>Login with Email/Password</span>
  //       </div>
  //     </Button>
  //   </form>
  // );

  const loginForm = () => (
    <Form
      name="basic"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        className="mb-3"
        block
        shape="round"
        size="large"
      >
        <div className="flex justify-center items-center">
          <FiMail className="mr-[10px] text-[20px]" />
          <span>Login with Email/Password</span>
        </div>
      </Button>
    </Form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger mb-[10px] text-[30px] uppercase tracking-wider">
              Loading...
            </h4>
          ) : (
            <h1 className="text-[30px] mb-[10px] uppercase tracking-wider">
              Login
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
              <span>Login with Google</span>
            </div>
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
