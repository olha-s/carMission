import React from "react";
import AdminHeader from "../../components/admin/AdminHeader/AdminHeader";
import SideBar from "../../components/admin/SideBar/SideBar";
import FormContainerWorkStages from "../../components/admin/WorkStages/FormContainer/FormContainerWorkStages";
import FormContainerAboutUs from "../../components/admin/AboutUs/FormContainer/FormContainerAboutUs";

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <SideBar />
      <FormContainerAboutUs />
      <FormContainerWorkStages />
    </>
  );
};

export default AdminPage;
