import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav/AdminNav";
import { useSelector } from "react-redux";
import { getCategories } from "../../functions/category";

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  return (
    <div className="container-fluid">
      <div className="flex">
        <div className="w-[300px] fixed text-[20px] admin-nav">
          <AdminNav />
        </div>
        <main class="main-wrap text-[20px]">
          <section class="content-main">Dashboard</section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
