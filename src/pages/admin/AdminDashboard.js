import React from "react";
import AdminNav from "../../components/nav/AdminNav/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="flex">
        <div className="w-[300px] fixed text-[20px] admin-nav">
          <AdminNav />
        </div>
        <main class="main-wrap text-[20px]">
          <section class="content-main">
            <h4>Admin Dashboard</h4>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
