import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();
  let history = createBrowserHistory();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      // navigate({
      //   to: "/login",
      //   state: { from: `/product/${slug}` },
      // });
      // history.push(`/product/${slug}`, { some: "state" });
      // history.push({ pathname: "/login", state: { from: `/product/${slug}` } });
      history.push(`/product/${slug}`);
      navigate("/login");
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. It will apper soon");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
