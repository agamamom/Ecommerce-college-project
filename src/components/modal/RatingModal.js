import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useTranslation } from "react-i18next";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { t } = useTranslation(["product"]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();
  let history = createBrowserHistory();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push(`/product/${slug}`);
      navigate("/login");
    }
  };

  const Rating = t("SingleProduct.Leave rating");
  const LoginToRating = t("SingleProduct.Login to leave rating");
  const Toast = t("SingleProduct.Thanks for your review. It will apper soon");

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? `${Rating}` : `${LoginToRating}`}
      </div>
      <Modal
        title="Leave your rating"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success(`${Toast}`);
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
