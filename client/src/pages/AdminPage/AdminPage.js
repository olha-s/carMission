import React from "react";
import AdminHeader from "../../components/admin/AdminHeader/AdminHeader";
import SideBar from "../../components/admin/SideBar/Main/SideBar";
import AdminRoutes from "../../routes/AdminRoutes";
import "./AdminPage.scss";

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <div className="admin-wrapper">
        <SideBar />
        <AdminRoutes />
      </div>
    </>
  );
};

export default AdminPage;
