import React from "react";
import AdminHeader from "../../components/admin/AdminHeader/AdminHeader";
import SideBar from "../../components/admin/SideBar/SideBar";
import FormContainerWorkStages from "../../components/admin/WorkStages/FormContainer/FormContainerWorkStages";

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <SideBar />
      <FormContainerWorkStages />
    </>
  );
};

export default AdminPage;
